import './SkeletonLoader.css';

function SkeletonLoader() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-header"></div>
      <div className="skeleton-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
      <div className="skeleton-chart"></div>
    </div>
  );
}

export default SkeletonLoader;
