const db = require("../../database/db");
const User = require("../model/User");

async function create(user){
    const conn = await db.connect();
    const sql = 'INSERT INTO users(whatsapp_id, name) VALUES(?,?);';
    const values = [user.whatsapp_id, user.name];
    await conn.query(sql, values);
}

async function updateTotalUsed(id){
    const conn = await db.connect();
    const [user] = await User.findUserById(id);
    const user_id = user.user_id;
    var total_used = user.total_used + 1;
    const sql = 'UPDATE users SET total_used = ? WHERE user_id = ?;'
    const values = [total_used, user_id];
    await conn.query(sql, values);
}

async function total_used(id){
    const [user] = await User.findUserById(id);
    const total_used = user.total_used;
    return total_used;
}

async function rank(){
    const conn = await db.connect();
    const sql = 'SELECT * FROM users order by total_used DESC LIMIT 10;'
    const [rank] = await conn.query(sql);
    return rank;
}

module.exports = {create, updateTotalUsed, total_used, rank};