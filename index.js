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


cron.schedule('*/5 * * * * *', async () => {
	console.log('Running a task every 10 secondes...');
	memoryStorageData = await cronJobGetData();
});

app.get('/', async (req, res) => {
	console.log('Response: ', memoryStorageData);
	res.status(200).json(memoryStorageData);
});
