require('dotenv').config('sendgrid.env')

const express = require("express");
const router = express.Router();
const Contact = require('../models/Contact.model');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(sgMail);

router.post('/contact', (req, res, next) => {
    const {firstName, lastName, email, company, phone, city, stateProvince, country, message} = req.body;

    Contact.create({firstName, lastName, email, company, phone, city, stateProvince, country, message})
        .then((createdMessage) => {
            //contact was created successfully, now send email
            console.log("CREATED MESSAGE",createdMessage)
            sendEmail(createdMessage.email, createdMessage.message, createdMessage.firstName, createdMessage.lastName, createdMessage.company, createdMessage.phone, createdMessage.city, createdMessage.stateProvince, createdMessage.country)
        })
        .then((result) => {
            console.log('SENT EMAIL RESULT: ', result)
            res.send('Message Created Successfully')
        })
        .catch((error) => {
            console.error(error)
            res.send('Error occured while sending email')
        })
        .catch((error) => {
            console.log(error)
            res.send("error occured while createing the contact");
        });
 });
 

 function sendEmail(email, message, firstName, lastName, company, phone, city, stateProvince, country){
    console.log("FIRSTNAME: ", firstName, "LASTNAME: ",  lastName, "EMAIL: ", email, "COMPANY: ", company, "PHONE#: ", phone, "CITY: ", city, "STATE: ", stateProvince, "COUNTRY: ", country, "MESSAGE", message)
    const msg ={
        to:'sales@nishiyama-usa.com',
        from: 'sales@nishiyama-usa.com',
        subject: `Inqury From: NCA WEBPAGE CONTACT FORM`,
        html: `
        <div>
       

        <strong>NAME:</strong> ${firstName} ${lastName} 
        </div>
        
        <div>
        <strong>EMAIL:  </strong>${email} 
        </div>

        <div>
        <strong>COMPANY: </strong>${company}
        </div>

        <div>
        <strong>PHONE #:  </strong>${phone}
        </div>
        
        <div>
        <strong>CITY: </strong>${city} 
        </div>

        <div>
        <strong>STATE/PROVINCE:  </strong>${stateProvince}
        </div>
        
        <div>
        <strong>COUNTRY: </strong>${country} 
        </div>

        <div>
       <strong> MESSAGE/INQUIRY: </strong>
        </div>

        <p> ${message} </p>

        `
    }
    return sgMail.send(msg);

 }

 module.exports = router;