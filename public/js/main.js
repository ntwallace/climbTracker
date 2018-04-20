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
  }
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

let barData = [];
let donutData = [];
let mapData = [];


function init() {
  renderCharts();
  renderCards(jsonData);
}

function renderCharts(){
  buildChartData();
  buildBarChart();
  buildDonutChart();
  buildMapChart();
}

function buildChartData() {
  let tradCount = 0, sportCount = 0, trCount = 0;
  barData.push(['Route', 'Grade']);
  donutData.push(['Route', 'Type']);
  mapData.push(['City', 'Count']);

  jsonData.forEach(function(e) {
    barData.push([e.route, e.grade]);

    if (e.type == "Trad") {
      tradCount++;
    } else if (e.type == "Sport") {
      sportCount++;
    } else {
      trCount++;
    }
  });

  donutData.push(['Sport', sportCount],['Trad', tradCount],['TR', trCount]);
  mapData.push(['New Paltz, NY', jsonData.length]);
  console.log(mapData);
}

function buildBarChart() {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    let data = google.visualization.arrayToDataTable(barData);

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
    chart.draw(data, options);
  }
}

function buildDonutChart() {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(donutData);

    var options = {
      title: 'Climbs, by type',
      pieHole: 0.35,

      label: {position: 'top', textStyle: {color: 'black', fontSize: 16}},
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutChart-div'));
    chart.draw(data, options);
  }
}

function buildMapChart() {
  google.charts.load('current', {
       'packages': ['geochart'],
       'mapsApiKey': ' AIzaSyB--A0zLqbECZkdTGg6cQaIdz9HQ4lB53I'
     });
  google.charts.setOnLoadCallback(drawMarkersMap);

  function drawMarkersMap() {
    var data = google.visualization.arrayToDataTable(mapData);

    var options = {
      magnifyingGlass: {enable: true, zoomFactor: 7.5},
      region: 'US-NY',
      resolution: 'provinces',
      displayMode: 'markers',
      colorAxis: {colors: ['#232F5B']},
      label:  {textStyle: {color: 'blue', fontSize: 16}}
    };

    var chart = new google.visualization.GeoChart(document.getElementById('mapChart-div'));
    chart.draw(data, options);
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
    return  '<div class="card">'+
              '<div class="header border">'+
                '<a href="http://www.mountainproject.com/route/' + mpData.id + '/"><img src="'+ mpData.imgMedium + '"></a>'+
                '<div class="largeFont routeName">' + cardData.route + '</div>' +
              '</div>' +
              '<div class="stats border">' +
                '<div class="statsHolder box">' +
                  '<div class="largeFont">' + emojiStars + '</div>' +
                '</div>' +
                '<div class="ratingContainer border">' +
                  '<div class="largeFont">' + cardData.grade + cardData.gradeModifier + '</div>' +
                  '<div class="regularFont">' + cardData.protection + '</div>' +
                '</div>' +
                '<div class="dateContainer">'+
                  '<div class="regularFont">' + cardData.date + '</div>' +
                  '<div class="regularFont">' + cardData.type + '</div>' +
                '</div>' +
              '</div>' +
            '</div>'
                /*'</div>' +
              '</div>' +
              '<div class="statsHolder">'+
                '<div class="regularFont">' + cardData.date + '</div>' +
              '</div>' +
              '<div class="stats border">'+
                '<div class="statsHolder">'+
                '</div>'+
              '</div>' +
              '<div class="interests">'+
                '<div class="heading">Data Interests</div>'+
                '<div class="tagHolder">'+
                    cardData.dataInterest.map(tag => '<div class="tag">'+tag+'</div>');
                '</div>'+
              '</div>'+
            '</div>'*/;
    emojiStars = '';
}

window.addEventListener('load', init);
