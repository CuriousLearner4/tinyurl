const urlDatabase = require("../model/dao");

const remover = (shortUrlId,ttl_seconds)=>{
    const removeUrl = ()=>{
        if(urlDatabase.has(shortUrlId)){
            urlDatabase.delete(shortUrlId);
        }
    };
    const ttl = (ttl_seconds*1000)||120000;
    setTimeout(removeUrl,ttl);
};

module.exports = remover;