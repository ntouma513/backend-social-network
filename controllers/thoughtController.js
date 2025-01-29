const { User, Thought } = require('../models');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
        .populate('reactions')
        .sort({ createdAt: -1 });

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId)
        .populate('reactions');

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const user = await User.findById(req.body.userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const thought = await Thought.create(req.body);
      await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });

      res.json({ message: 'Thought successfully created', thought });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      await User.updateMany(
        { thoughts: thought._id },
        { $pull: { thoughts: thought._id } }
      );

      res.json({ message: 'Thought deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json({ message: 'Reaction deleted', thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
