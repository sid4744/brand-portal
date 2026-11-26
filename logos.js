/* Logo generators. Each "kind" draws a company's logo in three layouts (horizontal, stacked, symbol)
   from the company's own colours and fonts. window.BPLogos.make(company, layout, way) -> SVG string. */
(() => {
'use strict';
const esc = s => String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let uid = 0;

/* ---- pure symbols, drawn in a 200x200 box (hammer monogram is 240x200) ---- */
const SYMBOLS = {
  seal:   { w:200, h:200, label:'Seal',
    draw:(p,L)=>{ const id='rs'+(++uid); return `<defs><path id="${id}" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"/></defs>
    <circle cx="100" cy="100" r="95" fill="none" stroke="${p.ring}" stroke-width="3"/><circle cx="100" cy="100" r="62" fill="none" stroke="${p.ink}" stroke-width="1.5"/>
    <text font-size="12" font-weight="500" fill="${p.ink}" font-family="${p.detail}"><textPath href="#${id}" textLength="466" lengthAdjust="spacing">${esc(L.legend)}</textPath></text>
    <g transform="translate(0,-6)"><rect x="72" y="78" width="14" height="6" rx="1.5" fill="${p.ink}"/><rect x="75" y="82" width="8" height="30" fill="${p.ink}"/><rect x="64" y="112" width="30" height="12" rx="2" fill="${p.ink}"/>
    <text x="119" y="124" text-anchor="middle" font-size="70" font-weight="600" fill="${p.ink}" font-family="${p.display}">S</text>
    <path d="M79 128 L79 136 M70 127 L64 133 M88 127 L94 133" stroke="${p.ac}" stroke-width="2.5" stroke-linecap="round" fill="none"/></g>` } },
  hammer: { w:240, h:200, label:'Hammer-I',
    draw:p=>`<rect x="49" y="52" width="24" height="8" rx="2" fill="${p.ink}"/><rect x="52" y="58" width="18" height="72" fill="${p.ink}"/><rect x="30" y="130" width="62" height="28" rx="3" fill="${p.ink}"/>
    <path d="M61 168 L61 186 M38 166 L24 180 M84 166 L98 180" stroke="${p.ac}" stroke-width="4" stroke-linecap="round" fill="none"/>
    <text x="165" y="158" text-anchor="middle" font-size="170" font-weight="500" fill="${p.ink}" font-family="${p.display}">S</text>` },
  ripple: { w:200, h:200, label:'Ripple', draw:(p,L)=>`<circle cx="100" cy="100" r="88" fill="none" stroke="${p.ac}" stroke-width="1.6" stroke-dasharray="3 7" opacity=".8"/>
    <circle cx="100" cy="100" r="70" fill="none" stroke="${p.ac}" stroke-width="2.2" opacity=".9"/><circle cx="100" cy="100" r="52" fill="none" stroke="${p.ink}" stroke-width="3"/>
    <circle cx="100" cy="100" r="34" fill="${p.ac}"/><text x="100" y="112" text-anchor="middle" font-size="34" font-weight="600" fill="${p.bg}" font-family="${p.display}">${esc(L.letter)}</text>` },
  strike: { w:200, h:200, label:'Strike', draw:p=>`<g transform="rotate(-18 100 90)" fill="${p.ink}"><rect x="94" y="22" width="12" height="68" rx="3"/><rect x="66" y="88" width="68" height="30" rx="4"/></g>
    <path d="M126 123 L143 129 M121 131 L132 145 M112 135 L115 153 M103 134 L97 151 M95 129 L81 140 M91 120 L74 123" stroke="${p.ac}" stroke-width="4" stroke-linecap="round" fill="none"/>` },
  impact: { w:200, h:200, label:'Impact', draw:p=>`<g fill="none" stroke="${p.ac}"><ellipse cx="100" cy="150" rx="94" ry="27" stroke-width="1.5" opacity=".5"/><ellipse cx="100" cy="150" rx="74" ry="21" stroke-width="2" opacity=".7"/><ellipse cx="100" cy="150" rx="52" ry="15" stroke-width="2.5" opacity=".9"/><ellipse cx="100" cy="150" rx="30" ry="9" stroke-width="3"/></g>
    <rect x="90" y="22" width="20" height="8" rx="3" fill="${p.ac}"/><rect x="94" y="28" width="12" height="90" rx="3" fill="${p.ink}"/><rect x="68" y="112" width="64" height="36" rx="5" fill="${p.ink}"/><rect x="68" y="124" width="64" height="4" fill="${p.ac}"/>` },
  echo:   { w:200, h:200, label:'Echo', draw:(p,L)=>`<g font-family="${p.display}" font-weight="600" font-size="96" text-anchor="middle" fill="none" stroke="${p.ac}" stroke-width=".9">
    <text transform="translate(100 100) scale(1.85) translate(-100 -100)" x="100" y="128" opacity=".4">${esc(L.letter)}</text><text transform="translate(100 100) scale(1.55) translate(-100 -100)" x="100" y="128" opacity=".6">${esc(L.letter)}</text><text transform="translate(100 100) scale(1.25) translate(-100 -100)" x="100" y="128" opacity=".85">${esc(L.letter)}</text></g>
    <text x="100" y="128" text-anchor="middle" font-family="${p.display}" font-weight="600" font-size="96" fill="${p.ink}">${esc(L.letter)}</text>` },
  shock:  { w:200, h:200, label:'Shockwave', draw:p=>`<rect x="94" y="96" width="12" height="76" rx="3" fill="${p.ink}"/><rect x="64" y="54" width="72" height="44" rx="7" fill="${p.ink}"/><rect x="76" y="54" width="5" height="44" fill="${p.ac}"/><rect x="119" y="54" width="5" height="44" fill="${p.ac}"/>
    <g fill="none" stroke="${p.ac}" stroke-width="4" stroke-linecap="round"><path d="M52 62 Q38 76 52 90"/><path d="M38 50 Q14 76 38 102"/><path d="M148 62 Q162 76 148 90"/><path d="M162 50 Q186 76 162 102"/></g>` },
  struck: { w:200, h:200, label:'Struck seal', draw:(p,L)=>{ const id='rt'+(++uid), cl='ct'+uid; return `<defs><path id="${id}" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"/><clipPath id="${cl}"><circle cx="100" cy="100" r="60"/></clipPath></defs>
    <circle cx="100" cy="100" r="95" fill="none" stroke="${p.ring}" stroke-width="3"/><circle cx="100" cy="100" r="62" fill="none" stroke="${p.ink}" stroke-width="1.5"/>
    <text font-size="12" font-weight="500" fill="${p.ink}" font-family="${p.detail}"><textPath href="#${id}" textLength="466" lengthAdjust="spacing">${esc(L.legend)}</textPath></text>
    <rect x="72" y="72" width="14" height="6" rx="1.5" fill="${p.ink}"/><rect x="75" y="76" width="8" height="30" fill="${p.ink}"/><rect x="64" y="106" width="30" height="12" rx="2" fill="${p.ink}"/>
    <text x="119" y="118" text-anchor="middle" font-size="70" font-weight="600" fill="${p.ink}" font-family="${p.display}">S</text>
    <g clip-path="url(#${cl})" fill="none" stroke="${p.ac}" stroke-linecap="round"><path d="M67 119 A12 3.6 0 0 0 91 119" stroke-width="2.6"/><path d="M57 119 A22 6.6 0 0 0 101 119" stroke-width="2.2"/><path d="M47 119 A32 9.6 0 0 0 111 119" stroke-width="1.8"/><path d="M39 119 A40 12 0 0 0 119 119" stroke-width="1.4"/></g>` } },
  cw:     { w:100, h:100, label:'Monogram block', draw:(p,L)=>{ const two=[...L.letter].length>1; return `<g${L.skew?' transform="skewX(-6) translate(5.5 0)"':''}><rect width="100" height="100" fill="${p.ac}"/><text x="50" y="${two?64:72}" text-anchor="middle" font-size="${two?42:64}" letter-spacing="${two?3:0}" fill="${p.onAc}" font-family="${p.display}">${esc(L.letter)}</text></g>`; } },
  dot:    { w:100, h:100, label:'Dot', draw:p=>`<rect x="4" y="4" width="92" height="92" rx="18" fill="${p.ink}"/><circle cx="50" cy="50" r="22" fill="${p.ac}"/>` },
  mark:   { w:110, h:104, label:'Letter mark', draw:(p,L)=>`<rect x="7" y="7" width="70" height="70" rx="20" fill="none" stroke="${p.ink}" stroke-width="13"/>
    <text x="42" y="60" text-anchor="middle" font-family="${p.display}" font-weight="800" font-size="40" fill="${p.ink}">${esc(L.letter)}</text>
    <path d="M46 96 L74 64 L102 96 Q74 89 46 96Z" fill="${p.ac}"/>` },
};

/* limpet-tooth fibres: a fan of eight fine lines drawn from one root (Impact Sourcing guide v1). Drawn in a 390x400 box. */
const FAN_X=[57,109,160,200,260,300,352,404];
const fan = (p,sw) => `<g transform="translate(-36 -41)" fill="none" stroke="${p.ink}" stroke-width="${sw||23}" stroke-linecap="round" stroke-linejoin="round">${FAN_X.map(x=>`<path d="M${x},65 C${x},215 ${230+(x-230)*.3},320 230,418"/>`).join('')}</g>`;

/* small "IS" roundel used by the wordmark-led kinds */
const roundel = (p,L,mode) => {
  if(mode==='patch') return `<circle cx="50" cy="50" r="46" fill="none" stroke="${p.ink}" stroke-width="3"/><circle cx="50" cy="50" r="38" fill="none" stroke="${p.ink}" stroke-width="1.5" stroke-dasharray="4 3"/><text x="50" y="62" text-anchor="middle" font-size="34" fill="${p.ink}" font-family="${p.display}">${esc(L.letter)}</text>`;
  if(mode==='label') return `<rect x="6" y="6" width="88" height="88" fill="none" stroke="${p.ac}" stroke-width="2"/><rect x="12" y="12" width="76" height="76" fill="none" stroke="${p.ac}" stroke-width="1"/><text x="50" y="63" text-anchor="middle" font-size="38" fill="${p.ink}" font-family="${p.display}">${esc(L.letter)}</text>`;
  return `<circle cx="50" cy="50" r="46" fill="none" stroke="${p.ring}" stroke-width="1.5"/><text x="50" y="62" text-anchor="middle" font-size="36" font-weight="400" fill="${p.ink}" font-family="${p.display}">${esc(L.letter)}</text>`;
};

/* wordmark-led kinds draw their own three layouts */
const WORDMARKS = {
  classic:(p,L)=>({
    horizontal:{w:430,h:112,body:`<text x="0" y="66" font-size="66" font-weight="600" fill="${p.ink}" font-family="${p.display}" textLength="410" lengthAdjust="spacing">${esc(L.first)}</text><text x="3" y="104" font-size="18" fill="${p.ac}" font-family="${p.body}" letter-spacing="7.5">${esc(L.second)}</text>`},
    stacked:{w:430,h:226,body:`<svg x="165" y="0" width="100" height="100" viewBox="0 0 100 100">${roundel(p,L,'classic')}</svg><text x="215" y="170" text-anchor="middle" font-size="66" font-weight="600" fill="${p.ink}" font-family="${p.display}" textLength="410" lengthAdjust="spacing">${esc(L.first)}</text><text x="218" y="208" text-anchor="middle" font-size="18" fill="${p.ac}" font-family="${p.body}" letter-spacing="7.5">${esc(L.second)}</text>`},
    symbol:{w:100,h:100,body:roundel(p,L,'classic')} }),
  label:(p,L)=>({
    horizontal:{w:440,h:150,body:`<text x="220" y="90" text-anchor="middle" font-size="94" fill="${p.ink}" font-family="${p.display}" textLength="420" lengthAdjust="spacing">${esc(L.first)}</text><line x1="0" y1="128" x2="130" y2="128" stroke="${p.ac}"/><text x="220" y="136" text-anchor="middle" font-size="19" font-weight="700" fill="${p.ac}" font-family="${p.display}" letter-spacing="8" textLength="160" lengthAdjust="spacing">${esc(L.second)}</text><line x1="310" y1="128" x2="440" y2="128" stroke="${p.ac}"/>`},
    stacked:{w:440,h:262,body:`<svg x="170" y="0" width="100" height="100" viewBox="0 0 100 100">${roundel(p,L,'label')}</svg><text x="220" y="200" text-anchor="middle" font-size="94" fill="${p.ink}" font-family="${p.display}" textLength="420" lengthAdjust="spacing">${esc(L.first)}</text><line x1="0" y1="238" x2="130" y2="238" stroke="${p.ac}"/><text x="220" y="246" text-anchor="middle" font-size="19" font-weight="700" fill="${p.ac}" font-family="${p.display}" textLength="160" lengthAdjust="spacing">${esc(L.second)}</text><line x1="310" y1="238" x2="440" y2="238" stroke="${p.ac}"/>`},
    symbol:{w:100,h:100,body:roundel(p,L,'label')} }),
  patch:(p,L)=>{ const frame=`<rect x="3" y="3" width="394" height="164" rx="14" fill="none" stroke="${p.ink}" stroke-width="3"/><rect x="13" y="13" width="374" height="144" rx="8" fill="none" stroke="${p.ink}" stroke-width="2" stroke-dasharray="9 6" opacity=".75"/>`;
    const txt=`<text x="200" y="98" text-anchor="middle" font-size="80" fill="${p.ink}" font-family="${p.display}" textLength="330" lengthAdjust="spacingAndGlyphs">${esc(L.first)}</text><text x="200" y="140" text-anchor="middle" font-size="28" font-weight="700" fill="${p.ac}" font-family="${p.accentFont}" letter-spacing="9" textLength="260" lengthAdjust="spacing">${esc(L.second)}</text>`;
    return { horizontal:{w:400,h:170,body:frame+txt}, stacked:{w:400,h:170,body:frame+txt}, symbol:{w:100,h:100,body:roundel(p,L,'patch')} }; },
  rule:(p,L)=>({
    horizontal:{w:580,h:132,body:`<line x1="0" y1="2" x2="580" y2="2" stroke="${p.ink}"/><text x="290" y="68" text-anchor="middle" font-size="46" font-weight="500" fill="${p.ink}" font-family="${p.display}" textLength="560" lengthAdjust="spacing">${esc(L.first+' '+L.second)}</text><line x1="0" y1="86" x2="580" y2="86" stroke="${p.ink}"/><text x="290" y="116" text-anchor="middle" font-size="12" fill="${p.ac}" font-family="${p.detail}" letter-spacing="5" textLength="300" lengthAdjust="spacing">${esc(L.sub)}</text>`},
    stacked:{w:580,h:232,body:`<svg x="240" y="0" width="100" height="100" viewBox="0 0 100 100">${roundel(p,L,'rule')}</svg><line x1="0" y1="124" x2="580" y2="124" stroke="${p.ink}"/><text x="290" y="188" text-anchor="middle" font-size="46" font-weight="500" fill="${p.ink}" font-family="${p.display}" textLength="560" lengthAdjust="spacing">${esc(L.first+' '+L.second)}</text><line x1="0" y1="206" x2="580" y2="206" stroke="${p.ink}"/><text x="290" y="228" text-anchor="middle" font-size="12" fill="${p.ac}" font-family="${p.detail}" letter-spacing="5" textLength="300" lengthAdjust="spacing">${esc(L.sub)}</text>`},
    symbol:{w:100,h:100,body:roundel(p,L,'rule')} }),
  limpet:(p,L)=>({
    horizontal:{w:640,h:100,body:`<svg x="0" y="0" width="97.5" height="100" viewBox="0 0 390 400">${fan(p)}</svg><text x="136" y="54" font-size="42" font-weight="500" fill="${p.ink}" font-family="${p.display}" textLength="500" lengthAdjust="spacing">${esc(L.first+' '+L.second)}</text><text x="138" y="84" font-size="12.5" font-weight="500" fill="${p.ac}" font-family="${p.detail}" textLength="262" lengthAdjust="spacing">${esc(L.sub)}</text>`},
    stacked:{w:520,h:236,body:`<svg x="209" y="0" width="102" height="105" viewBox="0 0 390 400">${fan(p)}</svg><text x="260" y="170" text-anchor="middle" font-size="42" font-weight="500" fill="${p.ink}" font-family="${p.display}" textLength="500" lengthAdjust="spacing">${esc(L.first+' '+L.second)}</text><text x="260" y="206" text-anchor="middle" font-size="12.5" font-weight="500" fill="${p.ac}" font-family="${p.detail}" textLength="262" lengthAdjust="spacing">${esc(L.sub)}</text>`},
    symbol:{w:390,h:400,body:fan(p)} }),
};

const KINDS = [...new Set([...Object.keys(WORDMARKS), ...Object.keys(SYMBOLS)])];
const KIND_LABELS = { classic:'Classic wordmark', label:'Label (serif + rules)', patch:'Workwear patch', rule:'Ruled wordmark', limpet:'Limpet fibres',
  seal:'Seal', cw:'Monogram block', hammer:'Hammer-I', ripple:'Ripple', strike:'Strike', impact:'Impact (rings)', echo:'Echo', shock:'Shockwave', struck:'Struck seal', dot:'Dot', mark:'Letter mark' };

function palette(c,way){
  const L=c.logo, f=L.fonts||{};
  const base={ display:f.display||"'Montserrat',Arial,sans-serif", body:f.body||f.display||"'Montserrat',Arial,sans-serif", detail:f.detail||f.body||"monospace", accentFont:f.accent||f.display||"Arial" };
  const dark = way==='white';
  if(way==='grey') return Object.assign(base,{ ink:L.grey, ac:(L.kind==='dot'?'#c4c6c6':L.grey), ring:L.grey, bg:'#fff', onAc:'#ffffff' });
  if(dark)         return Object.assign(base,{ ink:L.light||'#ffffff', ac:L.onDarkAccent||c.theme.accent, ring:L.onDarkAccent||c.theme.accent, bg:L.ink, onAc:L.onAccentDark||L.ink });
  return Object.assign(base,{ ink:L.ink, ac:L.accent||c.theme.accent, ring:L.ink, bg:'#fff', onAc:L.onAccent||'#ffffff' });
}

function make(c,layout,way){
  const L=c.logo, kind=L.kind||'mark', p=palette(c,way);
  const words=(L.wordmark||c.name).toUpperCase().split(/\s+/);
  const ext={ letter:L.letter, legend:L.legend||((L.wordmark||c.name).toUpperCase()+' · '), first:L.first||words[0], second:L.second!=null?L.second:words.slice(1).join(' '), sub:L.sub||'' };
  if(WORDMARKS[kind]){ const o=WORDMARKS[kind](p,ext)[layout]; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${o.w} ${o.h}">${o.body}</svg>`; }
  const s=SYMBOLS[kind]||SYMBOLS.mark, name=(L.wordmark||c.name).toUpperCase(), n=[...name].length;
  if(layout==='symbol') return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s.w} ${s.h}">${s.draw(p,ext)}</svg>`;
  const tf=kind==='dot'||kind==='mark'||kind==='cw'&&!L.wide;                       // bold, tight wordmark vs. airy serif
  if(layout==='horizontal'){
    const H=100, sw=s.w*H/s.h, size=tf?64:44, tw=Math.max(90,n*(tf?46:34)), x=sw+(tf?24:30);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${x+tw+4} ${H}"><svg x="0" y="0" width="${sw}" height="${H}" viewBox="0 0 ${s.w} ${s.h}">${s.draw(p,ext)}</svg><text x="${x}" y="${tf?76:62}" font-size="${size}" font-weight="${tf?800:500}" fill="${p.ink}" font-family="${p.display}" textLength="${tw}" lengthAdjust="${tf?'spacingAndGlyphs':'spacing'}">${esc(name)}</text></svg>`;
  }
  const H=130, sw=s.w*H/s.h, tw=Math.max(120,n*(tf?30:26)), W=Math.max(tw,sw)+20, size=tf?42:32;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H+56}"><svg x="${(W-sw)/2}" y="0" width="${sw}" height="${H}" viewBox="0 0 ${s.w} ${s.h}">${s.draw(p,ext)}</svg><text x="${W/2}" y="${H+42}" text-anchor="middle" font-size="${size}" font-weight="${tf?800:500}" fill="${p.ink}" font-family="${p.display}" textLength="${tw}" lengthAdjust="${tf?'spacingAndGlyphs':'spacing'}">${esc(name)}</text></svg>`;
}

window.BPLogos = { make, KINDS, KIND_LABELS };
})();
