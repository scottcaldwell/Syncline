$(function () {

  var container = $('#histogram'),
      totalGravelThickness = 0,
      totalSandThickness = 0,
      totalSiltThickness = 0,
      totalClayThickness = 0,
      drillHolesGravelData = [],
      drillHolesSandData = [],
      drillHolesSiltData = [],
      drillHolesClayData = [];

  var ajaxRequests = {
    getLayerDetails: function (url, drillHoleName) {
      return $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (result) {
          drillHolesGravelData.push(
            [drillHoleName, result.gravel_thickness]
          );
          drillHolesSandData.push(
            [drillHoleName, result.sand_thickness]
          );
          drillHolesSiltData.push(
            [drillHoleName, result.silt_thickness]
          );
          drillHolesClayData.push(
            [drillHoleName, result.clay_thickness]
          );
          totalGravelThickness += result.gravel_thickness;
          totalSandThickness += result.sand_thickness;
          totalSiltThickness += result.silt_thickness;
          totalClayThickness += result.clay_thickness;
        }
      });
    }
  };

  var helpers = {
    generateChart: function () {
      container.highcharts({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Meters Drilled by Material Type'
        },
        subtitle: {
          text: 'Click the columns to view details'
        },
        xAxis: {
          type: 'category',
          labels: {
              rotation: -45,
              style: {
                  fontSize: '14px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
        },
        yAxis: {
          title: {
            text: 'Cumilative Meters Drilled'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.2f}'
            }
          },
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
        },
        series: [{
          name: 'Materials',
          colorByPoint: true,
          data: [{
            name: 'Gravel',
            y: totalGravelThickness,
            drilldown: 'Gravel'
          }, {
            name: 'Sand',
            y: totalSandThickness,
            drilldown: 'Sand'
          }, {
            name: 'Silt',
            y: totalSiltThickness,
            drilldown: 'Silt'
          }, {
            name: 'Clay',
            y: totalClayThickness,
            drilldown: 'Clay'
          }]
        }],
        drilldown: {
          series: [{
            name: 'Gravel',
            id: 'Gravel',
            data: drillHolesGravelData
          }, {
            name: 'Sand',
            id: 'Sand',
            data: drillHolesSandData
          }, {
            name: 'Silt',
            id: 'Silt',
            data: drillHolesSiltData
          }, {
            name: 'Clay',
            id: 'Clay',
            data: drillHolesClayData
          }]
        }
      });
    }
  };

  if (container[0] !== undefined) {
    var drillHoles = container.data('drill-holes'),
        layerRequests = [],
        drillHoleName = '';
    drillHoles.forEach(function (drillHole){
      var url = '/drill_holes/' + drillHole.id + '/layers.json';
      layerRequests.push(ajaxRequests.getLayerDetails(url, drillHole.name));
    });
    $.when.apply(null, layerRequests).done(helpers.generateChart);
  }
});