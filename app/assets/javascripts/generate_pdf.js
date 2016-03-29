$(function () {
  $('#generate-pdf').on('click', function () {
    var htmlContent = $('#dh-log-pdf').html();
    var dhId = $('#drill-hole').data('drill-hole-id');
    var siteId = $('#drill-hole').data('site-id');
    $.ajax({
      url: '/sites/' + siteId + '/drill_holes/' + dhId + '.pdf',
      method: 'GET',
      success: function () {
        alert("pdf generated");
      }
    });
  });
});