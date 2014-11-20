var uuid = require('uuid');

var generateUUID = function () {
	return uuid.v4();
};

module.exports = function (uuid, options) {
	this.uuid = uuid || generateUUID();
	this.options = options || {};
	this.title = options.title;
	this.data = {};
};

module.exports.prototype = {
	getData: function () {
		return this.data;
	}
};