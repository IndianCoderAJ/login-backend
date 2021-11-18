
import { ValidationError } from 'joi';
import { Request, Response } from 'express';
import { userLoginSchema } from '../../../helpers/validation/user';
import UserModel, {verifyPassword} from '../../../database/model/users';
import AuditModel from '../../../database/model/audit';
import logger from '../../../logger';

import { getJwt } from '../../../helpers';

export const loginHandler = async (req:Request,res:Response) => {
    try{
        console.log("Asfsafsafasfs---------------");
        
       await userLoginSchema.validateAsync(req.body);
       const { email, password } = req.body;
       const userData = await UserModel.findOne({email:email});
      
       if(!userData){
            return res.status(400).json({
                error: 'The given email-id is not associated with any account.',
            });
       }
      
       logger.debug(`user Found for: ${email}`);
       const passwordMatched = verifyPassword(password, userData.salt, userData.password);
      
       if (!passwordMatched) {
         let audit = new AuditModel({
                user: userData._id,
                details: 'Password was not correct',
            });
        await audit.save()

        return res.status(400).json({
            error: 'Password is not valid.',
        });
       }

       let audit = new AuditModel({
        user: userData._id,
        details: 'Password was not correct',
       });
       await audit.save()

       logger.debug(`creating jwt....`);
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