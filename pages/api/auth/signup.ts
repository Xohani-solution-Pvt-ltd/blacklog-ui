import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../utils/mongodb";
import UserModel from "../../../models/user.model";
import bcrypt from "bcryptjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    
    try {
      const users = await UserModel.findById(req.query.id);

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  } else if (req.method === "POST") {
    connectMongo();

    const { fullName, email, password, mobile} = req.body;
    try {
      const HashPassword = await bcrypt.hash(password, 5);
      const user = await UserModel.create({
        fullName,email,mobile,
        password: HashPassword
      });

      res.status(201).json({
        success: true,
        message: "User is Created",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Invalid Method",
    });
  }
};

export default handler;





// import { NextApiRequest, NextApiResponse } from "next";
// import { connectMongo } from "../../../utils/mongodb";
// import UserModel from "../../../models/user.model";
// import bcrypt from "bcryptjs";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "GET") {
    
//     try {
//       const users = await UserModel.findById(req.query.id);

//       res.status(200).json({
//         success: true,
//         data: users,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//       });
//     }
//   } else if (req.method === "POST") {
//     connectMongo();

//     const { fullName, email, password, mobile,age,gender,address,height,weight,alcoholConsumption,smokingStatus,physicalActivity} = req.body;
//     try {
//       const HashPassword = await bcrypt.hash(password, 5);
//       const user = await UserModel.create({
//         fullName,email,mobile,age,gender,address,height,weight,alcoholConsumption,smokingStatus,physicalActivity,
//         password: HashPassword
//       });

//       res.status(201).json({
//         success: true,
//         message: "User is Created",
//         data: user,
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   } else {
//     res.status(405).json({
//       success: false,
//       message: "Invalid Method",
//     });
//   }
// };

// export default handler;

