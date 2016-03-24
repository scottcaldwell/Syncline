(function() {

  var newEditForm = $('#new-edit-layer');
  var holeId = newEditForm.data('hole-id');
  var editBtn = $();
  var newBtn = $();
  var saveBtn = $('.button-save');

  saveBtn.on('click', function(e) {
    e.preventDefault();
    console.log('yup');
    var saveTo = '/drill_holes/' + holeId + '/layers';
    sendReq(saveTo);
  });


  function sendReq(url) {
    var formData = new FormData();
    formData.append('drill_hole_id', holeId);
    formData.append('thickness', $(newEditForm.find('#new_thickness')[0]).val());
    formData.append('description', $(newEditForm.find('#new_desc')[0]).val());
    formData.append('material_type_id', $(newEditForm.find('#new_glog')[0]).val());

    $.ajax(url, {
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST'      
    }).done(function(res) {
      console.log(res);
    });
  }

})();