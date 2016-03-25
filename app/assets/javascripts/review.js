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
      if (reviewButton.text() === "Start Review") {
        reviewButton.text("Mark as Reviewed");
        var url = '/drill_hole/' + drillHoleId + '/update_reviewer.json';
        var data = "Send start review email";
        ajaxRequests.getProjectDetails(url, data).done(function (data) {

        });
      } else {
        reviewButton.text("Start Review");
        var url = '/drill_hole/' + drillHoleId + '/update_reviewer.json';
        var data = "Send review completed email";
        ajaxRequests.getProjectDetails(url, data).done(function (data) {

        });
      }
      
    });
  }
});