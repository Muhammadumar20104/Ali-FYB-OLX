const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const { User } = require("../model/User");
const emailSender = async (email, res) => {
  try {
    const exist = await User.findOne({ email: email });
    const salt = await bcrypt.genSalt(10);
    const randomemail = await bcrypt.hash(email, salt);

    if (!email) {
      return res.json("Please write your email for verification");
    }
    //    res.json(otpNumber);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "m.umar201031@gmail.com",
        pass: "bevr rtex fmym gcrw",
      },
    });

    const mailOptions = {
      from: "",
      to: email,
      subject: "Verify Email",
      html: `



    <main class="container" style="width: 100%; height: 100vh; padding: 20px; display: flex; align-items: center;">
    <section class="row"
        style="width: 60%; margin: auto; padding-block: 20px; border-radius: 10px; background-color: rgb(76, 110, 226);">
        <div class="inner-sec" style="background-color: white; width: 80%; margin: auto; border-radius: 10px;">
           
            <div class="email-sec" style="  text-align: center; padding-bottom: 20px;">
                <h2>Verify your email address</h2>
                <p class="email-para" style="width: 80%; line-height: 25px; margin: auto; margin-block: 30px;">
                    You've entered ${email} as the mail address for your account. Please
                    verify this email address by clicking button bleow. </p>
                <a href=${`http://localhost:3000/auth/${exist._id}/verify?cd=${randomemail}`}
                    style="background-color: rgb(76, 110, 226); padding-inline: 30px; padding:5px 8px; color: white; border: none; border-radius: 0.3rem; font-size: 22px; margin-block: 15px;">Verify
                    Your Email</a>
                <p class="link-para" style=" margin-block: 10px;">or copy and paste this link into your browser</p>
                <a href=${`http://localhost:3000/auth/${exist._id}/verify?cd=${randomemail}`}>${`http://localhost:3000/auth/${exist._id}/verify?cd=${randomemail}`}</a>
                
            </div>
          
        </div>
    </section>
</main>

`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({
          status: 200,
          message: "Verfication sending please check your email!",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = emailSender;
