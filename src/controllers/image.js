const imageController = {};
const path = require('path');
const { randomName } = require('../helpers/libs');
const fs = require('fs-extra');
const { Image, Comment } = require('../models/index');
const md5 = require('md5');

imageController.index = async (request, response) => {
	
	const viewModel = {
		image: {},
		comments: {}
	};

	const image = await Image.findOne({ filename: { $regex: request.params.image_id }});

	if (image) {

		image.views = image.views + 1;
		viewModel.image = image;
		await image.save();
		
		const comments = await Comment.find({ image_id: image._id });
		viewModel.comments = comments;

		response.render('image', viewModel);

	} else {
		response.redirect('/');
	}

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

imageController.like = async (request, response) => {

	const image = await Image.findOne({ filename: {$regex: request.params.image_id }});

	if (image) {
		image.likes = image.likes + 1;
		await image.save();
		response.json({ likes: image.likes})
	} else {
		response.status(500).json({ error: 'Internal Error' });
	}

};

imageController.comment = async (request, response) => {

	const image = await Image.findOne({ filename: {$regex: request.params.image_id }});

	if (image) {
		
		const newComment = new Comment(request.body);
		newComment.gravatar = md5(newComment.email);
		newComment.image_id = image._id;
		await newComment.save();
		response.redirect('/images/' + image.uniqueId);

	} else {
		response.redirect('/');
	}

};

imageController.remove = (request, response) => {

};

module.exports = imageController;
