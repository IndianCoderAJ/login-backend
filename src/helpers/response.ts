interface IResponse {
	success: boolean;
	data: object;
	message: string;
}
interface IErrorResponse {
	message: string;
}

export const responseJson = (responseObject: IResponse): IResponse => {
	return responseObject;
};
export const internalServerError = (errorObject: IErrorResponse): IResponse => {
	const response = {
		success: false,
		message: errorObject.message,
		data: {},
	};
	return response;
};
