$(function () {
  var reviewButton = $('#review-button'),
      drillHoleId = $('#drill-hole').data('drill-hole-id');

  var ajaxRequests = {
    getProjectDetails: function (url, data) {
      return $.ajax({
        url: url,
        method: 'PUT',
        data: { data: data },
        dataType: 'json'
      });
    }
  };

  if (reviewButton !== undefined) {
    reviewButton.on('click', function (evt) {
      evt.preventDefault();
      var button = $(this);
      button.addClass('is-loading');
      var flash = $('.flash');
      if (reviewButton.text() === "Start Review") {
        var url = '/drill_hole/' + drillHoleId + '/update_reviewer.json';
        var data = "Send start review email";
        flash.empty();
        flash.fadeIn('slow');
        ajaxRequests.getProjectDetails(url, data).done(function (data) {
          if (data.success) {
            reviewButton.text("Mark as Reviewed");
            flash.append($('<div>').addClass('notification').text(data.success));           
          } else {
            flash.append($('<div>').addClass('notification').text(data.error));
          }
          button.removeClass('is-loading');
        });
      } else {
        var url = '/drill_hole/' + drillHoleId + '/update_reviewer.json';
        var data = "Send review completed email";
        ajaxRequests.getProjectDetails(url, data).done(function (data) {
          if (data.success) {
            reviewButton.text("Start Review");
            flash.append($('<div>').addClass('notification').text(data.success));
          } else {
            flash.append($('<div>').addClass('notification').text(data.error));
          }
          button.removeClass('is-loading');
        });
      }
      flash.delay(4000).fadeOut('slow');
    });
  }
});