var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Collection = require('./utils/collection')();
var Widget = require('./widget')();

var widgets = new Collection();

io.on('connection', function(socket) {
	var query = socket.handshake.query,
		uuid = query.uuid;

	var widget;
	widgets.forEach(function (item, id) {
		if (item.getUUID() === uuid) {
			widget = item;
			return false;
		}
	});

	if (!widget) {
		widget = new Widget(uuid);
		widgets.add(widget);

		console.log('New widget created with id ' + uuid);
	}
	else {
		console.log('New socket is listed for widget id ' + uuid);	
	}
	widget.addSocket(socket);

	socket.on('disconnect', function () {
		widgets.forEach(function (item, id) {
			item.removeSocket(socket);
		});

		console.log('Socket is removed from widget with id ' + uuid);
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});