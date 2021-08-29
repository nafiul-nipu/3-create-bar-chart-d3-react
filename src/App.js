import './App.css';
import {scaleBand, scaleLinear, max} from 'd3';

import { useData } from './components/useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Bar } from './components/Bar';

const width = 960;
const height = 500;
const margin = {top:20, right:20, bottom:20, left:200} 




function App() {
  const data = useData()

  if(!data){
    return <pre>Loading ...</pre>
  }

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const xValue = d => d.Population;
  const yValue = d => d.Country;

  const yScale = scaleBand()
                  .domain(data.map(yValue))
                  .range([0, innerHeight])

  const xScale = scaleLinear()
                  .domain([0, max(data, xValue)])
                  .range([0, innerWidth])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
      
      <AxisBottom 
        xScale ={xScale}
        innerHeight = {innerWidth}
      />

      <AxisLeft 
        yScale = {yScale}
      />

      <Bar 
        data={data}
        xScale = {xScale}
        yScale = {yScale}
        xValue = {xValue}
        yValue = {yValue}
      />
      </g>
    </svg>
  );

}

export default App;
 