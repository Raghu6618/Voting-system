const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true, index: true },
  optionIndex: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, index: true }
}, { timestamps: true });

// Ensure one vote per user per poll (strict enforcement)
voteSchema.index({ userId: 1, pollId: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);