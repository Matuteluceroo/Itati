import React, { useState } from 'react';
import {
  BarChart, LineChart, Bar, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import './ContentChart.css';
const ContentChart = ({ data }) => {
  const [chartType, setChartType] = useState('bar');
  const [activeCategory, setActiveCategory] = useState('all');

  // Preparar datos para Recharts
  const chartData = data.map(item => ({
    month: item.month,
    ...item
  }));

  return (
    <div className="content-dashboard">
      <div className="dashboard-header">
        <h2>Contenido creado por mes</h2>
        <div className="controls">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="category-select"
          >
            <option value="posts">Artículos</option>
            <option value="videos">Videos</option>
          </select>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>

          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {activeCategory === 'all' ? (
              <>
                <Line
                  type="monotone"
                  dataKey="posts"
                  name="Artículos"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ r: 6, strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="videos"
                  name="Videos"
                  stroke="#82ca9d"
                  strokeWidth={3}
                  dot={{ r: 6, strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </>
            ) : (
              <Line
                type="monotone"
                dataKey={activeCategory}
                name={activeCategory === 'posts' ? 'Artículos' : 'Videos'}
                stroke={activeCategory === 'posts' ? '#8884d8' : '#82ca9d'}
                strokeWidth={3}
                dot={{ r: 6, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            )}
          </LineChart>

        </ResponsiveContainer>
      </div>
    </div>
  ); x
};

export default ContentChart;
// import React, { useState } from 'react';
// import {
//   BarChart, LineChart, Bar, Line, XAxis, YAxis,
//   CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';
// import './ContentChart.css';

// const ContentChart = ({ data }) => {
//   const [chartType, setChartType] = useState('bar');
//   const [activeCategory, setActiveCategory] = useState('all');

//   const chartData = data.map(item => ({
//     month: item.month,
//     ...item
//   }));

//   return (
//     <div className="content-dashboard">
//       <div className="dashboard-header">
//         <h2>Contenido creado por mes</h2>
//         <div className="visualization-controls">
//           {/* Selector de tipo de gráfico mejorado */}
//           <div className="visualization-toggle">
//             <input
//               type="radio"
//               id="bar-view"
//               name="chartType"
//               checked={chartType === 'bar'}
//               onChange={() => setChartType('bar')}
//             />
//             <label htmlFor="bar-view" className="toggle-option">
//               <span className="toggle-icon">📊</span>
//               <span>Barras</span>
//             </label>

//             <input
//               type="radio"
//               id="line-view"
//               name="chartType"
//               checked={chartType === 'line'}
//               onChange={() => setChartType('line')}
//             />
//             <label htmlFor="line-view" className="toggle-option">
//               <span className="toggle-icon">📈</span>
//               <span>Líneas</span>
//             </label>
//           </div>

//           {/* Selector de categoría mejorado */}
//           <div className="category-picker">
//             <div className="category-dropdown">
//               <button className="dropdown-toggle">
//                 <span className="selected-category">
//                   {activeCategory === 'all' ? 'Todas las categorías' :
//                    activeCategory === 'posts' ? 'Artículos' : 'Videos'}
//                 </span>
//                 <span className="dropdown-arrow">▼</span>
//               </button>
//               <div className="dropdown-menu">
//                 <button
//                   className={activeCategory === 'all' ? 'active' : ''}
//                   onClick={() => setActiveCategory('all')}
//                 >
//                   Todas las categorías
//                 </button>
//                 <button
//                   className={activeCategory === 'posts' ? 'active' : ''}
//                   onClick={() => setActiveCategory('posts')}
//                 >
//                   Artículos
//                 </button>
//                 <button
//                   className={activeCategory === 'videos' ? 'active' : ''}
//                   onClick={() => setActiveCategory('videos')}
//                 >
//                   Videos
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Resto del componente igual... */}
//     </div>
//   );
// };
// export default ContentChart;