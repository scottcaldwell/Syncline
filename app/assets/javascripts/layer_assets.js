(function() {

  var layerAssets = {
    init: function(config) {
      var self = this;
      this.fieldPhotoBtns = config.fieldPhotoBtns;
      this.labBtns = config.labBtns
      this.photoModal = config.photoModal;
      this.fData = config.fData;
      this.lData = config.lData;
      this.bind(self);
    },

    bind: function(self) {
      self.fieldPhotoBtns.each(function() {
        $(this).on('click', layerAssets.openFieldModal)
      });

      self.labBtns.each(function() {
        $(this).on('click', layerAssets.openPDF)
      })
    },

    openFieldModal: function() {
      var layerId = $(this).parents('.layer').data('id');
      var photoUrl = (layerAssets.fData.data('photo')).replace(/app\/assets\/images\//, '/assets/');
      layerAssets.photoModal.find('img').attr('src', photoUrl);
      layerAssets.photoModal.addClass('is-active');
    },

    openPDF: function() {
      var layerId = $(this).parents('.layer').data('id');
      var pdfUrl = (layerAssets.lData.data('pdf')).replace(/app\/assets\/images\//, '/assets/');
      window.open(pdfUrl);
    },

  };

  layerAssets.init({
    fieldPhotoBtns: $('.show-field-photos'),
    labBtns: $('.show-lab-pdf'),
    photoModal: $('.photo-modal'),
    fData: $('#field-test-data span'),
    lData: $('#lab-test-data span')
  });

})();