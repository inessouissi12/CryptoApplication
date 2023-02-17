import React from 'react'
import showStore from '../stores/showStore'
import { useParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import axios from 'axios';
import './index.css'; 


export default function Show() {

const [query1=formatDateWithoutTime(query1), setInputText1] = useState('');
const [query2=formatDateWithoutTime(query2), setInputText2] = useState('');
const [weekData, setResponse] = useState('');
const [totalTime, setTotalTime] = useState(0);


function handleClick() {
  const start = performance.now(); 

  for (let i = 0; i < 100000000; i++) {
   
  }
  const end = performance.now(); 
    const duration = end - start; 
    setTotalTime(duration); 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    

    axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart/range?vs_currency=usd&from=${formatDateWithoutTime(query1)}&to=${formatDateWithoutTime(query2)}`)
    .then((response) => {
      const weekData = response.data.prices.map((price) => {
        const [timestamp, p]= price;
        const date = new Date(timestamp).toLocaleDateString('en-us');
        return {
            Date: date,
            Price: p
          };
    });
   
      setResponse(weekData);
      console.log("response",response.data);

      console.log("weekData",weekData);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const handleInputChange1 = (event) => {
    setInputText1(event.target.value);
  }

  const handleInputChange2 = (event) => {
    setInputText2(event.target.value);
  }


  
  function formatDateWithoutTime(dateWithoutTime) {
    const date = new Date(`${dateWithoutTime}T00:00:00.000Z`);
    return date.getTime() / 1000; 
  }



  const store = showStore();

  const params = useParams();
  const res=showStore.dataRes;
  

/// download 
const exportData1= () => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(weekData)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "SpecificWeekPrices.json";

  link.click();
};

const exportData2= () => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(store.graphData)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "currentWeekPrices.json";

  link.click();
};


  React.useEffect(() => {
    store.fetchData(params.id,store.query1,store.query2);
  }, []);


  if (!store.data) return <></>;


  return (
    <div >

     
      
        <img className='showpage_title' src={store.data.image.large} width={50} height={50} 
     /> <a className='coin_title'>{store.data.name}  </a>     

      <div className='chart1' >
        <p className='coin_title'><center>Current week prices</center></p>
      <AreaChart 
    width={600}
    height={500}
    data={store.graphData}
    
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="Date" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
  </AreaChart>
  <div><center>

      <button className="button" type="button"  onClick={exportData2}  >
        Download data
      </button>
      </center>
    </div> 
  </div>

  <form onSubmit={handleSubmit} className='chart2'>
      <label>
        
       <input type="text" value={query1} onChange={handleInputChange1} class="searchTerm" placeholder="YYYY-MM-DD"/> 
       <input type="text" value={query2} onChange={handleInputChange2} class="searchTerm" placeholder="YYYY-MM-DD" />
      </label>
      <button  className="button" type="submit" onClick={handleClick} >Display</button>
      
      <AreaChart 
    width={600}
    height={500}
    data={weekData}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="Date" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
  </AreaChart>

  <div><center>

      <button className="button" type="button"  onClick={exportData1}  >
        Download data
      </button>
      </center>
    </div> 
    <p><center>Total operation time: {totalTime} milliseconds </center></p>



    </form>

  </div>);


  
}
