export const Accept = (name) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Alumni Membership Accepted</title>
        <style>
          body {
            background-color: #eaf5e1;
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
            color: #4caf50;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 0;
            margin-top: 0;
            text-align: center;
          }
    
          img {
            display: block;
            margin: 0 auto;
            max-width: 100%;
          }
    
          p {
            margin: 20px 0;
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
          <h1>Congratulations!</h1>
          <p>
            Dear ${name} your application for alumni membership to GBN Govt
            Polytechnic Nilokheri has been accepted. We are delighted to welcome you
            as a member of our alumni community.
          </p>
          <p>
            As a member, you will receive regular updates about the college, alumni
            events, and other opportunities to stay connected with our community.
          </p>
          <p>
            Thank you for your interest in our alumni association. We look forward
            to seeing you at our next event!
          </p>
          <p>Best regards,</p>
          <p>The GBN Govt Polytechnic Nilokheri Alumni Committee</p>
          <p class="footer">
            Please do not reply to this email. If you have any questions, please
            contact the alumni office.
          </p>
        </div>
      </body>
    </html>`;
};
