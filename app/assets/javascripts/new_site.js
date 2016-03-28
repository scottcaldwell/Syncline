$(function () {
  $('#site-submit-button').on('click', 'button', function (evt) {
    var count = 0;
    if ($('#latitude-helper').hasClass('show')) {
      $('#latitude-helper').addClass('shake')
      count++;
    }
    if ($('#longitude-helper').hasClass('show')) {
      $('#longitude-helper').addClass('shake')
      count++;
    }
    setTimeout(function () {
      $('#latitude-helper').removeClass('shake');
      $('#longitude-helper').removeClass('shake');
    }, 520);  
    if (count > 0) {
      return false;
    }
  });
});