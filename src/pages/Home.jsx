import React from 'react'
import homeStore from '../stores/homeStore'
import { Link } from "react-router-dom";
import './index.css'; 

export default function Home() {
    const store = homeStore();

    React.useEffect(() => {
        store.fetchCoins()
    }, []);


  return (
    
<div className="main">

<div class="search" className='main'>
    <h1>Cryptocurrencies market cap Application</h1>
    <h2>Welcome</h2>
     
        <input type="text" value={store.query} onChange={store.setQuery} class="searchTerm" placeholder="What are you looking for?" />

        {store.coins.map(coin => {
            return (
                <div key={coin.id} className='main'  >
                    
                    <Link to={`/${coin.id}`}>
                    <p className='text'><img className='coin_image' src={coin.image} width={30} height={30}/>{coin.name}</p>
                    </Link>
                </div>
            )
        })}

</div>
    </div>
  );
}
