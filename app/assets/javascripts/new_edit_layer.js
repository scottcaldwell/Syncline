(function() {

  var formModal = $('.modal')
  var newEditForm = formModal.find('#new-edit-layer');
  var openNew = $('#add-layer');
  var holeId = newEditForm.data('hole-id');
  var editBtn = $('.button-layer-edit');
  var newBtn = $();
  var saveBtn = $('.button-save');

  saveBtn.on('click', function(e) {
    e.preventDefault();


    if (newEditForm.hasClass('form-edit')) {
      editReq(1);
    } else {
      newReq();
    }
  });

  openNew.on('click', function() {
    newEditForm.trigger('reset');
    formModal.addClass('is-active');
    newEditForm.removeClass('form-edit')
  });

  editBtn.on('click', function() {
    newEditForm.trigger('reset');
    var parent = $(this).parents('.layer')[0];
    var thickness = ($(parent).find('.thickness-val').text());
    var description = ($(parent).find('.log-column-desc p').text());
    var glog = ($(parent).find('.log-column-glog p').text());
    newEditForm.find('#new_thickness').val(thickness);
    newEditForm.find('#new_desc').text(description);
    // newEditForm.find('#new_glog').text(glog);

    formModal.addClass('is-active');
    newEditForm.addClass('form-edit');
  });

  function newReq() {
    var formData = new FormData();
    var url = '/drill_holes/' + holeId + '/layers';
    
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
      type: 'post'      
    }).done(function(res) {
      console.log(res);
    });
  }

  function editReq(layerId) {
    var formData = new FormData();
    var url = '/layers/' + layerId;

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
      type: 'put'
    }).done(function(res) {
      console.log(res);
    });
  }

})();