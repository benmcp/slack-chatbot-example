import request from 'request';
import { returnSuccess } from './utils';
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
	 * @param	{Function} cb
	 */
	static handleQuery(event, context, cb) {

		// Get important data
		let query;
		const body = event.body;
		const bot = body.authed_users[0];
		const text = body.event.text.replace(`<@${bot}>`, '').trim();

		// Question time!!!
		query = 'hey'; 
		if (text.indexOf(query) > -1) {
			SlackPost.postText('yo!');
			returnSuccess(cb);
			return;
		}

		query = 'how are you?';
		if (text.indexOf(query) > -1) {
			SlackPost.postText("oh you know, so so. I mean I am a cat...");
			returnSuccess(cb);
			return;
		}

		query = 'am i cool?';
		if (text.indexOf(query) > -1) {
			SlackPost.postText('you are reallly cool Ben');
			returnSuccess(cb);
			return;
		}

		query = 'thanks';
		if (text.indexOf(query) > -1) {
			SlackPost.postText('no probs');
			returnSuccess(cb);
			return;
		}

		query = 'is DDDSydney awesome?';
		if (text.indexOf(query) > -1) {
			SlackPost.postText('it sure is!!!!');
			returnSuccess(cb);
			return;
		}

		query = 'show me a picture of';
		if (text.indexOf(query) > -1) {
			const searchTerm = text.replace(query, '');
			const imageHandler = new ImageHandler();
			const res = imageHandler.fetchImage(searchTerm);
			returnSuccess(cb);
			return;
		}

		query = 'pic';
		if (text.indexOf(query) > -1) {
			const searchTerm = text.replace(query, '');
			const imageHandler = new ImageHandler();
			const res = imageHandler.fetchImage(searchTerm);
			returnSuccess(cb);
			return;
		}

		// if all else fails
		SlackPost.postText('wut?');
		returnSuccess(cb);
	}
}

export default Catbot;
