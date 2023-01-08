async function formatParams(command){
    var params = "";
    for(var i = 1; i < command.length; i++){
      params += command[i] + " ";
    }
    return params;
}

async function formatParamsWithObj(command){
  var names = [];
    for(var i = 1; i < command.length; i++){
      if(command[i] === "" || command[i] === " "){

      }else{
        names.push({id: i, name: command[i]});
      }
    }
    return names;
}

async function formatCopypasta(command){
  var copypasta = "";
  for(var i = 2; i < command.length; i++){
    copypasta = copypasta + ` ${command[i]}`
  }
  return copypasta;
}
module.exports = {formatParams, formatParamsWithObj, formatCopypasta};