/* eslint-disable no-mixed-spaces-and-tabs */
// todo: Add y-axis data tags @AZID
import { Bar, defaults } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import { formatY, formatNumber, formatYear } from './FinancialTable.functions';

defaults.font.family =
   "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

export default function HoverChart({ data, count, row, range, ticker }) {
   const rangeUppercase = range.charAt(0).toUpperCase() + range.slice(1);
   const dataid = row.data || row.id;
   const rowdata = data[dataid];
   const type = row.format;

   const y = rowdata.map((current, index) => {
      const previous = row.format === 'growth' ? data[dataid][index + 1] : null;
      const revenue = row.format === 'margin' ? data.revenue[index] : null;

      const cellContent =
         type && type !== 'reduce_precision'
            ? formatNumber({
                 type,
                 current,
                 previous,
                 revenue,
              })
            : current;

      return parseFloat(cellContent);
   });

   // Format dates as years if annual
   let xdatadraft = data.datekey.slice(0, count);
   if (range === 'annual') {
      xdatadraft = xdatadraft.map((item) => {
         return formatYear(item);
      });
   }
   const xdata = xdatadraft;
   const ydata = y.slice(0, count);

   const xaxis = xdata.reverse();
   const yaxis = ydata.reverse();

   // Cut zero values from start of data array
   const ylength = yaxis.length;
   for (let i = 0; i < ylength; i++) {
      if (!yaxis[0]) {
         yaxis.shift();
         xaxis.shift();
      } else {
         break;
      }
   }

   const chartType = type === 'ratio' || type === 'percentage' ? 'line' : 'bar';
   const bgColor =
      type === 'ratio' || type === 'percentage'
         ? 'rgba(44, 98, 136, 0.4)'
         : 'rgba(44, 98, 136, 1)';

   return (
      <Bar
         data={{
            labels: xaxis,
            datasets: [
               {
                  type: chartType,
                  data: yaxis,
                  backgroundColor: bgColor,
                  borderColor: 'rgba(44, 98, 136, 1)',
                  fill: true,
                  pointRadius: 0,
                  pointHoverRadius: 5,
                  pointHitRadius: 10,
               },
            ],
         }}
         options={{
            maintainAspectRatio: false,
            scales: {
               x: {
                  ticks: {
                     color: '#323232',
                     font: {
                        size: 13,
                     },
                  },
                  grid: {
                     display: false,
                  },
               },
               y: {
                  position: 'right',
                  ticks: {
                     color: '#323232',
                     font: {
                        size: 13,
                     },
                     callback: function (value) {
                        return formatY(value, row.format);
                     },
                  },
                  grid: {
                     drawBorder: false,
                  },
               },
            },
            animation: {
               duration: 400,
            },
            plugins: {
               legend: {
                  display: false,
               },
               title: {
                  display: true,
                  text: `${ticker} ${row.title} (${rangeUppercase})`,
                  font: {
                     size: 18,
                  },
                  color: '#333',
                  padding: {
                     top: 4,
                     right: 0,
                     bottom: 12,
                     left: 0,
                  },
               },
               tooltip: {
                  backgroundColor: '#f6f7f8',
                  borderColor: '#ccc',
                  borderWidth: 1,
                  titleColor: '#323232',
                  bodyColor: '#323232',
                  titleFont: {
                     size: 17,
                     weight: '600',
                  },
                  bodyFont: {
                     size: 14,
                     weight: '400',
                  },
                  bodyFontColor: '#333',
                  bodyFontSize: 14,
                  bodyFontStyle: 400,
                  padding: 10,
                  displayColors: false,
               },
            },
         }}
      />
   );
}
