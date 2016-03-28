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
  var saveEditBtn = $('.button-edit-save');
  var saveNewBtn = $('.button-new-save');
  var saveFT = $('.button-ft-save');
  var saveLT = $('.button-lt-save');
  var layerOptions = $('.button-layer-options');

  // data
  var holeId = editForm.data('hole-id');
  var holeMeta = $('.page-body').data('site');

  var listeners = {
    bind: function() {
      layerOptions.on('click', function() {
        var parent = $(this).parents('.layer')[0];
        console.log(parent);
        var data = {
          id: $(parent).data('id'),
          thickness: ($(parent).find('.thickness-val').text()),
          description: ($(parent).find('.layer-description').text()),
          date_drilled: ($(parent).find('.layer-date').text()),
          glog: ($(parent).find('.log-column-glog p').text())
        }

        helpers.removeActiveTab();
        formModal.addClass('is-active');
        editTab.addClass('is-active');
        render.editLayerForm(data);
      });

      newBtn.on('click', function() {
        var lastDate = $(".layer").last().find('.layer-date').text();
        helpers.removeActiveTab();
        formModal.addClass('is-active');
        newTab.addClass('is-active');
        tabs.find('li').each(function() {
          $(this).addClass('hidden');
        });
        newTab.removeClass('hidden');
        render.newLayerForm(lastDate);
        saveNewBtn = $('.button-new-save');
        listeners.bind();
      });

      newFT.on('click', function() {
        helpers.removeActiveTab();
        newFT.addClass('is-active');
        render.newFieldTest();
        saveFT = $('.button-ft-save');
        listeners.bind();
      });

      newLT.on('click', function() {
        helpers.removeActiveTab();
        newLT.addClass('is-active');
        render.newLabTest();
        saveLT = $('.button-lt-save');
        listeners.bind();
      });

      newTab.on('click', function() {
        helpers.removeActiveTab();
        newTab.addClass('is-active');
        render.newLayerForm();
        saveNewBtn = $('.button-new-save');
        listeners.bind();
      });

      editTab.on('click', function() {
        var parent = $(this).parents('.layer')[0];
        var data = {
          thickness: ($(parent).find('.thickness-val').text()),
          description: ($(parent).find('.layer-description').text()),
          date_drilled: ($(parent).find('.layer-date').text()),
          glog: ($(parent).find('.log-column-glog').text())

        }

        editForm.attr('data-lid', $(parent).data('id'));
        helpers.removeActiveTab();
        formModal.addClass('is-active');
        editTab.addClass('is-active');
        render.editLayerForm(data);
      });

      saveEditBtn.on('click', function(e) {
        e.preventDefault();
        reqHandlers.editReq($('#edit-layer').attr('data-lid'));
        formModal.removeClass('is-active');
      });

      saveNewBtn.on('click', function(e) {
        e.preventDefault();
        reqHandlers.newReq();
        formModal.removeClass('is-active');
      });

      saveFT.on('click', function(e) {
        e.preventDefault();
        reqHandlers.newFT();
        formModal.removeActiveTab('is-active');
      });

      saveLT.on('click', function(e) {
        e.preventDefault();
        reqHandlers.newLT();
        formModal.removeActiveTab('is-active');
      });
    }
  }

  var reqHandlers = {
    newReq: function() {
      var split = holeMeta.split('-');
      var formData = new FormData();
      var siteId = split[1];
      var holeId = split[0];
      var url = '/sites/' + siteId + '/drill_holes/' + holeId + '/layers/';
      var form = $('#new-layer');

      formData.append('drill_hole_id', holeId);
      formData.append('thickness', form.find('#new_thickness').val());
      formData.append('description', form.find('#new_desc').val());
      formData.append('material_type_id', 1);
      formData.append('date_drilled', form.find('#new_date_drilled').val());

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
      var siteId = split[1];
      var holeId = split[0];
      var url = '/sites/' + siteId + '/drill_holes/' + holeId + '/layers/' + layerId;
      var form = $('#edit-layer');

      formData.append('drill_hole_id', holeId);
      formData.append('layer_id', layerId);
      formData.append('thickness', form.find('#new_thickness').val());
      formData.append('description', form.find('#new_desc').val());
      formData.append('material_type_id', form.find('#new_glog').val());
      formData.append('date_drilled', form.find('#new_date_drilled').val());

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
    },

    newFT: function() {
      console.log('yeah ft');
    },

    newLT: function() {
      console.log('yeah LT');
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
      layer.find('.layer-description').text(data.data.description);
      layer.find('.layer-date').text(data.data.date_drilled);
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
        description: data.data.description,
        date_drilled: data.data.date_drilled
      }
      var html = template(context);
      $('.layer').last().after(html);
      $(document).trigger('layer-changed');
    },

    editLayerForm: function(data) {
      var source = editForm.html();
      var template = Handlebars.compile(source);
      var context = {
        id: data.id,
        thickness: data.thickness,
        description: data.description,
        date_drilled: data.date_drilled
      }
      var html = template(context);
      formWrap.empty();
      formWrap.append(html);
      saveEditBtn = $('.button-edit-save');
      listeners.bind();
    },

    newLayerForm: function(lastDate) {
      var source = newForm.html();
      var template = Handlebars.compile(source);
      var context = {lastDate: lastDate};
      var html = template(context);
      formWrap.empty();
      formWrap.append(html);
      listeners.bind();
    },

    newFieldTest: function() {
      var source = ftForm.html();
      var template = Handlebars.compile(source);
      var context = {};
      var html = template(context);
      formWrap.empty();
      formWrap.append(html);
      listeners.bind();
    },

    newLabTest: function() {
      var source = ltForm.html();
      var template = Handlebars.compile(source);
      var context = {};
      var html = template(context);
      formWrap.empty();
      formWrap.append(html);
      listeners.bind();
    }
  };

  var helpers = {
    removeActiveTab: function() {
      tabs.find('li').each(function() {
        $(this).removeClass('hidden is-active');
      });
    }
  }

  listeners.bind();

})();
