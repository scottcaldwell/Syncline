$(function () {
  $('#generate-pdf').on('click', function () {
    var htmlContent = $('#dh-log-pdf').html();
    var dhId = $('#drill-hole').data('drill-hole-id');
    var siteId = $('#drill-hole').data('site-id');
    var flash = $('.flash');
    var button = $(this);
    button.addClass('is-loading');
    button.text('');
    flash.empty();
    flash.fadeIn('slow');
    $.ajax({
      url: '/sites/' + siteId + '/drill_holes/' + dhId + '.pdf',
      method: 'GET',
      success: function () {
        flash.append($('<div>').addClass('notification').text("PDF generated. Please check your registered E-mail."));
        flash.delay(4000).fadeOut('slow');
        button.text('Generate PDF');
        button.removeClass('is-loading');
      }
    });
  });
});