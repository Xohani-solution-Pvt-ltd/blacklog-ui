import bcrypt from "bcryptjs";
import UserModel from "../../../models/user.model";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
import { env } from "../../../environments/index";
import { config } from "../../../config/config";
const nodemailer = require("nodemailer");

 const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    res.status(405).json({
      success: false,
      message: "Invalid Method",
    });
    return;
  }

  connectMongo();

  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Generate a password reset token
    const resetToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    const transporter = nodemailer.createTransport({
      port: 587,
      secure: false,
      requireTLS: true,
      host: 'smtp.ethereal.email',
    auth: {
        user: 'olaf10@ethereal.email',
        pass: 'BEXjpgzuKxPn1eA32G'
      },
    });
    
    const resetLink = `http://localhost:3000/api/auth/forgotPassword?token=${resetToken}`;
    
    const mailOptions = {
      from:'"pavan" <rajat@gmail.com>',
      to: "pavandhangar152@gmail.com",
      subject: "Password Reset",
      html: `<p>Please click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending forgot password email:", error);
        res.status(500).json({
          success: false,
          message: "Failed to send password reset email",
        });
      } else {
        console.log("Forgot password email sent:", info.messageId);
        res.status(200).json({
          success: true,
          message: "Password reset token has been sent to your email",
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default handler;
