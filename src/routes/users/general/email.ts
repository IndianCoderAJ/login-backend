import { Request,Response } from "express"
import { ValidationError } from "joi";
import UserModel from "../../../database/model/users";
import { emailCheckSchema } from "../../../helpers/validation/user";


export const emailCheckHandler = async (req:Request,res:Response) => { 
    try{
         await emailCheckSchema.validateAsync(req.body)
         const { email } = req.body;
         let userData = await UserModel.findOne({email:email});
         if (!userData) {
            return res.status(200).json({
                emailTaken: false,
            });
         }

         return res.status(200).json({
            emailTaken: true,
        });

    }catch(error) {
        if (error instanceof ValidationError) {
			return res.status(400).json({
				error: error.message,
			});
		}
    }

}