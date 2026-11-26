/* Brand Portal — config-driven brand asset portal.
   One company = one config object. The settings drawer (gear, top right) edits it. */
(() => {
'use strict';

/* ------------------------------------------------------------------ data */
const KEY = 'brandportal.v1';

const TILE_DEFS = [
  { key:'brand',     title:'Brand',     sub:'Logo, colour, type' },
  { key:'media',     title:'Media',     sub:'Imagery' },
  { key:'transfer',  title:'Transfer',  sub:'Send large files' },
  { key:'templates', title:'Templates', sub:'Brand templates' },
  { key:'leads',     title:'Leads',     sub:'Partners and enquiries' },
  { key:'tools',     title:'Tools',     sub:'Files, labels and more' },
  { key:'product',   title:'Product information', sub:'Tech sheets and manuals' },
];

const DONTS = [
  { id:'compress', text:"Don't compress the logo",              style:'transform:scaleX(.55)' },
  { id:'crop',     text:"Don't crop the mark",                  style:'clip-path:inset(0 0 0 38%)' },
  { id:'colour',   text:"Don't use off-brand colours",          style:'filter:hue-rotate(110deg) saturate(1.4)' },
  { id:'rotate',   text:"Don't rotate the logo",                style:'transform:rotate(-12deg)' },
  { id:'blur',     text:"Don't blur or scale up a low-resolution file", style:'filter:blur(3px)' },
  { id:'shadow',   text:"Don't add a drop shadow",              style:'filter:drop-shadow(5px 6px 4px rgba(0,0,0,.45))' },
];

function scene(a, b, label){
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="900" height="620" fill="url(#g)"/><circle cx="640" cy="170" r="120" fill="#fff" opacity=".12"/><path d="M0 520 Q260 420 480 500 T900 470 V620 H0Z" fill="#000" opacity=".22"/><text x="40" y="580" font-family="Arial" font-size="22" fill="#fff" opacity=".7" letter-spacing="4">${label}</text></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function demoCompany(o){
  return Object.assign({
    id: 'acme-outdoor',
    name: 'Acme Outdoor',
    person: 'Alex Morgan',
    tagline: 'We build quality products',
    pageSubtitle: 'Base-line 2026',
    feedbackEmail: 'brand@example.com',
    footerText: 'We build quality products',
    theme: { accent:'#ff6600', sky1:'#8cc4ea', sky2:'#d6e9f6' },
    logo: { wordmark:'ACME', letter:'A', ink:'#111111', grey:'#7a7a7a', custom:{} },
    colors: [
      { name:'Acme Orange',  hex:'#ff6600' },
      { name:'Acme Sand',    hex:'#d2aa82' },
      { name:'Acme Silver 1',hex:'#c4c6c6' },
      { name:'Acme Silver 2',hex:'#757777' },
      { name:'Acme Silver 3',hex:'#454747' },
      { name:'Acme Black',   hex:'#000000', cmyk:'60 50 40 100' },
    ],
    type: {
      font:'Montserrat', google:'Montserrat', downloadUrl:'https://fonts.google.com/specimen/Montserrat',
      specs:[
        { label:'Headline · Bold · 1,1× · 0 VA',      sample:'We build quality products', weight:700, size:40, tracking:0,    upper:true },
        { label:'Headline variant · Light · 1,5× · 150 VA', sample:'Headline',          weight:300, size:32, tracking:.16,  upper:true },
        { label:'Subheading · Light · 1,28× · 100 VA',sample:'Subheading',              weight:300, size:19, tracking:.1,   upper:true },
        { label:'Head · Bold · 1,76× · 100 VA',       sample:'Head',                    weight:700, size:13, tracking:.1,   upper:true },
        { label:'Body · Regular · 1,76× · 100 VA',    sample:'ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789', weight:400, size:12, tracking:.1, upper:false },
      ],
      note:'Line spacing is a ratio of the type size: 1,3× for display and headlines, 1,25× for subheadings, 1,6× to 1,8× for body copy. The larger the type, the tighter the ratio.',
    },
    gradients:[
      { name:'Sunrise', from:'#ff6600', to:'#ffb27a', angle:135 },
      { name:'Dusk',    from:'#454747', to:'#000000', angle:160 },
      { name:'Mist',    from:'#c4c6c6', to:'#ffffff', angle:90  },
    ],
    imagery:[
      { label:'Innovation',          url:scene('#222','#555','INNOVATION') },
      { label:'Technical',           url:scene('#3d7ea6','#a9d3e6','TECHNICAL') },
      { label:'Events & lifestyle',  url:scene('#2a1030','#d6457a','EVENTS & LIFESTYLE') },
      { label:'Product · One',       url:scene('#4aa3df','#e8f4fb','PRODUCT') },
      { label:'Product · Two',       url:scene('#2f6b2f','#f4ead8','PRODUCT') },
      { label:'Craftsmanship',       url:scene('#111','#9a9a9a','CRAFTSMANSHIP') },
    ],
    mediaUrl:'#/page/media',
    help:{
      logo:'The logo comes in three layouts and three colourways. Use the colourway with the best contrast against the background.',
      colour:'Orange leads. The neutrals support. Copy a value or download the swatch file for your design software.',
      type:'One typeface, several weights. Use the sizes and spacings shown for a consistent look.',
      elements:'Supporting graphic elements: the icon, a repeatable pattern and gradients.',
      imagery:'Five kinds of image carry the brand. The library, with the licence, lives in the media portal.',
    },
    rules:{ clearSpace:'Keep clear space around the logo equal to the height of the symbol on every side.', donts:DONTS.map(d=>d.id), customDonts:[] },
    tiles: TILE_DEFS.map(t=>({ key:t.key, title:t.title, sub:t.sub, enabled:true, url:'' })),
  }, o||{});
}

/* Neutral template for "New company" (not any real brand). */
function blankCompany(){
  const n = demoCompany({ id:'co-'+Math.random().toString(36).slice(2,7), name:'New Company', person:'', tagline:'Your tagline here', footerText:'Your tagline here', feedbackEmail:'' });
  n.logo.wordmark='NEW'; n.logo.letter='N'; n.colors=n.colors.slice(0,4); n.imagery=n.imagery.slice(0,3);
  n.colors[0].name='Primary'; n.colors[1].name='Secondary'; n.colors[2].name='Neutral light'; n.colors[3].name='Neutral dark';
  return n;
}
const isObj = v => v && typeof v==='object' && !Array.isArray(v);
function merge(base, over){ const o=Object.assign({}, base); for(const k in over){ o[k]=isObj(over[k])&&isObj(base[k])?merge(base[k],over[k]):over[k]; } return o; }
const fromPreset = p => merge(demoCompany(), p);

function seed(){
  const cs=(window.BP_PRESETS||[]).map(fromPreset);
  return { v:3, active:cs[0].id, companies:cs, seen:cs.map(c=>c.id) };
}

let store;
try { store = JSON.parse(localStorage.getItem(KEY)); } catch(e){}
if (!store || !store.companies || !store.companies.length) store = seed();
// migration: drop the old demo companies and the superseded Impact Sourcing directions; offer each imported brand once (a deleted one stays deleted)
{
  store.companies = store.companies.filter(c => !['acme-outdoor','harbor-studio','is-design-system','is-a-label','is-b-workshop','is-c-provenance','is-r2-natural','is-r2-teal','is-r2-oxblood'].includes(c.id));
  const seen = new Set(store.seen || store.companies.map(c=>c.id));
  (window.BP_PRESETS||[]).forEach(p => { if(!seen.has(p.id)) { store.companies.push(fromPreset(p)); } seen.add(p.id); });
  store.seen = [...seen]; store.v = 3;
  if (!store.companies.some(c=>c.id===store.active)) store.active = store.companies[0].id;
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch(e){}
}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch(e){ toast('Storage is full — remove large uploaded images'); } };
const co = () => store.companies.find(c=>c.id===store.active) || store.companies[0];

/* ------------------------------------------------------------------ utils */
const $ = (s,r=document)=>r.querySelector(s);
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(m){ const t=$('#toast'); t.textContent=m; t.classList.add('show'); clearTimeout(toast.t); toast.t=setTimeout(()=>t.classList.remove('show'),2200); }
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'company';
function hex2rgb(h){ h=h.replace('#',''); if(h.length===3) h=h.split('').map(x=>x+x).join(''); const n=parseInt(h,16)||0; return [n>>16&255,n>>8&255,n&255]; }
function cmykOf(c){ if(c.cmyk) return c.cmyk.split(/[\s,·]+/).filter(Boolean).map(Number);
  const [r,g,b]=hex2rgb(c.hex).map(x=>x/255); const k=1-Math.max(r,g,b); if(k>=1) return [0,0,0,100];
  return [(1-r-k)/(1-k),(1-g-k)/(1-k),(1-b-k)/(1-k),k].map(x=>Math.round(x*100)); }
function shade(h,amt){ const [r,g,b]=hex2rgb(h).map(x=>Math.max(0,Math.min(255,Math.round(x+(amt>0?(255-x)*amt:x*amt))))); return '#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join(''); }
function getp(o,p){ return p.split('.').reduce((a,k)=>a==null?a:a[k],o); }
function setp(o,p,v){ const ks=p.split('.'); const l=ks.pop(); const t=ks.reduce((a,k)=>a[k]==null?(a[k]={}):a[k],o); t[l]=v; }
function download(blob,name){ const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500); }
const dataUrlToText = u => { const i=u.indexOf(','), body=u.slice(i+1); return /;base64$/.test(u.slice(0,i)) ? new TextDecoder().decode(Uint8Array.from(atob(body),c=>c.charCodeAt(0))) : decodeURIComponent(body); };

/* ------------------------------------------------------------------ logo generation */
const LAYOUTS=['horizontal','stacked','symbol'];
const WAYS=[{id:'black',label:'Black',cls:''},{id:'white',label:'White',cls:'dark'},{id:'grey',label:'Grey',cls:'grey'}];

const logoSvg = (c,layout,way) => window.BPLogos.make(c,layout,way);
function logoHtml(c,layout,way){
  const cu=c.logo.custom&&c.logo.custom[layout]&&c.logo.custom[layout][way];
  if(cu) return `<img src="${cu}" alt="">`;
  return logoSvg(c,layout,way);
}
function logoSource(c,layout,way){ // returns {svg?:string, png?:dataUrl}
  const cu=c.logo.custom&&c.logo.custom[layout]&&c.logo.custom[layout][way];
  if(cu){ return cu.startsWith('data:image/svg')?{svg:dataUrlToText(cu)}:{png:cu}; }
  return {svg:logoSvg(c,layout,way)};
}
function patternSvg(c,way){ // repeats the symbol on a 64px grid, offset every other row
  const s=logoSvg(c,'symbol',way), vb=s.match(/viewBox="([^"]+)"/)[1], inner=s.replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'');
  const bg = way==='white' ? '#000000' : '#fdfdfc';
  const cell=(x,y)=>`<svg x="${x}" y="${y}" width="36" height="36" viewBox="${vb}">${inner}</svg>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><defs><pattern id="p" width="64" height="64" patternUnits="userSpaceOnUse"><rect width="64" height="64" fill="${bg}"/>${cell(14,14)}</pattern></defs><rect width="400" height="400" fill="url(#p)"/></svg>`;
}
const patternUrl = (c,way) => 'data:image/svg+xml;utf8,'+encodeURIComponent(patternSvg(c,way)).replace(/'/g,'%27');
let fontCss=null;
async function embeddedFonts(){ // latin subsets of the Google fonts the page loads, as data: URLs, so rasterised logos keep their typefaces
  if(fontCss!==null && fontCss.href===$('#font-link').href) return fontCss.css;
  const href=$('#font-link').href; let css='';
  try{ const txt=await (await fetch(href)).text(); const parts=txt.split(/(?=\/\* [a-z-]+ \*\/)/).filter(p=>/^\/\* latin \*\//.test(p));
    for(const p of parts){ const m=p.match(/url\((https:[^)]+)\)/); if(!m) continue; const buf=new Uint8Array(await (await fetch(m[1])).arrayBuffer()); let s=''; for(let i=0;i<buf.length;i+=8192) s+=String.fromCharCode.apply(null,buf.subarray(i,i+8192));
      css+=p.replace(/\/\*[^*]*\*\//g,'').replace(m[0],`url(data:font/woff2;base64,${btoa(s)})`).replace(/unicode-range:[^;]+;/,''); } }catch(e){}
  fontCss={href,css}; return css; }
async function svgToPng(svg,scale=3){
  const vb=svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/); const w=Math.round(parseFloat(vb[1])*scale), h=Math.round(parseFloat(vb[2])*scale);
  const css=await embeddedFonts();
  const src=svg.replace('<svg ',`<svg width="${w}" height="${h}" `).replace(/(<svg[^>]*>)/,`$1<style>${css}</style>`);
  return new Promise((res,rej)=>{ const img=new Image(); img.onload=()=>{ const cv=document.createElement('canvas'); cv.width=w; cv.height=h; cv.getContext('2d').drawImage(img,0,0,w,h); cv.toBlob(res,'image/png'); }; img.onerror=rej;
    img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(src); }); }

/* ------------------------------------------------------------------ zip + ase (no dependencies) */
const CRC=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t;})();
const crc32=b=>{let c=~0;for(let i=0;i<b.length;i++)c=CRC[(c^b[i])&255]^(c>>>8);return ~c>>>0;};
function makeZip(files){ // files:[{name, data:Uint8Array}]
  const enc=new TextEncoder(), parts=[], cd=[]; let off=0;
  for(const f of files){ const nm=enc.encode(f.name), crc=crc32(f.data), sz=f.data.length;
    const lh=new DataView(new ArrayBuffer(30)); lh.setUint32(0,0x04034b50,true); lh.setUint16(4,20,true); lh.setUint16(6,0x0800,true); lh.setUint32(14,crc,true); lh.setUint32(18,sz,true); lh.setUint32(22,sz,true); lh.setUint16(26,nm.length,true);
    parts.push(lh,nm,f.data);
    const ch=new DataView(new ArrayBuffer(46)); ch.setUint32(0,0x02014b50,true); ch.setUint16(4,20,true); ch.setUint16(6,20,true); ch.setUint16(8,0x0800,true); ch.setUint32(16,crc,true); ch.setUint32(20,sz,true); ch.setUint32(24,sz,true); ch.setUint16(28,nm.length,true); ch.setUint32(42,off,true);
    cd.push(ch,nm); off+=30+nm.length+sz; }
  const cdSize=cd.reduce((a,p)=>a+(p.byteLength),0);
  const end=new DataView(new ArrayBuffer(22)); end.setUint32(0,0x06054b50,true); end.setUint16(8,files.length,true); end.setUint16(10,files.length,true); end.setUint32(12,cdSize,true); end.setUint32(16,off,true);
  return new Blob([...parts,...cd,end],{type:'application/zip'}); }
function makeAse(colors){
  const bytes=[]; const u16=v=>bytes.push(v>>8&255,v&255), u32=v=>bytes.push(v>>>24&255,v>>16&255,v>>8&255,v&255);
  const f32=v=>{const b=new DataView(new ArrayBuffer(4)); b.setFloat32(0,v); for(let i=0;i<4;i++)bytes.push(b.getUint8(i));};
  [0x41,0x53,0x45,0x46].forEach(b=>bytes.push(b)); u16(1); u16(0); u32(colors.length);
  for(const c of colors){ const name=c.name+'\0'; const [r,g,b]=hex2rgb(c.hex).map(x=>x/255);
    u16(1); u32(2+name.length*2+4+12+2); u16(name.length); for(const ch of name)u16(ch.charCodeAt(0));
    [0x52,0x47,0x42,0x20].forEach(x=>bytes.push(x)); f32(r);f32(g);f32(b); u16(2); }
  return new Blob([new Uint8Array(bytes)],{type:'application/octet-stream'}); }
function colourSheetHtml(c){
  const cards=c.colors.map(k=>{const [r,g,b]=hex2rgb(k.hex),m=cmykOf(k);return `<div class="s"><div class="c" style="background:${k.hex}"></div><h3>${esc(k.name)}</h3><p>RGB ${r} · ${g} · ${b}</p><p>HEX ${k.hex.toUpperCase()}</p><p>CMYK ${m.join(' · ')}</p></div>`;}).join('');
  return `<!doctype html><meta charset="utf-8"><title>${esc(c.name)} colour sheet</title><style>body{font-family:Arial,sans-serif;margin:40px;color:#111}h1{letter-spacing:.1em;text-transform:uppercase}.g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.s{border:1px solid #ddd}.c{height:110px}h3{font-size:12px;letter-spacing:.12em;text-transform:uppercase;margin:12px}p{font-size:12px;margin:4px 12px;color:#555}p:last-child{margin-bottom:14px}</style><h1>${esc(c.name)} — colour sheet</h1><div class="g">${cards}</div>`; }

/* ------------------------------------------------------------------ icons */
let IP={l:'#eee',m:'#999',d:'#222',o:'#888'};
const ICONS={
  brand:a=>window.BPLogos&&IP.sym?IP.sym:`<svg viewBox="0 0 56 56"><rect x="8" y="6" width="40" height="30" rx="9" fill="none" stroke="${IP.l}" stroke-width="4"/><circle cx="28" cy="21" r="7" fill="${a}"/><rect x="8" y="44" width="10" height="8" fill="${a}"/><rect x="18" y="44" width="10" height="8" fill="${IP.l}"/><rect x="28" y="44" width="10" height="8" fill="${IP.m}"/><rect x="38" y="44" width="10" height="8" fill="${IP.d}"/></svg>`,
  media:a=>`<svg viewBox="0 0 56 56"><rect x="8" y="6" width="40" height="44" rx="3" fill="${IP.l}"/><rect x="12" y="10" width="32" height="26" fill="${IP.d}"/><path d="M12 32 L24 20 L32 28 L38 22 L44 30 V36 H12Z" fill="${IP.m}"/></svg>`,
  transfer:a=>`<svg viewBox="0 0 56 56"><path d="M6 26 L50 8 L36 48 L26 32Z" fill="${IP.l}"/><path d="M26 32 L50 8 L30 36Z" fill="${IP.m}"/></svg>`,
  templates:a=>`<svg viewBox="0 0 56 56"><rect x="4" y="16" width="30" height="22" rx="2" fill="${IP.o}" transform="rotate(-12 19 27)"/><rect x="16" y="14" width="34" height="24" rx="2" fill="${IP.l}"/><rect x="20" y="19" width="14" height="3" fill="${a}"/><rect x="20" y="26" width="24" height="2" fill="${IP.m}"/><rect x="20" y="31" width="18" height="2" fill="${IP.m}"/></svg>`,
  leads:a=>`<svg viewBox="0 0 56 56"><path d="M28 6c-9 0-15 6-15 14 0 11 15 28 15 28s15-17 15-28c0-8-6-14-15-14z" fill="${a}"/><circle cx="28" cy="20" r="6" fill="${IP.d}"/></svg>`,
  tools:a=>`<svg viewBox="0 0 56 56"><rect x="6" y="8" width="30" height="30" fill="none" stroke="${a}" stroke-width="2.5" stroke-dasharray="4 3"/><rect x="26" y="26" width="22" height="22" fill="${IP.l}"/><path d="M30 32h2v10h-2zm4 0h1v10h-1zm3 0h3v10h-3zm5 0h1v10h-1z" fill="${IP.d}"/></svg>`,
  product:a=>`<svg viewBox="0 0 56 56"><rect x="14" y="6" width="32" height="44" fill="${IP.l}"/><rect x="8" y="14" width="30" height="36" fill="${IP.l}"/><path d="M8 40 L20 28 L28 36 L38 26 V50 H8Z" fill="${IP.o}"/></svg>`,
  generic:a=>`<svg viewBox="0 0 56 56"><rect x="10" y="10" width="36" height="36" rx="8" fill="none" stroke="${a}" stroke-width="4"/></svg>`,
};

/* ------------------------------------------------------------------ rendering */
const app = $('#app');
const route = () => (location.hash||'#/').slice(1);

function applyTheme(c){
  const r=document.documentElement.style, a=c.theme.accent;
  r.setProperty('--accent',a); r.setProperty('--accent-dark',shade(a,-.18)); r.setProperty('--accent-light',shade(a,.12));
  r.setProperty('--sky1',c.theme.sky1); r.setProperty('--sky2',c.theme.sky2);
  r.setProperty('--ink',c.logo.ink);
  r.setProperty('--on-accent',c.theme.onAccent||'#ffffff');
  const f=c.type.font||'Montserrat'; r.setProperty('--heading-font',c.type.stack||`'${f}',system-ui,sans-serif`);
  // "Family:400;700|Other Family" -> one Google Fonts request; a bare name loads the regular weight only
  const spec=(c.type.google||f).split('|').map(s=>s.trim()).filter(Boolean).map(s=>{ const [n,w]=s.split(':'); return 'family='+n.trim().replace(/\s+/g,'+')+(w?':wght@'+w.trim():(s===(c.type.google||f)?':wght@300;400;500;600;700;800':'')); });
  $('#font-link').href=`https://fonts.googleapis.com/css2?${spec.join('&')}&display=swap`;
  document.title = c.name+' — Brand Portal';
}

function header(c,page,sub,back){
  const tab=`<div class="logotab">${logoHtml(c,'symbol','black')}</div>`;
  const fb=c.feedbackEmail?`mailto:${esc(c.feedbackEmail)}?subject=${encodeURIComponent(c.name+' portal feedback')}`:'#';
  if(page==='home') return `<header class="hdr"><div class="band"></div><div class="inner">
      <div class="hello">Good morning,<b>${esc(c.person)}.</b></div>
      <div class="ask"><input id="ask" placeholder="Ask me anything" aria-label="Ask me anything"></div>
      <div class="hbtns"><a class="hbtn" href="${fb}">Feedback</a><button class="hbtn" id="signout">Sign out</button></div>
    </div>${tab}</header>`;
  return `<header class="hdr brandhdr"><div class="band"></div><div class="inner">
      <div class="ptitle"><span class="tick"></span>${esc(page)}<small>${esc(sub||c.pageSubtitle)}</small></div>
      <div class="ask"><input id="ask" placeholder="Ask me anything" aria-label="Ask me anything"></div>
      <div class="hbtns"><a class="hbtn" href="${fb}">Feedback</a><a class="hbtn" href="${back?esc(back.href):'#/'}">${back?esc(back.label):'Back to portal'}</a></div>
    </div>${tab}</header>`;
}

function renderHome(c){
  const tiles=c.tiles.map(t=>{
    const def=TILE_DEFS.find(d=>d.key===t.key);
    IP={ l:c.logo.light||'#eee', m:c.logo.grey||'#999', d:c.logo.ink||'#222', o:c.logo.onDarkAccent||c.theme.accent, sym:`<svg viewBox="0 0 56 56"><g transform="translate(8 8)">${logoSvg(c,'symbol','white').replace('<svg ','<svg width="40" height="40" ')}</g></svg>` };
    const ico=(ICONS[t.key]||ICONS.generic)(c.theme.accent);
    const href=t.url?esc(t.url):`#/${t.key==='brand'?'brand':'page/'+t.key}`;
    const ext=t.url&&/^https?:/.test(t.url)?' target="_blank" rel="noopener"':'';
    return `<a class="tile${t.enabled?'':' off'}" href="${href}"${ext}><div class="ico">${ico}</div><b>${esc(t.title)}</b><span>${esc(t.sub)}</span></a>`;
  }).join('');
  return header(c,'home')+`<main class="sky"><div class="tiles">${tiles}</div></main><footer class="foot">${esc(c.footerText)}</footer>`;
}

const q = (c,k)=>`<span class="q" data-tip="${esc(c.help[k]||'')}">?</span>`;
const fold=(id,label,inner)=>`<div class="fold" id="${id}"><button type="button"><span class="car">›</span>${label}</button><div class="body">${inner}</div></div>`;

function renderBrand(c){
  /* 01 logo */
  const logoPanels=LAYOUTS.map((l,i)=>`<div class="logo-panel" data-layout="${l}" style="${i?'display:none':''}"><div class="grid3">${
    WAYS.map(w=>`<div class="card ${w.cls}"><div class="pv" style="height:142px">${logoHtml(c,l,w.id)}</div><div class="bar"><span>${w.label}</span><span class="mini"><button data-dl="svg" data-layout="${l}" data-way="${w.id}">SVG</button><button data-dl="png" data-layout="${l}" data-way="${w.id}">PNG</button><button data-copy-logo data-layout="${l}" data-way="${w.id}" title="Copy SVG">🔗</button></span></div></div>`).join('')
  }</div></div>`).join('');

  const clear=`<div class="clear"><div class="clearbox"><i></i><i></i><i></i><i></i><div style="width:120px">${logoHtml(c,'stacked','black')}</div></div></div><p class="cap">${esc(c.rules.clearSpace)}</p>`;
  const place=`<span class="sub">Do · Placement</span><div class="grid2"><div class="place" style="justify-content:flex-start">${logoHtml(c,'horizontal','black')}</div><div class="place" style="justify-content:flex-end">${logoHtml(c,'horizontal','black')}</div></div><p class="cap">Place the logo in a corner — bottom left or bottom right — never centred on busy imagery.</p>`;
  const allDonts=[...DONTS.filter(d=>c.rules.donts.includes(d.id)),...(c.rules.customDonts||[]).map(t=>({text:t,style:'filter:grayscale(1) opacity(.5)'}))];
  const donts=`<span class="sub">Don'ts</span><div class="grid3">${allDonts.map(d=>`<div><div class="dont"><div style="display:flex;${''}"><div style="${d.style};height:104px;display:block;transform-origin:center">${logoHtml(c,'stacked','black')}</div></div></div><p class="cap">${esc(d.text)}</p></div>`).join('')}</div>`;

  /* 02 colour */
  const sw=c.colors.map((k,i)=>{const [r,g,b]=hex2rgb(k.hex),m=cmykOf(k);
    const row=(l,v)=>`<div class="r"><span>${l} ${esc(v)}</span><button data-copy="${esc(v)}">Copy</button></div>`;
    return `<div class="sw"><div class="c" style="background:${esc(k.hex)}"></div><div class="n">${esc(k.name)}</div>${row('RGB',`${r} · ${g} · ${b}`)}${row('HEX',k.hex.toUpperCase())}${row('CMYK',m.join(' · '))}</div>`;}).join('');

  /* 03 type */
  const specs=c.type.specs.map(s=>`<div class="tspec"><label>${esc(s.label)}</label><div class="s" style="${s.family?`font-family:${esc(s.family)};`:''}font-weight:${s.weight};font-size:${s.size}px;letter-spacing:${s.tracking}em;${s.upper?'text-transform:uppercase;':''}white-space:pre-line">${esc(s.sample)}</div></div>`).join('');

  /* 04 elements */
  const el={
    icon: ()=>`<div class="grid3">${WAYS.map(w=>`<div class="card ${w.cls}"><div class="pv">${logoHtml(c,'symbol',w.id)}</div><div class="bar"><span>${w.label}</span><span class="mini"><button data-dl="svg" data-layout="symbol" data-way="${w.id}">SVG</button><button data-dl="png" data-layout="symbol" data-way="${w.id}">PNG</button></span></div></div>`).join('')}</div>`,
    pattern: ()=>`<div class="grid3">${[['black','On light',''],['white','On dark','dark']].map(([w,n,cls])=>`<div class="card ${cls}"><div class="pv" style="padding:0;background:${w==='white'?'#000':'#fdfdfc'} url('${patternUrl(c,w)}');background-size:64px"></div><div class="bar"><span>${n}</span><span class="mini"><button data-dl-el="pattern" data-v="${w}">SVG</button></span></div></div>`).join('')}</div>`,
    gradients: ()=>`<div class="grid3">${c.gradients.map(g=>`<div class="card"><div class="pv" style="background:linear-gradient(${g.angle}deg,${esc(g.from)},${esc(g.to)})"></div><div class="bar"><span>${esc(g.name)}</span><span class="mini"><button data-copy="linear-gradient(${g.angle}deg, ${esc(g.from)}, ${esc(g.to)})">CSS</button></span></div></div>`).join('')}</div>`,
  };
  const elPanels=`<div class="el-panel" data-el="icon">${el.icon()}</div><div class="el-panel" data-el="pattern" style="display:none">${el.pattern()}</div><div class="el-panel" data-el="gradients" style="display:none">${el.gradients()}</div>`;

  /* 05 imagery */
  const imgs=c.imagery.map(i=>`<div class="card imgc"><div class="pv" style="background-image:url('${i.url.replace(/'/g,"%27")}')"></div><div class="bar"><span>${esc(i.label)}</span><span class="mini"><a href="${esc(c.mediaUrl||'#/page/media')}">Open</a></span></div></div>`).join('');

  return header(c,'Brand')+`<main class="wrap">
  <section class="sec"><h2><i>01</i>Logo ${q(c,'logo')}</h2>
    <div class="pills" data-pills="logo">${LAYOUTS.map((l,i)=>`<button class="${i?'':'on'}" data-v="${l}">${l}</button>`).join('')}</div>
    ${logoPanels}
    <button class="btn" id="dl-assets">Download brand assets</button>
    ${fold('rules',"Rules and don'ts",`<span class="sub" style="margin-top:0">Clear space</span>${clear}${place}${donts}`)}
  </section>
  <section class="sec"><h2><i>02</i>Colour ${q(c,'colour')}</h2>
    <div class="swatches">${sw}</div>
    <button class="btn" id="dl-ase">Download ASE</button><button class="btn" id="dl-sheet">Download colour sheet</button>
  </section>
  <section class="sec"><h2><i>03</i>Type ${q(c,'type')}</h2>
    ${specs}<p class="tnote">${esc(c.type.note)}</p>
    ${c.type.downloadUrl?`<a class="btn" href="${esc(c.type.downloadUrl)}" target="_blank" rel="noopener">Download ${esc(c.type.font)}</a>`:''}
  </section>
  <section class="sec"><h2><i>04</i>Elements ${q(c,'elements')}</h2>
    <div class="pills" data-pills="el">${[['icon','Icon'],['pattern','Pattern'],['gradients','Gradients']].map(([v,l],i)=>`<button class="${i?'':'on'}" data-v="${v}">${l}</button>`).join('')}</div>
    ${elPanels}
  </section>
  <section class="sec"><h2><i>05</i>Imagery ${q(c,'imagery')}</h2>
    <div class="grid3" style="margin-top:20px">${imgs}</div>
    <a class="btn" href="${esc(c.mediaUrl||'#/page/media')}">Open media portal</a>
  </section>
  <a class="back" href="#/">Back to portal</a></main>`;
}

function renderStub(c,key){
  const t=c.tiles.find(x=>x.key===key)||{title:key,sub:''};
  return header(c,t.title)+`<main class="wrap stub"><h3>${esc(t.title)}</h3><p>${esc(t.sub)}</p><p style="max-width:460px;margin:24px auto 0;font-size:13px;line-height:1.6">This section isn't built yet. Set a link for it under Settings → Portal tiles, or leave it for the next build step.</p><a class="back" href="#/">Back to portal</a></main>`;
}

function render(){
  const c=co(); applyTheme(c);
  const r=route();
  let html;
  if(r==='/brand') html=renderBrand(c);
  else if(r.startsWith('/page/templates')) html=window.BPTemplates.render(c,r.slice(16).replace(/^\//,''),tplHelpers());
  else if(r.startsWith('/page/')) html=renderStub(c,r.slice(6));
  else html=renderHome(c);
  const keepFold=$('#rules')?.classList.contains('open');
  app.innerHTML=html;
  if(keepFold&&$('#rules')) $('#rules').classList.add('open');
  scrollTo(0,render.keepScroll||0); render.keepScroll=0;
  wirePage(); window.BPTemplates.wire(c,tplHelpers());
}
const tplHelpers=()=>({ header, logoSource, logoHtml, download, toast, rerender, save, slug, patternUrl, readImage, co, makeZip, svgToPng });
function rerender(){ render.keepScroll=scrollY; render(); }

/* ------------------------------------------------------------------ page interactions */
async function downloadLogo(kind,layout,way){
  const c=co(), src=logoSource(c,layout,way), name=`${slug(c.name)}-${layout}-${way}`;
  if(kind==='svg'){ if(!src.svg) return toast('This logo was uploaded as PNG only'); download(new Blob([src.svg],{type:'image/svg+xml'}),name+'.svg'); }
  else if(src.png){ const b=await (await fetch(src.png)).blob(); download(b,name+'.png'); }
  else download(await svgToPng(src.svg),name+'.png');
}
async function downloadAll(){
  const c=co(), files=[], enc=new TextEncoder(); toast('Preparing brand assets…');
  for(const l of LAYOUTS) for(const w of WAYS){ const s=logoSource(c,l,w.id), n=`logo/${l}-${w.id}`;
    if(s.svg){ files.push({name:n+'.svg',data:enc.encode(s.svg)}); files.push({name:n+'.png',data:new Uint8Array(await (await svgToPng(s.svg)).arrayBuffer())}); }
    else files.push({name:n+'.png',data:new Uint8Array(await (await fetch(s.png)).arrayBuffer())}); }
  files.push({name:'colour/colours.ase',data:new Uint8Array(await makeAse(c.colors).arrayBuffer())});
  files.push({name:'colour/colour-sheet.html',data:enc.encode(colourSheetHtml(c))});
  download(makeZip(files),`${slug(c.name)}-brand-assets.zip`); toast('Brand assets downloaded');
}
function wirePage(){
  const c=co();
  $('#ask')?.addEventListener('keydown',e=>{ if(e.key==='Enter'&&e.target.value.trim()){ toast('“Ask me anything” isn’t connected in this build yet'); e.target.value=''; } });
  $('#signout')?.addEventListener('click',()=>toast('Demo portal — sign-in isn’t enabled'));
  $('#dl-assets')?.addEventListener('click',downloadAll);
  $('#dl-ase')?.addEventListener('click',()=>download(makeAse(c.colors),`${slug(c.name)}.ase`));
  $('#dl-sheet')?.addEventListener('click',()=>download(new Blob([colourSheetHtml(c)],{type:'text/html'}),`${slug(c.name)}-colour-sheet.html`));
  $('#rules')?.querySelector('button').addEventListener('click',()=>$('#rules').classList.toggle('open'));
  document.querySelectorAll('[data-pills]').forEach(p=>p.addEventListener('click',e=>{
    const b=e.target.closest('button'); if(!b) return; p.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));
    const sel=p.dataset.pills==='logo'?'.logo-panel':'.el-panel', attr=p.dataset.pills==='logo'?'layout':'el';
    document.querySelectorAll(sel).forEach(x=>x.style.display=x.dataset[attr]===b.dataset.v?'':'none'); }));
}
function onPageClick(e){
  const c=co(), t=e.target.closest('button');
  if(!t) return;
  if(t.dataset.dl) downloadLogo(t.dataset.dl,t.dataset.layout,t.dataset.way);
  else if(t.dataset.copy) navigator.clipboard.writeText(t.dataset.copy).then(()=>toast('Copied '+t.dataset.copy));
  else if('copyLogo' in t.dataset){ const s=logoSource(c,t.dataset.layout,t.dataset.way); navigator.clipboard.writeText(s.svg||'').then(()=>toast(s.svg?'SVG copied':'PNG-only logo')); }
  else if(t.dataset.dlEl){ const w=t.dataset.v;
    download(new Blob([patternSvg(c,w)],{type:'image/svg+xml'}),`${slug(c.name)}-pattern-${w}.svg`); }
}

/* ------------------------------------------------------------------ settings drawer */
const drawer=$('#drawer'); let tab='company';
const TABS=[['company','Company'],['logo','Logo'],['colours','Colours'],['type','Type'],['imagery','Imagery'],['rules','Rules'],['tiles','Portal tiles'],['data','Data']];

const F=(path,label,type='text',extra='')=>{ const v=getp(co(),path); return `<div class="fg"><label>${label}</label><input type="${type}" data-p="${path}" value="${esc(v)}" ${extra}></div>`; };
const Colour=(path,label)=>{ const v=getp(co(),path)||'#000000'; return `<div class="fg"><label>${label}</label><div class="row"><input type="color" data-p="${path}" value="${esc(v)}"><input type="text" data-p="${path}" value="${esc(v)}" style="max-width:120px"></div></div>`; };
const TA=(path,label)=>`<div class="fg"><label>${label}</label><textarea data-p="${path}">${esc(getp(co(),path))}</textarea></div>`;

function drawerBody(c){
  switch(tab){
  case 'company': return `<div class="h">Identity</div>${F('name','Company name')}${F('person','Greeting name (who is signed in)')}${F('tagline','Tagline')}${F('footerText','Footer line')}${F('pageSubtitle','Brand page subtitle')}${F('feedbackEmail','Feedback email','text')}
    <div class="h">Theme</div><div class="row">${Colour('theme.accent','Accent colour')}${Colour('theme.onAccent','Text on accent')}</div><div class="row">${Colour('theme.sky1','Background top')}${Colour('theme.sky2','Background bottom')}</div>
    <div class="h">Help tooltips</div>${['logo','colour','type','elements','imagery'].map(k=>TA('help.'+k,'“?” text — '+k)).join('')}`;
  case 'logo': return `<div class="h">Generated logo</div><p class="hint">The logo is drawn from these settings. Upload real artwork per slot below to replace it.</p>
    <div class="fg"><label>Logo style</label><select data-p="logo.kind">${window.BPLogos.KINDS.map(k=>`<option value="${k}" ${(c.logo.kind||'mark')===k?'selected':''}>${esc(window.BPLogos.KIND_LABELS[k]||k)}</option>`).join('')}</select></div>
    ${F('logo.wordmark','Wordmark text')}<div class="row">${F('logo.first','First line (wordmark styles)')}${F('logo.second','Second line')}</div>${F('logo.letter','Symbol letter / monogram')}${F('logo.legend','Seal ring text')}
    <div class="row">${Colour('logo.ink','Ink colour')}${Colour('logo.accent','Accent on light')}</div><div class="row">${Colour('logo.light','Light colour (on dark)')}${Colour('logo.onDarkAccent','Accent on dark')}</div>${Colour('logo.grey','Grey colour')}
    ${F('logo.fonts.display','Logo display font (CSS)')}${F('logo.fonts.detail','Logo detail font (CSS)')}
    <div class="h">Upload artwork (SVG or PNG)</div>${LAYOUTS.map(l=>`<div class="item"><b style="text-transform:capitalize">${l}</b>${WAYS.map(w=>{const has=c.logo.custom?.[l]?.[w.id];return `<div class="row"><span style="width:56px;color:#aaa">${w.label}</span><label class="dbtn" style="flex:1;text-align:center">${has?'Replace':'Upload'}<input type="file" accept="image/svg+xml,image/png" hidden data-up-logo="${l}.${w.id}"></label>${has?`<button class="dbtn del" data-act="logo-clear" data-k="${l}.${w.id}">Reset</button>`:''}</div>`;}).join('')}</div>`).join('')}`;
  case 'colours': return `<p class="hint">RGB is derived from HEX. CMYK is calculated unless you enter print values (e.g. “60 50 40 100”).</p>${c.colors.map((k,i)=>`<div class="item"><div class="row"><input type="color" data-p="colors.${i}.hex" value="${esc(k.hex)}"><input type="text" data-p="colors.${i}.name" value="${esc(k.name)}"><button class="dbtn del" data-act="del" data-list="colors" data-i="${i}">✕</button></div><div class="row"><input type="text" data-p="colors.${i}.hex" value="${esc(k.hex)}" style="max-width:110px"><input type="text" placeholder="CMYK override (optional)" data-p="colors.${i}.cmyk" value="${esc(k.cmyk||'')}"></div></div>`).join('')}<button class="dbtn" data-act="add-colour">+ Add colour</button>`;
  case 'type': return `${F('type.font','Font name (CSS)')}${F('type.google','Google Fonts family (for loading)')}${F('type.downloadUrl','Font download link','url')}${TA('type.note','Note under the specimens')}<div class="h">Specimens</div>${c.type.specs.map((s,i)=>`<div class="item"><div class="fg" style="margin-bottom:8px"><input type="text" data-p="type.specs.${i}.label" value="${esc(s.label)}"></div><div class="fg" style="margin-bottom:8px"><input type="text" placeholder="Font family for this specimen (CSS, optional)" data-p="type.specs.${i}.family" value="${esc(s.family||'')}"></div><textarea data-p="type.specs.${i}.sample">${esc(s.sample)}</textarea><div class="row" style="margin-top:8px"><input type="number" data-p="type.specs.${i}.weight" data-num value="${s.weight}" title="Weight"><input type="number" data-p="type.specs.${i}.size" data-num value="${s.size}" title="Size px"><input type="number" step=".01" data-p="type.specs.${i}.tracking" data-num value="${s.tracking}" title="Tracking em"><label class="chk"><input type="checkbox" data-p="type.specs.${i}.upper" ${s.upper?'checked':''}>CAPS</label><button class="dbtn del" data-act="del" data-list="type.specs" data-i="${i}">✕</button></div></div>`).join('')}<button class="dbtn" data-act="add-spec">+ Add specimen</button><p class="hint" style="margin-top:8px">Fields: weight · size (px) · tracking (em).</p>`;
  case 'imagery': return `<div class="h">Image library</div>${F('mediaUrl','Media portal link (button target)')}${c.imagery.map((m,i)=>`<div class="item"><div class="row"><div class="thumb" style="background-image:url('${m.url.replace(/'/g,'%27')}')"></div><input type="text" data-p="imagery.${i}.label" value="${esc(m.label)}"><button class="dbtn del" data-act="del" data-list="imagery" data-i="${i}">✕</button></div><div class="row"><input type="url" placeholder="Image URL" data-p="imagery.${i}.url" value="${m.url.startsWith('data:')?'':esc(m.url)}"><label class="dbtn">Upload<input type="file" accept="image/*" hidden data-up-img="${i}"></label></div></div>`).join('')}<button class="dbtn" data-act="add-image">+ Add image</button>
    <div class="h">Gradients</div>${c.gradients.map((g,i)=>`<div class="item"><div class="row"><input type="text" data-p="gradients.${i}.name" value="${esc(g.name)}"><button class="dbtn del" data-act="del" data-list="gradients" data-i="${i}">✕</button></div><div class="row"><input type="color" data-p="gradients.${i}.from" value="${esc(g.from)}"><input type="color" data-p="gradients.${i}.to" value="${esc(g.to)}"><input type="number" data-num data-p="gradients.${i}.angle" value="${g.angle}" title="Angle"></div></div>`).join('')}<button class="dbtn" data-act="add-gradient">+ Add gradient</button>`;
  case 'rules': return `${TA('rules.clearSpace','Clear-space rule')}<div class="h">Show these “don’ts”</div>${DONTS.map(d=>`<label class="chk" style="margin-bottom:8px"><input type="checkbox" data-donts="${d.id}" ${c.rules.donts.includes(d.id)?'checked':''}>${esc(d.text)}</label>`).join('')}<div class="h">Custom don’ts</div>${(c.rules.customDonts||[]).map((t,i)=>`<div class="row" style="margin-bottom:8px"><input type="text" data-p="rules.customDonts.${i}" value="${esc(t)}"><button class="dbtn del" data-act="del" data-list="rules.customDonts" data-i="${i}">✕</button></div>`).join('')}<button class="dbtn" data-act="add-dont">+ Add custom don’t</button>`;
  case 'tiles': return `<p class="hint">Choose which sections the home screen shows. A link replaces the built-in page (use a full URL or #/page/name).</p>${c.tiles.map((t,i)=>`<div class="item"><div class="row"><input type="text" data-p="tiles.${i}.title" value="${esc(t.title)}"><label class="chk"><input type="checkbox" data-p="tiles.${i}.enabled" ${t.enabled?'checked':''}>On</label></div><div class="row"><input type="text" data-p="tiles.${i}.sub" value="${esc(t.sub)}"></div>${t.key!=='brand'?`<div class="row"><input type="url" placeholder="Link (optional)" data-p="tiles.${i}.url" value="${esc(t.url||'')}"></div>`:''}</div>`).join('')}`;
  case 'data': return `<div class="h">This company</div><div class="row"><button class="dbtn" data-act="export">Export config (.json)</button><label class="dbtn">Import config<input type="file" accept="application/json" hidden id="imp"></label></div>
    <div class="h">Danger zone</div><button class="dbtn del" data-act="reset">Reset to the imported brands</button><p class="hint" style="margin-top:12px">Everything is stored in this browser. Export a company’s config to move it to another machine or hand it to a client.</p>`;
  }
}
function renderDrawer(){
  const c=co();
  drawer.innerHTML=`<div class="dh"><div><b>Portal settings</b><small>Control interface — edits what the portal shows</small></div><button class="x" data-act="close" aria-label="Close">×</button></div>
  <div class="dsw"><select id="sw">${store.companies.map(x=>`<option value="${x.id}" ${x.id===c.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select><button class="dbtn" data-act="new">New</button><button class="dbtn" data-act="dup">Duplicate</button><button class="dbtn del" data-act="rm" title="Delete company">✕</button></div>
  <div class="dtabs">${TABS.map(([k,l])=>`<button class="${k===tab?'on':''}" data-tab="${k}">${l}</button>`).join('')}</div>
  <div class="dbody">${drawerBody(c)}</div>`;
}
function openDrawer(o){ drawer.classList.toggle('open',o); drawer.setAttribute('aria-hidden',!o); if(o) renderDrawer(); }
$('#gear').addEventListener('click',()=>openDrawer(!drawer.classList.contains('open')));
document.addEventListener('keydown',e=>{ if(e.key==='Escape') openDrawer(false); });

function readImage(file,max=1100){ return new Promise(res=>{ const fr=new FileReader(); fr.onload=()=>{ const im=new Image(); im.onload=()=>{ const s=Math.min(1,max/Math.max(im.width,im.height)); const cv=document.createElement('canvas'); cv.width=im.width*s; cv.height=im.height*s; cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height); res(cv.toDataURL('image/jpeg',.82)); }; im.src=fr.result; }; fr.readAsDataURL(file); }); }
const readData = f => new Promise(r=>{ const fr=new FileReader(); fr.onload=()=>r(fr.result); fr.readAsDataURL(f); });

drawer.addEventListener('input',e=>{
  const t=e.target, p=t.dataset.p;
  if(p){ let v=t.type==='checkbox'?t.checked:t.dataset.num!==undefined?parseFloat(t.value)||0:t.value;
    setp(co(),p,v);
    // keep paired colour/text inputs in sync
    drawer.querySelectorAll(`[data-p="${p}"]`).forEach(o=>{ if(o!==t&&o.type!=='checkbox') o.value=v; });
    if(p==='name'){ const o=$('#sw option:checked'); if(o)o.textContent=v; }
    save(); rerender(); }
  if(t.dataset.donts){ const d=co().rules.donts, id=t.dataset.donts; const i=d.indexOf(id); if(t.checked&&i<0)d.push(id); if(!t.checked&&i>=0)d.splice(i,1); save(); rerender(); }
});
drawer.addEventListener('change',async e=>{
  const t=e.target, c=co();
  if(t.id==='sw'){ store.active=t.value; save(); renderDrawer(); rerender(); return; }
  if(t.dataset.upLogo&&t.files[0]){ const [l,w]=t.dataset.upLogo.split('.'); const f=t.files[0]; (c.logo.custom[l]=c.logo.custom[l]||{})[w]=f.type==='image/svg+xml'?await readData(f):await readData(f); save(); renderDrawer(); rerender(); toast('Logo updated'); }
  if(t.dataset.upImg!==undefined&&t.files[0]){ c.imagery[+t.dataset.upImg].url=await readImage(t.files[0]); save(); renderDrawer(); rerender(); }
  if(t.id==='imp'&&t.files[0]){ try{ const j=JSON.parse(await t.files[0].text()); if(!j.name||!j.colors) throw 0; j.id=slug(j.name)+'-'+Math.random().toString(36).slice(2,5); store.companies.push(j); store.active=j.id; save(); renderDrawer(); rerender(); toast('Imported '+j.name); }catch(_){ toast('That file isn’t a valid portal config'); } }
});
drawer.addEventListener('click',e=>{
  const c=co(); const tb=e.target.closest('[data-tab]'); if(tb){ tab=tb.dataset.tab; renderDrawer(); return; }
  const b=e.target.closest('[data-act]'); if(!b) return; const a=b.dataset.act;
  const done=()=>{ save(); renderDrawer(); rerender(); };
  if(a==='close') return openDrawer(false);
  if(a==='del'){ const l=getp(c,b.dataset.list); l.splice(+b.dataset.i,1); return done(); }
  if(a==='add-colour'){ c.colors.push({name:'New colour',hex:'#888888'}); return done(); }
  if(a==='add-spec'){ c.type.specs.push({label:'New style',sample:'Sample text',weight:400,size:16,tracking:0,upper:false}); return done(); }
  if(a==='add-image'){ c.imagery.push({label:'New image',url:scene('#333','#888','NEW')}); return done(); }
  if(a==='add-gradient'){ c.gradients.push({name:'New gradient',from:c.theme.accent,to:'#000000',angle:135}); return done(); }
  if(a==='add-dont'){ (c.rules.customDonts=c.rules.customDonts||[]).push("Don't …"); return done(); }
  if(a==='logo-clear'){ const [l,w]=b.dataset.k.split('.'); delete c.logo.custom[l][w]; return done(); }
  if(a==='new'){ const n=blankCompany(); store.companies.push(n); store.active=n.id; tab='company'; return done(); }
  if(a==='dup'){ const n=JSON.parse(JSON.stringify(c)); n.id=slug(c.name)+'-'+Math.random().toString(36).slice(2,5); n.name+=' copy'; store.companies.push(n); store.active=n.id; return done(); }
  if(a==='rm'){ if(store.companies.length<2) return toast('Keep at least one company'); if(!confirm(`Delete “${c.name}”? This can’t be undone.`)) return; store.companies=store.companies.filter(x=>x.id!==c.id); store.active=store.companies[0].id; return done(); }
  if(a==='export') return download(new Blob([JSON.stringify(c,null,2)],{type:'application/json'}),slug(c.name)+'-portal.json');
  if(a==='reset'){ if(!confirm('Reset to the Impact Sourcing brand? Your edits and added companies will be lost.')) return; store=seed(); return done(); }
});

/* ------------------------------------------------------------------ boot */
const qs=new URLSearchParams(location.search).get('company');
if(qs&&store.companies.some(c=>c.id===qs)) store.active=qs;
app.addEventListener('click',onPageClick);
addEventListener('hashchange',()=>{ render.keepScroll=0; render(); });
render();
})();
