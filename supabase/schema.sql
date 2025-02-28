-- Create books table
CREATE TABLE books (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13),
    publication_year INTEGER,
    description TEXT,
    cover_image_url TEXT,
    category VARCHAR(100),
    available_copies INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create loans table
CREATE TABLE loans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    book_id UUID REFERENCES books(id),
    user_id UUID REFERENCES users(id),
    borrowed_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP WITH TIME ZONE,
    returned_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'borrowed',
    CONSTRAINT fk_book
        FOREIGN KEY(book_id)
        REFERENCES books(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Create reviews table
CREATE TABLE reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    book_id UUID REFERENCES books(id),
    user_id UUID REFERENCES users(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_book
        FOREIGN KEY(book_id)
        REFERENCES books(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Add some sample data
INSERT INTO books (title, author, isbn, publication_year, description, category)
VALUES 
    ('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 1925, 'A story of decadence and excess.', 'Fiction'),
    ('To Kill a Mockingbird', 'Harper Lee', '9780446310789', 1960, 'A classic of modern American literature.', 'Fiction'),
    ('1984', 'George Orwell', '9780451524935', 1949, 'A dystopian social science fiction novel.', 'Science Fiction');

-- Create RLS (Row Level Security) Policies
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read books
CREATE POLICY "Allow public read access to books" ON books
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to create reviews
CREATE POLICY "Allow authenticated users to create reviews" ON reviews
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- Create policy to allow users to read all reviews
CREATE POLICY "Allow public read access to reviews" ON reviews
    FOR SELECT USING (true);

-- Function to update book availability
CREATE OR REPLACE FUNCTION update_book_availability()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE books 
        SET available_copies = available_copies - 1
        WHERE id = NEW.book_id;
    ELSIF TG_OP = 'UPDATE' AND NEW.returned_date IS NOT NULL AND OLD.returned_date IS NULL THEN
        UPDATE books 
        SET available_copies = available_copies + 1
        WHERE id = NEW.book_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating book availability
CREATE TRIGGER update_book_availability_trigger
    AFTER INSERT OR UPDATE ON loans
    FOR EACH ROW
    EXECUTE FUNCTION update_book_availability();
