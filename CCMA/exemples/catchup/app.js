var template, render;

$(document).ready(function() {
	template = Handlebars.compile($("#programes-template").html());

	render = function(programes) {
		return template({
			'programes': programes
		});
	}


	$.getJSON("http://54.187.159.87/catchup/CAD_TV3/1").then(function(programes) {
		$('.programes').html(render(programes));
	});
});