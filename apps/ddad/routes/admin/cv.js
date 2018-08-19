var fs = require('fs');
var async = require('async');

exports.edit = function(req, res) {
	async.series({
		cv_ru: function(callback) {
			fs.readFile(__app_root + '/static/cv_ru.html', 'utf8', callback);
		},
		cv_en: function(callback) {
			fs.readFile(__app_root + '/static/cv_en.html', 'utf8', callback);
		},
		desc_ru: function(callback) {
			fs.readFile(__app_root + '/static/desc_ru.html', 'utf8', callback);
		},
		desc_en: function(callback) {
			fs.readFile(__app_root + '/static/desc_en.html', 'utf8', callback);
		}
	}, function(err, results) {
		res.render('admin/cv.pug', { content: results });
	});
};

exports.edit_form = function(req, res) {
	var post = req.body;

	async.series({
		cv_ru: function(callback) {
			if (!post.cv.ru) return callback(null);

			fs.writeFile(__app_root + '/static/cv_ru.html', post.cv.ru, callback);
		},
		cv_en: function(callback) {
			if (!post.cv.en) return callback(null);

			fs.writeFile(__app_root + '/static/cv_en.html', post.cv.en, callback);
		},
		desc_ru: function(callback) {
			if (!post.desc.ru) return callback(null);

			fs.writeFile(__app_root + '/static/desc_ru.html', post.desc.ru, callback);
		},
		desc_en: function(callback) {
			if (!post.desc.en) return callback(null);

			fs.writeFile(__app_root + '/static/desc_en.html', post.desc.en, callback);
		}
	}, function(err, results) {
		res.redirect('back');
	});
};