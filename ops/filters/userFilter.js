const meta = require('../meta') 
const {standardiseData} = require('../util')

module.exports = (userData, manager) => {
    if(!userData || !manager){
        throw new Error('Now Enough parameters')
    }
    const userStandard = meta[manager]['userStandard']
    const filterUserData = standardiseData(userStandard, userData)
    filterUserData['manager']= manager
    
    return filterUserData
}

