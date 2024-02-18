export const Otp = (code) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>OTP for Signup Verification</title>
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
                color: #333333;
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
                object-fit: contain;
            }
    
            p {
                margin: 20px 0;
                text-align: center;
            }
    
            .otp {
                background-color: #eeeeee;
                border-radius: 6px;
                font-size: 24px;
                font-weight: bold;
                margin: 20px auto;
                max-width: 200px;
                padding: 20px;
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
            <img src="http://gpnilokheri.ac.in/assets/img/Logo.jpeg" alt="College Logo" width="200" height="100">
            <h1>Verification Code for Signup</h1>
            <p>Please use the following OTP to verify your email address and complete your signup process:</p>
            <div class="otp">${code}</div>
            <p>This code is valid for 10 minutes only. Please enter the code on the signup page to complete your registration.</p>
            <p>Thank you for choosing GBN Govt Polytechnic Nilokheri as your education partner. We look forward to welcoming you to our community.</p>
            <p class="footer">Please do not reply to this email. If you have any questions, please contact our customer support.</p>
        </div>
    </body>
    </html>
    `;
};
