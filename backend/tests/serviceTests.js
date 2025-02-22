const { getCodeforcesStats } = require('../services/codeforcesService');
const { getLeetCodeStats } = require('../services/leetcodeService');
const { getCodeChefStats } = require('../services/codechefService');
const { getHackerRankStats } = require('../services/hackerrankService');
const { getGeeksforGeeksStats } = require('../services/geeksforgeeksService');

async function runTests() {
  console.log('Running service tests...\n');

  // Test Codeforces service
  try {
    console.log('Testing Codeforces service...');
    const cfStats = await getCodeforcesStats('tourist');
    console.log('Codeforces stats:', cfStats);
    console.log('Codeforces test passed!\n');
  } catch (error) {
    console.error('Codeforces test failed:', error);
  }

  // Test LeetCode service
  try {
    console.log('Testing LeetCode service...');
    const lcStats = await getLeetCodeStats('jianchao-li');
    console.log('LeetCode stats:', lcStats);
    console.log('LeetCode test passed!\n');
  } catch (error) {
    console.error('LeetCode test failed:', error);
  }

  // Test CodeChef service
  try {
    console.log('Testing CodeChef service...');
    const ccStats = await getCodeChefStats('gennady.korotkevich');
    console.log('CodeChef stats:', ccStats);
    console.log('CodeChef test passed!\n');
  } catch (error) {
    console.error('CodeChef test failed:', error);
  }

  // // Test HackerRank service
  // try {
  //   console.log('Testing HackerRank service...');
  //   const hrStats = await getHackerRankStats('@Gennady');
  //   console.log('HackerRank stats:', hrStats);
  //   console.log('HackerRank test passed!\n');
  // } catch (error) {
  //   console.error('HackerRank test failed:', error);
  // }

  // // Test GeeksforGeeks service
  // try {
  //   console.log('Testing GeeksforGeeks service...');
  //   const gfgStats = await getGeeksforGeeksStats('jp546kxqc');
  //   console.log('GeeksforGeeks stats:', gfgStats);
  //   console.log('GeeksforGeeks test passed!\n');
  // } catch (error) {
  //   console.error('GeeksforGeeks test failed:', error);
  // }

  console.log('All tests completed.');
}

runTests();
