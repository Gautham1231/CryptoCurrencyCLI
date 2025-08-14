const axios = require('axios');
const colors = require('colors');

class CryptoAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://pro-api.coinmarketcap.com/v1';
    }

    async getPriceData(coins, currency) {
        try {
            // Ensure coins are in the correct format
            const formattedCoins = coins.split(',')
                .map(coin => coin.trim().toUpperCase())
                .filter(coin => /^[A-Z0-9]+$/.test(coin))
                .join(',');

            if (!formattedCoins) {
                throw new Error('Invalid coin symbols provided');
            }

            const res = await axios.get(`${this.baseUrl}/cryptocurrency/quotes/latest`, {
                params: {
                    symbol: formattedCoins,
                    convert: currency
                },
                headers: {
                    'X-CMC_PRO_API_KEY': this.apiKey
                }
            });

            // Extract and format the price data
            const priceData = res.data.data;
            for (const coin in priceData) {
                const coinData = priceData[coin];
                const price = coinData.quote[currency].price;
                const rank = coinData.cmc_rank;
                const name = coinData.name;
                console.log(`Coin: ${coin} (${name}) | Price: $${price.toFixed(2)} | Rank: ${rank}`);
            }

            return res.data;
        } catch (err) {
            this.handleAPIError(err);
        }
    }

    handleAPIError(err) {
        if (err.response) {
            if (err.response.status === 401) {
                throw new Error('Your API key is invalid - Go to https://coinmarketcap.com');
            } else if (err.response.status === 404) {
                throw new Error('The API endpoint is invalid - Go to https://coinmarketcap.com');
            } else {
                throw new Error(`Something went wrong: ${err.response.data.status.error_message}`);
            }
        } else {
            throw new Error('Unable to connect to the API');
        }
    }
}

module.exports = CryptoAPI;