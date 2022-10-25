import { Low,JSONFile } from "lowdb";
import { join,dirname } from 'path'
import {fileURLToPath} from 'url';

let db
const _dirname = dirname(fileURLToPath(import.meta.url))
console.log(_dirname)
export async function createConnection() {
  const file = join(_dirname,'../db.json')
  const adapter = new JSONFile(file)
  db = new Low(adapter)
  console.log(db)  
  await db.read()
  db.data ||= {documentos:[]}
  await db.write()
}
export const getConection=()=>db

