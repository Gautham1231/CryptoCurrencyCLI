const KeyManager = require('../library/KeyManager');
const CryptoAPI = require('../library/CryptoAPI');
const colors = require('colors');

const check = {
    async price(cmd) {
        try {
            const keyManager = new KeyManager();
            const key = keyManager.getKey();
            const api = new CryptoAPI(key);
            const coins = cmd.coin.split(',').map(coin => coin.trim().toUpperCase());
            const priceOutputData = await api.getPriceData(coins.join(','), cmd.cur);
            console.log(priceOutputData);
        }
        catch (err){
            console.error(err.message.red);
        }
    }
};

module.exports = check;