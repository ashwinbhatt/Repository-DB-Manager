// loading from functions from files
const {getUser, userUpdateToDB} = require('./ops/user')
const {getRepository, repositoryUpdateToDB} = require('./ops/repository')
const {getCommits, commitUpdateToDB}= require('./ops/commit')
const mongoose = require('mongoose')
const Repository = mongoose.model('Repository')


const update = (manager) => {
    
    if(!update)
        throw new Error('Not enough arguments')

    getUser('github').then( userData => {

        getRepository(manager, userData.username).then(userRepos=> {
            return repositoryUpdateToDB(userRepos)
        }).then(savedData=> {
            savedData.forEach(repo => {
                getCommits(manager, userData.username, repo.name).then(commitsData=> {
                    return commitUpdateToDB(commitsData)
                }).then(savedData=>{
                    // console.log(savedData.length)
                }).catch(err=> {
                    console.log(err)
                })
            })
        }).catch(err=> {
            console.log(err)
        })
        return userUpdateToDB(userData)
    }).catch(err=> {
        console.log(err)
    })
}


// var manager='github'
// update(manager)


module.exports = {
    update: update
}