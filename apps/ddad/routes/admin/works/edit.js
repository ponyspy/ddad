var moment = require('moment');
var async = require('async');

module.exports = function(Model, Params) {
	var module = {};

	var Work = Model.Work;
	var People = Model.People;
	var Partner = Model.Partner;

	var previewImages = Params.upload.preview;
	var uploadImages = Params.upload.images;
	var uploadImage = Params.upload.image;
	var checkNested = Params.locale.checkNested;
	var youtubeId = Params.helpers.youtubeId;
	var vimeoId = Params.helpers.vimeoId;


	module.index = function(req, res, next) {
		var id = req.params.work_id;

		Work.findById(id).exec(function(err, work) {
			if (err) return next(err);

			People.find().exec(function(err, peoples) {
				if (err) return next(err);

				Partner.find().exec(function(err, partners) {
					if (err) return next(err);

					previewImages(work.images, function(err, images_preview) {
						if (err) return next(err);

						res.render('admin/works/edit.pug', { work: work, peoples: peoples, partners: partners, images_preview: images_preview });
					});
				});
			});
		});

	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;
		var id = req.params.work_id;

		Work.findById(id).exec(function(err, work) {
			if (err) return next(err);

			work.status = post.status;
			work.num = post.num;
			work.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
			work.partners = post.partners.filter(function(partner) { return partner != 'none'; });
			work.peoples = post.peoples.filter(function(people) { return people != 'none'; });
			work.year = post.year;
			work.sym = post.sym ? post.sym : undefined;
			work.case = post.case ? post.case : undefined;

			work.geo = post.geo.lat && post.geo.lat.length > 0 && post.geo.lat.map(function(item, i) {
				return {
					'lat': item,
					'long': post.geo.long[i]
				}
			}) || [];

			if (youtubeId(post.video)) {
				work.video = {
					provider: 'youtube',
					id: youtubeId(post.video)
				}
			} else if (vimeoId(post.video)) {
				work.video = {
					provider: 'vimeo',
					id: vimeoId(post.video)
				}
			} else {
				work.video = undefined;
			}

			var locales = post.en ? ['ru', 'en'] : ['ru'];

			locales.forEach(function(locale) {
				checkNested(post, [locale, 'title'])
					&& work.setPropertyLocalised('title', post[locale].title, locale);

				checkNested(post, [locale, 'program'])
					&& work.setPropertyLocalised('program', post[locale].program, locale);

				checkNested(post, [locale, 'build_status'])
					&& work.setPropertyLocalised('build_status', post[locale].build_status, locale);

				checkNested(post, [locale, 'area'])
					&& work.setPropertyLocalised('area', post[locale].area, locale);

				checkNested(post, [locale, 'client'])
					&& work.setPropertyLocalised('client', post[locale].client, locale);

				checkNested(post, [locale, 'description'])
					&& work.setPropertyLocalised('description', post[locale].description, locale);

			});

			async.series([
				async.apply(uploadImages, work, 'works', post.hold, post.images),
				async.apply(uploadImage, work, 'works', 'poster', 1200, files.poster && files.poster[0], post.poster_del),
			], function(err, results) {
				if (err) return next(err);

				work.save(function(err, work) {
					if (err) return next(err);

					res.redirect('back');
				});
			});
		});
	};


	return module;
};