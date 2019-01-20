const homeController = {};
const { Image } =  require('../models/index');

homeController.index = async (request, response) => {
	
	const images = await Image.find().sort({ timestamp: -1 });
	response.render('index', {
		images
	});

};

module.exports = homeController;
