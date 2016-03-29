// $(function () {
//   $('#generate-pdf').on('click', function () {
//     var htmlContent = $('#dh-log-pdf').html();
//     var dhId = $('#drill-hole').data('drill-hole-id');
//     var siteId = $('#drill-hole').data('site-id');
//     $.ajax({
//       url: '/sites/' + siteId + '/drill_holes/' + dhId + '/generate_pdf.pdf',
//       method: 'POST',
//       dataType: 'json',
//       data: { content: htmlContent },
//       success: function () {
//         alert("pdf generated");
//       }
//     });
//   });
// });