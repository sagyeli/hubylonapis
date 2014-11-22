var uuid = require('uuid');

var generateUUID = function () {
	return uuid.v4();
};

module.exports = function () {
	var Widget = function (uuid, options) {
		this.uuid = uuid || generateUUID();
		options = options || {};
		this._data = {};

		this._sockets = [];
	};

	Widget.prototype = {
		getUUID: function () {
			return this.uuid;
		},
		get_data: function () {
			return this._data;
		},
		addSocket: function (socket) {
			this._sockets.push(socket);
		},
		removeSocket: function (socket) {
			this._sockets.splice(this._sockets.indexOf(socket), 1);
		},
		emitAll: function () {
			var i = this._sockets.length;
			while (i--) {
				this._sockets[i].emit('_data', this._data);
			}
		},
		equals: function (widget) {
			return widget && widget.getUUID && this.getUUID() === widget.getUUID();
		}
	};

	return Widget;
};