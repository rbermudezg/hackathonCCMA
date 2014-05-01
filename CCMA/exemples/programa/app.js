$(document).ready(function() {
	var programesTemplate, videosTemplate, renderProgrames, renderVideos, getVideosPerPrograma;

	programesTemplate = Handlebars.compile($("#programes-template").html());
	videosTemplate = Handlebars.compile($("#videos-template").html());


	renderProgrames = function(programes) {
		return programesTemplate({
			'programes': programes
		});
	};

	renderVideos = function(videos) {
		return videosTemplate({
			'videos': videos
		});
	};

	$.getJSON('http://54.187.159.87/programes').then(function(programes) {
		$('.programes').html(renderProgrames(programes));
	});

	getVideosPerPrograma = function(slug, layer) {
		var panelBody = layer.find('.panel-body');
		if (!panelBody.hasClass('loaded')) {
			$.getJSON('http://54.187.159.87/programes/' + slug).then(function(videos) {
				panelBody.html(renderVideos(videos));
			}).fail(function() {
				panelBody.addClass('alert-danger').html('Error carregant videos');
			}).done(function() {
				panelBody.removeClass('alert-warning').addClass('loaded');
			});
		}
	};

	$(document).delegate('.panel-collapse', 'show.bs.collapse', function(ev) {
		var layer, slug;
		layer = $(ev.currentTarget);
		slug = layer.attr('id');
		getVideosPerPrograma(slug, layer);
	});
})