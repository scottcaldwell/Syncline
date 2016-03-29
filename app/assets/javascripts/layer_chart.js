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
      var _this = $(this);
      var point = parseFloat(_this.data('from') + (parseFloat(_this.data('to')) - parseFloat(_this.data('from'))) / 2);
      var spts = parseFloat(_this.data('spts'));
      var sptAdj = 300 * (spts / 120);
      fData.push([ sptAdj, point * 100, spts ])
    });

    labTests.find('.lab-test').each(function(el) {
      var _this = $(this);
      var point = parseFloat(_this.data('from') + (parseFloat(_this.data('to')) - parseFloat(_this.data('from'))) / 2);
      var size = parseFloat(_this.data('size')); 
      var sizeAdj = 300 * (size / 120);
      lData.push([ sizeAdj, point * 100, size ])
    });

    resizeChart();
    draw(fData, 'blue', true, null);
    draw(lData, 'green', false, null);
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

  function draw(data, color, clear, evt) {
    // create an update function that calls the redraw and each individual draw event
    if (clear === true) {
      ctx.clearRect(0, 0, chart.width, chart.height);
    }

    var lastPoint;

    if (evt) {
      var pos = getMousePos(chart, evt);
    }

    data.forEach(function (point) {
      var x = parseInt(point[0]);
      var y = parseInt(point[1]);
      var hovered = false;

      if (evt && pos.x - 5 <= (x + 20) && pos.x >= (x - 20) && pos.y <= (y + 20) && pos.y - 5 >= (y - 20)) {
        hovered = true;
      } else {
        hovered = false;
      }

      ctx.fillStyle = color;

      if (hovered) {
        ctx.fillRect(x - 7, y - 7, 14, 14);
        highlightAxis(x,y);

        ctx.font = "12px sans-serif";
        ctx.fillStyle = '#333';
        if (color === 'blue') {
          ctx.fillText('SPT: ' + point[2], x + 8, y - 12);
        } else {
          ctx.fillText('Fines: ' + point[2], x + 8, y - 12);
        }

      } else {
        ctx.fillRect(x - 5, y - 5, 10, 10);
      }

      if (lastPoint) {
        ctx.beginPath();
        ctx.moveTo(lastPoint[0], lastPoint[1]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.3;
        ctx.lineTo(point[0], point[1]);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.strokeStyle = color;
        // ctx.lineWidth = 0.3;        
        // ctx.moveTo(0, 0);
        // ctx.lineTo(x, y);
        // ctx.stroke();
      }

      lastPoint = point;
    });
  }

  function highlightAxis(x,y) {
    // draw y-axis
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0.5;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, y);
    ctx.stroke();

    // draw x-axis
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0.5;
    ctx.moveTo(0, y);
    ctx.lineTo(300, y);
    ctx.stroke();    
  }

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }  

  $(document).on('layer-changed', function() {
    resizeChart();
    draw(fData, 'blue', true, null);
    draw(lData, 'green', false, null);
    setGrid();
  });

  $(chart).on('mousemove', function(e) {
    resizeChart();
    draw(fData, 'blue', true, e);
    draw(lData, 'green', false, e);
    setGrid();
  });

})();
