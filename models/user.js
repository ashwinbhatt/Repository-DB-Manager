const mongoose = require('mongoose')

const vcs_profile  = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String,
        required: true
    },
    repos_api: {
        type: String,
        required: true
    },
    profile: {
        type: String, 
        required: true
    },
    profile_url: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        required: true
    }
})

mongoose.model("User", vcs_profile)

// var userData= {
//     username: 'ashwinbhatt',
//     avatar_url: 'https://avatars1.githubusercontent.com/u/34440623?v=4',
//     repos_api: 'https://api.github.com/users/ashwinbhatt/repos',
//     profile: 'https://api.github.com/users/ashwinbhatt',
//     profile_url: 'https://github.com/ashwinbhatt',
//     manager: 'github'
//   }