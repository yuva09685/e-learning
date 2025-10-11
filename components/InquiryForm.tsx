
import React, { useState } from 'react';
import { FormData, FormStatus } from '../types';
import { submitInquiry, isEmailServiceConfigured } from '../services/emailService';

const courseOptions = [
  'Business Management',
  'Data Science & Analytics',
  'Digital Marketing',
  'International Finance',
  'Other'
];

const InquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    course: courseOptions[0],
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>(FormStatus.Idle);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setValidationError('Please fill in all required fields.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setValidationError('Please enter a valid email address.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus(FormStatus.Loading);
    
    if (!validateForm()) {
      setStatus(FormStatus.Idle);
      return;
    }
    
    try {
      await submitInquiry(formData);
      setStatus(FormStatus.Success);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: courseOptions[0],
        message: ''
      });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setStatus(FormStatus.Error);
    }
  };

  if (status === FormStatus.Success) {
    return (
      <section id="inquiry" className="py-20 bg-brand-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-8 md:p-12 text-center">
             <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-md inline-block" role="alert">
                <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                <p>Your inquiry has been submitted successfully. Our advisors will contact you soon.</p>
              </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry" className="py-20 bg-brand-primary">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary">Start Your Learning Journey Today</h2>
            <p className="text-lg text-gray-600 mt-2">Fill out the form below, and our advisor will get in touch with you shortly.</p>
          </div>
          
          {!isEmailServiceConfigured && (
            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-6 rounded-md" role="alert">
                <p className="font-bold">Developer Note: Form Not Connected</p>
                <p>The inquiry form is currently in test mode. To connect it to your email service, please configure the SMTP settings in your environment variables.</p>
            </div>
          )}

          {status === FormStatus.Error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
              <p className="font-bold">Submission Failed</p>
              <p>{error}</p>
            </div>
          )}
          
          {validationError && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md" role="alert">
              <p>{validationError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary" 
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary" 
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  id="phone" 
                  required 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary" 
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Course of Interest</label>
                <select 
                  name="course" 
                  id="course" 
                  value={formData.course} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary bg-white"
                >
                  {courseOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea 
                name="message" 
                id="message" 
                rows={4} 
                value={formData.message} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary" 
                placeholder="Tell us about your learning goals or ask any questions..."
              ></textarea>
            </div>
            
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={status === FormStatus.Loading} 
                className="w-full md:w-auto bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-400 transition-all transform hover:scale-105 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center h-12 min-w-[200px]"
              >
                {status === FormStatus.Loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Inquiry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;