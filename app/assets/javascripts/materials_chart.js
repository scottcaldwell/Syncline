$(function () {

  var materialDetailsContainer = $('#material-details'),
      projectDetailsContainer = $('#project-details'),
      totalGravelThickness = 0,
      totalSandThickness = 0,
      totalSiltThickness = 0,
      totalClayThickness = 0,
      drillHolesGravelData = [],
      drillHolesSandData = [],
      drillHolesSiltData = [],
      drillHolesClayData = [],
      projectDetails;

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
    },
    getProjectDetails: function () {
      return $.ajax({
        url: '/sites/' + materialDetailsContainer.data('site-id') + '/projects.json',
        method: 'GET',
        dataType: 'json',
        success: function (result) {
          projectDetails = result;
        }
      });
    }
  };

  var helpers = {
    generateMaterialChart: function () {
      materialDetailsContainer.highcharts({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Meters Drilled by Material Type'
        },
        subtitle: {
          text: 'Click the columns to view details'
        },
        loading: {
          labelStyle: {
            color: 'white'
          },
          style: {
            backgroundColor: 'gray'
          }
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
    },
    generateProjectChart: function () {
      container.highcharts({
          chart: {
            type: 'area'
          },
          title: {
            text: 'Drilling Progress'
          },
          subtitle: {
            text: 'Actual v/s Predicted'
          },
          xAxis: {
            categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
          },
          yAxis: {
            title: {
                text: 'Meters Drilled'
            },
            labels: {
              formatter: function () {
                return this.value / 1000;
              }
            }
          },
          tooltip: {
            shared: true,
            valueSuffix: ' millions'
          },
          plotOptions: {
            area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                  lineWidth: 1,
                  lineColor: '#666666'
              }
            }
          },
          series: [{
            name: 'Actual',
            data: [502, 635, 809, 947, 1402, 3634, 5268]
          }, {
            name: 'Predicted',
            data: [106, 107, 111, 133, 221, 767, 1766]
          }]
      });
    }
  };

  if (materialDetailsContainer[0] !== undefined) {
    var drillHoles = materialDetailsContainer.data('drill-holes'),
        serverRequests = [],
        drillHoleName = '';
    helpers.generateMaterialChart();
    chart = materialDetailsContainer.highcharts();
    chart.showLoading();
    drillHoles.forEach(function (drillHole){
      var url = '/drill_holes/' + drillHole.id + '/layers.json';
      serverRequests.push(ajaxRequests.getLayerDetails(url, drillHole.name));
    });
    serverRequests.push(ajaxRequests.getProjectDetails());
    $.when.apply(null, serverRequests).done(helpers.generateMaterialChart, helpers.generateProjectChart);
  }
});
