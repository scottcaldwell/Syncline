$(function () {

  //++++++++++++++++ geoSearchMap ++++++++++++//
  //Geo-search map, allows user to initialize site location

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

  $('button.modal-close').on('click', handlers.modalClose);
  $('a#add-new-drill-hole-button').on('click', handlers.modalOpen);
  $('a#submit-drill-hole').on('click', handlers.modalClose);
});