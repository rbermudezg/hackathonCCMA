var modal = '\
<div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="video" aria-hidden="true">\
  <div class="modal-dialog">\
    <div class="modal-content">\
      <div class="modal-header">\
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
        <h4 class="modal-title" id="video">Video</h4>\
      </div>\
      <div class="modal-body">\
      </div>\
      <div class="modal-footer">\
        <button type="button" class="btn btn-default" data-dismiss="modal">Tanca</button>\
      </div>\
    </div>\
  </div>\
</div>';

$(document).delegate('.media a', 'click', function(ev) {
  var input = $(ev.currentTarget),
    href = input.attr('href'),
    modalBody = $('.modal .modal-body');
  
  if (modalBody.length === 0) {
    $(document.body).append($(modal));
    modalBody = $('.modal .modal-body');
  }
  modalBody.html('<iframe src="../video/index.html' + href + '"></iframe>');
  $('.modal').modal()
});