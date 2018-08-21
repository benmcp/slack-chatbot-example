import request from 'request';

class SlackPost {
	static postText(text) {
		return SlackPost.sendMessage({
			text
		});
	}

	static postImage(text, image_url) {
		return SlackPost.sendMessage({
			attachments: [{
				text,
				image_url
			}]
		});
	}
	static sendMessage(body) {
		const url = `https://hooks.slack.com/services/${process.env.SLACK_TOKEN}`;
		const headers = {
			'content-type': 'application/json'
		};

		return request.post({
			headers,
			url,
			body,
			json: true
		}, (err, res, body) => {
			console.log('Slack post response');
			console.log(err);
		});		
	}
}

export default SlackPost;