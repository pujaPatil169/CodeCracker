const axios = require('axios');
// Fetch user data from LeetCode API (GraphQL)

async function getLeetCodeStats(username) {
  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              ranking
              reputation
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `,
      variables: { username }
    });

    const data = response.data.data.matchedUser;
    return {
      name: 'LeetCode',
      username: data.username,
      ranking: data.profile.ranking,
      reputation: data.profile.reputation,
      solved: data.submitStats.acSubmissionNum
        .reduce((sum, item) => sum + item.count, 0),
      accuracy: calculateAccuracy(data),
      recentActivity: getRecentActivity(data)
    };
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    throw error;
  }
}

function calculateAccuracy(data) {
  const total = data.submitStats.acSubmissionNum
    .reduce((sum, item) => sum + item.count, 0);
  const accepted = data.submitStats.acSubmissionNum[0].count;
  return ((accepted / total) * 100).toFixed(2);
}

function getRecentActivity(data) {
  // LeetCode API doesn't provide recent activity
  return 'Recent activity not available';
}

module.exports = { getLeetCodeStats };
