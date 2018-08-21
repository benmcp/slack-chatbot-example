import Catbot from './catBot';
const AWS = require('aws-sdk')

export const slackBot = (event, context, cb) => {
	if ('challenge' in event.body) {
		cb(null, {
			statusCode: 200,
			headers: {
				'Content-Type': 'text/html',
			},
			body: {
				challenge: event.body.challenge,
			}
		});
	} else {
		const params = {
	    Message: JSON.stringify(event),
    	TopicArn: process.env.snsEvent,
		};

		const sns = new AWS.SNS();
		sns.publish(params, (error) => {
			cb(null, {
				statusCode: 200,
				headers: {
					'Content-Type': 'text/html',
				}
			});
		});
	}
};

exports.catbot = async (event, context, cb) => {
	Catbot.handleQuery(JSON.parse(event.Records[0].Sns.Message), context, cb);
}

exports.header = async (event, context, cb) => {
	const html = `
		<html>
			<body>
				<h1>
					header
				</h1>
			</body>
		</html>
	`;

	const response = {
		statusCode: 200,
		headers: {
			'Content-Type': 'text/html',
		},
		body: html,
	};

	cb(null, response);
}

export const normal = (event, context, cb) => {
	cb(null, 'normal response');
}

export const promise = (event, context, cb) => {
	const p = new Promise((resolve, reject) => {
		resolve('promise success');
	})
		.then(r => cb(null, r))
		.catch(e => cb(e));		
}
