import { FormData } from '../types';

/**
 * IMPORTANT: HOW TO USE THIS SERVICE
 * 
 * This function is designed to send form data to a Google Sheet using a Google Apps Script Web App.
 * You CANNOT directly write to Google Sheets from the frontend due to security constraints.
 * 
 * Follow these steps to set this up:
 * 
 * 1. CREATE A GOOGLE SHEET:
 *    - Create a new Google Sheet.
 *    - The first row should be your headers, for example:
 *      `Timestamp | Name | Email | Phone | Course | Message`
 * 
 * 2. CREATE A GOOGLE APPS SCRIPT:
 *    - In your Google Sheet, go to `Extensions` > `Apps Script`.
 *    - Replace the content of `Code.gs` with the following script:
 * 
 *      ```javascript
 *      function doPost(e) {
 *        try {
 *          var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *          var data = JSON.parse(e.postData.contents);
 *          
 *          var timestamp = new Date();
 *          var name = data.name || '';
 *          var email = data.email || '';
 *          var phone = data.phone || '';
 *          var course = data.course || '';
 *          var message = data.message || '';
 * 
 *          sheet.appendRow([timestamp, name, email, phone, course, message]);
 * 
 *          return ContentService
 *            .createTextOutput(JSON.stringify({ "result": "success" }))
 *            .setMimeType(ContentService.MimeType.JSON);
 *        } catch (error) {
 *          return ContentService
 *            .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
 *            .setMimeType(ContentService.MimeType.JSON);
 *        }
 *      }
 *      ```
 * 
 * 3. DEPLOY THE SCRIPT AS A WEB APP:
 *    - Click the `Deploy` button in the Apps Script editor.
 *    - Select `New deployment`.
 *    - For `Execute as`, select `Me`.
 *    - For `Who has access`, select `Anyone` (this allows your website to call it).
 *    - Click `Deploy`.
 *    - **Authorize the script** when prompted.
 *    - After deploying, you will get a `Web app URL`. Copy this URL.
 * 
 * 4. UPDATE THE URL BELOW:
 *    - Replace the `GOOGLE_SCRIPT_URL` placeholder below with the URL you just copied.
 */

const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

export const isGoogleScriptConfigured = GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

export const submitInquiry = async (data: FormData): Promise<void> => {
  if (!isGoogleScriptConfigured) {
    console.error('ERROR: Google Apps Script URL is not configured. Please update it in services/googleSheetsService.ts');
    // Simulate a successful submission for UI testing purposes if the URL isn't set.
    // In a real scenario, you'd throw an error.
    await new Promise(resolve => setTimeout(resolve, 1000));
    // throw new Error('Google Apps Script URL is not configured.');
    return;
  }
  
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.result !== 'success') {
      throw new Error(result.error || 'An unknown error occurred.');
    }
  } catch (error) {
    console.error('Failed to submit inquiry:', error);
    throw new Error('There was a problem submitting your inquiry. Please try again later.');
  }
};
