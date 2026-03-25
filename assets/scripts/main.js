// SCROLL PROGRESS
const prog = document.getElementById('prog');
window.addEventListener('scroll',()=>{
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = Math.min(pct,100)+'%';
});

// TYPEWRITER
const titleText = 'Juventude Socialista';
const nameEl = document.getElementById('orgName');
titleText.split('').forEach((ch,i)=>{
  const s = document.createElement('span');
  s.className='char';
  s.textContent = ch===' ' ? '\u00A0' : ch;
  s.style.animationDelay=(0.55+i*.045)+'s';
  nameEl.appendChild(s);
});

// PARTICLES
const canvas=document.getElementById('particles');
const ctx=canvas.getContext('2d');
let W,H,pts=[];
function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
resize(); window.addEventListener('resize',resize);
function mkPt(){
  return { x:Math.random()*W, y:Math.random()*H+H, r:Math.random()*2.5+.8,
           vy:Math.random()*.55+.18, vx:(Math.random()-.5)*.3,
           op:Math.random()*.22+.04, ph:Math.random()*Math.PI*2 };
}
for(let i=0;i<42;i++){ const p=mkPt(); p.y=Math.random()*H; pts.push(p); }
(function draw(){
  ctx.clearRect(0,0,W,H);
  pts.forEach(p=>{
    p.ph+=.018;
    const o=p.op*(0.8+0.2*Math.sin(p.ph));
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(192,24,26,${o})`; ctx.fill();
    p.y-=p.vy; p.x+=p.vx;
    if(p.y<-10) Object.assign(p,mkPt());
  });
  requestAnimationFrame(draw);
})();

// RIPPLE
document.querySelectorAll('.link-btn').forEach(btn=>{
  btn.addEventListener('click',function(e){
    const c=document.createElement('span');
    const d=Math.max(this.clientWidth,this.clientHeight), r=d/2;
    const rect=this.getBoundingClientRect();
    c.style.cssText=`position:absolute;border-radius:50%;pointer-events:none;z-index:0;width:${d}px;height:${d}px;left:${e.clientX-rect.left-r}px;top:${e.clientY-rect.top-r}px;background:rgba(192,24,26,.18);transform:scale(0);animation:rippleAnim .65s linear forwards;`;
    this.appendChild(c); setTimeout(()=>c.remove(),700);
  });
});

// MAGNETIC BUTTONS
document.querySelectorAll('.link-btn').forEach(btn=>{
  btn.addEventListener('mousemove',function(e){
    const rect=this.getBoundingClientRect();
    const dx=(e.clientX-(rect.left+rect.width/2))*.07;
    const dy=(e.clientY-(rect.top+rect.height/2))*.1;
    this.style.transform=`translateY(${-4+dy}px) translateX(${dx}px) scale(1.012)`;
  });
  btn.addEventListener('mouseleave',function(){ this.style.transform=''; });
});

// GALLERY STAGGER
const gItems=document.querySelectorAll('.gallery-item');
const obs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const i=[...gItems].indexOf(entry.target);
      entry.target.style.animationDelay=(i*.09)+'s';
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
},{threshold:.15});
gItems.forEach(el=>obs.observe(el));

// LIGHTBOX
const gData=[
  {src:'assets/images/visitaparl.jpg', title:'Visita à Assembleia da República'},
  {src:'assets/images/visitasedeps.jpg', title:'Visita à Sede Nacional do Partido Socialista'},
  {src:'assets/images/50yjs.jpg', title:'50 anos da Juventude Socialista'},
  {src:'assets/images/comissaopoliticadist.jpg', title:'1ª Comissão Política Distrital da JS Marinha Grande'},
  {src:'assets/images/habitacaoreel.jpg', title:''},
  {src:'assets/images/visitasantacasa.jpg', title:'Visita à Santa Casa da Misericórdia da Marinha Grande'},
];
function openLightbox(i){
  const d=gData[i], lb=document.getElementById('lightbox');
  const wrap=document.getElementById('lbImgWrap');
  wrap.innerHTML=`<img src="${d.src}" alt="${d.title}" style="width:100%;height:100%;object-fit:cover;display:block;">`;
  document.getElementById('lbCaption').textContent=d.title;
  lb.classList.add('open');
}
function closeLightbox(e){ if(e.target===document.getElementById('lightbox')) document.getElementById('lightbox').classList.remove('open'); }