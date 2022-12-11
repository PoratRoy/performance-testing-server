const https = require('https');

const getResTimeFromWebsite = async (url) => {
	const currentTime = Date.now();

	return new Promise((resolve, rejects) => {
		https
			.get(url)
			.end(() => {
				const responseTime = Date.now() - currentTime;
				resolve({ currentTime, responseTime });
			})
			.on('error', rejects);
	});
};

module.exports.getResTimeFromWebsite = getResTimeFromWebsite;