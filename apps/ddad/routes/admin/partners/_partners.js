var express = require('express');

var Model = require(__glob_root + '/models/main.js');

var Params = {
	locale: require('../_params/locale'),
	upload: require('../_params/upload')
};

var partnerSchema = {
	list: require('./list.js')(Model),
	add: require('./add.js')(Model, Params),
	edit: require('./edit.js')(Model, Params),
	remove: require('./remove.js')(Model)
};

module.exports = (function() {
	var router = express.Router();

	router.route('/')
		.get(partnerSchema.list.index)
		.post(partnerSchema.list.get_list);

	router.route('/add')
		.get(partnerSchema.add.index)
		.post(partnerSchema.add.form);

	router.route('/edit/:partner_id')
		.get(partnerSchema.edit.index)
		.post(partnerSchema.edit.form);

	router.route('/remove')
		.post(partnerSchema.remove.index);

	return router;
})();