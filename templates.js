/* Templates section: seven brand-driven templates (company presentation, reference collage, blog, social,
   signature, letterhead, mailing). Everything is built from the active company's logo, colours, fonts,
   tagline and imagery, so switching company re-skins every template. Loaded before app.js. */
(() => {
'use strict';
const TPL = [
  { id:'deck',       title:'Company presentation', sub:'Deck and PDF' },
  { id:'collage',    title:'Reference collage',    sub:'Booklet and PDF' },
  { id:'blog',       title:'Blog',                 sub:'Articles for the website' },
  { id:'social',     title:'Social',               sub:'Post and story' },
  { id:'signature',  title:'Signature',            sub:'E-mail' },
  { id:'letterhead', title:'Letterhead',           sub:'Word templates' },
  { id:'mailing',    title:'Mailing',              sub:'E-mail HTML' },
];
const SUBS = { deck:'Slides and PDF', collage:'Booklet and PDF', blog:'Articles for the website', social:'Post and story', signature:'E-mail', letterhead:'Word templates', mailing:'E-mail HTML' };
let H = null, S = { doc:null, docKind:null, sel:0, slide:0, search:'' };
const D = c => c.tpl || (c.tpl = {});
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const nl = s => esc(s).replace(/\n/g,'<br>');
const $ = (s,r=document) => r.querySelector(s);

/* ---- brand tokens ---- */
function T(c){
  const L=c.logo, f=L.fonts||{}, head=f.display||c.type.stack||`'${c.type.font}',sans-serif`;
  return { ink:L.ink, paper:c.theme.sky2||'#fff', soft:c.theme.sky1||'#eee', acc:L.accent||c.theme.accent, brand:c.theme.accent, onBrand:c.theme.onAccent||'#fff',
    light:L.light||'#fff', onDark:L.onDarkAccent||c.theme.accent, head, body:f.body||f.display||c.type.stack||'system-ui,sans-serif', mono:f.detail||f.body||'monospace',
    tag:c.tagline||'', grey:L.grey||'#888', line:'#d8d6cf' };
}
function imgOf(c,layout,way){ const s=H.logoSource(c,layout,way); return s.svg?'data:image/svg+xml;utf8,'+encodeURIComponent(s.svg):s.png; }
const fontLink = () => `<link rel="stylesheet" href="${esc(document.getElementById('font-link').href)}">`;
const photos = c => (c.imagery||[]).map(i=>i.url).concat(D(c).uploads||[]);
const loadImg = src => new Promise((res,rej)=>{ const i=new Image(); i.crossOrigin='anonymous'; i.onload=()=>res(i); i.onerror=rej; i.src=src; });

/* ---- generic page chrome ---- */
function chrome(c,sub,inner,extraClass){
  const t=TPL.find(x=>x.id===sub);
  return H.header(c, t?t.title:'Templates', t?SUBS[sub]:'Presentation, reference collage, social and more', t?{href:'#/page/templates',label:'Back to templates'}:null)+`<main class="wrap tp ${extraClass||''}">${inner}</main>`;
}
const fld=(root,path,label,v,type)=> type==='ta'
  ? `<div class="tf"><label>${label}</label><textarea data-f="${root}:${path}" rows="4">${esc(v)}</textarea></div>`
  : type==='select' ? '' : `<div class="tf"><label>${label}</label><input data-f="${root}:${path}" value="${esc(v)}" ${type==='tel'?'type="tel"':''}></div>`;
const seg=(root,path,opts,v)=>`<div class="seg">${opts.map(([k,l])=>`<button type="button" data-seg="${root}:${path}" data-v="${k}" class="${v===k?'on':''}">${l}</button>`).join('')}</div>`;
const thumbs=(c,root,path,cur)=>`<div class="thumbs">${photos(c).map((u,i)=>`<button type="button" class="${cur===u?'on':''}" data-pick="${root}:${path}" data-i="${i}" style="background-image:url('${esc(u)}')"></button>`).join('')}<label class="up" title="Upload"><input type="file" accept="image/*" data-upload="${root}:${path}" hidden>+</label></div>`;
function rootObj(c,name){ return name==='doc'?S.doc: name==='details'?(D(c).details=D(c).details||{}) : (D(c)[name]=D(c)[name]||{}); }
function getp(o,p){ return p.split('.').reduce((a,k)=>a==null?a:a[k],o); }
function setp(o,p,v){ const k=p.split('.'), l=k.pop(); k.reduce((a,x)=>a[x],o)[l]=v; }

/* ================================================================== hub */
function miniIcon(c,t){
  const k=T(c), ac=k.acc;
  const g={ deck:`<rect x="8" y="12" width="32" height="22" fill="${k.ink}"/><rect x="12" y="16" width="14" height="3" fill="${ac}"/><rect x="12" y="22" width="22" height="2" fill="#888"/>`,
    collage:`<rect x="8" y="10" width="20" height="26" fill="#6d7a89"/><rect x="29" y="10" width="11" height="12" fill="#a9b0b8"/><rect x="29" y="24" width="11" height="12" fill="${ac}"/>`,
    blog:`<rect x="8" y="10" width="32" height="14" fill="#a9b0b8"/><rect x="8" y="28" width="22" height="3" fill="#fff"/><rect x="8" y="34" width="30" height="2" fill="#777"/>`,
    social:`<rect x="8" y="9" width="20" height="28" fill="${k.ink}"/><rect x="24" y="14" width="16" height="16" fill="${ac}"/>`,
    signature:`<rect x="8" y="12" width="32" height="24" fill="#f0f0f0"/><rect x="12" y="16" width="12" height="3" fill="${ac}"/><rect x="12" y="23" width="24" height="2" fill="#999"/><rect x="12" y="28" width="18" height="2" fill="#999"/>`,
    letterhead:`<rect x="13" y="7" width="22" height="34" fill="#fafafa"/><rect x="28" y="10" width="5" height="5" fill="${ac}"/><rect x="16" y="22" width="16" height="1.5" fill="#bbb"/><rect x="16" y="26" width="14" height="1.5" fill="#bbb"/><rect x="16" y="35" width="8" height="2" fill="${k.ink}"/>`,
    mailing:`<rect x="14" y="7" width="20" height="34" fill="#f4f4f4"/><rect x="16" y="9" width="16" height="12" fill="#8b97a6"/><rect x="16" y="25" width="10" height="2" fill="${ac}"/><rect x="16" y="30" width="14" height="1.5" fill="#aaa"/>` }[t.id];
  return `<svg viewBox="0 0 48 48">${g}</svg>`;
}
function hub(c){
  return chrome(c,'',`<div class="tphub">${TPL.map(t=>`<a class="tile" href="#/page/templates/${t.id}"><div class="ico">${miniIcon(c,t)}</div><b>${esc(t.title)}</b><span>${esc(t.sub)}</span></a>`).join('')}</div>`,'hubwrap');
}

/* ================================================================== documents (letterhead) */
const DET = c => Object.assign({ address:'Street and number\nPostcode City\nCountry', phone:'+00 0 0000 0000', email:'hello@example.com', web:'example.com', legal:'Company number 00000000', date:'12 November 2026', recipient:'Recipient name\nCompany\nStreet and number\nPostcode City', salutation:'Dear Name,' }, D(c).details||{});
const S1='Thank you for your time during our meeting last week. As agreed, we enclose our proposal for the work we discussed, including scope, timing and the people involved.';
const S2='The proposal is valid for thirty days. Should you wish to adjust the scope or the schedule, please contact us directly. We look forward to hearing from you.';
const BLK_DEF=(c,kind)=>{ const k=T(c), d=DET(c), P=t=>({s:'p',t});
  if(kind==='head') return [P('')];
  if(kind==='cont') return [P(S1),P(S2)];
  if(kind==='letter') return [{s:'h2',t:'Proposal and next steps'},P(d.salutation),P(S1),P(S2),P('Kind regards,'),P((c.person||'')+'\n'+c.name)];
  return [{s:'t',t:c.name},{s:'l',t:k.tag},{s:'h1',t:'Introduction'},P(S1),P(S2),{s:'h1',t:'Approach'},P('Each section starts with a plain heading and a short paragraph. Names, places and dates are written out in full.'),{s:'h1',t:'Next steps'},P('Name the place, name the maker and number the batch.')]; };
const BLK=(c,kind)=>(D(c).blocks&&D(c).blocks[kind])||BLK_DEF(c,kind);
/* edit=true makes every text on the sheet editable in place (details are shared with the form on the left) */
function sheet(c,kind,edit){
  const k=T(c), d=DET(c), logo=imgOf(c,'horizontal','black'), sym=imgOf(c,'symbol','black');
  const ef=(key,t)=> edit?`<span contenteditable="plaintext-only" spellcheck="false" class="ed" data-ed="details:${key}" style="white-space:pre-line">${esc(t)}</span>`:nl(t);
  const css=`<style>.a4 [data-s]{margin:0 0 12px;white-space:pre-line;outline:none}.a4 [data-s=t]{font:500 36px/1.1 ${k.head};margin-bottom:10px}.a4 [data-s=l]{font:500 9px/1.7 ${k.mono};letter-spacing:.2em;color:${k.acc};text-transform:uppercase;margin-bottom:28px}.a4 [data-s=h1]{font:500 20px/1.3 ${k.head};margin:22px 0 8px}.a4 [data-s=h2]{font:600 12px/1.5 ${k.head};text-transform:uppercase;letter-spacing:.06em;margin:0 0 14px}</style>`;
  const blocks=`<div ${edit?`contenteditable="true" spellcheck="true" data-blocks="${kind}" class="edb"`:''}>${BLK(c,kind).map(b=>`<div data-s="${b.s}">${esc(b.t)||'<br>'}</div>`).join('')}</div>`;
  const foot=`<div style="position:absolute;left:64px;right:64px;bottom:48px;display:flex;justify-content:space-between;align-items:flex-end;font:500 9px/1.6 ${k.mono};letter-spacing:.06em;color:${k.grey}">
    <div style="font:600 13px/1.25 ${k.head};letter-spacing:.04em;color:${k.ink};text-transform:uppercase;max-width:200px">${esc(k.tag)}</div><div style="text-align:right">${ef('legal',d.legal)}<br>${ef('web',d.web)}</div></div>`;
  const top = kind==='cont' ? `<img src="${sym}" style="position:absolute;right:64px;top:56px;height:44px">`
    : `<img src="${logo}" style="position:absolute;left:64px;top:56px;height:42px"><div style="position:absolute;right:64px;top:58px;text-align:right;font:500 9px/1.7 ${k.mono};letter-spacing:.06em;color:${k.grey}">${ef('address',d.address)}<br>${ef('phone',d.phone)}<br>${ef('email',d.email)}</div>`;
  const wrap=(t,inner)=>`<div style="position:absolute;left:64px;right:64px;top:${t}px;font:400 12px/1.7 ${k.body};color:${k.ink}">${inner}</div>`;
  let mid='';
  if(kind==='letter') mid=wrap(190,`<div style="font:500 9px/1.7 ${k.mono};letter-spacing:.06em;color:${k.grey};text-align:right">${ef('date',d.date)}</div><p style="margin:26px 0 40px">${ef('recipient',d.recipient)}</p>${blocks}`);
  else mid=wrap(kind==='cont'?150:190,blocks);
  return css+`<div class="a4" style="position:relative;width:794px;height:1123px;background:#fff;overflow:hidden;font-family:${k.body}">${top}${mid}${foot}</div>`;
}
const SHEETS=[['head','Letterhead'],['letter','Letter'],['cont','Continuation'],['doc','Document']];
const curSheet=()=>S.sheet||'head';
const sheetPv=c=>`<div class="a4zoom">${sheet(c,curSheet(),true)}</div>`;
function letterhead(c){
  const d=DET(c), cur=curSheet();
  const fm=[['p','Text'],['t','Title'],['h1','Heading'],['h2','Subheading'],['l','Label']];
  return chrome(c,'letterhead',`<div class="tpcols two"><aside class="tpcard"><h6><i>1</i> Company details</h6>
      ${fld('details','address','Address',d.address,'ta')}${fld('details','phone','Phone',d.phone)}${fld('details','email','E-mail',d.email)}${fld('details','web','Website',d.web)}${fld('details','legal','Legal line',d.legal,'ta')}
      <p class="tphint">Click any text on the page to edit it. Details you change here and on the page stay in sync.</p></aside>
    <section><div class="seg shtabs">${SHEETS.map(([k,t])=>`<button type="button" data-sheet="${k}" class="${cur===k?'on':''}">${t}</button>`).join('')}</div>
      <div class="shbar"><span>Style of the selected paragraph</span>${fm.map(([k,t])=>`<button type="button" class="tbtn" data-fmt="${k}">${t}</button>`).join('')}</div>
      <div class="tpcard paper" id="tp-pv">${sheetPv(c)}</div>
      <div class="shact"><button class="tbtn" data-doc="dl:${cur}">Download .docx</button><button class="tbtn" data-doc="open:${cur}">Open / print preview</button><button class="tlink" data-doc="reset:${cur}">Reset this sheet</button></div></section></div>`);
}
function pageHtml(c,inner,title){ const k=T(c); return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title>${fontLink()}<style>body{margin:0;background:#e9e9e6}.a4{margin:24px auto;box-shadow:0 2px 12px rgba(0,0,0,.18)}@page{size:A4;margin:0}@media print{body{background:#fff}.a4{margin:0;box-shadow:none}}</style></head><body>${inner}</body></html>`; }

/* ================================================================== signature */
function sigHtml(c){
  const k=T(c), s=Object.assign({ greeting:'Kind regards,', name:'', job:'', mobile:'', office:'', email:'', banner:true }, D(c).sig||{});
  const row=(l,v)=>v?`<tr><td style="padding:1px 10px 1px 0;font:500 10px ${k.mono};letter-spacing:.08em;color:${k.acc};text-transform:uppercase">${l}</td><td style="font:400 12px ${k.body};color:${k.ink}">${esc(v)}</td></tr>`:'';
  return `<div style="font:400 13px/1.5 ${k.body};color:${k.ink};padding:4px 0"><p style="margin:0 0 14px">${esc(s.greeting)}</p>
    <div style="font:600 15px ${k.head};color:${k.ink}">${esc(s.name||'Full name')}</div><div style="font:400 12px ${k.body};color:${k.grey};margin-bottom:10px">${esc(s.job||'Job title')}</div>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tbody>${row('M',s.mobile)}${row('T',s.office)}${row('E',s.email||('name@'+(DET(c).web)))}${row('W',DET(c).web)}</tbody></table>
    <div style="border-top:2px solid ${k.acc};width:42px;margin:14px 0 12px"></div><img src="${imgOf(c,'horizontal','black')}" style="height:34px;display:block">
    ${s.banner?`<div style="margin-top:14px;background:${k.ink};color:${k.light};padding:12px 16px;font:500 10px ${k.mono};letter-spacing:.2em;text-transform:uppercase;max-width:440px">${esc(k.tag)}</div>`:''}
    <p style="margin:12px 0 0;font:400 10px/1.5 ${k.body};color:${k.grey};max-width:440px">This message and any attachments are intended only for the addressee.</p></div>`;
}
function signature(c){
  const s=Object.assign({ greeting:'Kind regards,', name:'', job:'', mobile:'', office:'', email:'', banner:true }, D(c).sig||{});
  return chrome(c,'signature',`<div class="tpbar"><button class="tbtn" data-act="sig-copy">Copy signature</button><button class="tbtn dk" data-act="sig-code">Copy code</button><button class="tbtn dk" data-act="sig-dl">Download HTML</button></div>
    <div class="tpcols two"><aside class="tpcard">${fld('sig','greeting','Greeting',s.greeting)}${fld('sig','name','Name',s.name)}${fld('sig','job','Job title',s.job)}${fld('sig','mobile','Mobile',s.mobile,'tel')}${fld('sig','office','Office',s.office,'tel')}${fld('sig','email','E-mail',s.email)}
      <label class="chk2"><input type="checkbox" data-chk="sig:banner" ${s.banner?'checked':''}> Embed tagline banner</label>
      <h6 style="margin-top:16px">Installing</h6><p class="hintp">Select the signature, copy it, then paste it into your mail client's signature box (Outlook: File → Options → Mail → Signatures). Or use “Copy code” for an HTML signature.</p></aside>
    <section class="tpcard paper" id="tp-pv">${sigHtml(c)}</section></div>`);
}

/* ================================================================== social */
const SOC = c => Object.assign({ bg:photos(c)[0]||'', colour:'', mode:photos(c).length?'image':'colour', tint:'dark', text:true, head:c.name, sub:c.tagline||'' }, D(c).social||{});
function socialBox(c,s,w,h){
  const k=T(c), bgc=s.mode==='colour'?(s.colour||k.ink):k.ink, dark=s.mode==='colour'?isDark(bgc):s.tint==='dark';
  const way=dark?'white':'black', fs=w/10.5;
  return `<div class="soc" style="width:${w}px;height:${h}px;background:${bgc} ${s.mode==='image'&&s.bg?`url('${esc(s.bg)}') center/cover`:''};position:relative;overflow:hidden;color:${dark?k.light:k.ink}">
    ${s.mode==='image'&&s.tint==='dark'?'<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.6))"></div>':''}
    ${s.text?`<div style="position:absolute;left:${w*.08}px;right:${w*.08}px;bottom:${h*.17}px"><div style="font:500 ${fs*1.6}px/1.08 ${k.head};color:${dark?k.light:k.ink}">${esc(s.head)}</div><div style="margin-top:${fs*.5}px;font:500 ${fs*.45}px ${k.mono};letter-spacing:.2em;text-transform:uppercase;color:${dark?k.onDark:k.acc}">${esc(s.sub)}</div></div>`:''}
    <img src="${imgOf(c,'symbol',way)}" style="position:absolute;left:${w*.08}px;top:${h*.06}px;height:${w*.11}px"></div>`;
}
function isDark(h){ h=h.replace('#',''); if(h.length===3) h=h.split('').map(x=>x+x).join(''); const n=parseInt(h,16); return (0.299*(n>>16&255)+0.587*(n>>8&255)+0.114*(n&255))<140; }
const socialPv = c => { const s=SOC(c); return `<div class="socrow"><div><span class="pvl">Post · 1:1</span>${socialBox(c,s,300,300)}</div><div><span class="pvl">Story · 9:16</span>${socialBox(c,s,170,302)}</div></div>`; };
function social(c){
  const s=SOC(c);
  return chrome(c,'social',`<div class="tpbar"><button class="tbtn dk" data-act="soc-post">Download post</button><button class="tbtn dk" data-act="soc-story">Download story</button></div>
   <div class="tpcols two"><aside class="tpcard"><h6><i>1</i> Background</h6>${seg('social','mode',[['image','Image'],['colour','Colour']],s.mode)}
     ${s.mode==='image'?thumbs(c,'social','bg',s.bg)+`<div class="tf"><label>Tint</label>${seg('social','tint',[['none','None'],['dark','Dark']],s.tint)}</div>`
       :`<div class="swrow">${c.colors.map(x=>`<button type="button" class="swb ${s.colour===x.hex?'on':''}" data-seg="social:colour" data-v="${x.hex}" title="${esc(x.name)}" style="background:${x.hex}"></button>`).join('')}</div>`}
     <h6 style="margin-top:18px"><i>2</i> Text</h6><label class="chk2"><input type="checkbox" data-chk="social:text" ${s.text?'checked':''}> Show text</label>${fld('social','head','Headline',s.head,'ta')}${fld('social','sub','Subline',s.sub)}</aside>
     <section class="tpcard paper" id="tp-pv">${socialPv(c)}</section></div>`);
}
function wrapText(ctx,text,maxW){ const out=[]; String(text).split('\n').forEach(par=>{ let line=''; par.split(/\s+/).forEach(w=>{ const t=line?line+' '+w:w; if(ctx.measureText(t).width>maxW&&line){ out.push(line); line=w; } else line=t; }); out.push(line); }); return out; }
async function socialPng(c,w,h){
  const s=SOC(c), k=T(c), cv=document.createElement('canvas'); cv.width=w; cv.height=h; const x=cv.getContext('2d');
  const bgc=s.mode==='colour'?(s.colour||k.ink):k.ink, dark=s.mode==='colour'?isDark(bgc):s.tint==='dark';
  x.fillStyle=bgc; x.fillRect(0,0,w,h);
  if(s.mode==='image'&&s.bg){ try{ const im=await loadImg(s.bg), sc=Math.max(w/im.width,h/im.height); x.drawImage(im,(w-im.width*sc)/2,(h-im.height*sc)/2,im.width*sc,im.height*sc); }catch(e){}
    if(s.tint==='dark'){ const g=x.createLinearGradient(0,0,0,h); g.addColorStop(0,'rgba(0,0,0,.05)'); g.addColorStop(1,'rgba(0,0,0,.6)'); x.fillStyle=g; x.fillRect(0,0,w,h); } }
  const fs=w/10.5; try{ await document.fonts.load(`500 ${fs}px ${k.head}`); }catch(e){}
  if(s.text){ x.fillStyle=dark?k.light:k.ink; x.font=`500 ${fs*1.6}px ${k.head}`; x.textBaseline='alphabetic';
    const lines=wrapText(x,s.head,w*.84), lh=fs*1.7; let y=h*.83-(lines.length-1)*lh; lines.forEach((l,i)=>x.fillText(l,w*.08,y+i*lh));
    x.font=`500 ${fs*.45}px ${k.mono}`; x.fillStyle=dark?k.onDark:k.acc; if('letterSpacing' in x) x.letterSpacing=(fs*.09)+'px'; x.fillText(String(s.sub).toUpperCase(),w*.08,h*.83+fs*.9); if('letterSpacing' in x) x.letterSpacing='0px'; }
  try{ const lg=await loadImg(imgOf(c,'symbol',dark?'white':'black')), lh2=w*.11; x.drawImage(lg,w*.08,h*.06,lh2*(lg.width/lg.height||1),lh2); }catch(e){}
  return new Promise(r=>cv.toBlob(r,'image/png'));
}

/* ================================================================== block documents (mailing, blog) */
const BLOCKS = {
  mailing:{ image:{label:'Image',f:{src:'img',alt:'Alt text',link:'Link'}}, title:{label:'Title and intro',f:{title:'Title',intro:'Intro:ta'}}, letter:{label:'Letter',f:{body:'Text:ta'}},
    contact:{label:'Contact line',f:{text:'Call and e-mail'}}, button:{label:'Button',f:{label:'Label',url:'Link'}}, signoff:{label:'Sign-off',f:{text:'Closing:ta'}}, footer:{label:'Footer',f:{text:'Text:ta'}} },
  blog:{ header:{label:'Header',f:{section:'Section',title:'Headline',sub:'Subtitle',author:'Author',date:'Date'}}, text:{label:'Text',f:{text:'Text:ta'}}, photo:{label:'Photo, full width',f:{src:'img',caption:'Caption'}},
    quote:{label:'Quote',f:{text:'Quote:ta',by:'By'}}, button:{label:'Button',f:{label:'Label',url:'Link'}} },
};
const blockDefault=(c,kind,type)=>({ type, ...({ image:{src:photos(c)[0]||'',alt:'',link:''}, title:{title:'Title of the mailing',intro:'A short introduction that says what this is about.'}, letter:{body:'Dear reader,\n\nThe body of the letter goes here. One paragraph per idea.'},
  contact:{text:'Call us on +00 0 0000 0000 or write to '+DET(c).email}, button:{label:'Read more',url:'https://'+DET(c).web}, signoff:{text:'Kind regards,\n'+c.person+'\n'+c.name}, footer:{text:'You receive this message because you are in our contact list.'},
  header:{section:'Journal',title:'Title of the article',sub:'A short line under the title',author:c.person,date:DET(c).date}, text:{text:'Paragraph text. One idea per paragraph.'}, photo:{src:photos(c)[1]||photos(c)[0]||'',caption:''}, quote:{text:'A quote worth pulling out.',by:c.name} })[type] });
function newDoc(c,kind,name){
  const mk=t=>blockDefault(c,kind,t);
  return { kind, id:'d'+Date.now(), name, subject:kind==='mailing'?'Subject line':'', preview:'', saved:false,
    blocks: kind==='mailing'?['image','title','letter','contact','button','signoff','footer'].map(mk):['header','photo','text','quote','text','button'].map(mk) };
}
function blockHtml(c,kind,b){
  const k=T(c), P='padding:0 36px';
  if(kind==='mailing'){
    if(b.type==='image') return `<div style="position:relative">${b.src?`<img src="${esc(b.src)}" alt="${esc(b.alt)}" style="display:block;width:100%;height:auto">`:`<div style="height:180px;background:${k.soft}"></div>`}<div style="position:absolute;left:0;right:0;bottom:0;height:60px;background:linear-gradient(transparent,rgba(0,0,0,.35))"></div><img src="${imgOf(c,'symbol','white')}" style="position:absolute;right:20px;top:18px;height:46px"></div>`;
    if(b.type==='title') return `<div style="${P};padding-top:30px"><div style="font:500 30px/1.15 ${k.head};color:${k.ink}">${esc(b.title)}</div><div style="border-top:2px solid ${k.acc};width:40px;margin:14px 0"></div><p style="margin:0;font:400 15px/1.6 ${k.body};color:${k.ink}">${nl(b.intro)}</p></div>`;
    if(b.type==='letter') return `<div style="${P};padding-top:18px"><p style="margin:0;font:400 14px/1.7 ${k.body};color:${k.ink}">${nl(b.body)}</p></div>`;
    if(b.type==='contact') return `<div style="${P};padding-top:18px"><p style="margin:0;font:500 11px/1.7 ${k.mono};letter-spacing:.08em;color:${k.acc}">${esc(b.text)}</p></div>`;
    if(b.type==='button') return `<div style="${P};padding-top:22px;padding-bottom:6px"><a href="${esc(b.url)}" style="display:inline-block;background:${k.brand};color:${k.onBrand};padding:13px 26px;font:600 12px ${k.head};letter-spacing:.12em;text-transform:uppercase;text-decoration:none">${esc(b.label)}</a></div>`;
    if(b.type==='signoff') return `<div style="${P};padding-top:22px"><p style="margin:0;font:400 14px/1.6 ${k.body};color:${k.ink}">${nl(b.text)}</p></div>`;
    if(b.type==='footer') return `<div style="margin-top:30px;background:${k.ink};color:${k.light};padding:26px 36px"><img src="${imgOf(c,'horizontal','white')}" style="height:30px;display:block;margin-bottom:12px"><div style="font:400 11px/1.6 ${k.body};opacity:.8">${nl(b.text)}</div><div style="font:500 10px ${k.mono};letter-spacing:.2em;text-transform:uppercase;color:${k.onDark};margin-top:12px">${esc(k.tag)}</div></div>`;
  } else {
    if(b.type==='header') return `<div style="padding:40px 48px 22px"><div style="font:500 10px ${k.mono};letter-spacing:.22em;text-transform:uppercase;color:${k.acc}">${esc(b.section)}</div><h1 style="margin:10px 0 8px;font:500 40px/1.08 ${k.head};color:${k.ink}">${esc(b.title)}</h1><div style="font:400 17px/1.5 ${k.body};color:${k.grey}">${esc(b.sub)}</div><div style="margin-top:16px;font:500 10px ${k.mono};letter-spacing:.1em;text-transform:uppercase;color:${k.grey}">${esc(b.author)} · ${esc(b.date)}</div></div>`;
    if(b.type==='text') return `<div style="padding:8px 48px"><p style="margin:0;font:400 16px/1.75 ${k.body};color:${k.ink}">${nl(b.text)}</p></div>`;
    if(b.type==='photo') return `<figure style="margin:14px 0"><img src="${esc(b.src)}" style="display:block;width:100%">${b.caption?`<figcaption style="padding:8px 48px;font:500 10px ${k.mono};letter-spacing:.08em;color:${k.grey}">${esc(b.caption)}</figcaption>`:''}</figure>`;
    if(b.type==='quote') return `<blockquote style="margin:18px 48px;padding:6px 0 6px 20px;border-left:3px solid ${k.acc}"><div style="font:500 24px/1.3 ${k.head};color:${k.ink}">${nl(b.text)}</div><div style="margin-top:8px;font:500 10px ${k.mono};letter-spacing:.14em;text-transform:uppercase;color:${k.grey}">${esc(b.by)}</div></blockquote>`;
    if(b.type==='button') return `<div style="padding:14px 48px"><a href="${esc(b.url)}" style="display:inline-block;background:${k.brand};color:${k.onBrand};padding:13px 26px;font:600 12px ${k.head};letter-spacing:.12em;text-transform:uppercase;text-decoration:none">${esc(b.label)}</a></div>`;
  }
  return '';
}
const docBody=(c,d)=>`<div style="max-width:${d.kind==='mailing'?600:760}px;margin:0 auto;background:#fff">${d.blocks.map(b=>blockHtml(c,d.kind,b)).join('')}</div>`;
function docFile(c,d){ const k=T(c); return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(d.subject||d.name)}</title>${fontLink()}<meta name="viewport" content="width=device-width"></head><body style="margin:0;background:${k.paper}">${d.preview?`<div style="display:none">${esc(d.preview)}</div>`:''}<div style="padding:24px 0">${docBody(c,d)}</div></body></html>`; }

function archive(c,kind){
  const list=(D(c).archive=D(c).archive||{})[kind]||[], q=S.search.toLowerCase(), t=TPL.find(x=>x.id===kind);
  const rows=list.filter(d=>!q||(d.name+d.subject).toLowerCase().includes(q));
  return chrome(c,kind,`<div class="tpcols arch"><aside class="tpcard"><h6><i>1</i> New ${kind==='mailing'?'mailing':'article'}</h6><span class="pvl">Start from</span>
      <div class="startrow"><button class="start on" data-start="tpl"><div class="stp">${docBody(c,newDoc(c,kind,''))}</div><b>Template</b></button><button class="start" data-start="blank"><div class="stp plus">+</div><b>Blank</b></button></div>
      <button class="tbtn dk wide" data-act="doc-new:${kind}">Start with template</button></aside>
    <section><h6 class="ah">Archive <small>${list.length}</small></h6><input class="srch" id="tp-search" placeholder="Search name or subject" value="${esc(S.search)}">
      <div class="arcl">${rows.length?rows.map(d=>`<div class="arow"><div class="athumb"><div class="ascale">${docBody(c,d)}</div></div><div class="ainfo"><b>${esc(d.name)}</b><span>${esc(d.subject||'')}</span></div><div class="aact"><button class="tlink" data-act="doc-open:${kind}:${d.id}">Open</button><button class="tlink" data-act="doc-dup:${kind}:${d.id}">Duplicate</button><button class="tlink" data-act="doc-del:${kind}:${d.id}">Delete</button></div></div>`).join(''):'<p class="hintp">Nothing saved yet. Start from the template and press Save copy.</p>'}</div></section></div>`);
}
function editor(c,kind){
  const d=S.doc, def=BLOCKS[kind], b=d.blocks[S.sel]||d.blocks[0], bd=def[b.type];
  const bf=Object.entries(bd.f).map(([key,lab])=>{ const [l,t]=lab.split(':'); return l==='img'? `<div class="tf"><label>Image</label>${thumbs(c,'doc','blocks.'+S.sel+'.'+key,b[key])}</div>` : fld('doc','blocks.'+S.sel+'.'+key,l==='Text'||t==='ta'?(l):l,b[key],t); }).join('');
  return chrome(c,kind,`<div class="tpbar"><button class="tbtn" data-act="doc-code">Copy code</button><button class="tbtn" data-act="doc-save">Save copy</button><button class="tbtn dk" data-act="doc-dl">Download HTML</button></div>
   <div class="tpcols three"><aside class="tpcard"><h6><i>1</i> ${kind==='mailing'?'Mailing':'Article'}</h6>${fld('doc','name','Name',d.name)}${kind==='mailing'?fld('doc','subject','Subject',d.subject)+fld('doc','preview','Preview text',d.preview):fld('doc','subject','Headline for the website',d.subject)}
      <h6 style="margin-top:18px"><i>2</i> Blocks</h6><div class="blist">${d.blocks.map((x,i)=>`<div class="bl ${i===S.sel?'on':''}" data-sel="${i}"><span>${String(i+1).padStart(2,'0')}</span><b>${def[x.type].label}</b><i><button data-act="b-up:${i}" title="Up">↑</button><button data-act="b-dn:${i}" title="Down">↓</button><button data-act="b-del:${i}" title="Delete">✕</button></i></div>`).join('')}</div>
      <span class="pvl" style="margin-top:12px;display:block">Add after the selected block</span><div class="badd">${Object.entries(def).map(([k2,v])=>`<button data-act="b-add:${k2}">${v.label}</button>`).join('')}</div></aside>
    <section class="tpcard paper" id="tp-pv" style="padding:0">${docBody(c,d)}</section>
    <aside class="tpcard"><h6><i>3</i> ${bd.label}</h6>${bf}</aside></div>`,'wide');
}

/* ================================================================== reference collage */
const COL = c => Object.assign({ head:'The work that shows what we do', project:c.name+' · reference', imgs:photos(c).slice(0,3) }, D(c).collage||{});
function collageBox(c,s,w){
  const k=T(c), h=w*9/16, im=(s.imgs.concat(['','','']).slice(0,3)).map(u=>u?`url('${esc(u)}') center/cover`:k.soft);
  return `<div class="col" style="position:relative;width:${w}px;height:${h}px;background:${k.ink};overflow:hidden">
    <div style="position:absolute;left:0;top:0;width:55%;height:100%;background:${im[0]}"></div><div style="position:absolute;left:56%;top:0;right:0;height:49%;background:${im[1]}"></div><div style="position:absolute;left:56%;top:51%;right:0;bottom:0;background:${im[2]}"></div>
    <div style="position:absolute;left:0;bottom:0;width:55%;padding:${w*.04}px;background:linear-gradient(transparent,rgba(0,0,0,.65))"><div style="font:500 ${w*.04}px/1.1 ${k.head};color:${k.light}">${esc(s.head)}</div><div style="margin-top:${w*.01}px;font:500 ${w*.015}px ${k.mono};letter-spacing:.2em;text-transform:uppercase;color:${k.onDark}">${esc(s.project)}</div></div>
    <img src="${imgOf(c,'symbol','black')}" style="position:absolute;right:${w*.02}px;top:${w*.02}px;height:${w*.06}px;background:#fff;padding:${w*.008}px"></div>`;
}
function collage(c){
  const s=COL(c);
  return chrome(c,'collage',`<div class="tpbar"><button class="tbtn dk" data-act="col-png">Download PNG</button><button class="tbtn dk" data-act="col-pdf">Download PDF</button></div>
   <div class="tpcols two"><aside class="tpcard"><h6><i>1</i> Page</h6>${fld('collage','head','Heading',s.head,'ta')}${fld('collage','project','Project',s.project)}
     <h6 style="margin-top:18px"><i>2</i> Photos</h6><span class="pvl">Click to add or remove, up to three</span><div class="thumbs">${photos(c).map((u,i)=>`<button type="button" class="${s.imgs.includes(u)?'on':''}" data-col="${i}" style="background-image:url('${esc(u)}')"></button>`).join('')}<label class="up"><input type="file" accept="image/*" data-upload="collage:add" hidden>+</label></div></aside>
     <section class="tpcard paper" id="tp-pv">${collageBox(c,s,640)}</section></div>`);
}
async function collagePng(c){
  const s=COL(c), k=T(c), W=1920, Hh=1080, cv=document.createElement('canvas'); cv.width=W; cv.height=Hh; const x=cv.getContext('2d'); x.fillStyle=k.ink; x.fillRect(0,0,W,Hh);
  const cover=async(u,rx,ry,rw,rh)=>{ x.fillStyle=k.soft; x.fillRect(rx,ry,rw,rh); if(!u) return; try{ const im=await loadImg(u), sc=Math.max(rw/im.width,rh/im.height); x.save(); x.beginPath(); x.rect(rx,ry,rw,rh); x.clip(); x.drawImage(im,rx+(rw-im.width*sc)/2,ry+(rh-im.height*sc)/2,im.width*sc,im.height*sc); x.restore(); }catch(e){} };
  await cover(s.imgs[0],0,0,W*.55,Hh); await cover(s.imgs[1],W*.56,0,W*.44,Hh*.49); await cover(s.imgs[2],W*.56,Hh*.51,W*.44,Hh*.49);
  const g=x.createLinearGradient(0,Hh*.6,0,Hh); g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(0,0,0,.65)'); x.fillStyle=g; x.fillRect(0,Hh*.6,W*.55,Hh*.4);
  try{ await document.fonts.load(`500 70px ${k.head}`);}catch(e){}
  x.fillStyle=k.light; x.font=`500 ${W*.04}px ${k.head}`; const lines=wrapText(x,s.head,W*.47), lh=W*.044; lines.forEach((l,i)=>x.fillText(l,W*.04,Hh-W*.075-(lines.length-1-i)*lh));
  x.font=`500 ${W*.015}px ${k.mono}`; x.fillStyle=k.onDark; if('letterSpacing' in x) x.letterSpacing=(W*.003)+'px'; x.fillText(String(s.project).toUpperCase(),W*.04,Hh-W*.04); if('letterSpacing' in x) x.letterSpacing='0px';
  try{ const lg=await loadImg(imgOf(c,'symbol','black')), lh2=W*.06, p=W*.008; x.fillStyle='#fff'; x.fillRect(W-W*.02-lh2*(lg.width/lg.height)-2*p,W*.02,lh2*(lg.width/lg.height)+2*p,lh2+2*p); x.drawImage(lg,W-W*.02-lh2*(lg.width/lg.height)-p,W*.02+p,lh2*(lg.width/lg.height),lh2); }catch(e){}
  return new Promise(r=>cv.toBlob(r,'image/png'));
}

/* ================================================================== company presentation */
const DECK = c => { const d=D(c); if(!d.deck||!d.deck.slides){ const p=photos(c); d.deck={ slides:[
  {type:'title',title:c.name,text:c.tagline||'',bg:'ink',photo:p[0]||'',pattern:true},
  {type:'statement',title:'What we do',text:'One clear sentence about the work, the place and the people behind it.',bg:'light',photo:'',pattern:false},
  {type:'photo',title:'The work',text:'A caption that names the project, the place and the maker.',bg:'ink',photo:p[1]||p[0]||'',pattern:false},
  {type:'statement',title:'Get in touch',text:DET(c).email+'\n'+DET(c).web,bg:'accent',photo:'',pattern:false} ] }; } return d.deck; };
function slideBox(c,sl,w){
  const k=T(c), h=w*9/16, bgc={ink:k.ink,accent:k.brand,light:k.paper,steel:k.grey}[sl.bg]||k.ink, dark=isDark(bgc), fg=dark?(sl.bg==='accent'?k.onBrand:k.light):k.ink, way=dark?'white':'black';
  const pat=sl.pattern?`<div style="position:absolute;inset:0;background:url('${H.patternUrl(c,way)}');opacity:.1"></div>`:'';
  const photo=sl.photo&&sl.type!=='statement'?`<div style="position:absolute;${sl.type==='title'?'inset:0;opacity:.45':'right:0;top:0;bottom:0;width:52%'};background:url('${esc(sl.photo)}') center/cover"></div>`:'';
  const tw=sl.type==='photo'?'44%':'70%', fs=w/(sl.type==='title'?11:17);
  return `<div class="sld" style="position:relative;width:${w}px;height:${h}px;background:${bgc};overflow:hidden;color:${fg}">${pat}${photo}
    <div style="position:absolute;left:${w*.06}px;bottom:${h*.14}px;width:${tw}"><div style="font:500 ${fs}px/1.05 ${k.head}">${esc(sl.title)}</div><div style="margin-top:${fs*.35}px;font:400 ${fs*.34}px/1.5 ${k.body};opacity:.85">${nl(sl.text)}</div></div>
    <img src="${imgOf(c,'horizontal',way)}" style="position:absolute;left:${w*.06}px;top:${h*.08}px;height:${w*.035}px"></div>`;
}
function deck(c){
  const d=DECK(c), i=Math.min(S.slide,d.slides.length-1), sl=d.slides[i];
  return chrome(c,'deck',`<div class="tpbar"><button class="tbtn" data-act="deck-add">Add slide</button><button class="tbtn dk" data-act="deck-pdf">Download PDF</button></div>
   <div class="tpcols two"><aside class="tpcard"><h6><i>1</i> Slide ${i+1} of ${d.slides.length}</h6><div class="tf"><label>Layout</label>${seg('deckcur','type',[['title','Title'],['statement','Text'],['photo','Photo']],sl.type)}</div>
     ${fld('deckcur','title','Title',sl.title,'ta')}${fld('deckcur','text','Text',sl.text,'ta')}<div class="tf"><label>Background</label>${seg('deckcur','bg',[['ink','Ink'],['accent','Brand'],['light','Light'],['steel','Steel']],sl.bg)}</div>
     <label class="chk2"><input type="checkbox" data-chk="deckcur:pattern" ${sl.pattern?'checked':''}> Brand pattern</label>${sl.type!=='statement'?`<div class="tf"><label>Photo</label>${thumbs(c,'deckcur','photo',sl.photo)}</div>`:''}
     <button class="tlink" data-act="deck-del" style="margin-top:12px">Delete slide</button></aside>
     <section><div class="tpcard paper" id="tp-pv">${slideBox(c,sl,660)}</div><div class="film">${d.slides.map((x,j)=>`<button class="${j===i?'on':''}" data-slide="${j}">${slideBox(c,x,150)}<i>${String(j+1).padStart(2,'0')}</i></button>`).join('')}</div></section></div>`);
}

/* ================================================================== real Word documents (.docx) */
const xe = s => String(s==null?'':s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const firstFont = s => { const m=String(s||'').match(/^\s*['"]?([^,'"]+)/); return m?m[1].trim():'Calibri'; };
const hx = h => String(h||'#000000').replace('#','').toUpperCase().slice(0,6).padStart(6,'0');
async function logoPng(c,layout,way){
  try{ const s=H.logoSource(c,layout,way); const blob = s.png ? await (await fetch(s.png)).blob() : await H.svgToPng(s.svg,3);
    const bmp=await createImageBitmap(blob); return { data:new Uint8Array(await blob.arrayBuffer()), w:bmp.width, h:bmp.height }; }catch(e){ return null; }
}
/* The Word file mirrors the on-screen sheet measurement for measurement: 1 CSS px = 15 twips (A4 at 96 dpi),
   font px x 1.5 = half-points, and every line height is set exactly like the preview's CSS line-height. */
async function docx(c,kind){
  const k=T(c), d=DET(c), NS='xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"';
  const head=firstFont(k.head), body=firstFont(k.body), mono=firstFont(k.mono), ink=hx(k.ink), acc=hx(k.acc), grey=hx(k.grey);
  const px=n=>Math.round(n*15), hp=n=>Math.max(2,Math.round(n*1.5));
  const run=(t,o={})=>`<w:r><w:rPr>${o.font?`<w:rFonts w:ascii="${o.font}" w:hAnsi="${o.font}" w:cs="${o.font}"/>`:''}${o.b?'<w:b/>':''}${o.caps?'<w:caps/>':''}${o.color?`<w:color w:val="${o.color}"/>`:''}${o.sp?`<w:spacing w:val="${o.sp}"/>`:''}${o.sz?`<w:sz w:val="${o.sz}"/><w:szCs w:val="${o.sz}"/>`:''}</w:rPr><w:t xml:space="preserve">${xe(t)}</w:t></w:r>`;
  const lines=(t,o)=>String(t).split('\n').map((l,i)=>(i?'<w:r><w:br/></w:r>':'')+run(l,o)).join('');
  const para=(inner,o={})=>`<w:p><w:pPr>${o.style?`<w:pStyle w:val="${o.style}"/>`:''}${o.keep?'<w:keepNext/>':''}<w:spacing w:before="${o.before||0}" w:after="${o.after==null?0:o.after}" w:line="${o.line||240}" w:lineRule="${o.line?'exact':'auto'}"/>${o.jc?`<w:jc w:val="${o.jc}"/>`:''}${o.tiny?'<w:rPr><w:sz w:val="2"/><w:szCs w:val="2"/></w:rPr>':''}</w:pPr>${inner}</w:p>`;
  const img=(rid,id,cx,cy)=>`<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${id}" name="Logo ${id}" descr="${xe(c.name)} logo"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="${id}" name="logo${id}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`;
  const table=(l,r,w1,w2,va)=>`<w:tbl><w:tblPr><w:tblW w:w="${w1+w2}" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders><w:tblCellMar><w:left w:w="0" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid><w:gridCol w:w="${w1}"/><w:gridCol w:w="${w2}"/></w:tblGrid><w:tr><w:tc><w:tcPr><w:tcW w:w="${w1}" w:type="dxa"/><w:vAlign w:val="${va}"/></w:tcPr>${l}</w:tc><w:tc><w:tcPr><w:tcW w:w="${w2}" w:type="dxa"/><w:vAlign w:val="${va}"/></w:tcPr>${r}</w:tc></w:tr></w:tbl>`;
  // preview: mono 9px, letter-spacing .06em, grey; header lines 1.7, footer lines 1.6
  const small={font:mono,sz:hp(9),color:grey,sp:Math.round(9*.06*15)};
  const files=[]; const rels=[]; let rid=0;
  const addImg=async(layout,heightPx)=>{ const p=await logoPng(c,layout,'black'); if(!p) return null; const n=++rid, name=`media/logo${n}.png`; files.push({name:'word/'+name,data:p.data}); rels.push(`<Relationship Id="rId${n}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="${name}"/>`);
    const cy=Math.round(heightPx*9525); return img('rId'+n,n,Math.round(cy*p.w/p.h),cy); };
  // ---- header: logo 42px left at 56px from the top, contact lines 9px / 1.7 right, 2px lower (continuation: 44px symbol right)
  let hdr;
  if(kind==='cont'){ const im=await addImg('symbol',44); hdr=para(im||run(c.name,{font:head,b:true}),{jc:'right'}); }
  else { const im=await addImg('horizontal',42), addr=d.address.split('\n').concat([d.phone,d.email]).join('\n');
    hdr=table(para(im||run(c.name,{font:head,b:true,sz:hp(24)}),{}),para(lines(addr,small),{jc:'right',before:px(2),line:px(15.3)}),5000,4986,'top')+para('',{line:20,tiny:true}); }
  // ---- footer: tagline 13px / 600 / caps / +.04em on the left, legal and web on the right, both resting on the bottom line
  const ftr=table(para(run(k.tag,{font:head,b:true,caps:true,sz:hp(13),color:ink,sp:Math.round(13*.04*15)}),{line:px(16.25)}),para(lines(d.legal+'\n'+d.web,small),{jc:'right',line:px(14.4)}),3000,6986,'bottom')+para('',{line:20,tiny:true});
  // ---- body: every paragraph gets the preview's own margins (CSS margins collapse, so before = max(0, top - previous bottom))
  const SPEC={ p:{mt:0,mb:12,lh:20.4}, t:{mt:0,mb:10,lh:39.6,style:'Title'}, l:{mt:0,mb:28,lh:15.3,style:'Label'}, h1:{mt:22,mb:8,lh:26,style:'Heading1'}, h2:{mt:0,mb:14,lh:18,style:'Heading2'} };
  SPEC.h2.style='Heading2';
  let prev=null, main='';
  if(kind==='letter'){
    main+=para(run(d.date,small),{jc:'right',line:px(15.3)});
    main+=para(lines(d.recipient,{}),{before:px(26),after:px(40),line:px(20.4)}); prev=40;
  }
  BLK(c,kind).forEach(b=>{ const sp=SPEC[b.s]||SPEC.p; const before=sp.mt; /* Word already uses the larger of space-after / space-before (like CSS margin collapse), so no subtraction */
    main+=para(lines(b.t,{}),{style:sp.style,before:px(before),after:px(sp.mb),line:px(sp.lh)}); prev=sp.mb; });
  const top=kind==='cont'?px(150):px(190);
  const sect=`<w:sectPr><w:headerReference w:type="default" r:id="rIdHdr"/><w:footerReference w:type="default" r:id="rIdFtr"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="${top}" w:right="${px(64)}" w:bottom="1700" w:left="${px(64)}" w:header="${px(56)}" w:footer="${px(48)}" w:gutter="0"/></w:sectPr>`;
  const F=f=>`<w:rFonts w:ascii="${f}" w:hAnsi="${f}" w:cs="${f}"/>`;
  const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles ${NS}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="${body}" w:hAnsi="${body}" w:cs="${body}" w:eastAsia="${body}"/><w:color w:val="${ink}"/><w:sz w:val="${hp(12)}"/><w:szCs w:val="${hp(12)}"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:before="0" w:after="${px(12)}" w:line="${px(20.4)}" w:lineRule="exact"/></w:pPr></w:pPrDefault></w:docDefaults>
   <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
   <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:before="0" w:after="${px(10)}" w:line="${px(39.6)}" w:lineRule="exact"/></w:pPr><w:rPr>${F(head)}<w:sz w:val="${hp(36)}"/><w:szCs w:val="${hp(36)}"/></w:rPr></w:style>
   <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="${px(22)}" w:after="${px(8)}" w:line="${px(26)}" w:lineRule="exact"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr>${F(head)}<w:sz w:val="${hp(20)}"/><w:szCs w:val="${hp(20)}"/></w:rPr></w:style>
   <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="0" w:after="${px(14)}" w:line="${px(18)}" w:lineRule="exact"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr>${F(head)}<w:b/><w:caps/><w:spacing w:val="${Math.round(12*.06*15)}"/><w:sz w:val="${hp(12)}"/><w:szCs w:val="${hp(12)}"/></w:rPr></w:style>
   <w:style w:type="paragraph" w:customStyle="1" w:styleId="Label"><w:name w:val="Label"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:before="0" w:after="${px(28)}" w:line="${px(15.3)}" w:lineRule="exact"/></w:pPr><w:rPr>${F(mono)}<w:caps/><w:color w:val="${acc}"/><w:spacing w:val="${Math.round(9*.2*15)}"/><w:sz w:val="${hp(9)}"/><w:szCs w:val="${hp(9)}"/></w:rPr></w:style></w:styles>`;
  const doc=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${NS}><w:body>${main}${sect}</w:body></w:document>`;
  const hf=(tag,inner)=>`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:${tag} ${NS}>${inner}</w:${tag}>`;
  rels.push('<Relationship Id="rIdSt" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>','<Relationship Id="rIdHdr" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>','<Relationship Id="rIdFtr" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>');
  const R=x=>`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${x}</Relationships>`;
  const enc=new TextEncoder(), add=(n,t)=>files.push({name:n,data:enc.encode(t)});
  add('[Content_Types].xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/></Types>');
  add('_rels/.rels',R('<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'));
  add('word/document.xml',doc); add('word/styles.xml',styles); add('word/header1.xml',hf('hdr',hdr)); add('word/footer1.xml',hf('ftr',ftr));
  add('word/_rels/document.xml.rels',R(rels.join('')));
  add('word/_rels/header1.xml.rels',R(rels.filter(x=>x.includes('/image"')).join('')));
  const b=H.makeZip(files); return new Blob([b],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
}

/* ================================================================== rendering entry points */
function render(c,sub,helpers){
  H=helpers; if(!sub) return hub(c);
  const [id,mode]=sub.split('/');
  if((id==='mailing'||id==='blog')){ if(mode==='edit'&&S.doc&&S.doc.kind===id) return editor(c,id); return archive(c,id); }
  return ({ letterhead, signature, social, collage, deck })[id]?.(c) || hub(c);
}
function preview(c,sub){
  const id=sub.split('/')[0];
  if(id==='letterhead') return sheetPv(c);
  if(id==='signature') return sigHtml(c);
  if(id==='social') return socialPv(c);
  if(id==='collage') return collageBox(c,COL(c),640);
  if(id==='deck') { const d=DECK(c); return slideBox(c,d.slides[Math.min(S.slide,d.slides.length-1)],660); }
  if(id==='mailing'||id==='blog') return S.doc?docBody(c,S.doc):'';
  return '';
}
const curSub = () => (location.hash.split('/page/templates')[1]||'').replace(/^\//,'');
function refresh(c){ const sub=curSub(), el=$('#tp-pv'); if(el) el.innerHTML=preview(c,sub); const f=$('.film'); if(f&&sub==='deck'){ const d=DECK(c); f.innerHTML=d.slides.map((x,j)=>`<button class="${j===Math.min(S.slide,d.slides.length-1)?'on':''}" data-slide="${j}">${slideBox(c,x,150)}<i>${String(j+1).padStart(2,'0')}</i></button>`).join(''); } }
const objFor=(c,r)=> r==='deckcur'? DECK(c).slides[Math.min(S.slide,DECK(c).slides.length-1)] : rootObj(c,r);
function openWin(html,print){ const w=window.open('','_blank'); if(!w){ H.toast('Allow pop-ups to open this'); return; } w.document.write(html); w.document.close(); if(print) setTimeout(()=>w.print(),600); }

function saveBlocks(c,host){ const out=[]; host.childNodes.forEach(n=>{ if(n.nodeType===1) out.push({s:n.dataset.s||'p',t:n.innerText.replace(/\n$/,'')}); else if(n.nodeType===3&&n.textContent.trim()) out.push({s:'p',t:n.textContent}); });
  (D(c).blocks=D(c).blocks||{})[host.dataset.blocks]=out.length?out:[{s:'p',t:''}]; H.save(); }
let wired=false;
function wire(c,helpers){
  H=helpers; if(wired) return; wired=true;
  const app=document.getElementById('app');
  app.addEventListener('input',e=>{ const t=e.target; if(!curSub()&&!location.hash.includes('templates')) return; const c=H.co();
    if(t.id==='tp-search'){ S.search=t.value; const caret=t.selectionStart; H.rerender(); const n=$('#tp-search'); if(n){ n.focus(); n.setSelectionRange(caret,caret); } return; }
    if(t.dataset.ed){ const [r,p]=t.dataset.ed.split(':'); const v=t.innerText.replace(/\n$/,''); setp(rootObj(c,r),p,v); const fi=$('[data-f="'+t.dataset.ed+'"]'); if(fi) fi.value=v; H.save(); return; }
    if(t.dataset.blocks!=null){ if(e.inputType==='insertParagraph'){ const sel=getSelection(), n=sel&&sel.anchorNode, el=n&&(n.nodeType===1?n:n.parentElement)?.closest('[data-s]'), pv=el&&el.previousElementSibling; if(el&&pv&&el.dataset.s!=='p'&&!el.innerText.replace(/\n$/,'')&&el.dataset.s===pv.dataset.s) el.dataset.s='p'; } saveBlocks(c,t); return; }
    if(!t.dataset.f) return; const [r,p]=t.dataset.f.split(':'); setp(objFor(c,r),p,t.value); H.save(); refresh(c); });
  app.addEventListener('mousedown',e=>{ if(e.target.closest('[data-fmt]')) e.preventDefault(); });
  app.addEventListener('paste',e=>{ const h=e.target.closest&&e.target.closest('[data-blocks],[data-ed]'); if(!h) return; e.preventDefault(); document.execCommand('insertText',false,(e.clipboardData||window.clipboardData).getData('text/plain')); });
  app.addEventListener('change',async e=>{ const t=e.target, c=H.co();
    if(t.dataset.chk){ const [r,p]=t.dataset.chk.split(':'); setp(objFor(c,r),p,t.checked); H.save(); refresh(c); }
    if(t.dataset.upload&&t.files[0]){ const url=await H.readImage(t.files[0],1400); (D(c).uploads=D(c).uploads||[]).push(url); const [r,p]=t.dataset.upload.split(':');
      if(r==='collage'){ const s=COL(c); s.imgs=[...s.imgs.filter(Boolean),url].slice(-3); D(c).collage=s; } else setp(objFor(c,r),p,url); H.save(); H.rerender(); } });
  app.addEventListener('click',async e=>{
    const c=H.co(), t=e.target.closest('button,label,[data-sel]'); if(!t||!location.hash.includes('templates')) return; const ds=t.dataset;
    if(ds.seg){ const [r,p]=ds.seg.split(':'); setp(objFor(c,r),p,ds.v); H.save(); H.rerender(); return; }
    if(ds.pick){ const [r,p]=ds.pick.split(':'); setp(objFor(c,r),p,photos(c)[+ds.i]); H.save(); H.rerender(); return; }
    if(ds.col!=null){ const s=COL(c), u=photos(c)[+ds.col]; s.imgs=s.imgs.includes(u)?s.imgs.filter(x=>x!==u):[...s.imgs,u].slice(-3); D(c).collage=s; H.save(); H.rerender(); return; }
    if(ds.slide!=null){ S.slide=+ds.slide; H.rerender(); return; }
    if(ds.sel!=null){ S.sel=+ds.sel; H.rerender(); return; }
    if(ds.start){ document.querySelectorAll('.start').forEach(b=>b.classList.toggle('on',b===t)); S.startMode=ds.start; return; }
    if(ds.sheet){ S.sheet=ds.sheet; H.rerender(); return; }
    if(ds.fmt){ const sel=getSelection(), n=sel&&sel.anchorNode, el=n&&(n.nodeType===1?n:n.parentElement)?.closest('[data-s]'); if(el&&el.closest('[data-blocks]')){ el.dataset.s=ds.fmt; saveBlocks(c,el.closest('[data-blocks]')); } return; }
    if(ds.doc&&ds.doc.startsWith('reset:')){ const k=ds.doc.slice(6); if(D(c).blocks) delete D(c).blocks[k]; H.save(); H.rerender(); return; }
    if(ds.doc){ const [a,k]=ds.doc.split(':'); const html=pageHtml(c,sheet(c,k),c.name+' '+k);
      if(a==='open') openWin(html,false); else { H.toast('Building Word document…'); H.download(await docx(c,k),`${H.slug(c.name)}-${H.slug(SHEETS.find(s=>s[0]===k)[1])}.docx`); } return; }
    if(!ds.act) return; const [a,x,y]=ds.act.split(':');
    if(a==='sig-copy'){ const h=sigHtml(c); try{ await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([h],{type:'text/html'}),'text/plain':new Blob([$('#tp-pv').innerText],{type:'text/plain'})})]); H.toast('Signature copied'); }catch(err){ const r=document.createRange(); r.selectNodeContents($('#tp-pv')); const s=getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand('copy'); s.removeAllRanges(); H.toast('Signature copied'); } }
    else if(a==='sig-code'){ navigator.clipboard.writeText(sigHtml(c)).then(()=>H.toast('HTML copied')); }
    else if(a==='sig-dl'){ H.download(new Blob([pageHtml(c,sigHtml(c),'Signature').replace('<style>','<style>.a4{display:none}')],{type:'text/html'}),`${H.slug(c.name)}-signature.html`); }
    else if(a==='soc-post'){ H.download(await socialPng(c,1080,1080),`${H.slug(c.name)}-post.png`); }
    else if(a==='soc-story'){ H.download(await socialPng(c,1080,1920),`${H.slug(c.name)}-story.png`); }
    else if(a==='col-png'){ H.download(await collagePng(c),`${H.slug(c.name)}-collage.png`); }
    else if(a==='col-pdf'){ openWin(`<!doctype html><html><head><meta charset="utf-8">${fontLink()}<style>@page{size:297mm 167mm;margin:0}body{margin:0}</style></head><body>${collageBox(c,COL(c),1123)}</body></html>`,true); }
    else if(a==='deck-add'){ const d=DECK(c); d.slides.splice(S.slide+1,0,{type:'statement',title:'New slide',text:'',bg:'light',photo:'',pattern:false}); S.slide++; H.save(); H.rerender(); }
    else if(a==='deck-del'){ const d=DECK(c); if(d.slides.length>1){ d.slides.splice(S.slide,1); S.slide=Math.max(0,S.slide-1); H.save(); H.rerender(); } }
    else if(a==='deck-pdf'){ openWin(`<!doctype html><html><head><meta charset="utf-8">${fontLink()}<style>@page{size:297mm 167mm;margin:0}body{margin:0}.p{page-break-after:always}</style></head><body>${DECK(c).slides.map(s=>`<div class="p">${slideBox(c,s,1123)}</div>`).join('')}</body></html>`,true); }
    else if(a==='doc-new'){ S.doc=newDoc(c,x,(x==='mailing'?'New mailing':'New article')); S.docKind=x; S.sel=0; if(S.startMode==='blank') S.doc.blocks=[blockDefault(c,x,x==='mailing'?'title':'header')]; location.hash='#/page/templates/'+x+'/edit'; }
    else if(a==='doc-open'){ const d=(D(c).archive[x]||[]).find(z=>z.id===y); if(d){ S.doc=JSON.parse(JSON.stringify(d)); S.sel=0; location.hash='#/page/templates/'+x+'/edit'; } }
    else if(a==='doc-dup'){ const l=D(c).archive[x], d=l.find(z=>z.id===y); if(d){ const n=JSON.parse(JSON.stringify(d)); n.id='d'+Date.now(); n.name+=' copy'; l.unshift(n); H.save(); H.rerender(); } }
    else if(a==='doc-del'){ D(c).archive[x]=D(c).archive[x].filter(z=>z.id!==y); H.save(); H.rerender(); }
    else if(a==='doc-save'){ const l=((D(c).archive=D(c).archive||{})[S.doc.kind]=D(c).archive[S.doc.kind]||[]); const cp=JSON.parse(JSON.stringify(S.doc)); const i=l.findIndex(z=>z.id===cp.id); if(i>=0) l[i]=cp; else l.unshift(cp); H.save(); H.toast('Saved to archive'); }
    else if(a==='doc-code'){ navigator.clipboard.writeText(docFile(c,S.doc)).then(()=>H.toast('HTML copied')); }
    else if(a==='doc-dl'){ H.download(new Blob([docFile(c,S.doc)],{type:'text/html'}),`${H.slug(c.name)}-${H.slug(S.doc.name)}.html`); }
    else if(a==='b-add'){ S.doc.blocks.splice(S.sel+1,0,blockDefault(c,S.doc.kind,x)); S.sel++; H.rerender(); }
    else if(a==='b-del'){ if(S.doc.blocks.length>1){ S.doc.blocks.splice(+x,1); S.sel=Math.min(S.sel,S.doc.blocks.length-1); H.rerender(); } }
    else if(a==='b-up'||a==='b-dn'){ const i=+x, j=a==='b-up'?i-1:i+1, b=S.doc.blocks; if(j>=0&&j<b.length){ [b[i],b[j]]=[b[j],b[i]]; S.sel=j; H.rerender(); } }
    if(a.startsWith('b-')) e.stopPropagation();
  },true);
}
window.BPTemplates = { render, wire, TPL, docx:(c,k,h)=>{H=h||H;return docx(c,k);} };
})();
