import React, { useState } from 'react';
import './BarChart.css';

const BarChart = ({
  title,
  data = [],
  labelKey = 'label',
  valueKey = 'value',
  defaultOrientation = 'horizontal',
  defaultSortOrder = 'desc',
  filterOptions = null,
  barColor = '#3b82f6',
  maxItems = 10,
  showValues = true
}) => {
  const [filter, setFilter] = useState(filterOptions ? filterOptions.options[0] : null);
  const [orientation, setOrientation] = useState(defaultOrientation);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);

  const processedData = [...data]
    .filter((item) => !filter || filter === 'Todos' || item[filterOptions?.key] === filter)
    .sort((a, b) => (sortOrder === 'asc' ? a[valueKey] - b[valueKey] : b[valueKey] - a[valueKey]))
    .slice(0, maxItems);

  const maxValue = Math.max(...processedData.map((item) => item[valueKey]), 0);

  return (
    <div className="bar-chart-container">
      <div className="chart-header">
        <h2 className="chart-title">{title}</h2>
        
        <div className="chart-controls">
          {filterOptions && (
            <select
              className="chart-filter-select"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              {filterOptions.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="orientation"
                value="horizontal"
                checked={orientation === 'horizontal'}
                onChange={() => setOrientation('horizontal')}
              />
              Horizontal
            </label>
            <label>
              <input
                type="radio"
                name="orientation"
                value="vertical"
                checked={orientation === 'vertical'}
                onChange={() => setOrientation('vertical')}
              />
              Vertical
            </label>
          </div>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="sortOrder"
                value="asc"
                checked={sortOrder === 'asc'}
                onChange={() => setSortOrder('asc')}
              />
              Ascendente
            </label>
            <label>
              <input
                type="radio"
                name="sortOrder"
                value="desc"
                checked={sortOrder === 'desc'}
                onChange={() => setSortOrder('desc')}
              />
              Descendente
            </label>
          </div>
        </div>
      </div>

      <div className={`chart-body ${orientation}`}>
        {processedData.map((item) => (
          <div key={item[labelKey]} className="chart-item">
            <span className="chart-label">{item[labelKey]}</span>
            <div
              className="chart-bar"
              style={{
                [orientation === 'horizontal' ? 'width' : 'height']: `${(item[valueKey] / maxValue) * 100}%`,
                backgroundColor: barColor
              }}
            >
              {showValues && <span className="chart-value">{item[valueKey]}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;