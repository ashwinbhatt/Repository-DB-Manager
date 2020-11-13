
function standardiseData(standard, data){
    if(!standard || !data){
        throw new Error('Not enough parameters')
    }
    const stanData= {}
    Object.keys(standard).forEach((key)=> {
        // console.log(standard[key]+" "+data[key])
        stanData[standard[key]] = data[key]
    })
    return stanData
}

    
module.exports = {
    prepare_url: function (url_template, ...placeholder){
        // url_template have (containing <?0>) 
        // and replace this 0 index value in url_rep array
        if( !url_template ){
            throw new Error('invalid url_template structure')
        }
        // console.log(placeholder)
        var url = url_template.replace('', '')
        
        for(var i=0; i<placeholder.length; i++){
            url = url.replace('<?'+i+'>', placeholder[i])
        }
        return url;
    },

    standardiseData: standardiseData
    
}