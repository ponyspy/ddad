var express = require('express');

var Model = require(__glob_root + '/models/main.js');

var main = {
	index: require('./index.js')(Model),
	works: require('./works.js')(Model),
	about: require('./about.js')(Model),
	options: require('./options.js')(Model)
};

module.exports = (function() {
	var router = express.Router();

	router.route('/')
		.get(main.index.index);

	router.route('/works')
		.get(main.works.index);

	router.route('/works/:short_id')
		.get(main.works.work);

	router.route('/about')
		.get(main.about.index);

	router.route('/about/bio')
		.get(main.about.bio);

	router.route('/about/contacts')
		.get(main.about.contacts);

	router.route('/about/press')
		.get(main.about.press);

	router.route('/about/geo')
		.get(main.about.geo);

	router.route('/about/partners')
		.get(main.about.partners);

	router.route('/about/team')
		.get(main.about.team);

	router.route('/lang/:locale').get(function(req, res) {
		res.cookie('locale', req.params.locale);
		res.redirect('back');
	});

	router.route('/sitemap.xml')
		.get(main.options.sitemap);

	return router;
})();