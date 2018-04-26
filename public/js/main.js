let sortBy = 'route';
let sortOrder = 'descending';

function showDash() {
  $('.cards').css('display', 'none');
  $('.upload').css('display', 'none');
  $('.dashboard').css('display', '');
  if (!$('.dashboard').hasClass('active')) {
    $('#dashboard-link').addClass('active');
    $('#cards-link').removeClass('active');
    $('#upload-link').removeClass('active');
  }
}

function showCards() {
  $('.dashboard').css('display', 'none');
  $('.upload').css('display', 'none');
  $('.cards').css('display', '');
  if (!$('.cards').hasClass('active')) {
    $('#dashboard-link').removeClass('active');
    $('#cards-link').addClass('active');
    $('#upload-link').removeClass('active');
  }
}

function showUpload() {
  $('.dashboard').css('display', 'none');
  $('.cards').css('display', 'none');
  $('.upload').css('display', '');
  if (!$('.upload').hasClass('active')) {
    $('#dashboard-link').removeClass('active');
    $('#cards-link').removeClass('active');
    $('#upload-link').addClass('active');
  }
}

function init() {
  let jsonData = getData();
  renderCharts(jsonData);
  renderCards(jsonData);
}

function getData() {
  let climbs;

  $.getJSON('/api/get', function(data) {
      climbs = data.climbs
  });

  return climbs;
}

function renderCharts(data){
  let { barData, donutData, mapData } = buildChartData(data);
  buildBarChart(barData);
  buildDonutChart(donutData);
  initMap(mapData);
}



function buildChartData(data) {
  let chartData = {
    barData: [],
    donutData: [],
    mapData: []
  };

  let latLong = {};

  let tradCount = 0, sportCount = 0, trCount = 0;
  chartData.barData.push(['Route', 'Grade']);
  chartData.donutData.push(['Route', 'Type']);

  data.forEach(function(e) {
    chartData.barData.push([e.route, e.grade]);

    latLong = getLatLong(e.mountainProjectID);
    chartData.mapData.push(latLong);

    if (e.type == "Trad") {
      tradCount++;
    } else if (e.type == "Sport") {
      sportCount++;
    } else {
      trCount++;
    }
  });

  chartData.donutData.push(['Sport', sportCount],['Trad', tradCount],['TR', trCount]);

  return chartData;
}

function buildBarChart(data) {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    let dataSet = google.visualization.arrayToDataTable(data);

    var options = {
      title: 'Climbs, by difficulty',
      legend: { position: 'none' },
      colors: ['#4285F4'],

      hAxis: {
        ticks: [5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9]
      },

      label: {position: 'top', textStyle: {color: 'black', fontSize: 16}},

      histogram: {
        bucketSize: 0.1,
        maxNumBuckets: 50,
        minValue: 5.0,
        maxValue: 5.9
      }
    };

    var chart = new google.visualization.Histogram(document.getElementById('barChart-div'));
    chart.draw(dataSet, options);
  }
}

function buildDonutChart(data) {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var dataSet = google.visualization.arrayToDataTable(data);

    var options = {
      title: 'Climbs, by type',
      pieHole: 0.35,

      label: {position: 'top', textStyle: {color: 'black', fontSize: 16}},
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutChart-div'));
    chart.draw(dataSet, options);
  }
}

function initMap(data) {
  var map = new google.maps.Map(document.getElementById('mapChart-div'), {
    zoom: 3.5,
    center: {lat: 39.468, lng: -96.951}
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  data.forEach(function(e) {
    let latLong = {
      lat: e.lat,
      long: e.long
    };
    //console.log(e);
    geocodeLatLng(latLong, geocoder, map, infowindow);
  });
}

function geocodeLatLng(latLong, geocoder, map, infowindow) {
  var latlng = {lat: parseFloat(latLong.lat), lng: parseFloat(latLong.long)};
  //console.log(latlng)
  geocoder.geocode({'location': latlng}, function(results, status) {
    //console.log('got back from geocode')
    if (status === 'OK') {
      if (results[3]) {
        //map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[3].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

/*function buildMapChart(data) {
  console.log(data);
  google.charts.load('current', {
       'packages': ['geochart'],
       'mapsApiKey': 'AIzaSyB--A0zLqbECZkdTGg6cQaIdz9HQ4lB53I'
     });
  google.charts.setOnLoadCallback(drawMarkersMap);

  function drawMarkersMap() {
    var dataSet = google.visualization.arrayToDataTable(data);

    var options = {
      magnifyingGlass: {enable: true, zoomFactor: 7.5},
      region: 'US',
      resolution: 'provinces',
      displayMode: 'markers',
      colorAxis: {colors: ['#232F5B']},
      label:  {textStyle: {color: 'blue', fontSize: 16}}
    };

    var chart = new google.visualization.GeoChart(document.getElementById('mapChart-div'));
    chart.draw(dataSet, options);
  };

}*/

function renderCards(data) {
  for (i = 0; i < data.length; i++) {
    let id = data[i].mountainProjectID
    let mp = getMountainProjectData(id);
    let card = buildCard(data[i], mp);

    $("#cardHolder").append(card);
  }
}

$.ajaxSetup({
   async: false
 });

function getMountainProjectData(id) {
   let key = '112078870-2946e2b90eda472c67028f263ebccd88';
   let url ='https://www.mountainproject.com/data/get-routes?routeIds=' + id + '&key=' + key;
   let output;
   $.getJSON(url, function (data) {
    output = data.routes[0];
  });
  return output;
}

function getLatLong(id) {
  let key = '112078870-2946e2b90eda472c67028f263ebccd88';
  let url ='https://www.mountainproject.com/data/get-routes?routeIds=' + id + '&key=' + key;
  let latLong = {
    lat: String,
    long: String
  };

  $.getJSON(url, function (data) {
    latLong.lat = data.routes[0].latitude;
    latLong.long = data.routes[0].longitude;
 });

 return latLong;
}

function sortCards() {
  data = getData();

  if (sortBy === $('#sortBy').val() && sortOrder === $('#sortOrder').val()){
    return;
  } else {
    sortBy = $('#sortBy').val();
    sortOrder = $('#sortOrder').val();
  }

  let aName = 'a.' + sortBy;
  let bName = 'b.' + sortBy;
  console.log(bName);
  data.sort(function(a,b){
    if(sortOrder === 'descending') {
      return b[sortBy] > a[sortBy];
    } else {
      return b[sortBy] < a[sortBy];
    }
  });

  $('#cardHolder').empty();
  renderCards(data);
}

function buildCard(cardData, mpData){
    let emojiStars = '&#x2b50;';
    let date;

    if (typeof cardData.date != 'string') date = '12/31/' + data[i].date.toString().substring(2); // turn YYYY number into MM/DD/YY string
    date =  new Date(cardData.date).toLocaleDateString("en-US");

    for (let i = 0; i < cardData.stars - 1; i++) { emojiStars += '&#x2b50;' };
    return  '<div class="card col-md-3 col-sm-2 col-xs-1">'+
              '<div class="card-header">'+
                '<div class="routeImage justify-content-center row"><a href="http://www.mountainproject.com/route/' + mpData.id + '/"><img src="'+ mpData.imgMedium + '"></a></div>'+
                '<div class="routeName largeFont text-center">' + cardData.route + '</div>' +
              '</div>' +
              '<div class="stats">' +
                '<div class="routeStars largeFont row">' + emojiStars + '</div>' +

                '<div class="ratingContainer row">' +
                  '<div class="largeFont">' + cardData.grade + cardData.gradeModifier + '</div>' +
                  '<div class="regularFont d-flex align-self-end" style="margin-bottom: 8px; margin-left: 5px;">' + cardData.protection + '</div>' +
                '</div>' +

                '<div class="dateContainer row">'+
                  '<div class="regularFont text-left col-sm">' + date + '</div>' +
                  '<div class="regularFont text-right col-sm">' + cardData.type + '</div>' +
                '</div>' +

              '</div>' +
            '</div>';
    emojiStars = '';
}

window.addEventListener('load', init);
