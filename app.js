const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json({limit: "25mb"}))
app.use(express.urlencoded({limit: "25mb"}))


function sendMail({email,travelOptions,name,phone,message}){

    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "favourkcb@gmail.com",
                pass: "xnappmyqmasnzyue"
            }
        })

        const email_configs = {
            from: "favourkcb@gmail.com",
            to: "favourkcb@gmail.com",
            subject: `New Travel Inquiry from ${name}`,
            html: `
            <h1>New Travel Inquiry</h1>
            <p><strong>Travel Option:</strong> ${travelOptions}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
          `  // HTML content only
        
        }

        transporter.sendMail(email_configs, (error,info) => {
            if(error){
                return reject({message: "An Error Occcured"})
            }

            return resolve({message: `Message sent successfuly! We would get back to you shortly`})
        })
    })
}

app.post("/doryina-backend.onrender.com", (req,res) => {
    sendMail(req.body)
    .then(response => res.status(200).json({data: req.body, response}))
    .catch(err => res.status(500).json({message: err}))
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})