import React, { useState } from 'react';
import { Send, User, Phone, MapPin, Building2 } from 'lucide-react';

// Define the form data structure
interface FormData {
  fullName: string;
  phoneNumber: string;
  state: string;
  municipality: string;
}

// Define Libyan cities from simplemaps.com
const libyanCities = [
  "طرابلس", "بنغازي", "مصراتة", "البيضاء", "الزاوية", "زليتن", "اجدابيا", "سبها", "الخمس", "توكرة",
  "سرت", "غريان", "درنة", "صبراتة", "المرج", "زوارة", "الكفرة", "يفرن", "مرزق", "طبرق", "غدامس",
  "القبة", "تاجوراء", "بني وليد", "الأبيار", "نالوت", "الأصابعة", "الجميل", "براك", "هون", "جادو",
  "الزنتان", "سلوق", "مسلاتة", "ترهونة", "غات", "العزيزية", "وادي الشاطئ", "مزدة", "البريقة", "زلطن",
  "رقدالين", "الجفرة", "سوكنة", "الأبرق", "راس لانوف", "الماية", "الجغبوب", "العجيلات", "جالو", "البطنان",
  "تازربو", "الشويرف", "وادان", "مرادة", "الحرابة", "أوباري", "الشقيقة", "سيدي السائح", "مسة", "القريات",
  "تاورغاء", "الرجبان", "الرياينة", "الزاوية الغربية", "الزهراء", "السدادة", "الشرقية", "الغريفة", "القلعة",
  "القيقب", "الماجر", "المايا", "المحجوب", "المرقب", "المنية", "النوفلية", "الوسيطة", "اوجلة", "بئر الأشهب",
  "بئر الغنم", "بدر", "بنينا", "تمنهنت", "جنزور", "سوسة", "شحات", "صرمان", "عين زارة", "قصر بن غشير",
  "قمينس", "مرسى البريقة", "مسعود", "مطار بنينا", "وادي زمزم"
];

// Define Libyan municipalities
const libyanMunicipalities = [
  "طرابلس المركز", "عين زارة", "سوق الجمعة", "تاجوراء", "جنزور", "حي الأندلس", "قصر بن غشير", 
  "أبو سليم", "السواني", "العزيزية", "الزاوية", "صرمان", "صبراتة", "زوارة", "الجميل", "رقدالين", 
  "زلطن", "العجيلات", "مصراتة", "زليتن", "الخمس", "ترهونة", "مسلاتة", "قصر الأخيار", "الغربان", 
  "بني وليد", "سرت", "الجفرة", "هون", "ودان", "سوكنة", "زلة", "الواحات", "اجدابيا", "البريقة", 
  "الكفرة", "تازربو", "ربيانة", "بنغازي", "المرج", "البيضاء", "شحات", "القبة", "درنة", "طبرق", 
  "امساعد", "البطنان", "توكرة", "الأبيار", "سلوق", "قمينس", "سبها", "الشاطئ", "أوباري", "غات", 
  "مرزق", "الجبل الأخضر", "الجبل الغربي", "نالوت", "غدامس", "يفرن", "جادو", "الزنتان", "الرجبان"
];

function App() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    state: '',
    municipality: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الرجاء إدخال الاسم الكامل';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'الرجاء إدخال رقم الهاتف';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'الرجاء إدخال رقم هاتف صحيح (10 أرقام)';
    }
    
    if (!formData.state) {
      newErrors.state = 'الرجاء اختيار المدينة';
    }
    
    if (!formData.municipality) {
      newErrors.municipality = 'الرجاء اختيار البلدية';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsLoading(false);
        setIsSubmitted(true);
        
        // Reset form after submission
        setFormData({
          fullName: '',
          phoneNumber: '',
          state: '',
          municipality: ''
        });
        
        // Reset submission status after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-blue-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-white">نموذج التسجيل - ليبيا</h1>
            <p className="text-blue-100 mt-2">يرجى ملء النموذج أدناه للتواصل معنا</p>
          </div>
        </div>
        
        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-4 border border-green-100">
              <p className="font-bold text-lg">تم إرسال النموذج بنجاح!</p>
              <p className="text-sm mt-2">سنتواصل معك قريباً على الرقم المسجل</p>
            </div>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              عودة للنموذج
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-1">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <User size={16} className="ml-1" />
                الاسم الكامل <span className="text-red-500 mr-1">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="أدخل الاسم الكامل"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  {errors.fullName}
                </p>
              )}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Phone size={16} className="ml-1" />
                رقم الهاتف <span className="text-red-500 mr-1">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 py-3 text-gray-500 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg">
                  +218
                </span>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="أدخل رقم الهاتف"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <MapPin size={16} className="ml-1" />
                المدينة <span className="text-red-500 mr-1">*</span>
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white transition-all ${
                  errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                         backgroundPosition: "left 1rem center", 
                         backgroundRepeat: "no-repeat", 
                         backgroundSize: "1.5em 1.5em", 
                         paddingRight: "2.5rem" }}
              >
                <option value="" disabled>اختر المدينة</option>
                {libyanCities.sort().map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  {errors.state}
                </p>
              )}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="municipality" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Building2 size={16} className="ml-1" />
                البلدية <span className="text-red-500 mr-1">*</span>
              </label>
              <select
                id="municipality"
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white transition-all ${
                  errors.municipality ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                         backgroundPosition: "left 1rem center", 
                         backgroundRepeat: "no-repeat", 
                         backgroundSize: "1.5em 1.5em", 
                         paddingRight: "2.5rem" }}
              >
                <option value="" disabled>اختر البلدية</option>
                {libyanMunicipalities.sort().map((municipality) => (
                  <option key={municipality} value={municipality}>
                    {municipality}
                  </option>
                ))}
              </select>
              {errors.municipality && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  {errors.municipality}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>إرسال النموذج</span>
                </>
              )}
            </button>
            
            <div className="pt-4 border-t border-gray-200 mt-6">
              <p className="text-xs text-gray-500 text-center">
                بالضغط على زر الإرسال، أنت توافق على <a href="#" className="text-blue-600 hover:underline">سياسة الخصوصية</a> الخاصة بنا
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;