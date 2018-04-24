let jsonData = [
  {
    "date": 2016,
    "mountainProjectID": 105888225,
    "route": "Bunny",
    "grade": 5.4,
    "gradeModifier": "",
    "protection": "PG",
    "type": "Trad",
    "myRole": "Second",
    "partner": "Justin Cina",
    "stars": 3,
    "repeats": 0,
    "notes": ""
  },
  {
    "date": 2016,
    "mountainProjectID": 106099552,
    "route": "Harvard",
    "grade": 5.4,
    "gradeModifier": "",
    "protection": "PG",
    "type": "Trad",
    "myRole": "Second",
    "partner": "Justin Cina",
    "stars": 3,
    "repeats": 0,
    "notes": ""
  },
  {
    "date": 2016,
    "mountainProjectID": 106034654,
    "route": "Easy Overhang",
    "grade": 5.2,
    "gradeModifier": "",
    "protection": "PG",
    "type": "Trad",
    "myRole": "Second",
    "partner": "Justin Cina",
    "stars": 2,
    "repeats": 0,
    "notes": ""
  },
  {
    "date": 2017,
    "mountainProjectID": 105810464,
    "route": "Laurel",
    "grade": 5.7,
    "gradeModifier": "",
    "protection": "G",
    "type": "Tope Rope",
    "myRole": "TR",
    "partner": "Justin Cina",
    "stars": 3,
    "repeats": 1,
    "notes": ""
  },
  {
    "date": 2017,
    "mountainProjectID": 105810485,
    "route": "Rhododendron",
    "grade": 5.6,
    "gradeModifier": "",
    "protection": "G",
    "type": "Top Rope",
    "myRole": "TR",
    "partner": "Justin Cina",
    "stars": 2,
    "repeats": 1,
    "notes": ""
  },
  {
    "date": 2017,
    "mountainProjectID": 105954124,
    "route": "High Corner",
    "grade": 5.5,
    "gradeModifier": "",
    "protection": "PG-13",
    "type": "Trad",
    "myRole": "Second",
    "partner": "Justin Cina",
    "stars": 1,
    "repeats": 0,
    "notes": "P1 only"
  },
  {
    "date": 2017,
    "mountainProjectID": 106089237,
    "route": "Grim-Ace Face",
    "grade": 5.9,
    "gradeModifier": "+",
    "protection": "R",
    "type": "Trad",
    "myRole": "Second",
    "partner": "Justin Cina",
    "stars": 3,
    "repeats": 0,
    "notes": "P2 only"
  },
  {
    "date": 2017,
    "mountainProjectID": 105968655,
    "route": "Dennis",
    "grade": 5.5,
    "gradeModifier": "",
    "protection": "PG",
    "type": "Trad",
    "myRole": "Second",
    "partner": "Justin Cina",
    "stars": 3,
    "repeats": 0,
    "notes": ""
  },
  {
    "date": 2017,
    "mountainProjectID": 105799108,
    "route": "Three Pines",
    "grade": 5.3,
    "gradeModifier": "",
    "protection": "PG",
    "type": "Trad",
    "myRole": "Second",
    "partner": "Justin Cina",
    "stars": 2,
    "repeats": 1,
    "notes": ""
  },
  {
    "date": "6/10/17",
    "mountainProjectID": 105798994,
    "route": "High Exposure",
    "grade": 5.6,
    "gradeModifier": "+",
    "protection": "PG",
    "type": "Trad",
    "myRole": "Second",
    "partner": "Justin Cina",
    "stars": 5,
    "repeats": 0,
    "notes": ""
  },
  {
    "date": "6/15/17",
    "mountainProjectID": 105815029,
    "route": "Middle Earth",
    "grade": 5.6,
    "gradeModifier": "",
    "protection": "PG",
    "type": "Trad",
    "myRole": "Second",
    "partner": "Justin Cina",
    "stars": 3,
    "repeats": 0,
    "notes": ""
  },
  {
    "date": "6/21/17",
    "mountainProjectID": 105920873,
    "route": "Betty",
    "grade": 5.4,
    "gradeModifier": "",
    "protection": "PG",
    "type": "Trad",
    "myRole": "Lead",
    "partner": "Chris Doty",
    "stars": 4,
    "repeats": 2,
    "notes": "P2 variation (5.4)"
  },
  {
    "date": "6/22/17",
    "mountainProjectID": 105812940,
    "route": "Jackie",
    "grade": 5.5,
    "gradeModifier": "",
    "protection": "PG",
    "type": "Trad",
    "myRole": "Lead",
    "partner": "Chris Doty",
    "stars": 4,
    "repeats": 0,
    "notes": ""
  },
  {
    "date": "2/21/18",
    "mountainProjectID": 106101970,
    "route": "Belly Roll",
    "grade": 5.4,
    "gradeModifier": "",
    "protection": "PG",
    "type": "Trad",
    "myRole": "Lead",
    "partner": "Mike Kim",
    "stars": 3,
    "repeats": 1,
    "notes": ""
  },
  {
    "date": "4/13/18",
    "mountainProjectID": 105968655,
    "route": "Dennis",
    "grade": 5.5,
    "gradeModifier": "",
    "protection": "PG",
    "type": "Trad",
    "myRole": "Lead",
    "partner": "Chris",
    "stars": 3,
    "repeats": 1,
    "notes": ""
  }
]

let sortBy = 'route';
let sortOrder = 'descending';

function showDash() {
  $('.cards').css('display', 'none');
  $('.dashboard').css('display', '');
  $('#dashboard-link').toggleClass('active');
  $('#cards-link').toggleClass('active');
}

function showCards() {
  $('.dashboard').css('display', 'none');
  $('.cards').css('display', '');
  $('#cards-link').toggleClass('active');
  $('#dashboard-link').toggleClass('active');
}

function init() {
  //let jsonData = getData();
  renderCharts(jsonData);
  renderCards(jsonData);
}

function getData() {
  $.getJSON('/api/get', function(data) {
      console.log(data);
      return data;
  });
}

function renderCharts(data){
  let { barData, donutData, mapData } = buildChartData(data);
  buildBarChart(barData);
  buildDonutChart(donutData);
  buildMapChart(mapData);
}

function buildChartData(data) {
  let chartData = {
    barData: [],
    donutData: [],
    mapData: []
  };

  let tradCount = 0, sportCount = 0, trCount = 0;
  chartData.barData.push(['Route', 'Grade']);
  chartData.donutData.push(['Route', 'Type']);
  chartData.mapData.push(['City', 'Count']);

  data.forEach(function(e) {
    chartData.barData.push([e.route, e.grade]);

    if (e.type == "Trad") {
      tradCount++;
    } else if (e.type == "Sport") {
      sportCount++;
    } else {
      trCount++;
    }
  });

  chartData.donutData.push(['Sport', sportCount],['Trad', tradCount],['TR', trCount]);
  chartData.mapData.push(['New Paltz, NY', data.length]);

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
        ticks: [5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9]
      },

      label: {position: 'top', textStyle: {color: 'black', fontSize: 16}},

      histogram: {
        bucketSize: 0.1,
        maxNumBuckets: 100,
        minValue: 5.1,
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

function buildMapChart(data) {
  google.charts.load('current', {
       'packages': ['geochart'],
       'mapsApiKey': ' AIzaSyB--A0zLqbECZkdTGg6cQaIdz9HQ4lB53I'
     });
  google.charts.setOnLoadCallback(drawMarkersMap);

  function drawMarkersMap() {
    var dataSet = google.visualization.arrayToDataTable(data);

    var options = {
      magnifyingGlass: {enable: true, zoomFactor: 7.5},
      region: 'US-NY',
      resolution: 'provinces',
      displayMode: 'markers',
      colorAxis: {colors: ['#232F5B']},
      label:  {textStyle: {color: 'blue', fontSize: 16}}
    };

    var chart = new google.visualization.GeoChart(document.getElementById('mapChart-div'));
    chart.draw(dataSet, options);
  };

}

function renderCards(data) {
    let addMonthDay = '12/31/'
    for (i = 0; i < data.length; i++) {
      if (typeof data[i].date != 'string') data[i].date = addMonthDay + data[i].date.toString().substring(2); // turn YYYY number into MM/DD/YY string
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

function sortCards() {
  if (sortBy === $('#sortBy').val() && sortOrder === $('#sortOrder').val()){
    return;
  } else {
    sortBy = $('#sortBy').val();
    sortOrder = $('#sortOrder').val();
  }

  let aName = 'a.' + sortBy;
  let bName = 'b.' + sortBy;
  console.log(bName);
  jsonData.sort(function(a,b){
    if(sortOrder === 'descending') {
      return b[sortBy] > a[sortBy];
    } else {
      return b[sortBy] < a[sortBy];
    }
  });

  $('#cardHolder').empty();
  renderCards(jsonData);
}

function buildCard(cardData, mpData){
    let emojiStars = '&#x2b50;';
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
                  '<div class="regularFont text-left col-sm">' + cardData.date + '</div>' +
                  '<div class="regularFont text-right col-sm">' + cardData.type + '</div>' +
                '</div>' +

              '</div>' +
            '</div>';
    emojiStars = '';
}

window.addEventListener('load', init);
