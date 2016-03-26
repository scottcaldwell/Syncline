$(function () {
  var handlers = {
    modalOpen: function (evt) {
      evt.preventDefault();
      $('#add-user-to-site-modal').addClass('is-active');
    },
    modalClose: function (evt) {
      evt.preventDefault();
      $('#add-user-to-site-modal').removeClass('is-active');
    }
  };

  $('a#add-user-button').on('click', handlers.modalOpen);
  $('button.modal-close').on('click', handlers.modalClose);

});
