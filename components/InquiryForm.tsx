
import React, { useState } from 'react';
import { FormData, FormStatus } from '../types';
import { submitInquiry, isGoogleScriptConfigured } from '../services/googleSheetsService';

const courseOptions = [
  'Business Management',
  'Data Science & Analytics',
  'Digital Marketing',
  'International Finance',
  'Other'
];

const InquiryForm: React.FC = () => {
  const [step, setStep] = useState(1);
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
  
  const validateStep1 = () => {
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

  const nextStep = () => {
      if (validateStep1()) {
        setStep(2);
      }
  };

  const prevStep = () => {
    setStep(1);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus(FormStatus.Loading);
    
    try {
      await submitInquiry(formData);
      setStatus(FormStatus.Success);
      // Reset form, but maybe keep the user on the success message
      // setFormData({ name: '', email: '', phone: '', course: courseOptions[0], message: '' });
      // setStep(1);
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
          
          {!isGoogleScriptConfigured && (
            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-6 rounded-md" role="alert">
                <p className="font-bold">Developer Note: Form Not Connected</p>
                <p>The inquiry form is currently in test mode. To connect it to your Google Sheet, please follow the setup instructions in the file: <code className="bg-orange-200 text-orange-800 px-1 py-0.5 rounded text-sm">services/googleSheetsService.ts</code>.</p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className={`flex-1 text-center ${step >= 1 ? 'text-brand-secondary' : 'text-gray-400'}`}>
                <div className="font-bold">Step 1</div>
                <div className="text-sm">Personal Details</div>
              </div>
              <div className={`flex-1 h-1 mx-4 ${step > 1 ? 'bg-brand-secondary' : 'bg-gray-300'}`}></div>
              <div className={`flex-1 text-center ${step >= 2 ? 'text-brand-secondary' : 'text-gray-400'}`}>
                <div className="font-bold">Step 2</div>
                <div className="text-sm">Course Interest</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-brand-secondary h-2.5 rounded-full" style={{ width: step === 1 ? '50%' : '100%', transition: 'width 0.5s ease-in-out' }}></div>
            </div>
          </div>

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
            {step === 1 && (
              <div className="animate-fade-in">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Course of Interest</label>
                  <select name="course" id="course" value={formData.course} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary bg-white">
                    {courseOptions.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary"></textarea>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-4">
              {step === 1 ? (
                <div></div> // Placeholder for spacing
              ) : (
                <button type="button" onClick={prevStep} className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-md hover:bg-gray-300 transition-colors">
                  Back
                </button>
              )}

              {step === 1 ? (
                <button type="button" onClick={nextStep} className="w-full md:w-auto bg-brand-secondary text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all transform hover:scale-105">
                  Next &rarr;
                </button>
              ) : (
                <button type="submit" disabled={status === FormStatus.Loading} className="w-full md:w-auto bg-brand-secondary text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center h-12 min-w-[150px]">
                  {status === FormStatus.Loading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                  ) : 'Submit Inquiry'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;