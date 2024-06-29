const express = require('express');
const Text = require('../models/text');

const router = express.Router();

// Get text
router.get('/', async (req, res) => {
  try {
    const text = await Text.findOne({});
    if (text) {
      res.send(text.content); // Send plain text content
    } else {
      res.send('');  // Return an empty string if no text is found
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
    res.status(200).send(text.content); // Send plain text response
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
