var jsonData = [
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
    "protection": "PG",
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
]

let sortBy = 'route';
let sortOrder = 'descending';


function init() {
    renderCards(jsonData);
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

  // sortBy = "Stars"
  let aName = 'a.' + sortBy;
  let bName = 'b.' + sortBy;
  console.log(bName);
  jsonData.sort(function(a,b){
    if(sortOrder === 'descending') {
      return b[sortBy] < a[sortBy];
    } else {
      return b[sortBy] > a[sortBy];
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
                '<div class="statsHolder">' +
                  '<div class="largeFont">' + emojiStars + '</div>' +
                  '<div class="ratingContainer">' +
                    '<div class="largeFont">' + cardData.grade + '</div>' +
                    '<div class="regularFont">' + cardData.gradeModifier + cardData.protection + '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="statsHolder">'+
                '<div class="regularFont">' + cardData.date + '</div>' +
              '</div>' /*+
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
