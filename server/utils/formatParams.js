async function formatParams(command){
    var params = "";
    for(var i = 1; i < command.length; i++){
      params += command[i] + " ";
    }
    return params;
}

module.exports = {formatParams};