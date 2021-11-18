import { Response,Request } from "express"
import { ValidationError } from 'joi'
import { userChangePasswordSchema } from "../../../helpers/validation/user";
import UserModel, { encryptPassword } from "../../../database/model/users";
import logger from "../../../logger";
import { verifyPassword } from "../../../database/model/users";
import { ITokenData } from "../../../types";
import AuditModel from "../../../database/model/audit";


export  const changePasswordHandler = async(req:Request,res:Response) => {
    try{
         await userChangePasswordSchema.validateAsync(req.body);
         const { email } = (req.headers as any).tokenData as ITokenData;
         const { currPassword, newPassword } = req.body;
         if(currPassword == newPassword){
            return res.status(400).json({
				error: 'Current password and new password are same.',
			});
         }
         let userData = await UserModel.findOne({
            email:email as string
         })

         const passwordMatched = verifyPassword(currPassword, userData.salt, userData.password);
         if (!passwordMatched) {
			logger.debug(`current password not matched.`);
			return res.status(400).json({
				error: 'Current password is not valid.',
			});
		}
        logger.debug(`current password matched, upadating new password.....`);
        userData.password = encryptPassword(newPassword,  userData.salt)
        userData.save();
        // await UserModel.findOneAndUpdate({ email:email as string},{ password:newPassword});
        let audit = new AuditModel({
            user: userData._id,
            details: `Password is updated for ${userData.email}`,
           });
        await audit.save()   
        res.json({
            message: 'Password changed successfully.',
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