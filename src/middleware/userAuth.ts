import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../helpers';
import logger from '../logger';



export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			return res.status(401).json({
				message: 'Unauthorized access. Please provide valid token.',
			});
		}
		const tokenData = await verifyJwt(authorization);
		console.log(tokenData);
		
		req.headers.tokenData = tokenData as any;
		next();
	} catch (error) {
		logger.error('error while authenticateUser so sending 401');
		console.log(error);
		return res.status(401).json({
			message: 'Unauthorized access. token expired.',
		});
	}
};
