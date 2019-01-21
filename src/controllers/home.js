const homeController = {};
const { Image } = require('../models/index');
const sidebar = require('../helpers/sidebar');

homeController.index = async (request, response) => {
	
	const images = await Image.find().sort({ timestamp: -1 });
	
	let viewModel = { images: [] }
	
	viewModel.images = images;
	viewModel = await sidebar(viewModel);
	//console.log(viewModel.comments[0]);
	response.render('index', viewModel);

};

module.exports = homeController;
