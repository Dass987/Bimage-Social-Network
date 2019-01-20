const imageController = {};
const path = require('path');
const { randomName } = require('../helpers/libs');
const fs = require('fs-extra');
const { Image } = require('../models/index');

imageController.index = (request, response) => {

};

imageController.create = async (request, response) => {
	
	const imgUrl = randomName();
	const imgTempPath = request.file.path;
	const ext = path.extname(request.file.originalname).toLowerCase();
	const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
	
	if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
		
		await fs.rename(imgTempPath, targetPath);
		
		const newImg = new Image({
			filename: imgUrl + ext,
			title: request.body.title,
			description: request.body.description
		});

		console.log(newImg);

	}

	response.send('works');

};

imageController.like = (request, response) => {

};

imageController.comment = (request, response) => {

};

imageController.remove = (request, response) => {

};

module.exports = imageController;
