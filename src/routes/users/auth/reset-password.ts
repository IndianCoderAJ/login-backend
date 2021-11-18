import { Request,Response } from "express";
import { ValidationError } from "joi";
import UserModel, { encryptPassword } from "../../../database/model/users";
import { getJwt, verifyJwt } from "../../../helpers";
import { userForgotResetOtpSchema } from "../../../helpers/validation/user";
import logger from "../../../logger";

export const resetPasswordHandler = async (req:Request,res:Response) => {
    try{
        await userForgotResetOtpSchema.validateAsync(req.body);
        const { token, password } = req.body;
        const decryptJwt = await verifyJwt(token);
        const email = decryptJwt.email as string;
        let userData = await UserModel.findOne({
            email:email,
            forgot_pass_token:token
        })
        if (!userData) {
			logger.debug(`user is not valid.`);
			return res.status(400).json({
				message: 'Token is not valid.',
			});
		}

        userData.forgot_pass_token = undefined;
        userData.otp = undefined;
        userData.password = encryptPassword(password,  userData.salt)
        await userData.save();

        const jwt = getJwt({
            email: userData.email,
            fname: userData.fname,
            lname: userData.lname,
            _id: userData._id,
            });
            
        logger.debug(`responding to request....`);
        res.json({
            accessToken: jwt,
            data: {
                email: userData.email,
                fname: userData.fname,
                lname: userData.lname,
                _id: userData._id,
            }
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