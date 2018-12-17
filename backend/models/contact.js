const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({

    name:       {type: String, required: true},
    contactNo:  {type: Number, required: true},
    address:    {type: String}
});

module.exports = mongoose.model('Contact', contactSchema);
