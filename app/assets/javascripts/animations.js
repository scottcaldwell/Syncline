$(function(){
  $(window).scroll(function () {
          var map = $('#mapAnimation');
          var mapPos = map.offset().top;
          var topOfWindow = $(window).scrollTop();
          var scrollBottom = $(window).scrollTop() + $(window).height();
          if (mapPos < scrollBottom) {
              map.children('.pin:nth-child(1)').addClass("pin1");
              map.children('.pin:nth-child(2)').addClass("pin2");
              map.children('.pin:nth-child(3)').addClass("pin3");
              console.log('added');
          } else {
            map.children('.pin:nth-child(1)').removeClass("pin1");
            map.children('.pin:nth-child(2)').removeClass("pin2");
            map.children('.pin:nth-child(3)').removeClass("pin3");
          }
  });

  $('.pin').css('visibility', 'hidden');

});
