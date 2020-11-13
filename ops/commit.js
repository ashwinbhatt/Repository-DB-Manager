const fetch = require('node-fetch')
const filterCommitData = require('./filters/commitFilter')
const meta = require('./meta')
const repository = require('./repository')
const {prepare_url} = require('./util')
const mongoose = require('mongoose')
const Commits = mongoose.model('Commits')

const getCommits = (manager, owner, repository)=> {
    return new Promise((resolve, reject) => {
        if(!manager || !owner || !repository){
            reject(new Error('not enough arguments'))
        }
        // console.log(prepare_url(meta[manager]['api_urls']['commit'], owner, repository))
        fetch(prepare_url(meta[manager]['api_urls']['commit'], owner, repository),{
            headers: {
                Authorization: meta[manager]['token']
            }
        }).then(res => {
            if(res.status != 200){
                reject(new Error('Invalid Response '+ res.status));
            }
            return res.json();
        }).then(rawCommitData => {
            // console.log(rawCommitData)
            // console.log(filterCommitData(rawCommitData, manager, owner, repository))
            resolve(filterCommitData(rawCommitData, manager, owner, repository))
        }).catch(err => {
            reject(err)
        })
    })
}


const commitUpdateToDB = (commitData) => {
    return new Promise((resolve, reject) => {
        if(!commitData){
            reject(new Error('Not enought arguments'))
        }
        const ret_commit= []
        commitData.forEach(element => {
            Commits.findOne({
                sha: element.sha  
            }).then(savedCommit => {
                if(!savedCommit){
                    console.log('Adding commit from '+element.repository)
                    const commit = new Commits(element)

                    commit.save().then(savedCommit => {
                        ret_commit.push(savedCommit)
                    }).catch(err => {
                        reject(err)
                    })
                }else{
                    ret_commit.push(savedCommit)
                    console.log('Found commit from '+savedCommit.repository)
                }
                if(ret_commit.length == commitData.length){
                    resolve(ret_commit)
                }
            }).catch(err=> {
                reject(err)
            })
        })
    })
}




// var manager = 'github'
// var owner = 'ashwinbhatt'
// var rep = 'Dataloaders'
// getCommits(manager, owner, rep).then(commitsData=> {
//     return commitUpdateToDB(commitsData)
// }).then(savedData=>{
//     console.log(savedData)
// }).catch(err=> {
//     console.log(err)
// })

module.exports = {
    getCommits: getCommits,
    commitUpdateToDB: commitUpdateToDB
}