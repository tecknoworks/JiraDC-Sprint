const mongoose = require('mongoose')

const model = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    project_id: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model("Sprint", model)