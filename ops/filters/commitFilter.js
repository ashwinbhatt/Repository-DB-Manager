
module.exports = (commitData, manager, owner, respository) => {
    if(!commitData || !manager || !owner || !respository){
        throw new Error('Now Enough parameters')
    }
    const filterCommits=[]
    commitData.forEach((element)=>{
        const filterCommit={
            'manager': manager,
            'owner': owner,
            'repository': respository,
            'message': element['commit']['message'],
            'url': element['html_url'],
            'sha': element['sha'],
            'date': new Date(element['commit']['author']['date'])
        }
        filterCommits.push(filterCommit)
    })
    return filterCommits
}