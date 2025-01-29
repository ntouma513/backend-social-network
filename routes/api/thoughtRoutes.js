const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtById).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
