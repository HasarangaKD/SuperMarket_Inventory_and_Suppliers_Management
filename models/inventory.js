const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    StockID: {type: String, required: true},
    ItemName: {type: String, required: true},
    ItemType: {type: String, required: true},
    quantity: {type: Number, required: true},
    UnitPrice: {type: Number, required: true},
});

module.exports = mongoose.model('Inventory', inventorySchema)