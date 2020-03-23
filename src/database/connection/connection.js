const mongoose = require('mongoose');
const config = require('../../config');

/* 
* Connect to mongo db 
*/
exports.initConnection = () => {
    const mongoURI = buildMongoURI();

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    };

    mongoose.connect(mongoURI, options).then(
        () => { console.log('Connected to database!') },
        error => {
            console.log("Connection failed!:", error);
        }
    );
}

/**
 * Create Mongo db URI for connection
 */
function buildMongoURI() {
    const mongodbURI = `mongodb+srv://${config.db_username}:${config.db_password}@cluster0-svxoi.mongodb.net/test?retryWrites=true&w=majority`;
    return mongodbURI;
}