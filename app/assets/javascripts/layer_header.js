(function() {
  if ($('.layers-header').length > 0) {
    var tableHeader = $('.layers-header').offset().top;
    var addLayerButton = $('#add-layer').offset().top;
    var sectionWidth = $('#layers-log').width();
    var windowWidth = $(window).width();

    $(window).scroll(function() {
        var currentScroll = $(window).scrollTop();
        if (currentScroll >= tableHeader) {
            $('.layers-header').addClass('fixed');
            $('.x-axis').addClass('axis-fixed');
            $('#fixedHeaderSpacer').css('display', 'block');
            setAxisPostion();
        } else {
            $('.layers-header').removeClass('fixed');
            $('.x-axis').removeClass('axis-fixed').css('right', 0);
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

    function setAxisPostion() {
      sectionWidth = $('#layers-log').width();
      windowWidth = $(window).width();
      var rightOffset = (windowWidth - sectionWidth) / 2;
      $('.x-axis').css('right', rightOffset);
    };

    $(window).on('resize', function() {
      if ($('.x-axis').hasClass('axis-fixed')) {
        setAxisPostion();
      }
    });
  }
})();
