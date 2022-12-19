const { default: axios } = require('axios');
const { Websites, Delay } = require('./constants');
const { timeout } = require('./timeout');
const { getResTimeFromWebsite } = require('./httpsRequests');

module.exports = async function intervalActionGetData() {
	while (true) {
		try {
			for (website of Websites) {
				getResTimeFromWebsite(website).then((response) => {
					memoryStorageData[response.website] = response
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			console.log('Memory storage data: ', memoryStorageData)
			await timeout(Delay);
		}
	}
};
