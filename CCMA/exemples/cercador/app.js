$(document).ready(function() {
	var template, render, searchVideo;
	template = Handlebars.compile($("#videos-template").html());

	render = function(videos) {
		return template({
			'videos': videos
		});
	};

	searchVideo = function(text) {
		var layer = $('.videos');
		layer.html('<div class="alert alert-warning">Carregant</div>');
		$.getJSON('http://54.187.159.87/buscador/' + text).then(function(videos) {
			layer.html(render(videos));
		}).fail(function() {
			layer.html(render([]));
		});
	};

	$(document).delegate('#nom', 'change', function(ev) {
		var input = $(ev.currentTarget);
		searchVideo(input.val());
		return false;
	});
});