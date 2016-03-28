$(function () {

  var handlers = {
    modalOpen: function (evt) {
      evt.preventDefault();
      $(evt.data.modal).addClass('is-active');
    },
    modalClose: function (evt) {
      evt.preventDefault();
      $(evt.data.modal).removeClass('is-active');
    },
    showLatLngError: function (evt) {
      var count = 0;
      if ($('#latitude-helper').hasClass('show')) {
        $('#latitude-helper').addClass('shake');
        count++;
      }
      if ($('#longitude-helper').hasClass('show')) {
        $('#longitude-helper').addClass('shake');
        count++;
      }
      setTimeout(function () {
        $('#latitude-helper').removeClass('shake');
        $('#longitude-helper').removeClass('shake');
      }, 520);  
      if (count > 0) {
        return false;
      }
    }
  };

  $('a#add-site-button').on('click', { modal: '#add-site-modal' }, handlers.modalOpen);
  $('button#site-modal').on('click', { modal: '#add-site-modal' }, handlers.modalClose);
  $('button#dh-modal').on('click', { modal: '#add-new-drill-hole-modal' }, handlers.modalClose);
  $('a#add-new-drill-hole-button').on('click', { modal: '#add-new-drill-hole-modal' }, handlers.modalOpen);
  $('a#add-user-button').on('click', { modal: '#add-user-to-site-modal' }, handlers.modalOpen);
  $('button#add-user-modal').on('click', { modal: '#add-user-to-site-modal' }, handlers.modalClose);
  $('#dh-submit-button').on('click', 'input', handlers.showLatLngError);
  $('#site-submit-button').on('click', 'input', handlers.showLatLngError);
});