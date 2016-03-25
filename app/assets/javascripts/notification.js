$(function(){
  var closeButton = $('.delete');
  var notification = $(".flash");

  closeButton.on("click", function(){
    notification.fadeOut('slow');
  });

  notification.delay(4000).fadeOut('slow');
});
