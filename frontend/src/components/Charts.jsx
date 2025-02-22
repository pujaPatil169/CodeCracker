import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Charts({ progressData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progress Over Time',
      },
    },
  };

  const data = {
    labels: progressData?.map(item => item.date) || [],
    datasets: [
      {
        label: 'Problems Solved',
        data: progressData?.map(item => item.solved) || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Rating',
        data: progressData?.map(item => item.rating) || [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Ranking',
        data: progressData?.map(item => item.ranking) || [],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Score',
        data: progressData?.map(item => item.score) || [],
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      }
    ],
  };

  return (
    <div className="chart-container">
      <Line options={options} data={data} />
    </div>
  );
}

Charts.propTypes = {
  progressData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      solved: PropTypes.number.isRequired,
      rating: PropTypes.number,
      ranking: PropTypes.number,
      score: PropTypes.number
    })
  )
};

export default Charts;
