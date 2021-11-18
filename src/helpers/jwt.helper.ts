// import { get } from 'config';
import { sign, verify } from 'jsonwebtoken';
import { ITokenData } from '../types';

let jwtConfig = {secret:'gvoodevmxzxyulp'}
console.log(jwtConfig);
const jwtOption = {
	// expiresIn: jwtConfig.expiresIn || '1m',
	expiresIn: '1y',
};
const refreshJwtOption = {
	// expiresIn: jwtConfig.refreshExpiresIn || '1y',
	expiresIn: '1y',
};

export function getJwt(data: ITokenData) {
	return sign(data, jwtConfig.secret, jwtOption);
}
export function getRefreshJwt(data: ITokenData) {
	return sign(data, jwtConfig.secret, refreshJwtOption);
}
export function getOTPJwt(data: ITokenData) {
	return sign(data, jwtConfig.secret, jwtOption);
}

export async function verifyJwt(authorization: string): Promise<ITokenData> {
	const token = await verify(authorization, jwtConfig.secret);
	return token as ITokenData;
}
