import { create } from 'zustand'
import axios from 'axios'

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};  
const homeStore = create((set) => ({
    coins: [],
    trending: [],
    query: '',

    setQuery: (e) => {
        set({ query: e.target.value});
        homeStore.getState().searchCoins();
    } ,
    

    searchCoins: debounce(async () => {
        const {query, trending} = homeStore.getState();

        if(query.length >2){

        
        const res= await axios.get( `https://api.coingecko.com/api/v3/search?query=${query}`);
        const coins = res.data.coins.map((coin) => {
            return {
                name: coin.name,
                image: coin.large,
                id: coin.id
            };
        });

        set({coins});
        } else {
            set({coins: trending});
        }
    },100),

    fetchCoins: async () => {
        const [res,btcRes] = await Promise.all([
            await axios.get('https://api.coingecko.com/api/v3/search/trending'),
            axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        ]);

        const btcPrice = btcRes.data.bitcoin.usd;
        console.log(btcPrice);


        const coins = res.data.coins.map((coin) => {
            return {
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                priceBtc: coin.item.price_btc.toFixed(10),
                priceUsd: (coin.item.price_btc * btcPrice).toFixed(10),

            };
        });

        

        console.log(coins);
        
      
    },
  
}));
export default homeStore