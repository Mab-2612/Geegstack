const Admin = require("../../models/admin.model");
const bcrypt = require("bcryptjs");
const sendMail = require("../../config/mail.config");

const createAccount = (req, res) => {
  const {fname, lname, email, password} = req.body;
  if (!fname || !lname || !email || !password) {
    return res.status(400).json({type: "error", message: "All fields are required"});
  }

  Admin.findOne({email})
  .then(admin => {
    if (admin) {
      return res.status(400).json({type: "error", message: "Admin with this email already exists"});
    }

      const authCode = Math.floor((Math.random() * 899999) + 100000);
    const adminData = {
      fname,
      lname,
      email,
      password: bcrypt.hashSync(password, 10),
      authCode
    }

    Admin.create(adminData)
    .then((resp) => {
      sendMail(email, "Verify Your Email", "<h2>Complete account set up</h2><p>Use the code below to verify your account</p><h4>" + authCode + "</h4><p>Please disregard this mail if you didn't create an account with us.</p>");
      res.status(201).json({type: "success", message: "Admin account created successfully"});
    })
    .catch((err) => {
      res.status(500).json({type: "error", message: "Server error", errorMsg: err.message});
    });
  })
  .catch((err) => {
    res.status(500).json({type: "error", message: "Server error", errorMsg: err.message});
  });
}

module.exports = createAccount;