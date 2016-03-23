(function() {

  var chart = document.getElementById('layer-data');

  if (chart !== null) {

    var ctx = chart.getContext('2d');
    
    var data1 = [[1, 0, 0], [1, 255, 350], [1, 33, 550], [1, 190, 1080]];
    var data2 = [[2, 0, 0], [2, 130, 38], [2, 86, 545], [2, 15, 890]];
    var data3 = [[3, 0, 0], [3, 80, 465], [3, 186, 725], [3, 25, 1180]];
    // var toolTips = [];

    function resizeChart() {
      chart.width = $('.log-column-data').width();
      chart.height = $('#layers-log').height();
    }

    function setGrid() {
      var height = $('#layers-log').height();
      var width = $('.log-column-data').width();
      console.log(height, width);
      var linesH = height / 25;
      var linesV = width / 25;
      var i = 0;
      var j = 0;

      for (i; i < linesH; i++) {
        ctx.beginPath();
        ctx.strokeStyle = '#bbb';
        ctx.lineWidth = .5;
        ctx.moveTo(0, i * 25);
        ctx.lineTo(width, i * 25);
        ctx.stroke();
      }

      for (j; j < linesV; j++) {
        ctx.beginPath();
        ctx.strokeStyle = '#bbb';
        ctx.lineWidth = .5;
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
        var x = point[1]; // * 10;
        var y = point[2]; // / 100 * chart.height;
        
        ctx.fillStyle = color;
        ctx.fillRect(x - 5, y - 5, 10, 10);
        
        if (lastPoint) {
          ctx.strokeStyle = color;
          ctx.lineWidth = .2;
          ctx.lineTo(point[1], point[2]);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.strokeStyle = '#bbb';
          ctx.lineWidth = .5;
          ctx.moveTo(0, i * 25);
          ctx.lineTo(width, i * 25);
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
          var x = point[1]; // * 10;
          var y = point[2]; // / 100 * chart.height;
          
          ctx.fillStyle = color;
          ctx.fillRect(x - 5, y - 5, 10, 10);
          
          if (lastPoint) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.lineTo(point[1], point[2]);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.moveTo(x, y);
          }

          lastPoint = point;
        });
      }

      resizeChart();
      draw(data1, 'blue', true);
      draw(data2, 'green', false);
      draw(data3, 'red', false);
      setGrid();
    }
  }
})();