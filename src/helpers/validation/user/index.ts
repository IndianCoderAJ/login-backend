import Joi from 'joi';

export const userLoginSchema = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const userChangePasswordSchema = Joi.object().keys({
	currPassword: Joi.string().required(),
	newPassword: Joi.string().required(),
});

export const signupSchema = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	fname: Joi.string().required(),
	lname: Joi.string().required(),	
})

export const userForgotPasswordSchema = Joi.object().keys({
	email: Joi.string().email().required(),
});

export const userForgotVerifyOtpSchema = Joi.object().keys({
	email: Joi.string().email().required(),
	otp: Joi.number().required(),
});

export const userForgotResetOtpSchema = Joi.object().keys({
	token: Joi.string().required(),
	password: Joi.string().required(),
});

export const emailCheckSchema = Joi.object().keys({
	email: Joi.string().required()
});