const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/',  async (req, res) => {
  try {
     const emails = await User.find(req.params.email)
     res.json(emails)
   } catch (err) {
     console.error(err.message);
     res.status(500).send('Server error');
   }
 });
module.exports = router;
