(function() {
  // sets the height of each layer based on data-layer value
  var layers = $('#layers-log');

  layers.find('.layer').each(function() {
    var _self = $(this);
    var height = parseFloat(_self.data('height')) * 100 + 'px';
    _self.css('height', height);
  });

  // Constructs the layer_log ruler based on combined height of all layers
  var layersHeight = layers.height();
  var ruler = $('.layer-rules ul');
  var numLayers = layersHeight / 25;

  for (var i = 0; i < numLayers; i++) {
    var num = $('<p>').text((i * 25) /100);
    var step = $('<li>').append(num);
    ruler.append(step);
  }

  function setRuler() {
    layers = $('#layers-log');
    var layersHeight = layers.height();
    var ruler = $('.layer-rules ul');
    ruler.empty();
    var numLayers = layersHeight / 25;

    for (var i = 0; i < numLayers; i++) {
      var num = $('<p>').text((i * 25) /100);
      var step = $('<li>').append(num);
      ruler.append(step);
    }
  };

  function setXAxis() {

  };

  // Depth calculation
  function setTotalDepth() {
    var depths = $('.log-column-depth');
    var total_depth = 0;
    depths.each(function(i) {
      var layer_thickness = parseFloat($(depths[i]).find('.thickness-val').text());
      total_depth += layer_thickness;
      $(this).find('.abs-depth-value').text(total_depth);
    });
  }

  setTotalDepth();
  setOrder();

  // initialize layer drag and drop
  dragula([document.querySelector('#layers-log')])
    .on('drop', function() {
      setTotalDepth();        
      setOrder(true);
    });

  // set layer order
  function setOrder(pop) {
    var allLayers = layers.find('.layer');
    console.log(allLayers);
    var count = allLayers.length;
    var i = 1;
    allLayers.each(function(index) {
      $(allLayers[index]).attr('data-order', i);
      i++;
    });
    writeOrder(pop);
  }

  // Write the new order to the db
  function writeOrder(pop) {
    var newOrder = []
    $('.layer').each(function(i) {
      newOrder.push({ id: $(this).attr("data-id"), position: $(this).attr('data-order') })
    });

    if (pop) newOrder.pop();

    $.ajax('/layers/sort', {
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      dataType: 'json',
      data: { order: JSON.stringify(newOrder) },
      type: 'put'
    }).done(function(res) {
      // console.log(res);
    });
  }

  // Watch for updates to layers
  $(document).on('layer-changed', function() {
    setRuler();
    setTotalDepth();
    setOrder();
  });

  // Make site info editable
  var siteForm = $('.drill-log form');
  var controls = $('.drill-log-controls');

  controls.find('.control-edit').on('click', function(e) {
    e.preventDefault();
    siteForm.find('input').each(function() {
      $(this).removeClass('input-locked');
      $(this).attr('readonly', false);
      controls.addClass('controls-edit');
    });
  });

  controls.find('.control-cancel').on('click', function(e) {
    e.preventDefault();
    siteForm.find('input').each(function() {
      $(this).addClass('input-locked');
      $(this).attr('readonly', true);
      controls.removeClass('controls-edit');
    });
  });

  controls.find('.control-save').on('click', function() {
    siteForm.find('input').each(function() {
      $(this).addClass('input-locked');
      $(this).attr('readonly', true);
      controls.removeClass('controls-edit');
    });    
  });
})();