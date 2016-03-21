$(function () {

  var handlers = {
    modalOpen: function (evt) {
      evt.preventDefault();
      $('.modal').addClass('is-active');
    },
    modalClose: function (evt) {
      evt.preventDefault();
      $('.modal').removeClass('is-active');
    }
  };

  $('a#add-site-button').on('click', handlers.modalOpen);
  $('button.modal-close').on('click', handlers.modalClose);
  $('a#submit-site').on('click', handlers.modalClose)
});