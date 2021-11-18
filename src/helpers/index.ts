export * from './jwt.helper';

const dotenv = require('dotenv');
dotenv.config();
export const generateOTP = function (otpLength = 6) {
	let baseNumber = Math.pow(10, otpLength - 1);
	let number = Math.floor(Math.random() * baseNumber);
	if (number < baseNumber) {
		number += baseNumber;
	}
	return number;
};
export const otpAge = parseInt(process.env.OTP_AGE as any, 10) || 3;
export const maxOtp = parseInt(process.env.MAX_OTP as any, 10) || 10;
export const redisExpirationTime = parseInt(process.env.REDIS_EXP_TIME as any, 10) || 600;
