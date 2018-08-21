var fs = require('fs');

module.exports = function(Model) {
	var module = {};

	var Publication = Model.Publication;
	var People = Model.People;
	var Work = Model.Work;
	var Partner = Model.Partner;


	module.index = function(req, res, next) {
		res.redirect('/about/bio');
	};


	module.bio = function(req, res, next) {

		fs.readFile(__app_root + '/static/cv_' + req.locale + '.html', function(err, content) {
			if (err) return next(err);

			res.render('main/about/bio.pug', { content: content || '' });
		});
	};


	module.contacts = function(req, res, next) {

		fs.readFile(__app_root + '/static/desc_' + req.locale + '.html', function(err, content) {
			if (err) return next(err);

			res.render('main/about/contacts.pug', { content: content || '' });
		});
	};


	module.press = function(req, res, next) {

		Publication.find().sort('-date').exec(function(err, publications) {
			if (err) return next(err);

			res.render('main/about/press.pug', { publications: publications });
		});
	};


	module.geo = function(req, res, next) {

		Work.find().sort('-date').exec(function(err, works) {
			var locations = works.reduce(function(prev, cur) {
				var loc = cur.geo.filter(function(item) {
					return item.lat !== '' && item.long !== '';
				});

				loc.length && loc.map(function(item) {
					item.work = cur.i18n.title.get(req.locale);
					item.num = cur.num;
				});

				return prev.concat(loc);
			}, []);

			res.render('main/about/geo.pug', { locations: locations });
		});
	};


	module.partners = function(req, res, next) {

		Partner.find().sort('-date').exec(function(err, partners) {
			if (err) return next(err);

			res.render('main/about/partners.pug', { partners: partners });
		});
	};


	module.team = function(req, res, next) {

		People.find().sort('-date').exec(function(err, peoples) {
			if (err) return next(err);

			res.render('main/about/team.pug', { peoples: peoples });
		});
	};


	return module;
};