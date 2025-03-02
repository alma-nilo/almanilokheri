export const EventInvitation = (
  name,
  eventTitle,
  eventDate,
  eventDescription
) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Invitation: ${eventTitle}</title>
        <style>
          body {
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
            font-size: 14px;
            margin: 0;
            padding: 0;
          }

          .container {
            background-color: #ffffff;
            border-radius: 6px;
            border: 1px solid #dddddd;
            margin: 20px auto;
            max-width: 600px;
            padding: 20px;
          }

          h1 {
            color: #2c3e50;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
          }

          img {
            display: block;
            margin: 0 auto;
            max-width: 100%;
          }

          .event-details {
            background-color: #eaf5e1;
            border-left: 4px solid #4caf50;
            padding: 10px;
            margin: 20px 0;
          }

          p {
            margin: 10px 0;
            line-height: 1.5;
          }

          .cta-button {
            background-color: #4caf50;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            display: inline-block;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 15px;
            text-align: center;
          }

          .footer {
            color: #999999;
            font-size: 12px;
            margin-top: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img
            src="http://gpnilokheri.ac.in/assets/img/Logo.jpeg"
            alt="College Logo"
            width="200"
            height="100"
            style="object-fit: contain"
          />
          <h1>You're Invited!</h1>
      <p>Dear ${name},</p> 
          <p>
            We are excited to invite you to an upcoming event at **GBN Govt Polytechnic Nilokheri**. 
            We would love to have you join us and reconnect with fellow alumni.
          </p>
          
          <div class="event-details">
            <p><strong>🎉 Event:</strong> ${eventTitle}</p>
            <p><strong>📅 Date:</strong> ${eventDate}</p>
          </div>

          <p>${eventDescription}</p>

          <p style="text-align: center;">
            <a href="https://your-registration-link.com" class="cta-button">RSVP Now</a>
          </p>

          <p>We look forward to celebrating this special occasion with you!</p>

          <p>Best regards,</p>
          <p><strong>The GBN Govt Polytechnic Nilokheri Alumni Committee</strong></p>

          <p class="footer">
            Please do not reply to this email. For questions, contact the alumni office.
          </p>
        </div>
      </body>
    </html>`;
};
