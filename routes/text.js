const express = require('express');
const Text = require('../models/text');

const router = express.Router();

// Get text
router.get('/', async (req, res) => {
  try {
    const text = await Text.findOne({});
    if (text) {
      res.json({ text: text.content });
    } else {
      res.json({ text: '' });  // Return an empty string if no text is found
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update text
router.post('/', async (req, res) => {
  const newText = req.body.text;
  try {
    let text = await Text.findOne({});
    if (text) {
      text.content = newText;
    } else {
      text = new Text({ content: newText });
    }
    await text.save();
    res.status(200).json({ message: 'Text updated successfully', text: text.content });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
