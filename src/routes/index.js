const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const image = require('../controllers/image');

module.exports = app => {

  // --- Get
  router.get('/', home.index);
  router.get('/images/:image_id', image.index);

  // --- Post
  router.post('/images', image.create);
  router.post('/images/:image_id/like', image.like);
  router.post('/images/:image_id/comment', image.comment);
	
	// --- Delete
	router.delete('/images/:image_id', image.remove);

	app.use(router);
	
};
