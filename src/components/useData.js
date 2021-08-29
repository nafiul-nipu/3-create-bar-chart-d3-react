import { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl = "https://gist.githubusercontent.com/nafiul-nipu/e78beffe3c5e9306b93d3a8c1dfd1164/raw/UN_Population.csv"

export const useData = () =>{
    const [data, setData] = useState(null)
   
    useEffect(() =>{
      // //  loadding the data
      const row = d => {
        d.Population = +d['2020'] * 1000
        return d
      }
      csv(csvUrl, row).then(data => {
        setData(data.slice(0, 10))
      });
    }, []);
  
    return data
  }