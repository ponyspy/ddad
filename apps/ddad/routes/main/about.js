var fs = require('fs');
var async = require('async');

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
			res.render('main/about/bio.pug', { content: content || '' });
		});
	};


	module.contacts = function(req, res, next) {

		async.parallel({
			desc: function(callback) {
				fs.readFile(__app_root + '/static/desc_' + req.locale + '.html', function(err, content) {
					callback(null, content || '');
				});
			},
			adress: function(callback) {
				fs.readFile(__app_root + '/static/adress_' + req.locale + '.html', function(err, content) {
					callback(null, content || '');
				});
			}
		}, function(err, results) {
			if (err) return next(err);

			res.render('main/about/contacts.pug', {content: results});
		});
	};


	module.press = function(req, res, next) {

		Publication.find().sort('-date').exec(function(err, publications) {
			res.render('main/about/press.pug', { publications: publications });
		});
	};


	module.geo = function(req, res, next) {

		Work.find().sort('-date').exec(function(err, works) {
			res.render('main/about/geo.pug', { works: works });
		});
	};


	module.partners = function(req, res, next) {

		Partner.find().sort('-date').exec(function(err, partners) {
			res.render('main/about/partners.pug', { partners: partners });
		});
	};


	module.team = function(req, res, next) {

		People.find().sort('-date').exec(function(err, peoples) {
			res.render('main/about/team.pug', { peoples: peoples });
		});
	};


	return module;
};