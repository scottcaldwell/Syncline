(function() {
  if ($('.layers-header').length > 0) {
    var tableHeader = $('.layers-header').offset().top;
  }
  //var addLayerButton = $('#add-layer').offset().top;

  $(window).scroll(function() {

      var currentScroll = $(window).scrollTop();

      if (currentScroll >= tableHeader) {
          $('.layers-header').addClass('fixed');
          $('#fixedHeaderSpacer').css('display', 'block');
      } else {
          $('.layers-header').removeClass('fixed');
          $('#fixedHeaderSpacer').css('display', 'none');
      }

      // if (currentScroll >= addLayerButton) {
      //     $('.layers-header').addClass('fixed');
      //     $('#sticky').css('display', 'block');
      // } else {
      //     $('.layers-header').removeClass('fixed');
      //     $('#fixedHeaderSpacer').css('display', 'none');
      // }

  });
})();
