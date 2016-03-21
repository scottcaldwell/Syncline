(function() {
	// sets the height of each layer based on data-layer value
	var layers = $('#layers-log');
	layers.find('.layer').each(function() {
    var _self = $(this);
    var height = parseInt(_self.data('height')) * 100 + 'px';
    _self.css('height', height);
	});
})();