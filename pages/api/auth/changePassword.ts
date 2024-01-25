import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { connectMongo } from '../../../utils/mongodb';
import UserModel from '../../../models/user.model';
import { env } from "../../../environments/index";


const changePasswordHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      res.status(405).json({
        success: false,
        message: 'Invalid Method',
      });
      return;
    }
  
    connectMongo(); // Connect to your MongoDB
  
    try {
      const { email, password, newPassword } = req.body;
  
      if (!(email && password && newPassword)) {
        res.status(400).json({
          success: false,
          message: 'Compulsory fields are not filled!',
        });
        return;
      }
  
      const user = await UserModel.findOne({ email }).exec();
  
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not available',
        });
        return;
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
      if (!isPasswordCorrect) {
        res.status(401).json({
          success: false,
          message: 'Current password is incorrect',
        });
        return;
      }
  
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();
  
      const token = jwt.sign(
        {
          id: user._id,
          name: user.fullName,
        },
        env.JWT_KEY,
        {
          expiresIn: '24h',
        }
      );
  
      res.setHeader(
        'Set-Cookie',
        `token=${token}; path=/; expires=${new Date(
          Date.now() + env.ACCESS_COOKIE_EXPIRY
        ).toUTCString()}`
      );
  
      res.status(200).json({
        success: true,
        message: 'Password changed successfully',
        token: token,
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export default changePasswordHandler;
  