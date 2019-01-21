const { Image } = require('../models');

module.exports = {

	async popular() {
		return await Image.find()
			.limit(5)
			.sort({ likes: -1 });
	}

};