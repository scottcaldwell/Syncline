$(function () {

  var handlers = {
    modalOpen: function (evt) {
      evt.preventDefault();
      $('#add-site-modal').addClass('is-active');
    },
    modalClose: function (evt) {
      evt.preventDefault();
      $('#add-site-modal').removeClass('is-active');
    }
  };

  $('a#add-site-button').on('click', handlers.modalOpen);
  $('button.modal-close').on('click', handlers.modalClose);
});