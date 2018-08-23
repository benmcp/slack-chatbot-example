import request from 'request';
import SlackPost from './slackPost';
import ImageHandler from './ImageHandler';

/**
 * [Catbot This manages the basic conversation flow logic]
 */
class Catbot {
	/**
	 * [handleQuery Text query handler]
	 * @param	{obj}	 event
	 * @param	{obj}	 context
	 * @param	{bool} Success/Failure
	 */
	static async handleQuery(event, context) {

		// Get important data
		let res;
		let query;
		const body = event.body;
		const bot = body.authed_users[0];
		const text = body.event.text.replace(`<@${bot}>`, '').trim();

		// Question time!!!
		query = 'hey'; 
		if (text.indexOf(query) > -1) {
			res = await SlackPost.postText('yo!');
			return res;
		}

		query = 'how are you?';
		if (text.indexOf(query) > -1) {
			res = await SlackPost.postText("oh you know, so so. I mean I am a cat...");
			return res;
		}

		query = 'am i cool?';
		if (text.indexOf(query) > -1) {
			res = await SlackPost.postText('you are really cool Ben');
			return res;
		}

		query = 'thanks';
		if (text.indexOf(query) > -1) {
			res = await SlackPost.postText('no probs');
			return res;
		}

		query = 'is DDDSydney awesome?';
		if (text.indexOf(query) > -1) {
			res = await SlackPost.postText('it sure is!!!!');
			return res;
		}

		query = 'show me a picture of';
		if (text.indexOf(query) > -1) {
			res = await Catbot.handleImage(text, query);
			return res;
		}

		query = 'pic';
		if (text.indexOf(query) > -1) {
			res = await Catbot.handleImage(text, query);
			return res;
		}

		// if all else fails
		res = await SlackPost.postText('wut?');
		return res;
	}

	/**
	 * [handleImage - handle async image retrieval]
	 * @param  {string} text - user text
	 * @param  {string} query [filter]
	 * @return {bool}       success/failure
	 */
	static async handleImage(text, query) {
		let res;
		const searchTerm = text.replace(query, '');
		const imageHandler = new ImageHandler();
		const resObj = await imageHandler.fetchImage(searchTerm);

		if (resObj.success) {
			res = await SlackPost.postImage(
				'sure, here you go!',
				resObj.payload
			);
		} else {
			res = await SlackPost.postText('soz, got an error :(');
		}
		return res;
	}
}

export default Catbot;
