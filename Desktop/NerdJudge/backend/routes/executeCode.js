const express = require('express');
const router = express.Router();
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');

router.post('/run', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    const filepath = await generateFile('cpp', code);
    const output = await executeCpp(filepath);
    res.json({ output }); // Only one response call here
  } catch (err) {
    console.error('Error executing code:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to execute code' });
    }
  }
});

module.exports = router;
