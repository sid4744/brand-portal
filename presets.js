/* Brand identities imported from earlier work.
   - Impact Sourcing: the final brand guide v1 (Limpet system), replacing the earlier exploratory directions.
   Each entry is merged over the neutral company template in app.js. */
(() => {
const scene = (a,b,label) => 'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="900" height="620" fill="url(#g)"/><circle cx="650" cy="170" r="110" fill="#fff" opacity=".1"/><path d="M0 520 Q260 430 480 505 T900 470 V620 H0Z" fill="#000" opacity=".2"/><text x="40" y="580" font-family="Arial" font-size="22" fill="#fff" opacity=".75" letter-spacing="4">${label}</text></svg>`);

const PERSON = 'Sidhant Sridhar';

/* ---------------------------------------------------------------- Impact Sourcing */
const IS_DONTS = ["Don't place the seal on busy imagery","Don't use bright colours, gradients or glossy effects","Don't set a headline in a sans-serif"];
const IS_HELP = {
  logo:'Choose one wordmark per surface and never mix concepts on the same piece. Use the dark mark on light grounds and the light mark on dark grounds.',
  colour:'Each colour has a role. Neutrals carry the surfaces, the primary colour carries the brand, and the metallic accent is used sparingly.',
  type:'A serif voice for headings, a sturdy sans for body, a monospaced voice for batch numbers and "traced from source" lines.',
  elements:'The mark, a repeatable stamp pattern and quiet tonal gradients.',
  imagery:'Natural light, raw materials and hands at work. Never staged lifestyle shots. The library lives in the media portal.',
};
const isImagery = (a,b,c2) => [
  { label:'Raw materials', url:scene(a,b,'RAW MATERIALS') }, { label:'Hands at work', url:scene(b,c2,'HANDS AT WORK') },
  { label:'Origin', url:scene(c2,a,'ORIGIN') }, { label:'The product', url:scene(a,c2,'PRODUCT') },
  { label:'Packaging', url:scene(b,a,'PACKAGING') }, { label:'Batch record', url:scene(c2,b,'BATCH RECORD') } ];
const isType = (display,body,detail,note) => ({
  specs:[
    { label:'Display · 64 / 68 · Medium', sample:'Honest goods, traced from source.', weight:500, size:44, tracking:0, upper:false, family:display },
    { label:'Heading · 34 / 38 · Semibold', sample:'Woven by Ana Ruiz in Oaxaca', weight:600, size:30, tracking:0, upper:false, family:display },
    { label:'Body · 16 / 26 · Regular', sample:'Every product has a known origin, a known maker and a batch number that can be followed back to its source.', weight:400, size:15, tracking:0, upper:false, family:body },
    { label:'Detail · 11 / 16 · Caps · 0.08em', sample:'Batch 0247 · Traced from source', weight:500, size:12, tracking:.08, upper:true, family:detail },
  ], note });
const IS_NOTE = 'Headings sit tight, body sits open: 26px line height on 16px. Detail text is set in capitals with 0.08em tracking. Never set body copy in the mono, and never set headings in the sans.';
const isBase = (o) => Object.assign({
  person:PERSON, feedbackEmail:'', tagline:'Honest goods, traced from source.', footerText:'Honest goods, traced from source.', mediaUrl:'#/page/media',
  help:IS_HELP,
  rules:{ clearSpace:'Minimum clear space around any mark equals the cap height of the wordmark. Smallest reproduction: 96px wide for the wordmark, 24px for the seal.', donts:['compress','crop','colour','rotate','blur','shadow'], customDonts:IS_DONTS },
}, o);

const FF = {
  cormorant:"'Cormorant Garamond',Georgia,serif", franklin:"'Libre Franklin','Helvetica Neue',Arial,sans-serif", plex:"'IBM Plex Mono',ui-monospace,monospace",
  caslon:"'Libre Caslon Text',Georgia,serif", work:"'Work Sans',system-ui,sans-serif",
  slab:"'Alfa Slab One',Georgia,serif", stencil:"'Stardos Stencil',Impact,sans-serif", barlow:"'Barlow',system-ui,sans-serif", space:"'Space Mono',monospace",
  dm:"'DM Sans',system-ui,sans-serif", jb:"'JetBrains Mono',ui-monospace,monospace",
};

const PRESETS = [

/* ============================== Impact Sourcing: final brand guide v1 (Limpet system) ============================== */
isBase({ id:'impact-sourcing', name:'Impact Sourcing', pageSubtitle:'Brand guide v1 · Limpet system', tagline:'Traced from source.', footerText:'Every product, traced to its source.',
  theme:{ accent:'#1F2A1F', onAccent:'#ECE7DB', sky1:'#CFC9B8', sky2:'#F3F1EC' },
  logo:{ kind:'limpet', wordmark:'IMPACT SOURCING', first:'IMPACT', second:'SOURCING', letter:'IS', ink:'#1F2A1F', grey:'#7d8578', light:'#ECE7DB', accent:'#6B7552', onDarkAccent:'#A78A4F', custom:{}, sub:'TRACED FROM SOURCE', legend:'IMPACT SOURCING · TRACED FROM SOURCE · ', fonts:{ display:FF.cormorant, body:FF.dm, detail:FF.jb } },
  colors:[ {name:'Forest',hex:'#1F2A1F'}, {name:'Bone',hex:'#ECE7DB'}, {name:'Olive',hex:'#6B7552'}, {name:'Brass',hex:'#A78A4F'}, {name:'Clay',hex:'#8E5B3F'},
           {name:'Paper',hex:'#F3F1EC'}, {name:'Moss',hex:'#4F5839'}, {name:'Sage',hex:'#A3AA88'}, {name:'Line',hex:'#CFC9B8'}, {name:'White',hex:'#FFFFFF'} ],
  type:{ font:'Cormorant Garamond', google:'Cormorant Garamond:400;500;600|DM Sans:400;500;700|JetBrains Mono:400;500', downloadUrl:'https://fonts.google.com/specimen/Cormorant+Garamond',
    note:'A fine serif for voice, a clear sans for reading and a monospace for facts. The mono is what makes a batch number feel like data, not decoration. One serif, one sans, one mono; never a second serif.',
    specs:[
      { label:'Display · Cormorant Garamond · 400 · 72/72', sample:'Traced from source', weight:400, size:52, tracking:0, upper:false, family:FF.cormorant },
      { label:'H1 · Cormorant · 500 · 48/52', sample:'Every product has a place', weight:500, size:40, tracking:0, upper:false, family:FF.cormorant },
      { label:'H3 · Cormorant · 500 · 36/42', sample:'Origin, producer and batch', weight:500, size:30, tracking:0, upper:false, family:FF.cormorant },
      { label:'Body · DM Sans · 400 · 16/26', sample:'Each product page names its place and its maker, so you know where it came from and who made it.', weight:400, size:16, tracking:0, upper:false, family:FF.dm },
      { label:'Caption · DM Sans · 400 · 13/20', sample:'Batch details are printed on every label and repeated on the page.', weight:400, size:13, tracking:0, upper:false, family:FF.dm },
      { label:'Label · JetBrains Mono · 500 · 11/16 · caps · +0.22em', sample:'Traced from source', weight:500, size:12, tracking:.22, upper:true, family:FF.jb },
      { label:'Data · JetBrains Mono · 400 · 12/18 · +0.06em', sample:'N° 0142 · 00.0000° N, 00.0000° E', weight:400, size:12, tracking:.06, upper:false, family:FF.jb },
    ] },
  gradients:[ {name:'Forest',from:'#1F2A1F',to:'#35402F',angle:160}, {name:'Bone on paper',from:'#F3F1EC',to:'#ECE7DB',angle:180}, {name:'Olive tint',from:'#A3AA88',to:'#6B7552',angle:140} ],
  imagery:isImagery('#1F2A1F','#6B7552','#A78A4F'),
  help:{ logo:'The limpet-tooth fibres mark: a fan of eight fine lines drawn from one root. Strength from many thin strands. Use Forest on light grounds and Bone on Forest.',
         colour:'The Provenance palette: Paper and Bone 55%, Forest 25%, Olive 10%, Brass 7%. Brass is the one accent. Clay is rare. Brass on Bone is decorative only.',
         type:'Cormorant Garamond for voice, DM Sans for reading, JetBrains Mono for facts such as batch numbers, coordinates and labels.',
         elements:'The fibres mark, a low-contrast pattern of it repeated, and quiet tonal washes. The guide itself uses no gradients: depth comes from Bone on Paper and from lines.',
         imagery:'Natural light, raw materials and hands at work. Hairlines and quiet Bone, space to breathe. The library lives in the media portal.' },
  rules:{ clearSpace:'Clear space x equals a quarter of the mark height on every side. Below 24 px use the heavy stroke. Smallest lockup: 120 px / 30 mm. Smallest icon: 16 px / 6 mm.',
          donts:['compress','colour','rotate','shadow'], customDonts:["Don't use low contrast","Don't change the type","Don't use gradients, bright colour or heavy shadows"] } }),
];


window.BP_PRESETS = PRESETS;
})();
