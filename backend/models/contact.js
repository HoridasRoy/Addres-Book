const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({

    name:       {type: String, required: true},
    contactNo:  {type: Number, required: true},
    address:    {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model('Contact', contactSchema);
