import { Request,Response } from "express";
import { ValidationError } from "joi";
import AuditModel from "../../../database/model/audit";
import UserModel from "../../../database/model/users";
import { generateOTP } from "../../../helpers";
import { userForgotPasswordSchema } from "../../../helpers/validation/user";
import logger from "../../../logger";




export const forgotPasswordHandler = async (req:Request,res:Response) => {
    try{
      await userForgotPasswordSchema.validateAsync(req.body);
      const { email } = req.body;
      let userData = await UserModel.findOne({email:email});
      
      if (!userData) {
        return res.status(400).json({
          error: 'Provided email is not registerd with any of the user.',
        });
     }

     let otp = undefined;
     otp = generateOTP();
     logger.info(`new otp created${otp.toString()}`);
     let audit = new AuditModel({
        user: userData._id,
        details: `OTP  is generated for ${userData.email}`,
       });

     await audit.save()
     userData.otp = otp.toString()
     await userData.save();
     res.json({
        message: 'Email sent to registerd email, otp should be used within 5 minutes.',
        OTP:otp.toString()
    });

    }catch(error){
        if (error instanceof ValidationError) {
			return res.status(400).json({
				error: error.message,
			});
		}
		res.sendStatus(500);
    }
}