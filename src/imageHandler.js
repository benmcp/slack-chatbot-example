import SlackPost from './slackPost';
const GoogleImages = require('google-images');

class ImageHandler {
	constructor() {
		this.client = new GoogleImages(
			process.env.CSE_ID,
			process.env.CSE_API_KEY
		);
	}

	fetchImage(text) {
		this.client.search(text)
			.then(images => {
				SlackPost.postImage(
					'sure, here you go!',
					images[0].url
				);
			})
			.catch(error => { console.log('caught', error.message); });
	}
}

export default ImageHandler;
