// const axios = require('axios');
// const cheerio = require('cheerio');

// async function getGeeksforGeeksStats(username) {
//   try {
//     const response = await axios.get(
//       `https://auth.geeksforgeeks.org/user/${username}/`,
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
    
//     // Extract solved problems
//     const solvedText = $('.profile-info-item').first().text().trim();
//     const solvedMatch = solvedText.match(/\d+/);
//     const solved = solvedMatch ? parseInt(solvedMatch[0]) : 0;
    
//     // Extract accuracy
//     const accuracyText = $('.profile-info-item').eq(1).text().trim();
//     const accuracyMatch = accuracyText.match(/\d+/);
//     const accuracy = accuracyMatch ? parseFloat(accuracyMatch[0]) : 0;
    
//     return {
//       name: 'GeeksforGeeks',
//       username,
//       solved,
//       accuracy,
//       recentActivity: getRecentActivity($)
//     };
//   } catch (error) {
//     console.error('Error fetching GeeksforGeeks data:', error);
//     return {
//       name: 'GeeksforGeeks',
//       username,
//       solved: 0,
//       accuracy: 0,
//       recentActivity: 'Data unavailable'
//     };
//   }
// }

// function getRecentActivity($) {
//   const activity = $('.profile-info').find('span').last().text().trim();
//   return activity || 'Recent activity not available';
// }

// module.exports = { getGeeksforGeeksStats };



const axios = require('axios');
const cheerio = require('cheerio');

async function getGeeksforGeeksStats(username) {
  try {
    const response = await axios.get(`https://auth.geeksforgeeks.org/user/${username}/`, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    });

    const $ = cheerio.load(response.data);

    // "Coding Score"
    const codingScoreLabel = $('div.d_dashboard_head_text__3FPhF:contains("Coding Score")');
    const codingScoreValue = codingScoreLabel.next('div.d_dashboard_head_text__3FPhF').text().trim();
    const codingScore = parseInt(codingScoreValue, 10) || 0;

    // "Problem Solved"
    const problemSolvedLabel = $('div.d_dashboard_head_text__3FPhF:contains("Problem Solved")');
    const problemSolvedValue = problemSolvedLabel.next('div.d_dashboard_head_text__3FPhF').text().trim();
    const problemSolved = parseInt(problemSolvedValue, 10) || 0;

    // "Contest Rating"
    const contestRatingLabel = $('div.d_dashboard_head_text__3FPhF:contains("Contest Rating")');
    const contestRatingValue = contestRatingLabel.next('div.d_dashboard_head_text__3FPhF').text().trim();
    const contestRating = parseInt(contestRatingValue, 10) || 0;

    return {
      name: 'GeeksforGeeks',
      username,
      codingScore,
      problemSolved,
      contestRating
    };
  } catch (err) {
    console.error('Error fetching GeeksforGeeks data:', err);
    return {
      name: 'GeeksforGeeks',
      username,
      codingScore: 0,
      problemSolved: 0,
      contestRating: 0
    };
  }
}

module.exports = { getGeeksforGeeksStats };

