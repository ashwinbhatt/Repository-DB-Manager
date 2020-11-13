const fetch = require('node-fetch');
const filterUserData = require('./filters/userFilter');
const meta = require('./meta')
const {prepare_url} = require('./util')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const getUser = (manager) => {
    return new Promise((resolve, reject) => {
        if(!manager){
            reject (new Error('Not enough arguments'))
        }
        fetch(prepare_url(meta[manager]['api_urls']['user']),{ 
            headers: {
                Authorization: meta[manager]['TOKEN']
            }
        }).then(res => {
            if(res.status != 200) 
                reject( new Error('Invalid Response '+ res.status))
            return(res.json())
        }).then(rawUserData => {
            // console.log(filterUserData(rawUserData, manager))
            resolve(filterUserData(rawUserData, manager))
        }).catch(err => {
            reject(err)
        })
    })
}

const userUpdateToDB = (userData) => {
    return new Promise((resolve, reject) => {

        if(!userData){
            reject(new Error('Not enough arguments'))
        }

        User.findOne({username: userData.username}).then(savedUser=> {
            if(!savedUser){
                console.log('User Data not found in the database, Adding it')
                const userSaved = new User(userData)
                
                userSaved.save().then( savedUser=> {
                    resolve(savedUser);
                }).catch(err=> {
                    reject(err)
                })
            }else{
                console.log('User data found for '+userData.manager)
            }
        })
    })
}


// var manager='github'
// var userData= {
//     username: 'ashwinbhatt',
//     avatar_url: 'https://avatars1.githubusercontent.com/u/34440623?v=4',
//     repos_api: 'https://api.github.com/users/ashwinbhatt/repos',
//     profile: 'https://api.github.com/users/ashwinbhatt',
//     profile_url: 'https://github.com/ashwinbhatt',
//     manager: 'github'
//   }


// getUser(manager).then( userData=> {
//     return userUpdateToDB(userData)
// }).then(savedData=> {
//     // console.log(savedData)
// }).catch(err=> {
//     console.log(err)
// })


module.exports= {
    getUser: getUser,
    userUpdateToDB: userUpdateToDB
}