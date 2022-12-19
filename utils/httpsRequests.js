const axios = require('axios');

const getResTimeFromWebsite = async (website) => {
	try {
		const currentTime = Date.now();
		await axios.get(website.url, { headers: { "Accept-Encoding": "gzip,deflate,compress" } });
		const responseTime = Date.now() - currentTime;
		if (responseTime) {
			/* Javascript timestamp (milliseconds) to UNIX timestamp (seconds) */
			const time = Math.trunc(currentTime / 1000);
			const websiteResponse = {
				website: website.name,
				time,
				responseTime
			};
			return websiteResponse
		}
		return 0
	} catch (error) {
		console.error(error);
		return 0
	}
}

module.exports.getResTimeFromWebsite = getResTimeFromWebsite;