const axios = require('axios');
const cheerio = require('cheerio');
// Fetch user data from CodeChef (Scraping since no API)

async function getCodeChefStats(username) {
  try {
    const response = await axios.get(
      `https://www.codechef.com/users/${username}`
    );
    
    const $ = cheerio.load(response.data);
    const rating = $('.rating-number').text().trim();
    const solved = $('.problems-solved').find('h5').text().match(/\d+/)[0];
    const stars = $('.rating').text().trim().split('★').length - 1;
    
    return {
      name: 'CodeChef',
      username,
      rating: parseFloat(rating),
      stars,
      solved: parseInt(solved),
      accuracy: calculateAccuracy(rating),
      recentActivity: getRecentActivity($)
    };
  } catch (error) {
    console.error('Error fetching CodeChef data:', error);
    throw error;
  }
}

function calculateAccuracy(rating) {
  return ((parseFloat(rating) / 3500) * 100).toFixed(2);
}

function getRecentActivity($) {
  const activity = $('.user-details').find('span').last().text().trim();
  return activity || 'Recent activity not available';
}

module.exports = { getCodeChefStats };
