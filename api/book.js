import { Resend } from 'resend';
import twilio from 'twilio';

// Initialize clients (these will use process.env automatically or can be explicitly passed)
let resend;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn('RESEND_API_KEY not set.');
}
let twilioClient;

try {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
} catch (error) {
  console.warn('Twilio credentials not fully configured.');
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, phoneNumber, package: pkg, collectionType, address, preferredDate, timeSlot } = req.body;

  // Basic validation
  if (!fullName || !phoneNumber || !pkg || !preferredDate || !timeSlot) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Send Email via Resend
    const emailPromise = process.env.RESEND_API_KEY ? resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev', // Testing default for Resend
      to: 'pratiksk0077@gmail.com',
      subject: `New Booking: ${pkg} - ${fullName}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Patient Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Package:</strong> ${pkg}</p>
        <p><strong>Collection Type:</strong> ${collectionType === 'visit-clinic' ? 'Visit Clinic' : 'Home Collection'}</p>
        <p><strong>Address:</strong> ${address || 'N/A'}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate}</p>
        <p><strong>Time Slot:</strong> ${timeSlot}</p>
      `,
    }) : Promise.reject(new Error("RESEND_API_KEY not set."));

    // 2. Send WhatsApp via Twilio
    const sender = process.env.TWILIO_WHATSAPP_FROM;
    const recipient = `whatsapp:+91${phoneNumber}`;
    console.log(`\n--- [Twilio Debug] PRE-SEND ---`);
    console.log(`From: ${sender}`);
    console.log(`To: ${recipient}`);
    // Twilio Sandbox only guarantees delivery for pre-approved templates outside the 24hr window.
    // Sandbox Template: "Your {{1}} appointment is coming up on {{2}}"
    const messageBody = `Your Vitality Diagnostics appointment is coming up on ${preferredDate} at ${timeSlot}`;
    console.log(`Body: ${messageBody.replace(/\n/g, '\\n')}`);
    
    let twilioPromise;
    if (twilioClient) {
      twilioPromise = twilioClient.messages.create({
        from: sender,
        to: recipient,
        body: messageBody,
      }).then(message => {
        console.log(`--- [Twilio Debug] SUCCESS ---`);
        console.log(`Message SID: ${message.sid}`);
        console.log(`Status: ${message.status}`);
        return message;
      }).catch(err => {
        console.error(`--- [Twilio Debug] ERROR ---`);
        console.error(`Code: ${err.code}`);
        console.error(`Status: ${err.status}`);
        console.error(`Message: ${err.message}`);
        console.error(`MoreInfo: ${err.moreInfo}`);
        throw err; // Re-throw to be caught by Promise.allSettled
      });
    } else {
      twilioPromise = Promise.reject(new Error("Twilio credentials not set."));
    }

    // Wait for both to complete
    const results = await Promise.allSettled([emailPromise, twilioPromise]);
    
    const errors = [];
    if (results[0].status === 'rejected') {
      errors.push(`Email Failed: ${results[0].reason?.message || results[0].reason}`);
    } else if (results[0].value && results[0].value.error) {
      errors.push(`Email Error: ${results[0].value.error.message}`);
    }

    if (results[1].status === 'rejected') {
      errors.push(`WhatsApp Failed: ${results[1].reason?.message || results[1].reason}`);
    }

    if (errors.length > 0) {
      return res.status(500).json({ error: errors.join(' | ') });
    }

    // Return success
    return res.status(200).json({ success: true, message: 'Booking confirmed' });

  } catch (error) {
    console.error('Error processing booking:', error);
    return res.status(500).json({ error: error.message || 'Internal server error while processing booking' });
  }
}
