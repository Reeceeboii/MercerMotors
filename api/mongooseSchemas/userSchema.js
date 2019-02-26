const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: Schema.ObjectId, owner_id: mongoose.Schema.ObjectId, make: String,
    model: String, release_date: Date, price: Number,
    type: String, gearbox: String
});

carSchema.statics.findByMake = function(make, cb) {
    return this.find({ make: make }, cb);
};


module.exports = mongoose.model('Car', carSchema);