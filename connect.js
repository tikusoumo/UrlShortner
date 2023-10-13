const mongooes = require('mongoose');

async function connectMongoDB(url) {

    try {
        await mongooes.connect(url);
        
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connectMongoDB };