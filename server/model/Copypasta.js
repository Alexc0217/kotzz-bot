async function copypastaSchema(){
  const db = require("../../database/db");
  const exist = await db.tableExists("copypastas");
  if(exist){
    console.log(exist);
    return "Table copypastas alredy exists"
  }else{
    const conn = await db.connect();
    await conn.query('CREATE TABLE copypastas(copypasta_id int primary key auto_increment, user_id INT NOT NULL, whatsapp_id varchar(300) NOT NULL, copypasta_text LONGTEXT NOT NULL, name varchar(50) NOT NULL, total_used int default 0, FOREIGN KEY (user_id) REFERENCES users(user_id));');
    return "table copypastas created.";
  }
}

module.exports = {copypastaSchema};