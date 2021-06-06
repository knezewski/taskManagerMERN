const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Board = require('../../models/Board');

// Add a board
router.post(
  '/',
  [auth, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, backgroundURL, description, selectedDate } = req.body;

      // Create and save the board
      const newBoard = new Board({ title, backgroundURL, description, selectedDate });
      const board = await newBoard.save();

      // Add board to user's boards
      const user = await User.findById(req.user.id);
      user.boards.unshift(board.id);
      await user.save();

      // Add user to board's members as admin
      board.members.push({ user: user.id, name: user.name, isAdmin: true });

      // Log activity
      board.activity.unshift({
        text: `${user.name} created this board`,
      });
      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Get user's boards
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const boards = [];
    for (const boardId of user.boards) {
      boards.push(await Board.findById(boardId));
    }

    res.json(boards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a board by id
router.get('/:id', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a board's activity
router.get('/activity/:boardId', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    res.json(board.activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Put a board's activity
router.put('/activity/:boardId', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
     // Log activity
    const { comment} = req.body
      const user = await User.findById(req.user.id);
      board.activity.unshift({
        text: `${user.name} add ${comment}`,
      });
      await board.save();
      res.json(board.activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Change a board
router.patch('/:id/:title/:description/:selectedDate',
  [auth, member, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // const { title, description, selectedDate } = formData;
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }

      // Log activity
      if (req.body.title !== board.title) {
        const user = await User.findById(req.user.id);
        board.activity.unshift({
          text: `${user.name} renamed this board's title from '${board.title}'`,
        });
      }

      if (req.body.description !== board.description) {
        const user = await User.findById(req.user.id);
        board.activity.unshift({
          text: `${user.name} renamed this board's description from '${board.description}'`,
        });
      }

      if (req.body.selectedDate !== board.selectedDate) {
        const user = await User.findById(req.user.id);
        const formatted = new Date(board.selectedDate).toLocaleDateString("ru-RU").split("/")
        board.activity.unshift({
          text: `${user.name} change this board's deadline from '${formatted}' `,
        });
      }

      board.title = req.body.title;
      board.description = req.body.description;
      board.selectedDate = req.body.selectedDate;
      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Change a board's title
router.patch(
  '/rename/:id',
  [auth, member, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }

      // Log activity
      if (req.body.title !== board.title) {
        const user = await User.findById(req.user.id);
        board.activity.unshift({
          text: `${user.name} renamed this board from '${board.title}'`,
        });
      }

      board.title = req.body.title;
      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Add a board member
router.put('/addMember/:userId/:group/:level/:label/:value', [auth, member], async (req, res) => {
  try {
    const { group, level, label, value } = req.params;
    const board = await Board.findById(req.header('boardId'));
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // See if already member of board
    if (board.members.map((member) => member.user).includes(req.params.userId)) {
      return res.status(400).json({ msg: 'Already member of board' });
    }

    // Add board to user's boards
    user.boards.unshift(board.id);
    await user.save();

    // Add user to board's members
    board.members.push({ user: user.id, name: user.name,  label:label, group:group, level:level, value:value, isAdmin: false });

    // Log activity
    board.activity.unshift({
      text: `${user.name} joined this board`,
    });
    await board.save();

    res.json(board.members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a member
router.delete('/deleteMember/:userId', [auth, member], async (req, res) => {
  try {
    const { userId } = req.params;
    const board = await Board.findById(req.header('boardId'));

    const status = board.members.filter(({isAdmin}) => {
      return isAdmin === true
    });

    //get board's admin id
    const userAdmin = status[0].user;

    const user = await User.findById(req.params.userId);

    const index = board.members.findIndex((item) => item.id === userId);

    if ( userId == userAdmin) {
      res.status(404).send(`Admin can not be deleted`);
    } else {
      board.members.splice(index, 1);


      // Delete board from user's boards
      user.boards.splice( user.boards.indexOf(board.id), 1);
      await user.save();


      // Log activity
      board.activity.unshift({
        text: `${user.name} was deleted from this board`,
      });
      await board.save();
    }
    res.json(board.members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
