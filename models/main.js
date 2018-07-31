var mongoose = require('mongoose'),
		mongooseLocale = require('mongoose-locale'),
		mongooseBcrypt = require('mongoose-bcrypt');

var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' +  __app_name);


// ------------------------
// *** Schema Block ***
// ------------------------


var userSchema = new Schema({
	login: String,
	password: String,
	email: String,
	status: String,
	date: {type: Date, default: Date.now},
});

var workSchema = new Schema({
	num: Number,
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	year: Number,
	client: { type: String, trim: true, locale: true },
	area: { type: String, trim: true, locale: true },
	program: { type: String, trim: true, locale: true },
	poster: { type: String },
	geo: [{
		lat: String,
		long: String
	}],
	status: String,
	sym: { type: String, trim: true, index: true, unique: true, sparse: true },
	partners: [{ type: ObjectId, ref: 'Partner' }],
	peoples: [{ type: ObjectId, ref: 'People' }],
	video: String,
	images: [{
		size: String,
		gallery: Boolean,
		description: { type: String, trim: true, locale: true },
		original: { type: String },
		thumb: { type: String },
		preview: { type: String }
	}],
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});

var peopleSchema = new Schema({
	name: { type: String, trim: true, locale: true },
	type: String,
	status: String,
	sym: { type: String, trim: true, index: true, unique: true, sparse: true },
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});

var partnerSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	logo: { type: String },
	link: String,
	status: String,
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});

var publicationSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	s_title: { type: String, trim: true, locale: true },
	link: String,
	year: Number,
	poster: { type: String },
	attach: { type: String },
	status: String,
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});


// ------------------------
// *** Index Block ***
// ------------------------


workSchema.index({'date': -1});
workSchema.index({'title.value': 'text', 'description.value': 'text'}, {language_override: 'lg', default_language: 'ru'});
peopleSchema.index({'name.value': 'text', 'description.value': 'text'}, {language_override: 'lg', default_language: 'ru'});
partnerSchema.index({'title.value': 'text'}, {language_override: 'lg', default_language: 'ru'});
publicationSchema.index({'title.value': 'text', 's_title.value': 'text'}, {language_override: 'lg', default_language: 'ru'});


// ------------------------
// *** Plugins Block ***
// ------------------------


userSchema.plugin(mongooseBcrypt, { fields: ['password'] });

workSchema.plugin(mongooseLocale);
peopleSchema.plugin(mongooseLocale);
partnerSchema.plugin(mongooseLocale);
publicationSchema.plugin(mongooseLocale);


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.Work = mongoose.model('Work', workSchema);
module.exports.People = mongoose.model('People', peopleSchema);
module.exports.Partner = mongoose.model('Partner', partnerSchema);
module.exports.Publication = mongoose.model('Publication', publicationSchema);