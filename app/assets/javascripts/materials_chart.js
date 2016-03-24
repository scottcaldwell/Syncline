$(function () {

  var materialDetailsContainer = $('#material-details'),
      projectDetailsContainer = $('#project-details'),
      totalGravelThickness,
      totalSandThickness,
      totalSiltThickness,
      totalClayThickness,
      drillHolesGravelData,
      drillHolesSandData,
      drillHolesSiltData,
      drillHolesClayData,
      projectDetails,
      depthDrilledByDate,
      datesDrilled = [],
      actualDrilling = [0],
      predictedDrilling = [0];

  var ajaxRequests = {
    getProjectDetails: function (url) {
      return $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (result) {
          projectDetails = result;
        }
      });
    },
    getSiteLayerDetails: function (url) {
      return $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (result) {
          depthDrilledByDate = result.depth_drilled_by_date;
          totalGravelThickness = result.total_gravel_thickness;
          totalSandThickness = result.total_sand_thickness;
          totalSiltThickness = result.total_silt_thickness;
          totalClayThickness = result.total_clay_thickness;
          drillHolesGravelData = result.drill_holes_gravel_data;
          drillHolesSandData = result.drill_holes_sand_data;
          drillHolesSiltData = result.drill_holes_silt_data;
          drillHolesClayData = result.drill_holes_clay_data;
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
        actualDrilling.push(parseFloat(depth.toFixed(2)));
      });
      var daysDrilled = datesDrilled.length,
          dateStarted = moment(datesDrilled[0]),
          dateEnded = moment(datesDrilled[daysDrilled - 1]),
          predictedEndDate = moment(projectDetails[0].drill_by_date),
          predictedDaysDrilled = predictedEndDate.diff(dateStarted, 'days') + 1,
          daysLeft = predictedEndDate.diff(dateEnded, 'days'),
          predictedDepthPerDay = projectDetails[0].drill_to_depth / predictedDaysDrilled;
      datesDrilled.unshift(dateStarted.subtract(1, 'days').utc().format('YYYY-MM-DD'));
      for (var i = 1; i <= daysLeft; i++) {
        datesDrilled.push(dateEnded.add(1, 'days').utc().format('YYYY-MM-DD'));
      }
      depth = 0;
      for (var i = 0; i < predictedDaysDrilled; i++) {
        depth += predictedDepthPerDay;
        predictedDrilling.push(parseFloat(depth.toFixed(2)));
      }
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
    var siteId = projectDetailsContainer.data('site-id'),
        serverRequests = [];
    helpers.generateMaterialChart();
    helpers.generateProjectChart();
    var materialChart = materialDetailsContainer.highcharts();
    var projectChart = projectDetailsContainer.highcharts();
    materialChart.showLoading();
    projectChart.showLoading();
    var url1 = '/sites/' + siteId + '/details.json';
    var url2 = '/sites/' + siteId + '/layers.json';
    serverRequests.push(ajaxRequests.getProjectDetails(url1));
    serverRequests.push(ajaxRequests.getSiteLayerDetails(url2));
    $.when.apply(null, serverRequests).done(helpers.processProjectChartData, helpers.generateProjectChart, helpers.generateMaterialChart);
  }
});
