 import './App.css';
 import { useState, useCallback, useEffect } from 'react';
 import { csv, scaleBand, scaleLinear, max} from 'd3';
 
 const width = 960;
 const height = 500;
 const margin = {top:20, right:20, bottom:20, left:200}
 
 const csvUrl = "https://gist.githubusercontent.com/nafiul-nipu/e78beffe3c5e9306b93d3a8c1dfd1164/raw/UN_Population.csv"
 

 function App() {
   const [data, setData] = useState(null)
 
   useEffect(() =>{
     // //  loadding the data
     const row = d => {
       d.Population = +d['2020']
       return d
     }
     csv(csvUrl, row).then(data => {
       setData(data.slice(0, 10))
     });
   }, []);
 
   if(!data){
     return <pre>Loading ...</pre>
   }

   const innerHeight = height - margin.top - margin.bottom
   const innerWidth = width - margin.left - margin.right


   const yScale = scaleBand()
                    .domain(data.map(d => d.Country))
                    .range([0, innerHeight])

   const xScale = scaleLinear()
                    .domain([0, max(data, d=> d.Population)])
                    .range([0, innerWidth])
 
   return (
     <svg width={width} height={height}>
       <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xScale.ticks().map(tickeValue => (
          <g key={tickeValue} transform={`translate(${xScale(tickeValue)},0)`}>
            <line
              y2={innerHeight}
              stroke='black'
            />
            <text 
              y={innerHeight + 5}
              dy={"0.71em"}
              style={{textAnchor:'middle'}}
            >{tickeValue}</text>
          </g>
        ))}

        {yScale.domain().map(tickeValue => (          
            <text 
             key={tickeValue}
             y={yScale(tickeValue) + yScale.bandwidth() / 2}
             style={{textAnchor:'end'}}
             x={-3}
             dy={'0.32em'}
            >{tickeValue}</text>
         
        ))}


        {data.map(d => <rect 
            key={d.Country}
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
        />)}
       </g>
     </svg>
   );
 
 }
 
 export default App;
 