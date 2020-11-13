const mongoose = require('mongoose')

const respotitorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        require: true
    },
    full_name: {
        type: String,
        required: true
    },
    private: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    fork: {
        type: String,
        required: true
    },
    branches_url: {
        type: String, 
        required: true
    },
    commits_url: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    default_branch: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
})

mongoose.model('Repository', respotitorySchema)

// {
//     name: 'ashwinbhatt.github.io',
//     url: 'https://github.com/ashwinbhatt/ashwinbhatt.github.io',
//     full_name: 'ashwinbhatt/ashwinbhatt.github.io',
//     private: false,
//     description: 'Per',
//     fork: false,
//     branches_url: 'https://api.github.com/repos/ashwinbhatt/ashwinbhatt.github.io/branches{/branch}',
//     commits_url: 'https://api.github.com/repos/ashwinbhatt/ashwinbhatt.github.io/commits{/sha}',
//     created_at: '2020-05-27T18:10:00Z',
//     language: 'HTML',
//     default_branch: 'master',
//     manager: 'github',
//     owner: 'ashwinbhatt'
//   }
  