const Stats = require('./stats');
const Images = require('./images');
const Commnets = require('./comments');

module.exports = async viewModel => {
	
	const results = await Promise.all([
		Stats(),
		Images.popular(),
		Commnets.newest()
	]);

	viewModel.sidebar = {
		stats: results[0],
		popularImages: results[1],
		comments: results[2]
	};

	return viewModel;
	
};