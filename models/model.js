var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var climbSchema = new Schema({
  date: Date,
  location: {
    location1: String,
    location2: String,
    location3: String,
    location4: String
  },
  route: { type: String, required: true},
  grade: {
    number: Number,
    modifier: String,
    protection: String
  },
  type: String,
  myRole: String,
  partner: String,
  stars: Number,
  repeats: Number,
  notes: String,
  dateAdded : { type: Date, default: Date.now }
});


// export 'Person' model so we can interact with it in other files
module.exports = mongoose.model('Climb', climbSchema);
