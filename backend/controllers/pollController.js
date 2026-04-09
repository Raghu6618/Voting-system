const Poll = require('../models/Poll');
const Vote = require('../models/Vote');

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch polls' });
  }
};

exports.getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id)
      .populate('createdBy', 'name email');
    if (!poll) return res.status(404).json({ error: 'Poll not found' });
    
    // Get total votes for the poll
    const totalVotes = await Vote.countDocuments({ pollId: req.params.id });
    
    res.json({ ...poll.toObject(), totalVotes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch poll' });
  }
};

exports.createPoll = async (req, res) => {
  try {
    const { question, description, options } = req.body;
    
    // Validation
    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Question is required' });
    }
    if (!options || options.length < 2) {
      return res.status(400).json({ error: 'At least 2 options required' });
    }
    if (options.some(opt => !opt.trim())) {
      return res.status(400).json({ error: 'All options must be non-empty' });
    }
    
    const poll = new Poll({
      question: question.trim(),
      description: description?.trim() || '',
      options: options.map(opt => ({ text: opt.trim(), votes: 0 })),
      createdBy: req.user.id
    });
    
    await poll.save();
    await poll.populate('createdBy', 'name email');
    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create poll' });
  }
};

exports.deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });
    
    // Only creator or admin can delete
    if (poll.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this poll' });
    }
    
    // Delete poll and all votes for it
    await Poll.findByIdAndDelete(req.params.id);
    await Vote.deleteMany({ pollId: req.params.id });
    
    res.json({ message: 'Poll deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete poll' });
  }
};

exports.hasVoted = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingVote = await Vote.findOne({ userId, pollId: id });
    if (existingVote) {
      res.json({ hasVoted: true, optionIndex: existingVote.optionIndex });
    } else {
      res.json({ hasVoted: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to check vote status' });
  }
};

exports.vote = async (req, res) => {
  try {
    const { pollId, optionIndex } = req.body;
    const userId = req.user.id;

    // Validation
    if (!pollId || optionIndex === undefined) {
      return res.status(400).json({ error: 'pollId and optionIndex required' });
    }

    // Verify poll exists and get option count
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });
    
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: 'Invalid option index' });
    }

    // Check if already voted (strict enforcement at DB level + app level)
    const existingVote = await Vote.findOne({ userId, pollId });
    if (existingVote) {
      return res.status(400).json({ error: 'You have already voted on this poll' });
    }

    // Create vote with transaction-like behavior
    const vote = new Vote({ userId, pollId, optionIndex });
    await vote.save();

    // Update poll votes
    poll.options[optionIndex].votes += 1;
    poll.updatedAt = new Date();
    await poll.save();

    res.json({ message: 'Vote recorded successfully', vote });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ error: 'You have already voted on this poll' });
    }
    res.status(500).json({ error: 'Failed to record vote' });
  }
};