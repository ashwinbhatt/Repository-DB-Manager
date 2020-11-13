const mongoose = require('mongoose')
const {MOGODB_URL, GITHUB_TOKEN} = require('./keys')


mongoose.connect(MOGODB_URL ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', ()=> {
    console.log("MongoDB connected");
})

mongoose.connection.on('error', (err)=>{
    console.log("MongoDB failed to connect", err)
})

// init the models
require('./models/commits')
require('./models/repository')
require('./models/user')


// loading from functions from files
require('./ops/user')
require('./ops/repository')
require('./ops/commit')
