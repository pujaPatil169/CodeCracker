const axios = require('axios');
// Fetch user data from Codeforces API

async function getCodeforcesStats(username) {
  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}`
    );
    
    const user = response.data.result[0];
    return {
      name: 'Codeforces',
      username: user.handle,
      rating: user.rating,
      maxRating: user.maxRating,
      rank: user.rank,
      solved: user.maxRating, // Temporary, needs actual solved count
      accuracy: calculateAccuracy(user),
      recentActivity: getRecentActivity(user)
    };
  } catch (error) {
    console.error('Error fetching Codeforces data:', error);
    throw error;
  }
}

function calculateAccuracy(user) {
  // Calculate accuracy based on submissions
  return ((user.rating / user.maxRating) * 100).toFixed(2);
}

function getRecentActivity(user) {
  // Get recent activity timestamp
  return new Date(user.lastOnlineTimeSeconds * 1000).toLocaleDateString();
}

module.exports = { getCodeforcesStats };
