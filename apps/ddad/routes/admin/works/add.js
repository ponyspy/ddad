var shortid = require('shortid');
var moment = require('moment');
var async = require('async');

module.exports = function(Model, Params) {
	var module = {};

	var Work = Model.Work;
	var People = Model.People;
	var Partner = Model.Partner;

	var uploadImages = Params.upload.images;
	var uploadImage = Params.upload.image;
	var filesUpload = Params.upload.files_upload;
	var filesDelete = Params.upload.files_delete;
	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		People.find().exec(function(err, peoples) {
			if (err) return next(err);

			Partner.find().exec(function(err, partners) {
				if (err) return next(err);

				res.render('admin/works/add.pug', { partners: partners, peoples: peoples });
			});
		});
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;

		var work = new Work();

		work._short_id = shortid.generate();
		work.status = post.status;
		work.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
		work.partners = post.partners.filter(function(partner) { return partner != 'none'; });
		work.peoples = post.peoples.filter(function(people) { return people != 'none'; });
		work.year = post.year;
		work.sym = post.sym ? post.sym : undefined;

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& work.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'program'])
				&& work.setPropertyLocalised('program', post[locale].program, locale);

			checkNested(post, [locale, 'area'])
				&& work.setPropertyLocalised('area', post[locale].area, locale);

			checkNested(post, [locale, 'client'])
				&& work.setPropertyLocalised('client', post[locale].client, locale);

			checkNested(post, [locale, 'description'])
				&& work.setPropertyLocalised('description', post[locale].description, locale);

		});

		async.series([
			async.apply(uploadImages, work, 'works', null, post.images),
			async.apply(uploadImage, work, 'works', 'poster', 1200, files.poster && files.poster[0], null),
		], function(err, results) {
			if (err) return next(err);

			work.save(function(err, work) {
				if (err) return next(err);

				res.redirect('/admin/works');
			});
		});
	};


	return module;
};