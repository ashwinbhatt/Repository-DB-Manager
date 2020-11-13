const fetch = require('node-fetch')
const filterRepositoryData = require('./filters/respositoryFilter')
const meta = require('./meta')
const {prepare_url} = require('./util')
const mongoose = require('mongoose')
const Repository = mongoose.model('Repository')


const getRepository = (manager, owner)=> {
    return new Promise((resolve, reject) => {

        if(!manager || !owner){
            reject( new Error('Not enough arguments'))
        }
        fetch(prepare_url(meta[manager]['api_urls']['repository']),{
            headers: {
                Authorization: meta[manager]['TOKEN']
            }
        }).then(res => {
            if(res.status != 200) 
                reject( new Error('Invalid Response '+ res.status))
            return res.json()
        }).then(rawRepositoryData=> {
            // console.log(filterRepositoryData(rawRepositoryData, manager, owner))
            resolve(filterRepositoryData(rawRepositoryData, manager, owner))
        }).catch(err=> {
            console.log(err)
        })
    })
}

const repositoryUpdateToDB = (repoData => {

    return new Promise((resolve, reject)=> {
        if(!repoData){
            reject(new Error('Not enough arguments'))
        }
        const ret_repo= []
        repoData.forEach(repo => {
            Repository.findOne({full_name: repo.full_name, manager: repo.manager}).then( savedRepo=> {
                // console.log(savedRepo)
                if(!savedRepo){
                    console.log('Repository not found Adding =>'+repo.name )
                    reposity = new Repository(repo)

                    reposity.save().then(savedRepo=> {
                        ret_repo.push(savedRepo)
                    }).catch(err=> {
                        reject(err)
                    })
                }else{
                    ret_repo.push(savedRepo)
                    console.log('Repository found : '+repo.name)
                }
                if(ret_repo.length == repoData.length){
                    resolve(ret_repo)
                }

            })
        })        
    })
})

// var manager= 'github',
//     owner = 'ashwinbhatt'
// getRepository(manager, owner).then(userRepos=> {
//     return repositoryUpdateToDB(userRepos)
// }).then(savedData=> {
//     console.log(savedData.length)
// }).catch(err=> {
//     console.log(err)
// })


module.exports= {
    getRepository: getRepository,
    repositoryUpdateToDB: repositoryUpdateToDB
}




