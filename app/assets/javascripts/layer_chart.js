(function() {

  'use strict';

  var chart = document.getElementById('layer-data');

  if (chart !== null) {
    var ctx = chart.getContext('2d');
    var fieldTests = $('#field-test-data');
    var labTests = $('#lab-test-data');
    var fData = [];
    var lData = [];

    fieldTests.find('.field-test').each(function(el) {
      fData.push([ $(this).data('to') * 40, $(this).data('from') * 100 ]);
    });

    labTests.find('.lab-test').each(function(el) {
      lData.push([ $(this).data('to') * 80, $(this).data('from') * 100 ]);
    });

    resizeChart();
    draw(fData, 'blue', true);
    draw(lData, 'green', false);
    setGrid();
  }

  function resizeChart() {
    chart.width = $('.log-column-data').width();
    chart.height = $('#layers-log').height();
  }

  function setGrid() {
    var height = $('#layers-log').height();
    var width = $('.log-column-data').width();
    var linesH = height / 25;
    var linesV = width / 25;
    var i = 0;
    var j = 0;

    for (i; i < linesH; i++) {
      ctx.beginPath();
      ctx.strokeStyle = '#bbb';
      ctx.lineWidth = 0.5;
      ctx.moveTo(0, i * 25);
      ctx.lineTo(width, i * 25);
      ctx.stroke();
    }

    for (j; j < linesV; j++) {
      ctx.beginPath();
      ctx.strokeStyle = '#bbb';
      ctx.lineWidth = 0.5;
      ctx.moveTo(j * 25, 0);
      ctx.lineTo(j * 25, height);
      ctx.stroke();
    }
  }

  function draw(data, color, clear) {
    // create an update function that calls the redraw and each individual draw event
    if (clear === true) {
      ctx.clearRect(0, 0, chart.width, chart.height);
    }

    var lastPoint;

    data.forEach(function (point) {
      var x = point[0];
      var y = point[1];

      ctx.fillStyle = color;
      ctx.fillRect(x - 5, y - 5, 10, 10);

      if (lastPoint) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.3;
        ctx.lineTo(point[0], point[1]);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
      }

      lastPoint = point;
    });
  }

  $(document).on('layer-changed', function() {
    resizeChart();
    draw(fData, 'blue', true);
    draw(lData, 'green', false);
    // draw(data3, 'red', false);
    setGrid();
  });

})();
