const nodemailer = require("nodemailer");

const otpSender = async (email, otp, res) => {
  //    res.json(otpNumber);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "m.umar201031@gmail.com",
        pass: "bevr rtex fmym gcrw",
      },
    });

    const mailOptions = {
      from: "Gadget-Hub",
      to: email,
      subject: "Verify Email",
      html: `
         
    <main  style="width: 100%; height: 100vh; padding: 20px; display: flex; align-items: center;">
    <section class="row"
        style="width: 60%; margin: auto; padding-block: 20px; border-radius: 10px; background-color: rgb(76, 110, 226);">
        <div class="inner-sec" style="background-color: white; width: 80%; margin: auto; border-radius: 10px;">
           
            <div class="email-sec" style="  text-align: center; padding-bottom: 20px;">
                <h2>Verify your email address</h2>
                <p class="email-para" style="width: 80%; line-height: 25px; margin: auto; margin-block: 30px;">
                    You've entered ${email} as the mail address for your account. Please
                    verify this email address by clicking button bleow. </p>
                <button 
                    style="background-color: rgb(76, 110, 226); padding-inline: 30px; padding:5px 8px; color: white; border: none; border-radius: 0.3rem; font-size: 22px; margin-block: 15px;">${otp}</button>
           
            </div>
        </div>
    </section>
</main>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json({
          status: 200,
          message: "OTP send successfully to your email",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = otpSender;
