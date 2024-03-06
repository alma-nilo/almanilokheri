export const ReferenceNotification = (referrer, userDetails) => {
  const { _id, name, profilePic, rollNo, email, trade, profession, batch } = userDetails;

  return (
    `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Account Reference Notification</title>
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
      
            img {
              display: block;
              margin: 0 auto;
              max-width: 100%;
              border-radius: 50%;
            }
      
            p {
              margin: 10px 0;
            }
      
            .detail {
              display: flex;
              align-items: center;
            }
      
            .label {
              font-weight: bold;
              margin-right: 10px;
            }

            .btn {
              background-color: #4CAF50; /* Green */
              border: none;
              color: white;
              padding: 10px 20px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin: 4px 2px;
              cursor: pointer;
              border-radius: 5px;
            }
      
            .approve {
              background-color: #4CAF50; /* Green */
            }
      
            .reject {
              background-color: #f44336; /* Red */
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
            <img src="${profilePic}" alt="Profile Picture" width="150" height="150" />
            <div class="detail">
              <p class="label">Name:</p>
              <p>${name}</p>
            </div>
            <div class="detail">
              <p class="label">Roll No:</p>
              <p>${rollNo}</p>
            </div>
            <div class="detail">
              <span class="label">Email:</span>
              <p>${email}</p>
            </div>
            <div class="detail">
              <p class="label">Trade:</p>
              <p>${trade}</p>
            </div>
            <div class="detail">
              <p class="label">Profession:</p>
              <p>${profession}</p>
            </div>
            <div class="detail">
              <p class="label">Batch:</p>
              <p>${batch}</p>
            </div>
        
            <h1>Account Reference Notification</h1>
            <p>Dear ${referrer.name},</p>
            <p>Your account has been used as a reference by a new user. Do you approve this reference?</p>
            <p>Please take action by clicking one of the buttons below:</p>
            <a href="https://almanilokheri.in:5000/admins/responsereferrer?uuid=${referrer.uuid}&token=${referrer.token}&response=Approve" class="btn approve">Approve</a>
            <a href="https://almanilokheri.in:5000/admins/responsereferrer?uuid=${referrer.uuid}&token=${referrer.token}&response=Reject" class="btn reject">Reject</a>
            <p>If you have any questions or concerns, please feel free to contact us.</p>
            <p>Best regards,</p>
            <p>The College Team</p>
          </div>
        </body>
      </html>
    `)
}