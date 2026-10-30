const KEY='artspace.db.v1', SESSION='artspace.session.v1', THEME='artspace.theme';
const uid=()=>`${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`;
const iso=(days=0,hour=12)=>{const d=new Date();d.setDate(d.getDate()+days);d.setHours(hour,0,0,0);return d.toISOString()};
const demoUsers=[
{id:'u-admin',name:'Taylor Morgan',email:'admin@artspace.demo',passwordHash:'demo:ArtSpace123!',role:'admin',city:'Riverside',discipline:'Community',bio:'Keeping the creative community connected.',avatar:'TM',status:'Approved',createdAt:iso(-90)},
{id:'u-maya',name:'Maya Chen',email:'maya@artspace.demo',passwordHash:'demo:ArtSpace123!',role:'artist',city:'Riverside',discipline:'Painting',bio:'Colour, quiet corners and everyday wonder.',avatar:'MC',status:'Approved',createdAt:iso(-65)},
{id:'u-jordan',name:'Jordan Rivera',email:'jordan@artspace.demo',passwordHash:'demo:ArtSpace123!',role:'artist',city:'Old Town',discipline:'Photography',bio:'Documenting the little moments.',avatar:'JR',status:'Approved',createdAt:iso(-55)},
{id:'u-samira',name:'Samira Khan',email:'samira@artspace.demo',passwordHash:'demo:ArtSpace123!',role:'artist',city:'Eastside',discipline:'Ceramics',bio:'Hand-built objects for slow living.',avatar:'SK',status:'Approved',createdAt:iso(-48)},
{id:'u-noah',name:'Noah Williams',email:'noah@artspace.demo',passwordHash:'demo:ArtSpace123!',role:'artist',city:'Riverside',discipline:'Digital art',bio:'Playful shapes and imagined worlds.',avatar:'NW',status:'Approved',createdAt:iso(-40)},
{id:'u-ella',name:'Ella Brooks',email:'ella@artspace.demo',passwordHash:'demo:ArtSpace123!',role:'artist',city:'Northside',discipline:'Textile',bio:'Colourful textile experiments.',avatar:'EB',status:'Approved',createdAt:iso(-32)},
{id:'u-alex',name:'Alex Rivers',email:'alex@artspace.demo',passwordHash:'demo:ArtSpace123!',role:'patron',city:'Riverside',discipline:'',bio:'Collector of stories and handmade things.',avatar:'AR',status:'Approved',createdAt:iso(-25)},
{id:'u-priya',name:'Priya Patel',email:'priya@artspace.demo',passwordHash:'demo:ArtSpace123!',role:'patron',city:'Eastside',discipline:'',bio:'Always up for a workshop.',avatar:'PP',status:'Approved',createdAt:iso(-20)},
{id:'u-lee',name:'Lee Thompson',email:'lee@artspace.demo',passwordHash:'demo:ArtSpace123!',role:'patron',city:'Old Town',discipline:'',bio:'Learning to look at art differently.',avatar:'LT',status:'Approved',createdAt:iso(-16)},
{id:'u-ruby',name:'Ruby James',email:'ruby@artspace.demo',passwordHash:'demo:ArtSpace123!',role:'patron',city:'Northside',discipline:'',bio:'Supporting local artists.',avatar:'RJ',status:'Approved',createdAt:iso(-12)},
{id:'u-omar',name:'Omar Ali',email:'omar@artspace.demo',passwordHash:'demo:ArtSpace123!',role:'patron',city:'Riverside',discipline:'',bio:'Art, music and good coffee.',avatar:'OA',status:'Approved',createdAt:iso(-8)}
];
const titles=['Sunroom No. 4','Blue Hour','Soft Geometry','Window Garden','Small Weather','After the Rain','Neighbourhood Bloom','Quiet Orbit','Paper Moon','Sunday Light','Night Bus','The Long Way Home','Little Rituals','Field Notes','Almost Spring','Colour Study'];
const categories=['painting','photography','digital','sculpture','craft','music','theatre'];
const artworks=titles.map((title,i)=>({id:`art-${i+1}`,title,artistId:['u-maya','u-jordan','u-samira','u-noah','u-ella'][i%5],category:categories[i%categories.length],description:`A thoughtful original piece inspired by everyday life, changing light and the small details we often miss.`,price:i%3===0?null:35+i*12,tags:['local','original',categories[i%categories.length]],status:i<13?'Published':'Draft',imageUrl:'',favorites:(i*7)%31,views:85+i*19,createdAt:iso(-i*3)}));
const events=[
{title:'Clay, Coffee & Conversation',type:'Workshop',date:iso(24,10),venue:'The Kiln Room',capacity:18,fee:25,description:'A relaxed hand-building session for beginners.',status:'Approved',artistId:'u-samira'},
{title:'Open Studio: Maya Chen',type:'Open Studio',date:iso(8,14),venue:'Riverside Arts Building',capacity:30,fee:0,description:'Drop by, see works in progress and chat about colour.',status:'Approved',artistId:'u-maya'},
{title:'Stories in the Street',type:'Exhibition',date:iso(18,17),venue:'Old Town Gallery',capacity:60,fee:5,description:'A photography exhibition about the everyday city.',status:'Approved',artistId:'u-jordan'},
{title:'Make a Tiny Zine',type:'Workshop',date:iso(31,11),venue:'Community Print Lab',capacity:16,fee:12,description:'Fold, draw and print your own pocket-sized zine.',status:'Approved',artistId:'u-noah'},
{title:'Textile Colour Lab',type:'Workshop',date:iso(38,13),venue:'Northside Makerspace',capacity:12,fee:20,description:'Experiment with colour and simple textile techniques.',status:'Pending',artistId:'u-ella'},
{title:'Winter Makers Market',type:'Market',date:iso(45,10),venue:'Riverside Square',capacity:100,fee:0,description:'Shop small and meet local makers.',status:'Approved',artistId:'u-ella'},
{title:'Digital Worlds Showcase',type:'Exhibition',date:iso(52,18),venue:'Studio 8',capacity:45,fee:8,description:'An evening of playful digital work and conversation.',status:'Approved',artistId:'u-noah'},
{title:'Paint Your Sunday',type:'Workshop',date:iso(15,11),venue:'Sunroom Studio',capacity:14,fee:30,description:'A guided painting session with tea and music.',status:'Approved',artistId:'u-maya'}
].map((e,i)=>({...e,id:`evt-${i+1}`,createdAt:iso(-i*2)}));
const registrations=[
{id:'reg-1',eventId:'evt-1',patronId:'u-alex',status:'Confirmed',createdAt:iso(-1),history:[{status:'Confirmed',actorId:'u-alex',at:iso(-1),note:'Registration confirmed'}]},
{id:'reg-2',eventId:'evt-2',patronId:'u-priya',status:'Confirmed',createdAt:iso(-2),history:[]},
{id:'reg-3',eventId:'evt-3',patronId:'u-lee',status:'Confirmed',createdAt:iso(-2),history:[]},
{id:'reg-4',eventId:'evt-4',patronId:'u-ruby',status:'Waitlisted',createdAt:iso(-1),history:[]}
];
const commissions=[
{id:'com-1',title:'Custom cityscape',patronId:'u-alex',artistId:'u-maya',description:'A warm, colourful illustration of our street.',budget:180,status:'Under Review',notes:'Would love warm evening colours.',createdAt:iso(-3),history:[{status:'Submitted',actorId:'u-alex',at:iso(-3),note:'Initial request'}]},
{id:'com-2',title:'Family portrait session',patronId:'u-priya',artistId:'u-jordan',description:'Outdoor portrait session for three people.',budget:240,status:'Accepted',notes:'Saturday morning preferred.',createdAt:iso(-6),history:[{status:'Submitted',actorId:'u-priya',at:iso(-6),note:'Initial request'},{status:'Accepted',actorId:'u-jordan',at:iso(-2),note:'Happy to take this on'}]},
{id:'com-3',title:'Handmade serving bowl',patronId:'u-lee',artistId:'u-samira',description:'A deep blue serving bowl with a simple shape.',budget:75,status:'In Progress',notes:'Blue glaze if possible.',createdAt:iso(-9),history:[]},
{id:'com-4',title:'Poster for a book club',patronId:'u-ruby',artistId:'u-noah',description:'Bright and welcoming poster design.',budget:90,status:'Delivered',notes:'Ready for review.',createdAt:iso(-12),history:[]},
{id:'com-5',title:'Custom woven wall hanging',patronId:'u-omar',artistId:'u-ella',description:'Earthy colours, medium size.',budget:130,status:'Submitted',notes:'Flexible timeline.',createdAt:iso(-1),history:[]}
];
const bookings=[
{id:'book-1',title:'Studio session',artistId:'u-maya',patronId:'u-alex',date:iso(5,15),slot:'15:00–16:00',status:'Pending',notes:'Painting consultation',createdAt:iso(-1),history:[]},
{id:'book-2',title:'Ceramics taster',artistId:'u-samira',patronId:'u-priya',date:iso(9,11),slot:'11:00–12:00',status:'Approved',notes:'Beginner session',createdAt:iso(-3),history:[]},
{id:'book-3',title:'Portfolio review',artistId:'u-jordan',patronId:'u-lee',date:iso(12,14),slot:'14:00–15:00',status:'Completed',notes:'Photo portfolio feedback',createdAt:iso(-8),history:[]}
];
const seed=()=>({users:demoUsers,artworks,events,registrations,commissions,bookings,studios:[{id:'studio-1',artistId:'u-samira',name:'The Kiln Room',location:'Eastside',rate:22,availability:'Weekends'}],notifications:[{id:uid(),userId:'u-alex',message:'Your registration for Clay, Coffee & Conversation is confirmed.',read:false,createdAt:iso(-1)}],activity:[{id:uid(),actorId:'u-maya',message:'published Sunroom No. 4',createdAt:iso(-1)},{id:uid(),actorId:'u-samira',message:'listed a new workshop',createdAt:iso(-2)},{id:uid(),actorId:'u-jordan',message:'updated their portfolio',createdAt:iso(-4)}],favorites:[{userId:'u-alex',artworkId:'art-1'},{userId:'u-alex',artworkId:'art-4'}]});
export const DB={
 getAll(){try{const d=JSON.parse(localStorage.getItem(KEY));if(d)return d}catch(e){console.warn('Storage reset:',e)}const d=seed();this.saveAll(d);return d},
 saveAll(d){try{localStorage.setItem(KEY,JSON.stringify(d));return true}catch(e){console.error(e);return false}},
 get(collection){return this.getAll()[collection]||[]},
 query(collection,predicate=()=>true){return this.get(collection).filter(predicate)},
 add(collection,item){const d=this.getAll();if(!d[collection])d[collection]=[];const saved={id:item.id||uid(),createdAt:item.createdAt||new Date().toISOString(),...item};d[collection].push(saved);this.saveAll(d);return saved},
 update(collection,id,patch){const d=this.getAll(),i=(d[collection]||[]).findIndex(x=>x.id===id);if(i<0)return null;d[collection][i]={...d[collection][i],...patch,updatedAt:new Date().toISOString()};this.saveAll(d);return d[collection][i]},
 remove(collection,id){const d=this.getAll(),before=(d[collection]||[]).length;d[collection]=(d[collection]||[]).filter(x=>x.id!==id);this.saveAll(d);return before!==d[collection].length},
 replace(collection,items){const d=this.getAll();d[collection]=items;this.saveAll(d)},
 reset(){localStorage.removeItem(KEY);return this.getAll()}
};
export const Auth={
 current(){try{return JSON.parse(localStorage.getItem(SESSION)||'null')}catch{return null}},
 login(email,password,remember=true){const u=DB.query('users',x=>x.email.toLowerCase()===email.toLowerCase()&&x.passwordHash===`demo:${password}`)[0]||DB.query('users',x=>x.email.toLowerCase()===email.toLowerCase()&&x.passwordHash===password)[0];if(!u||u.status==='Suspended')return null;const session={userId:u.id,remember,startedAt:new Date().toISOString()};localStorage.setItem(SESSION,JSON.stringify(session));return u},
 register(user){if(DB.query('users',u=>u.email.toLowerCase()===user.email.toLowerCase()).length)return {error:'An account with this email already exists.'};const saved=DB.add('users',{...user,role:user.role==='artist'?'artist':'patron',passwordHash:`demo:${user.password}`,status:'Approved',avatar:user.name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase()});localStorage.setItem(SESSION,JSON.stringify({userId:saved.id,remember:true,startedAt:new Date().toISOString()}));return {user:saved}},
 logout(){localStorage.removeItem(SESSION)},
 user(){const s=this.current();return s?DB.query('users',u=>u.id===s.userId)[0]||null:null},
 require(roles=[]){const u=this.user();return !!u&&(!roles.length||roles.includes(u.role))}
};
export const Utils={uid,escape(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))},date(s){return s?new Date(s).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}):'—'},dateTime(s){return s?new Date(s).toLocaleString(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'—'},name(id){return DB.query('users',u=>u.id===id)[0]?.name||'Unknown member'},statusClass(s){return 'status-'+String(s||'pending').toLowerCase().replace(/\s+/g,'-')},notify(userId,message,type='info'){DB.add('notifications',{userId,message,type,read:false});window.dispatchEvent(new CustomEvent('artspace:toast',{detail:{message,type}}))},activity(actorId,message){DB.add('activity',{actorId,message})},setTheme(theme){document.body.classList.toggle('dark',theme==='dark');localStorage.setItem('artspace.theme',theme)},theme(){return localStorage.getItem('artspace.theme')||'light'}};
DB.getAll();