const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    _id: Schema.ObjectId, car_id: Schema.ObjectId, buyer: String, seller: String,
    sale_total: Number
});


// get all sales belonging to a certain user
saleSchema.statics.findUserSales = function (username, cb) {
    return this.find({ buyer: username }, cb);
};


module.exports = mongoose.model("Sale", saleSchema);