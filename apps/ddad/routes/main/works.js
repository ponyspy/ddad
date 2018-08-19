module.exports = function(Model) {
	var module = {};

	var Work = Model.Work;

	module.index = function(req, res) {
		res.redirect('/');
	};

	module.work = function(req, res, next) {
		var id = req.params.short_id;

		Work.findOne({ $or: [ { '_short_id': id }, { 'sym': id } ] }).where('status').ne('hidden').populate('peoples partners').exec(function(err, work) {
			if (err || !work) return next(err);

			var images = work.images.reduce(function(prev, curr) {
				if (prev.length && curr.gallery == prev[prev.length - 1][0].gallery) {
					prev[prev.length - 1].push(curr);
				} else {
					prev.push([curr]);
				}

				return prev;
			}, []).reduce(function(prev, curr) {
				if (curr.some(function(item) { return item.gallery == true; }) && curr.length > 1) {
					return prev.concat([curr]);
				} else {
					return prev.concat(curr);
				}
			}, []);

			res.render('main/work.pug', { work: work, images: images });
		});
	};

	return module;
};