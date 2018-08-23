import SlackPost from './slackPost';
const GoogleImages = require('google-images');

class ImageHandler {
	constructor() {
		this.client = new GoogleImages(
			process.env.CSE_ID,
			process.env.CSE_API_KEY
		);
	}

	/**
	 * [fetchImage - Search Google imges]
	 * @param  {string} text - user text
	 * @return {bool}       success/failure
	 */
	async fetchImage(text) {
		try {
			const res = await this.client.search(text)
				.then(images => {
					return {
						success: true,
						payload: images[0].url
					}
				});
			return res;
		} catch (err) {
			return {
				success: false,
				payload: err.message
			}
		}
	}
}

export default ImageHandler;
