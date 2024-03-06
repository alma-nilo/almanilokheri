export const Warning = (name) => {
    return `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Account Verification Required</title>
          <style>
            body {
              background-color: #f9eaea;
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
              color: #ff0000;
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
            <h1>Account Verification Required!</h1>
            <p>Dear ${name},</p>
            <p>We regret to inform you that your account has not been verified. Since you haven't provided any proof or references, we will have to remove your account without notice if we find any suspicious activity.</p>
            <p>We appreciate your interest in our college and wish you the best of luck in your future endeavors.</p>
            <p>Thank you for considering our college.</p>
            <p>Best regards,</p>
            <p>The College Team</p>
          </div>
        </body>
      </html>
      `;
};
