# Library Management System

A modern library management system built with React, TypeScript, and Supabase.

## Features

- Book management (add, view)
- Real-time updates
- Responsive design
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account and project

## Setup

1. Clone the repository:
```bash
git clone https://github.com/dzagsm/leadformlibya.git
cd projectliby
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Database Setup

1. Go to your Supabase project
2. Open the SQL editor
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the SQL commands to set up the database schema

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
