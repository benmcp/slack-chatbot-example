import Catbot from './catBot';
const AWS = require('aws-sdk')

/**
 * [slackBot - handle slackbot request]
 * @param  {obj}   event
 * @param  {obj}   context
 * @param  {Function} cb
 * @return {Function}
 */
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

/**
 * [dispatch - SNS invoked function]
 * @param  {obj}   event
 * @param  {obj}   context
 * @param  {Function} cb
 * @return {Function}
 */
export const dispatch = async (event, context, cb) => {
	let res;

	try {
		let res = await Catbot.handleQuery(
			JSON.parse(event.Records[0].Sns.Message),
			context
		);
	} catch (err) {
		cb(err);
	}

	cb(null, res);
}
