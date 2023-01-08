const db = require("../../database/db");
const Copypasta = require("../model/Copypasta");
const User = require("../model/User");

async function create(user, copypasta){
  const conn = await db.connect();
  const sql = "INSERT INTO copypastas(user_id, whatsapp_id, copypasta_text, name) VALUES(?, ?, ?, ?);";
  const values = [user.user_id, user.whatsapp_id, copypasta.text, copypasta.name];
  await conn.query(sql, values);
}

async function findAll(){
  const conn = await db.connect();
  const [copypasta] = await conn.query("SELECT * FROM copypastas");
  console.log(copypasta);
  return copypasta;
}

async function find(id){
  const conn = await db.connect();
  const [copypasta] = await conn.query("SELECT * FROM copypastas WHERE copypasta_id = ?", id);
  return copypasta;
}

module.exports = {create, findAll, find};