import { Schema, model} from 'mongoose';
import logger from '../../logger/index';
import crypto from 'crypto';

interface User {
    email: string;
    fname:string;
    lname:string;
    password:string;
    salt:string;
    token:string;
    otp:string;
    forgot_pass_token:string;
  }

  const schema = new Schema<User>({
    email: { type: String, required: true ,unique: true},
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    password:{type:String,required:true},
    salt:{type:String},
    token:{type:String},
    otp:{type:String},
    forgot_pass_token:{type:String}
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const  UserModel = model<User>('User', schema);

export const generateSalt = () => {
  return crypto.randomBytes(16).toString('base64');
};

export const encryptPassword = (plainText: string, salt: string): string => {
  return crypto
      .createHash('RSA-SHA256')
      .update(plainText as any)
      .update(salt)
      .digest('hex');
};

export const verifyPassword = (
  enteredPassword: string,
  salt: string,
  exsitingPassword: string,
): Boolean => {
  logger.info('encrypted pwd');
  logger.info(encryptPassword(enteredPassword, salt));
  return encryptPassword(enteredPassword, salt) === exsitingPassword;
};

export default UserModel

// export const setSaltAndPassword = async (superAdmin: SuperAdmin) => {
//   if (superAdmin.changed('password')) {
//       superAdmin.salt = generateSalt();
//       superAdmin.password = encryptPassword(superAdmin.password, superAdmin.salt);
//   }
// };

  