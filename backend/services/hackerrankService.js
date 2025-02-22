// const axios = require('axios');
// const cheerio = require('cheerio');

// async function getHackerRankStats(username) {
//   try {
//     const response = await axios.get(
//       `https://www.hackerrank.com/profile/${username}`,
//       {
//         headers: {
//           'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
//           'Accept-Language': 'en-US,en;q=0.9',
//           'Accept-Encoding': 'gzip, deflate, br',
//           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//           'Connection': 'keep-alive'
//         }
//       }
//     );
    
//     const $ = cheerio.load(response.data);
    
//     // Debug: Log the entire profile section
//     console.log('Profile Section:', $('.profile-section').html());
    
//     // Extract solved problems
//     const solvedText = $('.profile-stat-value').first().text().trim();
//     const solvedMatch = solvedText.match(/\d+/);
//     const solved = solvedMatch ? parseInt(solvedMatch[0]) : 0;
    
//     // Extract accuracy
//     const accuracyText = $('.profile-stat-value').eq(1).text().trim();
//     const accuracyMatch = accuracyText.match(/\d+/);
//     const accuracy = accuracyMatch ? parseFloat(accuracyMatch[0]) : 0;
    
//     // Count badges
//     const badges = $('.badge-title').length;
    
//     return {
//       name: 'HackerRank',
//       username,
//       solved,
//       accuracy,
//       badges,
//       recentActivity: getRecentActivity($)
//     };
//   } catch (error) {
//     console.error('Error fetching HackerRank data:', error);
//     return {
//       name: 'HackerRank',
//       username,
//       solved: 0,
//       accuracy: 0,
//       badges: 0,
//       recentActivity: 'Data unavailable'
//     };
//   }
// }

// function getRecentActivity($) {
//   const activity = $('.profile-info').find('span').last().text().trim();
//   return activity || 'Recent activity not available';
// }

// module.exports = { getHackerRankStats };










const axios = require('axios');
const cheerio = require('cheerio');

async function getHackerRankStats(username) {
    try {
        const response = await axios.get(`https://www.hackerrank.com/${username}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Connection': 'keep-alive'
            }
        });

        const $ = cheerio.load(response.data);

        // Extracting profile name
        const name = $('h1.profile-heading').text().trim();

        // Extracting solved problems (modify selector based on actual page structure)
        const solved = $('div[data-automation="profile-contests-count"]').text().trim() || '0';

        // Extracting followers
        const followers = $('div[data-automation="social-followers-count"]').text().trim() || '0';

        // Extracting badges count
        const badges = $('div.badge-title').length || '0';

        return {
            platform: 'HackerRank',
            username,
            name,
            solved: parseInt(solved, 10),
            followers: parseInt(followers, 10),
            badges: parseInt(badges, 10),
            recentActivity: 'Data not available (HackerRank hides recent activity in JS)'
        };
    } catch (error) {
        console.error('Error fetching HackerRank data:', error);
        return {
            platform: 'HackerRank',
            username,
            solved: 0,
            followers: 0,
            badges: 0,
            recentActivity: 'Data unavailable'
        };
    }
}

// Usage Example
getHackerRankStats('your_username').then(console.log);

module.exports = { getHackerRankStats };
