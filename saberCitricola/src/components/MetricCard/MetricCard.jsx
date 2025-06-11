import React from 'react';
import './MetricCard.css';

const MetricCard = ({ title, value, changePercentage = 0 }) => {
    const isPositive = changePercentage >= 0;
    const arrowIcon = isPositive ? '↑' : '↓';
    const changeText = `${Math.abs(changePercentage)}%`;

    return (
        <div className="metric-card">
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <div className={`change-indicator ${isPositive ? 'positive' : 'negative'}`}>
                    <span className="arrow">{arrowIcon}</span>
                    <span>{changeText}</span>
                </div>
            </div>

            <div className="card-value" style={{ color: isPositive ? '#10B981' : '#EF4444' }}>
                {value}
            </div>

            <div className="card-footer">
                <span className="trend-text">
                    {isPositive ? 'Aumento respecto al período anterior' : 'Disminución respecto al período anterior'}
                </span>
            </div>
        </div>
    );
};

export default MetricCard;

{/* <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
<MetricCard 
  title="Ventas este mes" 
  value="$24,780" 
  changePercentage={12.5} 
/>
<MetricCard 
  title="Usuarios nuevos" 
  value="1,429" 
  changePercentage={-3.2} 
/>
</div> */}