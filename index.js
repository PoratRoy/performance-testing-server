require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const intervalActionGetData = require('./utils/intervalAction');

const PORT = process.env.PORT || 4000;

global.memoryStorageData = {
	google: {},
	facebook: {},
	twitter: {},
	cnet: {},
	amazon: {},
};

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

intervalActionGetData()

app.get('/', async (req, res) => {
	console.log('Response to the client: ', memoryStorageData);
	res.status(200).json(memoryStorageData);
});
