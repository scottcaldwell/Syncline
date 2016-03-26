(function() {

  var layerOrder = $('.layer');
  var count = layerOrder.length;

  function setOrder() {
    console.log('drop');
  }

  $(document).on('drop', function() {
    setOrder();
  });

})();