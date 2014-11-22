module.exports = function () {
	var Collection = function (uuid, options) {
		this._data = {};
	};

	Collection.prototype = {
		get: function (id) {
			return this._data[id.toString()] || null;
		},
		set: function (id, item) {
			if (/^\+?(0|[1-9]\d*)$/.test(id)) {
				this._data[id.toString()] = item;
			}

			return this;
		},
		add: function (item) {
			var keys = Object.keys(this._data),
				id = 0;
			while (keys.indexOf(id.toString()) >= 0) { i++; }
			this._data[id.toString()] = item;

			return this;
		},
		remove: function (id) {
			this._data[id.toString()] = null;
			
			return this;
		},
		clear: function () {
			this._data = {};
			
			return this;
		},
		forEach: function (func) {
			for (var key in this._data) {
				if (func(this._data[key], key) === false) {
					continue;
				}
			}
		},
		contains: function (item) {
			for (var key in this._data) {
				if (this._data[key] && 
					typeof this._data[key].equals === 'function'
						? this._data[key].equals(item) : 
						this._data[key] === item) {
					return true;
				}
			}

			return false;
		}
	};

	return Collection;
};