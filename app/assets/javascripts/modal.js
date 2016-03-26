(function() {
  var modal = $('.modal');
  var modalClose = $('.modal-close');
  modalClose.on('click', function() {
    modal.removeClass('is-active');
  });
})();