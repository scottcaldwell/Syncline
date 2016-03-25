$(function () {
  var reviewButton = $('#review-button'),
      drillHoleId = $('#drill-hole').data('drill-hole-id');

  var ajaxRequests = {
    getProjectDetails: function (url) {
      return $.ajax({
        url: url,
        method: 'PUT',
        dataType: 'json'
      });
    }
  };

  if (reviewButton !== undefined) {
    reviewButton.on('click', function (evt) {
      evt.preventDefault();
      var url = '/drill_hole/' + drillHoleId + '/update_reviewer.json';
      ajaxRequests.getProjectDetails(url).done(function (data) {
        alert("reviewed!!!");
      });
    });
  }
});