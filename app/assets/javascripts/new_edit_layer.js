(function() {

  var formModal = $('.modal');
  var formWrap = formModal.find('#form-wrap');
  var layerOptions = $('')
  
  // forms
  var editForm = $('#edit-layer-template');
  var newForm = $('#new-layer-template');
  var ftForm = $('#new-ft-template');
  var ltForm = $('#new-lt-template');

  // tabs
  var tabs = $('#layer-tabs');
  var editTab = tabs.find('#edit-layer-tab');
  var newTab = tabs.find('#new-layer-tab');
  var newFT = tabs.find('#add-ft-tab');
  var newLT = tabs.find('#add-lt-tab');

  // buttons
  var newBtn = $('#add-layer');
  var saveBtn = $('.button-save'); 
  var layerOptions = $('.button-layer-options');

  // data
  // var holeId = newEditForm.data('hole-id');
  // var holeMeta = $('.page-body').data('site');

  var listeners = {
    init: function() {
      this.bind();
    },

    bind: function() {
      layerOptions.on('click', function() {
        var parent = $(this).parents('.layer')[0];
        var data = {
          thickness: ($(parent).find('.thickness-val').text()),
          description: ($(parent).find('.log-column-desc p').text()),
          glog: ($(parent).find('.log-column-glog p').text())
        }

        editForm.attr('data-lid', $(parent).data('id'));
        helpers.removeActiveTab();
        formModal.addClass('is-active');
        editTab.addClass('is-active');
        
        render.editLayerForm(data);
      });

      newBtn.on('click', function() {
        helpers.removeActiveTab();
        formModal.addClass('is-active');
        newTab.addClass('is-active');
        tabs.find('li').each(function() {
          $(this).addClass('hidden');
        });
        newTab.removeClass('hidden');
        render.newLayerForm();
        // newEditForm.removeClass('form-edit');
      });

      newFT.on('click', function() {
        helpers.removeActiveTab();
        newFT.addClass('is-active');
        render.newFieldTest();
      });

      newLT.on('click', function() {
        helpers.removeActiveTab();
        newLT.addClass('is-active');
        render.newLabTest();
      });

      newTab.on('click', function() {
        helpers.removeActiveTab();
        newTab.addClass('is-active');
        render.newLayerForm();
      });

      editTab.on('click', function() {
        // // more this stuff to a render function
        // // this is for the tab, but it needs to happen by defaut as well

        // newEditForm.find('#new_thickness').val(thickness);
        // newEditForm.find('#new_desc').text(description);
        // // newEditForm.find('#new_glog').text(glog);


        // formModal.removeClass('is-active');
        // formModal.addClass('is-active');
        // newEditForm.addClass('form-edit');

        var parent = $(this).parents('.layer')[0];
        var data = {
          thickness: ($(parent).find('.thickness-val').text()),
          description: ($(parent).find('.log-column-desc p').text()),
          glog: ($(parent).find('.log-column-glog p').text())
        }

        editForm.attr('data-lid', $(parent).data('id'));
        helpers.removeActiveTab();
        formModal.addClass('is-active');
        editTab.addClass('is-active');
        
        render.editLayerForm(data);        
      });  

      saveBtn.on('click', function(e) {
        e.preventDefault();
        if (newEditForm.hasClass('form-edit')) {
          reqHandlers.editReq(newEditForm.attr('data-lid'));
        } else {
          reqHandlers.newReq();
        }
        formModal.removeClass('is-active');
      });          
    }
  }

  var reqHandlers = {
    newReq: function() {
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
        render.newLayer(res);
      });
    },

    editReq: function(layerId) {
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
        render.updateLayer(layerId, res);
      });
    }
  }

  var render = {
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
    },

    editLayerForm: function(data) {
      var source = editForm.html();
      var template = Handlebars.compile(source);
      var context = {
        thickness: data.thickness,
        description: data.description
      }
      var html = template(context);
      formWrap.empty();
      formWrap.append(html);
    },

    newLayerForm: function() {
      var source = newForm.html();
      var template = Handlebars.compile(source);
      var context = {};
      var html = template(context);
      formWrap.empty();
      formWrap.append(html);
    },

    newFieldTest: function() {
      var source = ftForm.html();
      var template = Handlebars.compile(source);
      var context = {};
      var html = template(context);
      formWrap.empty();
      formWrap.append(html);
    },

    newLabTest: function() {
      var source = ltForm.html();
      var template = Handlebars.compile(source);
      var context = {};
      var html = template(context);
      formWrap.empty();
      formWrap.append(html);
    }
  };

  var helpers = {
    removeActiveTab: function() {
      tabs.find('li').each(function() {
        $(this).removeClass('hidden is-active');
      });
    }
  }

  listeners.init();

})();
