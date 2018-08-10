module.exports = function(Model) {
	var module = {};

	var Work = Model.Work;

	module.index = function(req, res) {
		Work.find().sort('-date').exec(function(err, works) {

			res.render('main/index.pug', { works: works });
		});
	};

	return module;
};