const shortUrlGenerator = require('../util/shortUrlGenerator');
const urlDatabase = require('../model/dao');
const shortUrlRemover = require('../util/shortUrlRemover');

const shorten = ('/shorten',(req,res)=>{
    try{
        const {long_url,custom_alias,ttl_seconds} = req.body;
        const shortUrlId = custom_alias||shortUrlGenerator();
        const urlData = {
            long_url,
            shortUrlId,
            accessCount: 0,
            accessTime: []
        }
        urlDatabase.set(shortUrlId,urlData);
        shortUrlRemover(shortUrlId,ttl_seconds);
        res.json({short_url: `http://localhost:${3000}/${shortUrlId}`});
    }catch(err){
        res.status(500).json({error:err});
    }

})

const alias  = (req,res)=>{
    try{
        const  shortUrlId  = req.params.alias;
        const urlData = urlDatabase.get(shortUrlId);
        if(urlData){
            urlData.accessCount +=1;
            urlData.accessTime.push(new Date());
            res.redirect(urlData.long_url);
        }else{
            res.status(404).json({error:"url not found"})
        }
    }catch(err){
        res.status(500).json({error:err});
    }
};

const analytics = (req,res)=>{
    try{
        const shortUrlId = req.params.alias;
        const urlData = urlDatabase.get(shortUrlId);
        if(urlData){
            res.json({alias: urlData.shortUrlId,
                long_url: urlData.longUrl,
                access_count: urlData.accessCount,
                access_times: urlData.accessTime});
        }
    else{
        res.status(404).json({err:"data not found"});
    }

    }catch(err){
        res.status(500).json({error:err})
    }
};

const updateAlias = (req,res)=>{
    try{
        const alias = req.params.alias;
        const custom_alias = req.body.custom_alias;
        const ttl_seconds = req.body.ttl_seconds;
        const url_data = urlDatabase.get(alias);
        if(url_data){
            urlDatabase.delete(alias);
            const shortUrlId = custom_alias||shortUrlGenerator();
            url_data.alias = shortUrlId;
            urlDatabase.set(shortUrlId,url_data);
            shortUrlRemover(shortUrlId,ttl_seconds);
            res.status(200).json({updated_url:`http://localhost:${3000}/${shortUrlId}`});
        }else{
            res.status(404).json({error:"invalid reuest"});
        }   
    }catch(err){
        res.status(500).json({error:"server error"});
    }
};

const deleteAlias = (req,res)=>{
    try{
        const alias = req.params.alias;
        if(urlDatabase.has(alias)){
            urlDatabase.delete(alias);
            res.json({message: "Successfully Deleted"});
        }else{
            res.status(404).json({message: "Invalid Request"});
        }
        
    }catch(err){
        res.status(500).json({error: err});
    }
};

module.exports = {alias,shorten,analytics,updateAlias,deleteAlias};