const homeController = {};

homeController.index = (request, response) => {
	
	response.render('index');

};

module.exports = homeController;
