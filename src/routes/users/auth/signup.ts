import { Request,Response } from "express";
import { ValidationError } from 'joi';
import UserModel,{generateSalt,encryptPassword} from "../../../database/model/users";
import { signupSchema } from "../../../helpers/validation/user";
import AuditModel from "../../../database/model/audit";

export const signupHandler = async (req:Request,res:Response) => {
    try{
        await signupSchema.validateAsync(req.body)
        // password hashing.

        const newUser = new UserModel ({
            email:req.body.email,
            fname:req.body.fname,
            lname:req.body.lname,
        })
        newUser.salt = generateSalt();
        newUser.password = encryptPassword(req.body.password, newUser.salt)
        let userData = await newUser.save();


       let audit = new AuditModel({
        user: userData._id,
        details: `User register for ${userData.email}`,
       });
       await audit.save()
    
        res.json({
            message:"Register successfully.",
            status: true
        })
    }catch(error){
        if (error instanceof ValidationError) {
			return res.status(400).json({
				error: error.message,
			});
		}
        
        console.log(error.code);
        
        if( (error.name === 'MongoError' || error.name === 'MongoServerError') && error.code === 11000){
            return res.status(400).json({
				error: "Email id is already available in the system.",
			});
        }
	
		res.sendStatus(500);
    }
}