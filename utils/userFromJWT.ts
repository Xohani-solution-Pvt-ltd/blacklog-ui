import UserModel from '../models/user.model';
import jwt from "jsonwebtoken";
import { env } from "../environments/index";

const { JWT_KEY } = env;
const verifyJWTandCheckUser = async (token) => {
  let error = null,
    user = null;
  try {
    const data = jwt.verify(token, JWT_KEY);
    if (!data || !data.id) throw new Error("Invalid JWT token");
    user = await UserModel.findOne({_id: data.id}).exec();
    return [null, user];
  } catch (err) {
    return [err.message, null];
  }
};

export { verifyJWTandCheckUser };
