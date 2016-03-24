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
      projectDetails,
      depthDrilledByDate,
      datesDrilled = [],
      actualDrilling = [],
      predictedDrilling;

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
        url: '/sites/' + projectDetailsContainer.data('site-id') + '/projects.json',
        method: 'GET',
        dataType: 'json',
        success: function (result) {
          projectDetails = result;
        }
      });
    },
    getSiteLayerDetails: function () {
      return $.ajax({
        url: '/sites/' + projectDetailsContainer.data('site-id') + '/layers.json',
        method: 'GET',
        dataType: 'json',
        success: function (result) {
          depthDrilledByDate = result;
        }
      });
    }
  };

  var helpers = {
    processProjectChartData: function () {
      var depth = 0;
      depthDrilledByDate.forEach(function (dateAndDepth) {
        datesDrilled.push(dateAndDepth.date_drilled);
        depth += dateAndDepth.total_thickness;
        actualDrilling.push(parseFloat(dateAndDepth.total_thickness.toFixed(2)));
      });
      var daysDrilled = datesDrilled.length; 
      var predictedDepthPerDay = projectDetails[0].drill_to_depth / daysDrilled;
      depth = 0;
      predictedDrilling = Array.apply(null, {length: daysDrilled}).map(function () {
        depth += predictedDepthPerDay;
        return parseFloat(predictedDepthPerDay.toFixed(2));
      });
    },
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
      projectDetailsContainer.highcharts({
          chart: {
            type: 'area'
          },
          title: {
            text: 'Drilling Progress'
          },
          subtitle: {
            text: 'Actual v/s Predicted'
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
            categories: datesDrilled,
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
                text: 'Meters Drilled'
            },
          },
          tooltip: {
            shared: true,
            valueSuffix: ' meters'
          },
          plotOptions: {
            area: {
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                lineWidth: 1,
                lineColor: '#666666'
              }
            }
          },
          series: [{
            name: 'Predicted',
            data: predictedDrilling
          }, {
            name: 'Actual',
            data: actualDrilling
          }]
      });
    }
  };

  if (materialDetailsContainer[0] !== undefined) {
    var drillHoles = materialDetailsContainer.data('drill-holes'),
        serverRequests = [];
    helpers.generateMaterialChart();
    helpers.generateProjectChart();
    materialChart = materialDetailsContainer.highcharts();
    projectChart = projectDetailsContainer.highcharts();
    materialChart.showLoading();
    projectChart.showLoading();
    drillHoles.forEach(function (drillHole){
      var url = '/drill_holes/' + drillHole.id + '/layers.json';
      serverRequests.push(ajaxRequests.getLayerDetails(url, drillHole.name));
    });
    serverRequests.push(ajaxRequests.getProjectDetails());
    serverRequests.push(ajaxRequests.getSiteLayerDetails());
    $.when.apply(null, serverRequests).done(helpers.processProjectChartData, helpers.generateProjectChart, helpers.generateMaterialChart);
  }
});
