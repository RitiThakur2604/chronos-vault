const mongoose = require('mongoose');

const intrusionLogSchema = new mongoose.Schema({
    capsuleToken: {
        type: String,
        required: true
    },
    attemptedAt: {
        type: Date,
        default: Date.now 
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('IntrusionLog', intrusionLogSchema);