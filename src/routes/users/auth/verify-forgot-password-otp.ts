import { Request,Response } from "express";
import { ValidationError } from "joi";
import UserModel from "../../../database/model/users";
import { getJwt } from "../../../helpers";
import { userForgotVerifyOtpSchema } from "../../../helpers/validation/user";
import logger from "../../../logger";


export const verifyForgotOtpHandler = async (req:Request,res:Response) => {
    try{
         await userForgotVerifyOtpSchema.validateAsync(req.body)
         const { email, otp } = req.body;
         let userData = await UserModel.findOne({
             email:email
         });

         if (!userData) {
			logger.debug(`superAdmin is not valid.`);
			return res.status(400).json({
				error: 'User not found with given email.',
			});
		}
        if(otp != userData.otp){
            logger.debug(`OTP is not valid.`);
			return res.status(400).json({
				error: 'Otp is not valid.',
			});
        }

        const jwt = getJwt({
			email: userData.email,
			fname: userData.fname,
            lname:userData.lname,
			_id: userData._id,
		});
       
        userData.forgot_pass_token = jwt;
        await userData.save();
        res.json({
			token: jwt,
            message:"Token send."
		});
    
    }catch(error){
        if (error instanceof ValidationError) {
			return res.status(400).json({
				error: error.message,
			});
		}
		console.log(error);
		res.sendStatus(500);
    }
}