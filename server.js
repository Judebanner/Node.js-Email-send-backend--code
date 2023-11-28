const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/send-email', async (req, res) => {
  let formData = req.body;

  // Set up nodemailer transporter
  // WARNING: In production, never hard-code sensitive information!
  // Use environment variables and also consider using OAuth2
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Use any SMTP service you want
    auth: {
        user: "enter your user name",
        pass: " enter your api passkey", 
    },
  });

  let mailOptions = {
    from: '"Your Website Name" <your-email@gmail.com>', // Sender address
    to: 'infoleviacc@gmail.com', // List of receivers
    subject: 'New Contact Form Submission', // Subject line
    html: `
      <h1>New Contact Form ${formData.firstName+" "+formData.lastName}</h1>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th style="padding: 8px; text-align: left;">Field</th>
          <th style="padding: 8px; text-align: left;">Value</th>
        </tr>
        <tr>
          <td style="padding: 8px;">First Name</td>
          <td style="padding: 8px;">${formData.firstName}</td>
        </tr>
        <tr>
          <td style="padding: 8px;">Last Name</td>
          <td style="padding: 8px;">${formData.lastName}</td>
        </tr>
        <tr>
          <td style="padding: 8px;">Email</td>
          <td style="padding: 8px;">${formData.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px;">Phone Number</td>
          <td style="padding: 8px;">${formData.phoneNumber}</td>
        </tr>
        <tr>
          <td style="padding: 8px;">Topic</td>
          <td style="padding: 8px;">${formData.topic}</td>
        </tr>
        <tr>
          <td style="padding: 8px;">Choice</td>
          <td style="padding: 8px;">${formData.choice}</td>
        </tr>
        <tr>
          <td style="padding: 8px;">Message</td>
          <td style="padding: 8px;">${formData.message}</td>
        </tr>
        <tr>
          <td style="padding: 8px;">Terms Accepted</td>
          <td style="padding: 8px;">${formData.termsAccepted ? 'Yes' : 'No'}</td>
        </tr>
      </table>
    `, // HTML body
  };
  // Send email with defined transport object
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return res.status(200).send('Email successfully sent!');
  } catch (error) {
    console.error('Error sending email: %s', error);
    return res.status(500).send('Error sending email');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
