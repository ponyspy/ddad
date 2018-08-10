var express = require('express');

var Model = require(__glob_root + '/models/main.js');

var main = {
	index: require('./index.js')(Model),
	projects: require('./works.js')(Model, 'project'),
	researches: require('./works.js')(Model, 'research'),
	office: require('./office.js')(Model),
	cv: require('./cv.js')(Model),
	options: require('./options.js')(Model)
};

module.exports = (function() {
	var router = express.Router();

	router.route('/')
		.get(main.index.index);

	// router.route('/about')
	// 	.get(main.about.index);

	router.route('/lang/:locale').get(function(req, res) {
		res.cookie('locale', req.params.locale);
		res.redirect('back');
	});

	router.route('/sitemap.xml')
		.get(main.options.sitemap);

	return router;
})();