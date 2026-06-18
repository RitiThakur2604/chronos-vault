const mongoose = require('mongoose');

const capsuleSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    unlockDate: {
        type: Date,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

capsuleSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Capsule', capsuleSchema);