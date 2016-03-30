$(function () {
  
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
    var maxHeight = 10.0;

    for (var i = 0; i < numLayers; i++) {
      var scale = (i * 25) /100;
      var num = $('<p>').text(scale);
      if (scale === maxHeight){
        ruler.append($('<p>').css('page-break-after', 'always'));
        maxHeight += 10.0;
      }
      var step = $('<li>').append(num);
      ruler.append(step);
    }
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

  var chart = document.getElementById('layer-data');

  if (chart !== null) {
    var ctx = chart.getContext('2d');
    var fieldTests = $('#field-test-data');
    var labTests = $('#lab-test-data');
    var fData = [];
    var lData = [];

    fieldTests.find('.field-test').each(function(el) {
      var _this = $(this);
      var point = parseFloat(_this.data('from') + (parseFloat(_this.data('to')) - parseFloat(_this.data('from')) / 2));
      var spts = parseFloat(_this.data('spts'));
      var sptAdj = 300 * (spts / 120);
      fData.push([ sptAdj, point * 100, spts])
    });

    labTests.find('.lab-test').each(function(el) {
      var _this = $(this);
      var point = parseFloat(_this.data('from') + (parseFloat(_this.data('to')) - parseFloat(_this.data('from')) / 2));
      var size = parseFloat(_this.data('size')); 
      var sizeAdj = 300 * (size / 120);
      lData.push([ sizeAdj, point * 100, size])
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
        ctx.lineWidth = 0.3;        
        ctx.moveTo(0, 0);
        ctx.lineTo(x, y);
        ctx.stroke();
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
});