require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cronJobGetData = require('./utils/cronJob');
var cron = require('node-cron');

const PORT = process.env.PORT || 4000;

let memoryStorageData = [];

app.use(cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(express.json());

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}....`);
});

/* Running a task every 2 secondes */
cron.schedule('*/2 * * * * *', async () => {
	memoryStorageData = await cronJobGetData();
});

app.get('/', async (req, res) => {
	console.log('Response to the front-end: ', memoryStorageData);
	res.status(200).json(memoryStorageData);
});
