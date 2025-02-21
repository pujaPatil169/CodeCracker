const { getCodeforcesStats } = require('../services/codeforcesService');
const { getLeetCodeStats } = require('../services/leetcodeService');
const { getCodeChefStats } = require('../services/codechefService');
const { getHackerRankStats } = require('../services/hackerrankService');
const { getGeeksforGeeksStats } = require('../services/geeksforgeeksService');

// Get user profile with stats from all platforms
exports.getUserProfile = async (req, res) => {
  const { username } = req.query;

  try {
    const [codeforces, leetcode, codechef, hackerrank, geeksforgeeks] = await Promise.all([
      getCodeforcesStats(username),
      getLeetCodeStats(username),
      getCodeChefStats(username),
      getHackerRankStats(username),
      getGeeksforGeeksStats(username)
    ]);

    const profile = {
      username,
      platforms: [codeforces, leetcode, codechef, hackerrank, geeksforgeeks],
      totalSolved: codeforces.solved + leetcode.solved + 
                 codechef.solved + hackerrank.solved + geeksforgeeks.solved,
      overallAccuracy: calculateOverallAccuracy(
        codeforces, leetcode, codechef, hackerrank, geeksforgeeks
      )
    };

    res.json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user profile',
      details: error.message 
    });
  }
};

function calculateOverallAccuracy(...platforms) {
  const total = platforms.reduce((sum, platform) => 
    sum + parseFloat(platform.accuracy || 0), 0);
  return (total / platforms.length).toFixed(2);
}
