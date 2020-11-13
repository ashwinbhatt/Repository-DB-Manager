const mongoose = require('mongoose')


const Commits = new mongoose.Schema({
    manager:{
        type: String, 
        required: true
    },
    owner: {
        type: String,
        required: true
    }, 
    repository: {
        type: String,
        required: true
    },
    message: {
        type: String, 
        required: true
    },
    url: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    sha: {
        type: String,
        unique: true,
        required: true
    }
})


mongoose.model('Commits', Commits)


// {
//     manager: 'github',
//     owner: 'ashwinbhatt',
//     repository: 'Dataloaders',
//     message: 'Delete Untitled-checkpoint.ipynb',
//     url: 'https://github.com/ashwinbhatt/Dataloaders/commit/caccf01084df5098363f86a95daf3b610595e0a1',
//     sha: 'caccf01084df5098363f86a95daf3b610595e0a1',
//     date: 2019-06-12T18:08:59.000Z
//   }