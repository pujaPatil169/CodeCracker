import { useDeduplicatedFetch } from '../hooks/useDeduplicatedFetch';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { socket, setupSocket } from '../services/api';
import { getUserProfile, getProgressData } from '../services/api';
import Charts from '../components/Charts';
import SkeletonLoader from '../components/SkeletonLoader';

function Profile() {
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('codeforces');
  const [stats, setStats] = useState({ rating: 0, ranking: 0, score: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/stats/${platform}?username=${username}`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
  const { data: profile, loading, error } = useDeduplicatedFetch(
    getUserProfile,
    'getUserProfile'
  );

  const [progressData, setProgressData] = useDeduplicatedFetch(
    getProgressData,
    'getProgressData'
  );

  useEffect(() => {
    setupSocket((data) => {
      setProgressData((prevData) => [...prevData, data]);
    });
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) return <SkeletonLoader />;
  if (error) return <div>Error: {error.message}</div>;
  
  return ( 
    <div className="profile">
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="codeforces">Codeforces</option>
          <option value="leetcode">LeetCode</option>
          <option value="codechef">CodeChef</option>
        </select>
        <button type="submit">Get Stats</button>
      </form>
      {profile && (
        <>
          <div className="profile-details">
            <h2>{profile.username}</h2>
            <p>Total Problems Solved: {profile.totalSolved}</p>
            <div className="user-stats">
              <p>Rating: {stats.rating}</p>
              <p>Ranking: {stats.ranking}</p>
              <p>Score: {stats.score}</p>
            </div>
            <div className="platform-stats">
              {profile.platforms.map(platform => (
                <div key={platform.name} className="platform">
                  <h3>{platform.name}</h3>
                  <p>Problems Solved: {platform.solved}</p>
                  <p>Accuracy: {platform.accuracy}%</p>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-container">
            <Charts progressData={progressData} />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
