import request from 'request';

class SlackPost {
	static async postText(text) {
		try {
			let res = await SlackPost.sendMessage({
				text
			});
			return res;
		} catch (err) {
			return err;
		}
	}

	static async postImage(text, image_url) {
		try {
			let res = await SlackPost.sendMessage({
				attachments: [{
					text,
					image_url
				}]
			});
			return res;
		} catch (err) {
			return err;
		}
	}

	static async sendMessage(body) {
		const url = `https://hooks.slack.com/services/${process.env.SLACK_TOKEN}`;
		const headers = {
			'content-type': 'application/json'
		};

		return new Promise((resolve, reject) => {
			request.post({
				headers,
				url,
				body,
				json: true
			}, (err, res, body) => {
				if (!err && res.statusCode == 200) {
					resolve(body);
				} else {
					reject(err);
				}
			});		
		});
	}
}

export default SlackPost;