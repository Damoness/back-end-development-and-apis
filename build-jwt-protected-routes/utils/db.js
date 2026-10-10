import path from "path";
import fs from 'fs'

const DB_PATH = path.join(import.meta.dirname, "../data/users.json");


export function readUsers(){
  const usersStr = fs.readFileSync(DB_PATH,'utf-8').trim()
  if(!usersStr){
    return []
  }

  const users = JSON.parse(usersStr,null,2)

  return users
}

export function writeUsers(users){
  fs.writeFileSync(DB_PATH,JSON.stringify(users,null,2))
}


export function findByEmail(email){
  return readUsers().find((u)=>u.email === email) || null
}

export function findById(id){
  return readUsers().find((u)=>u.id === id) || null
}