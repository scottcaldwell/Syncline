$(function(){
  // FIXME: DRY up code
  var map = $('#mapAnimation');
  var bars = $('#barContainer');
  if (map.length > 0 && bars.length > 0) {
    $(window).scroll(function () {
            
            var mapPos = map.offset().top;
            
            var barsPos = bars.offset().top;

            var topOfWindow = $(window).scrollTop();
            var scrollBottom = $(window).scrollTop() + $(window).height();
            if ( ( mapPos + 50 ) < scrollBottom) {
                map.children('.pin:nth-child(1)').addClass("pin1");
                map.children('.pin:nth-child(2)').addClass("pin2");
                map.children('.pin:nth-child(3)').addClass("pin3");
            } else {
              map.children('.pin:nth-child(1)').removeClass("pin1");
              map.children('.pin:nth-child(2)').removeClass("pin2");
              map.children('.pin:nth-child(3)').removeClass("pin3");
            }
            if (( barsPos + 50 ) < scrollBottom) {
              var bar1 = bars.children('#bar1');
              setTimeout(function() {
                  bar1.addClass('animate-bar');
              }, 250);
              var bar2 = bars.children('#bar2');
              setTimeout(function() {
                  bar2.addClass('animate-bar');
              }, 500);
              var bar3 = bars.children('#bar3');
              setTimeout(function() {
                  bar3.addClass('animate-bar');
              }, 750);
              var bar4 = bars.children('#bar4');
              setTimeout(function() {
                  bar4.addClass('animate-bar');
              }, 1000);
            }else{
              bars.children('#bar1').removeClass("animate-bar");
              bars.children('#bar2').removeClass("animate-bar");
              bars.children('#bar3').removeClass("animate-bar");
              bars.children('#bar4').removeClass("animate-bar");
            }

    });
  }
  $('.pin').css('visibility', 'hidden');
});
