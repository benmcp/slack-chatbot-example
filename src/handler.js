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
