const { Websites } = require('./constants');
const { getResTimeFromWebsite } = require('./httpsRequests');

module.exports = async function cronJobGetData () {
	try {
		localResArr = [];
		for (website of Websites) {
			const { currentTime, responseTime } = await getResTimeFromWebsite(website.url);
			/* Javascript timestamp (milliseconds) to UNIX timestamp (seconds) */
			const time = Math.trunc(currentTime / 1000);
			const websiteResponse = {
				website: website.name,
				time,
				responseTime
			};
			localResArr.push(websiteResponse);
		}
		console.log('Websites responses: ', localResArr);
		return localResArr;
	} catch (error) {
		console.log(error);
	}
};

