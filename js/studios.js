import {DB,Auth,Utils} from './storage.js';
export function studioListings(){const u=Auth.user();return DB.get('studios').filter(s=>u.role==='admin'||s.artistId===u.id||s.status!=='Draft')}
export function addStudio(studio){const u=Auth.user();if(!u||!['admin','artist'].includes(u.role))throw new Error('Access denied');return DB.add('studios',{...studio,artistId:u.id,status:'Published'})}
export function updateStudio(id,patch){const u=Auth.user(),s=DB.query('studios',x=>x.id===id)[0];if(!u||!s||!(u.role==='admin'||s.artistId===u.id))throw new Error('Access denied');return DB.update('studios',id,patch)}
export function removeStudio(id){const u=Auth.user(),s=DB.query('studios',x=>x.id===id)[0];if(!u||!s||!(u.role==='admin'||s.artistId===u.id))throw new Error('Access denied');return DB.remove('studios',id)}
