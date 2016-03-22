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
  var ruler = $('#layer-rules ul');
  var numLayers = layersHeight / 25;

  for (var i = 0; i < numLayers; i++) {
    var num = $('<p>').text((i * 25) /100);
    var step = $('<li>').append(num);
    ruler.append(step);
  }

  // initialize layer drag and drop
  dragula([document.querySelector('#layers-log')]);

})();