const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// Routes for managing users
router.route('/')
  .get(getAllUsers)  // GET all users
  .post(createUser); // POST to create a user

router.route('/:userId')
  .get(getUserById)  // GET a single user by ID
  .put(updateUser)   // PUT to update a user by ID
  .delete(deleteUser); // DELETE to remove a user by ID

// Routes for managing a user's friends
router.route('/:userId/friends/:friendId')
  .post(addFriend)    // POST to add a friend to the user's friend list
  .delete(removeFriend); // DELETE to remove a friend from the user's friend list

module.exports = router;
