import { useEffect, useState } from 'react';
import { getPlatformStats } from '../services/api';

function Home() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const platforms = ['leetcode', 'codeforces', 'hackerrank'];
        const statsData = await Promise.all(
          platforms.map(platform => getPlatformStats(platform))
        );
        setStats(statsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading platform statistics...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home">
      <h1>Welcome to CodeCracker</h1>
      <p>Your platform for tracking coding progress across multiple platforms</p>
      
      <div className="platform-stats">
        {stats.map((platform, index) => (
          <div key={index} className="platform">
            <h2>{platform.name}</h2>
            <p>Problems Solved: {platform.solved}</p>
            <p>Accuracy: {platform.accuracy}%</p>
            <p>Recent Activity: {platform.recentActivity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
