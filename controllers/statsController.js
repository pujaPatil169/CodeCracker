const { getCodeforcesStats } = require('../services/codeforcesService');
const { getLeetCodeStats } = require('../services/leetcodeService');
const { getCodeChefStats } = require('../services/codechefService');
const { getHackerRankStats } = require('../services/hackerrankService');

// Get platform statistics
exports.getPlatformStats = async (req, res) => {
  const { platform } = req.params;
  const username = req.query.username; // Get username from query params

  try {
    let stats;
    switch (platform) {
      case 'codeforces':
        stats = await getCodeforcesStats(username);
        break;
      case 'leetcode':
        stats = await getLeetCodeStats(username);
        break;
      case 'codechef':
        stats = await getCodeChefStats(username);
        break;
      case 'hackerrank':
        stats = await getHackerRankStats(username);
        break;
      default:
        return res.status(404).json({ error: 'Platform not found' });
    }

    res.json(stats);
  } catch (error) {
    console.error(`Error fetching ${platform} stats:`, error);
    res.status(500).json({ 
      error: 'Failed to fetch platform stats',
      details: error.message 
    });
  }
};
