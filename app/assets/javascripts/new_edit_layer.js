(function() {

  var formModal = $('.modal');
  var newEditForm = formModal.find('#new-edit-layer');
  var openNew = $('#add-layer');
  var holeId = newEditForm.data('hole-id');
  var editBtn = $('.button-layer-edit');
  var newBtn = $();
  var saveBtn = $('.button-save');
  var holeMeta = $('.page-body').data('site');

  saveBtn.on('click', function(e) {
    e.preventDefault();
    if (newEditForm.hasClass('form-edit')) {
      editReq(newEditForm.attr('data-lid'));
    } else {
      newReq();
    }

    formModal.removeClass('is-active');
  });

  openNew.on('click', function() {
    formModal.addClass('is-active');
    newEditForm.removeClass('form-edit');
  });

  editBtn.on('click', function() {
    var parent = $(this).parents('.layer')[0];
    var thickness = ($(parent).find('.thickness-val').text());
    var description = ($(parent).find('.log-column-desc p').text());
    var glog = ($(parent).find('.log-column-glog p').text());
    newEditForm.find('#new_thickness').val(thickness);
    newEditForm.find('#new_desc').text(description);
    // newEditForm.find('#new_glog').text(glog);

    newEditForm.attr('data-lid', $(parent).data('id'));
    formModal.removeClass('is-active');
    formModal.addClass('is-active');
    newEditForm.addClass('form-edit');
  });

  function newReq() {
    var formData = new FormData();
    var siteId = holeMeta[0];
    var holeId = holeMeta[0];
    var url = '/sites/' + siteId + '/drill_holes/' + holeId + '/layers/';

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
      renderLog.newLayer(res);
    });
  };

  function editReq(layerId) {
    var split = holeMeta.split('-');
    var formData = new FormData();
    var siteId = split[0];
    var holeId = split[0];
    var url = '/sites/' + siteId + '/drill_holes/' + holeId + '/layers/' + layerId;

    formData.append('drill_hole_id', holeId);
    formData.append('layer_id', layerId);
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
      renderLog.updateLayer(layerId, res);
    });
  };

  var renderLog = {
    updateLayer: function(id, data) {
      var layer = $('div[data-id="' + id + '"]');
      layer.attr('data-height', data.data.thickness);
      layer.css('height', parseFloat(data.data.thickness) * 100 + 'px');
      layer.find('.thickness-val').text(data.data.thickness);
      layer.find('.log-column-glog').removeClass()
                                    .addClass('log-column-glog column is-1 gl')
                                    .addClass('gl-' + data.material )
                                    .find('p')
                                    .text('silt');
      layer.find('.log-column-desc p').text(data.data.description);

      // trigger events
      layer.trigger('layer-changed');
    },

    newLayer: function(data) {
      var source = $('#layer-template').html();
      console.log(source);
      var template = Handlebars.compile(source);
      var context = { 
        id: data.data.id, 
        thickness: data.data.thickness,
        layer_height: (data.data.thickness * 100),
        material: data.material, 
        description: data.data.description 
      }
      var html = template(context);
      $('.layer').last().after(html);
      $(document).trigger('layer-changed');
    }
  };

})();
