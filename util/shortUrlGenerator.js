const urlDatabase = require('../model/dao');
const shortenUrl = ()=>{
    const characters = 'abcdefghijklmnopqrstuvwxyz'
    let shortUrl = '';
    let num = 7;
    while(true){
        for(let i = 0;i<num;++i){
            let randomIndex = Math.ceil(Math.random()*26-1)%26;
            shortUrl = shortUrl + characters[randomIndex];
        }
        const longUrl = urlDatabase.get(shortUrl);
        if(!longUrl){
            return shortUrl;
        }
    }
    };

module.exports  = shortenUrl;