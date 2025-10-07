import type { FormData } from '../types';

/**
 * Email service for handling form inquiries
 * This service sends an email with the form data to the configured recipient address
 */

export const isEmailServiceConfigured = !!(
  process.env.VITE_SMTP_HOST && 
  process.env.VITE_SMTP_PORT && 
  process.env.VITE_SMTP_USER && 
  process.env.VITE_SMTP_TO_EMAIL
);

// Get the backend API URL from environment - defaults to Vercel deployment
const BACKEND_API_URL = process.env.VITE_BACKEND_API_URL || '';

export const submitInquiry = async (data: FormData): Promise<void> => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if the response is OK before attempting to parse JSON
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        // Try to get error details from response
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If JSON parsing fails, try to get text
        try {
          const errorText = await response.text();
          if (errorText) {
            errorMessage = errorText;
          }
        } catch (textError) {
          // If both JSON and text fail, keep original error message
        }
      }
      throw new Error(errorMessage);
    }

    // Try to parse the response as JSON
    let result;
    try {
      result = await response.json();
    } catch (jsonError) {
      // If JSON parsing fails, there might be an issue with the API response
      const responseText = await response.text();
      console.error('Failed to parse JSON response:', responseText);
      throw new Error('Invalid response format from server. The submission may not have completed successfully.');
    }

    if (!result.success) {
      throw new Error(result.error || 'Failed to send inquiry email');
    }
  } catch (error) {
    console.error('Failed to submit inquiry:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server. This might be due to CORS restrictions or the server being unavailable.');
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('There was a problem submitting your inquiry. Please try again later.');
    }
  }
};