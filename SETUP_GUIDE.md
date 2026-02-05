# Banquet Hall Client Inquiry Form - Setup Guide

## Overview
This is a complete banquet hall client inquiry form system built with HTML, CSS, and JavaScript that sends inquiries directly to the owner's email via EmailJS.

## Files Created
1. **index.html** - Main form page with all input fields
2. **styles.css** - Professional responsive styling
3. **script.js** - Form validation and EmailJS integration
4. **SETUP_GUIDE.md** - This setup guide

## Quick Start

### Step 1: Create EmailJS Account
1. Visit https://www.emailjs.com
2. Sign up for a free account
3. Verify your email address

### Step 2: Set Up Email Service
1. In EmailJS Dashboard, click "Add New Service"
2. Select "Gmail" (or your preferred email provider)
3. Connect your email account (shubhamyedage101@gmail.com)
4. Copy the **Service ID** (e.g., service_xxxxxxxxxxxx)

### Step 3: Create Email Template
1. In EmailJS Dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Set the template name as "banquet_inquiry_template"
4. Configure the email:

**Template Content:**

```
From: {{client_email}}
Phone: {{client_phone}}
---

Client Information:
Name: {{client_name}}
Email: {{client_email}}
Phone: {{client_phone}}

Event Details:
Event Type: {{event_type}}
Event Date: {{event_date}}
Number of Guests: {{guest_count}}

Venue Type: {{venue_type}}

Services Required:
{{services}}

Budget Range: {{budget}}

Special Requests:
{{special_requests}}
```

5. Set "To Email" to: shubhamyedage101@gmail.com
6. Set "Subject" to: New Banquet Hall Inquiry from {{client_name}}
7. Copy the **Template ID** (e.g., template_xxxxxxxxxxxx)

### Step 4: Get Public Key
1. In EmailJS Dashboard, go to "Account" or "API Keys"
2. Copy your **Public Key** (e.g., xxxxxxxxxxxxxxxx)

### Step 5: Update JavaScript File
Open **script.js** and replace the following placeholders with your actual credentials:

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';      // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // Replace with your Public Key
```

Example:
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123def456';
const EMAILJS_TEMPLATE_ID = 'template_xyz789uvw012';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
```

### Step 6: Open the Form
1. Open **index.html** in your web browser
2. Fill out the form with test data
3. Click "Send Inquiry"
4. Check shubhamyedage101@gmail.com for the inquiry email

## Form Features

### Client Information Section
- Full Name (required)
- Email Address (required, validated)
- Phone Number (required, validated)

### Event Details Section
- Event Type (dropdown with 8 options)
- Event Date (date picker, must be future date)
- Number of Guests (required, minimum 1)

### Venue Type Section
- Indoor (radio button)
- Outdoor (radio button)
- Semi-outdoor (radio button)

### Services Section (Select all that apply)
- Catering (Food & Beverages)
- Decoration
- Music/DJ
- Photography/Videography
- Lighting
- Bar Service
- Valet Parking
- Sound System

### Budget Range
- ₹50,000 - ₹1,00,000
- ₹1,00,000 - ₹2,00,000
- ₹2,00,000 - ₹5,00,000
- ₹5,00,000 - ₹10,00,000
- Above ₹10,00,000

### Additional Features
- Special Requests textarea for additional information
- Real-time form validation with error messages
- Loading spinner during email submission
- Success confirmation message
- Responsive design (mobile, tablet, desktop)
- Professional gradient styling
- Error handling with retry capability

## Validation Rules

✓ **Name**: Non-empty text
✓ **Email**: Valid email format (xxx@xxx.xx)
✓ **Phone**: Valid phone number (10+ digits)
✓ **Event Date**: Must be today or future date
✓ **Guest Count**: Minimum 1 guest
✓ **Venue Type**: One option must be selected
✓ **Services**: At least one service must be selected
✓ **Budget**: One budget range must be selected

## Troubleshooting

### Issue: Form not sending emails
**Solution:** 
- Verify all three credentials (Service ID, Template ID, Public Key) are correctly copied in script.js
- Check that EmailJS account is active
- Verify email service is connected in EmailJS Dashboard
- Check browser console (F12) for error messages

### Issue: "Failed to send inquiry" error
**Solution:**
- Check internet connection
- Verify email service is properly configured in EmailJS
- Try clearing browser cache and reload the page
- Check if the email address has been verified in EmailJS

### Issue: Client not receiving confirmation
**Note:** Currently, only the owner receives the inquiry email. To add client confirmation emails, you would need to configure a second email template for client confirmations in the script.js file.

## Email Flow

```
Client Fills Form
    ↓
JavaScript Validates Form
    ↓
Client Clicks "Send Inquiry"
    ↓
EmailJS Sends to Owner's Email (shubhamyedage101@gmail.com)
    ↓
Owner Receives Inquiry with All Details
    ↓
Client Sees Success Message
```

## Customization Options

### Change Owner Email
In **script.js**, modify the `collectFormData()` function:
```javascript
to_email: 'shubhamyedage101@gmail.com',  // Change this to desired email
```

### Add More Services
In **index.html**, add new checkboxes in the Services section:
```html
<div class="checkbox-option">
    <input type="checkbox" id="newService" name="services" value="New Service Name">
    <label for="newService">New Service Name</label>
</div>
```

### Change Budget Ranges
In **index.html**, modify the budget options in the dropdown:
```html
<option value="New Budget Range">New Budget Range</option>
```

### Modify Email Template
Edit the email template in EmailJS Dashboard to change how the inquiry email looks.

## Mobile Responsiveness

The form is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## Browser Compatibility

Works on:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Android)

## Security Notes

- Email addresses are sent through EmailJS secure servers
- No data is stored on your server
- EmailJS uses industry-standard security
- Client-side validation prevents invalid data submission

## Support

For EmailJS issues: https://www.emailjs.com/docs/
For form customization: Check the HTML, CSS, and JavaScript files for commented sections

## License

Free to use and modify for your banquet hall business.
