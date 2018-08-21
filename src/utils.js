export const returnSuccess = (cb) => {
	cb(null, {
		statusCode: 200,
		headers: {
			'Content-Type': 'text/html',
		}
	});
}