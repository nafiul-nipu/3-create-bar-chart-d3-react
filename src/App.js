 import './App.css';
 import { useState, useCallback, useEffect } from 'react';
 import { csv, scaleBand, scaleLinear, max} from 'd3';
 
 const width = 960;
 const height = 500;
 
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

   const yScale = scaleBand()
                    .domain(data.map(d => d.Country))
                    .range([0, height])

   const xScale = scaleLinear()
                    .domain([0, max(data, d=> d.Population)])
                    .range([0, width])
 
   return (
     <svg width={width} height={height}>
       {data.map(d => <rect 
          x={0}
          y={yScale(d.Country)}
          width={xScale(d.Population)}
          height={yScale.bandwidth()}
       />)}
     </svg>
   );
 
 }
 
 export default App;
 