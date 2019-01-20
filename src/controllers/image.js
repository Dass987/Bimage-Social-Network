const imageController = {};
const path = require('path');
const { randomName } = require('../helpers/libs');
const fs = require('fs-extra');
const { Image } = require('../models/index');

imageController.index = async (request, response) => {
	const image = await Image.findOne({ filename: { $regex: request.params.image_id }});
	response.render('image', {image});
};

imageController.create = (request, response) => {
	
	const saveImage = async () => {
		
		const imgUrl = randomName();
		const images = await Image.find({ filename: imgUrl });

		if (images.length > 0) {

			saveImage();

		}else {

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
				
				const imageSaved = await newImg.save();

				response.redirect('/images/' + imgUrl);

			} else {
				await fs.unlink(imgTempPath);
				response.status(500).json({ error: 'Only Images are allowed' });
			}

		}

	}

	saveImage();

};

imageController.like = (request, response) => {

};

imageController.comment = (request, response) => {

};

imageController.remove = (request, response) => {

};

module.exports = imageController;
