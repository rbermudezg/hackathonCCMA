$(document).ready(function() {
	var template, render, getVideoPerId, videoID, group = 0;
	template = Handlebars.compile($("#video-template").html());

	render = function(video) {
		return template({
			'video': video
		});
	};

	getVideoPerId = function(id) {
		videoID = id;
		var layer = $('.video');
		$.getJSON('http://54.187.159.87/video/' + id).then(function(video) {
			layer.html(render(video));
		}).fail(function() {
			layer.html(render());
		});
	};



	$(document).delegate('.sendButton', 'click', function() {
		group = $('.tvid').val();
		var fb = new Firebase("https://hackathonccma.firebaseio.com/" + group);
		fb.set({
			state: "reproductor",
			id: videoID
		});
	});

	var hash = window.location.hash;
	getVideoPerId(hash.slice(1));
});