const express = require('express');
const { getPolls, getPoll, createPoll, deletePoll, vote, hasVoted } = require('../controllers/pollController');
const { auth, admin } = require('../middleware/auth');
const router = express.Router();

router.get('/', getPolls);
router.post('/vote', auth, vote);  // MUST be before /:id route
router.get('/:id/hasVoted', auth, hasVoted);
router.get('/:id', getPoll);
router.post('/', auth, admin, createPoll);
router.delete('/:id', auth, admin, deletePoll);

module.exports = router;