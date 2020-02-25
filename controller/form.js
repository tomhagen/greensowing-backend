const Form = require("../models/form");
const sgMail = require("@sendgrid/mail"); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.contactForm = (req, res) => {
  const { email, phone, name, message } = req.body;

  const emailData = {
    to: process.env.EMAIL_TO,
    from: email,
    subject: `Visit farm contact ${process.env.APP_NAME} website`,
    text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
            <h4>Information received from contact form:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender number: ${phone}</p>
            <p>Sender email: ${email}</p>
            <p>Sender message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>http://greensowing.com.vn</p>
        `
  };

  sgMail
    .send(emailData)
    .then(sent => {
      let form = new Form({
        email: emailData.from,
        subject: emailData.subject,
        content: emailData.html
      });
      form.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        }
        res.json({
          success: true,
          form
        });
      });
      //   console.log(sent);
    })
    .catch(err => console.log(err));
};

exports.orderContactForm = (req, res) => {
  const { email, phone, name, message, detail } = req.body;
  const emailData = {
    to: process.env.EMAIL_TO,
    from: email,
    subject: `Order contact - ${process.env.APP_NAME} website`,
    detail: detail,
    text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
            <h4>Information received from contact form:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender number: ${phone}</p>
            <p>Sender email: ${email}</p>
            <p>Product: ${detail}</p>
            <p>Sender message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>http://greensowing.com.vn</p>
        `
  };
  sgMail
    .send(emailData)
    .then(sent => {
      let form = new Form({
        email: emailData.from,
        subject: emailData.subject,
        content: emailData.html,
        detail: emailData.detail
      });

      form.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        }
        res.json({
          success: true,
          form
        });
      });
    })
    .catch(err => console.log(err));
};

exports.list = (req, res) => {
  Form.find({})
    .sort({ createdAt: -1 })
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json(data);
    });
};

exports.remove = (req, res) => {
  const id = req.params.id;
  Form.findOneAndRemove({ _id: id }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ message: "Contact deleted sucessfully" });
  });
};
