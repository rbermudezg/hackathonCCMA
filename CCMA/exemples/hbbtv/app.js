var appMgr, oipfcfg, reprodueixVideo, getOrCreateTvId, registrarFirebase;


var getOrCreateTvId = function() {
	var id = $.cookie("tv-id");
	if (!id) {
		id = new Date().getTime() + '_' + Math.floor(Math.random() * 100);
		$.cookie("tv-id", id);
	}
	return id;
};

var registrarDirecte = function() {
	try {
		$('#videoBroadcast')[0].bindToCurrentChannel();
	} catch (e) {}
};

var registrarTecles = function() {
	var keys = [
		KeySetManager.constants.RED,
		KeySetManager.constants.GREEN,
		KeySetManager.constants.YELLOW,
		KeySetManager.constants.BLUE,
		KeySetManager.constants.NAVIGATION,
		KeySetManager.constants.VCR
	];
	for (var i = 0; i < keys.length; i++) {
		KeySetManager.register(keys[i]);
	};

	document.onkeydown = function(e) {
		var key = (window.event && window.event.keyCode) || e.keyCode;
		switch (key) {
			case VK_UP:
				break;
			case VK_RIGHT:
				break;
			case VK_DOWN:
				break;
			case VK_LEFT:
				break;
			case VK_ENTER:
				break;
		}
		return false;
	};
};


var registrarFirebase = function() {
	var id, fb, value;
	id = getOrCreateTvId();
	$('#idTV').html('Id: ' + id);
	fb = new Firebase("https://hackathonccma.firebaseio.com/" + id);
	fb.on('value', function(snapshot) {
		value = snapshot.val();
		if (value) {
			if (value.state === 'reproductor') {
				reprodueixVideo(value.id);
			}
			$('.serverdata').html(JSON.stringify(value));
		}
	});
};


var reprodueixVideo = function(id) {
	var videoObject = $('#video')[0];
	$.getJSON('http://54.187.159.87/video/' + id).then(function(video) {
		videoObject.data = video.media;
		videoObject.play();
	});
};

$(document).ready(function() {
	appMgr = document.getElementById('appmgr').getOwnerApplication(document);
	registrarTecles();
	registrarDirecte();
	registrarFirebase();
	appMgr.show();
});