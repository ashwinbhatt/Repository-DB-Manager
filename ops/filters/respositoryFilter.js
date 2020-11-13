const meta = require('../meta')
const {standardiseData} = require('../util')


module.exports = (repositoryData, manager, owner) => {
    if(!repositoryData || !manager || !owner){
        throw new Error('Not enough parameters')
    }
    const repoStandard = meta[manager]['repoStandard']
    // console.log(repositoryData)
    const filterRepositoryData = []
    repositoryData.forEach(element => {
        if(element.owner.login == owner && !element.fork ){
            const filterRepo = standardiseData(repoStandard, element)
            filterRepo['manager']= manager
            filterRepo['owner'] = owner
            filterRepositoryData.push(filterRepo)
        }
            
    });
    return filterRepositoryData
}