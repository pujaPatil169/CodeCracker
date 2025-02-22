
const Progress = require('../models/Progress');

// Get progress data
exports.getProgressData = async (req, res) => {
  try {
    const { username } = req.query;
    const progressData = await Progress.find({ username })
      .sort({ date: 1 })
      .select('date solved rating ranking score -_id');
      
    res.json(progressData);
  } catch (error) {
    console.error('Error fetching progress data:', error);
    res.status(500).json({ error: 'Failed to fetch progress data' });
  }
};
