const mongooes = require('mongoose');

const urlSchema = new mongooes.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    
    shortUrl:{
        type: String,
        unique: true,
        required: true
    },
    visitHistory: [{timeStamp:{
        type: Number
        
    }}]
},{timestamps: true});

const Url = mongooes.model('url', urlSchema);

module.exports = Url;
