// require external dependency socket.io, https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js
(function(global){
	'use strict';

	var parseParams = () => {
		var hash = window.location.hash.replace(/^#/, '');
		if (!hash) return {}
		var params = {};
		try{
			params = JSON.parse(decodeURIComponent(hash));
		} catch (err) {
			console.error(err, 'hash: ' + hash);
		}
		return params;
	}

	var aimole = parseParams();
	if (aimole.display) {
		try {
			aimole.display = JSON.parse(aimole.display);
		} catch (err) {
			console.error(err, 'JSON string: ' + aimole.display);
			aimole.display = [];
		}
		console.log('aimole.display', aimole.display);
	} else if (aimole.streamUrl && aimole.matchId) {
		aimole.display = [];
		io(aimole.streamUrl, {query: 'matchId=' + aimole.matchId})
			.on('queueing', () => {
				console.log('queueing');
			})
			.on('start', () => {
				console.log('start');
			})
			.on('display', (data) => {
				console.log('display', data);
				aimole.display.push(data);
			})
			.on('err', (errMsg) => {
				console.error(new Error(errMsg));
			})
			.on('end', () => {
				console.log('end');
			})
			.on('disconnect', (reason) => {
				console.log('socket disconnected, reason: ', reason);
			});
	}

	// AMD support
	if (typeof define === 'function' && define.amd) {
		define(function () { return aimole; });
	// CommonJS and Node.js module support.
	} else if (typeof exports !== 'undefined') {
		// Support Node.js specific `module.exports` (which can be a function)
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = aimole;
		}
		// But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
		exports.aimole = aimole;
	} else {
		global.aimole = aimole;
	}
})(this);
