
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const side=$('.side'),ov=$('.ov'),bu=$('.burger');
const tg=()=>{side.classList.toggle('open');ov.classList.toggle('show');bu.classList.toggle('x')};
bu.onclick=tg;ov.onclick=tg;
const toast=m=>{const t=$('.toast');t.textContent=m;t.classList.add('show');clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove('show'),2600)};
$$('.lo,.tlo').forEach(b=>b.onclick=()=>{if(confirm('Log out of your dashboard?'))location.href='index.html'});
const count=el=>{const n=+el.dataset.n,pre=el.dataset.pre||'',s=el.dataset.s||'';let i=0;const t=setInterval(()=>{i+=n/40;if(i>=n){i=n;clearInterval(t)}el.textContent=pre+(n%1?i.toFixed(1):Math.round(i).toLocaleString())+s},25)};
function draw(c){const k=c.dataset.k,v=c.dataset.v.split(',').map(Number),l=(c.dataset.l||'').split(','),h=+c.dataset.h||180,W=c.parentElement.clientWidth,d=devicePixelRatio||1;if(!W)return;
c.width=W*d;c.height=h*d;c.style.height=h+'px';const x=c.getContext('2d');x.scale(d,d);const cs=getComputedStyle(document.documentElement),a=cs.getPropertyValue('--ac').trim(),b=cs.getPropertyValue('--ac2').trim(),mx=Math.max(...v)*1.15;let t=0;
(function f(){t=Math.min(1,t+.045);const e=1-Math.pow(1-t,3);x.clearRect(0,0,W,h);
if(k=='donut'){const tot=v.reduce((p,q)=>p+q,0),cl=[a,b,'#12a150','#d62839','#4c6ef5','#8a94b8'];let s=-Math.PI/2;v.forEach((n,i)=>{const g=n/tot*Math.PI*2*e;x.beginPath();x.strokeStyle=cl[i%6];x.lineWidth=28;x.arc(W/2,h/2,Math.min(W,h)/2-26,s,s+Math.max(g-.04,0));x.stroke();s+=g})}
else{const pw=W-40,ph=h-34,st=pw/v.length;x.font='11px Segoe UI';x.strokeStyle='#e3e9f7';x.fillStyle='#56627f';for(let i=0;i<4;i++){const y=10+ph*i/3;x.beginPath();x.moveTo(30,y);x.lineTo(W-6,y);x.stroke()}
if(k=='bar')v.forEach((n,i)=>{const bh=n/mx*ph*e,bx=34+i*st+st*.18,g=x.createLinearGradient(0,10+ph-bh,0,10+ph);g.addColorStop(0,a);g.addColorStop(1,b);x.fillStyle=g;x.beginPath();x.roundRect(bx,10+ph-bh,st*.64,bh,6);x.fill();x.fillStyle='#56627f';x.fillText(l[i]||'',bx,h-8)});
else{x.beginPath();v.forEach((n,i)=>{const px=34+i*st+st/2,py=10+ph-n/mx*ph*e;i?x.lineTo(px,py):x.moveTo(px,py)});x.strokeStyle=a;x.lineWidth=3;x.stroke();x.lineTo(34+(v.length-.5)*st,10+ph);x.lineTo(34+st/2,10+ph);x.globalAlpha=.15;x.fillStyle=a;x.fill();x.globalAlpha=1;x.fillStyle='#56627f';v.forEach((n,i)=>{x.fillText(l[i]||'',34+i*st+st/2-10,h-8);x.beginPath();x.fillStyle=b;x.arc(34+i*st+st/2,10+ph-n/mx*ph*e,4,0,7);x.fill()})}}
if(t<1)requestAnimationFrame(f)})()}
let cur;function go(id){const m=document.getElementById(id)||$('.mod');id=m.id;cur=m;
$$('.mod').forEach(x=>x.classList.toggle('on',x==m));const nb=$(`.nv button[data-m="${id}"]`);$$('.nv button').forEach(b=>b.classList.toggle('on',b==nb));$('#pt').textContent=nb.lastChild.textContent;
if(side.classList.contains('open'))tg();scrollTo({top:0,behavior:'smooth'});history.replaceState(null,'','#'+id);
m.querySelectorAll('canvas').forEach(draw);m.querySelectorAll('[data-n]').forEach(count);
m.querySelectorAll('.pr i[data-w]').forEach(i=>{i.style.width=0;setTimeout(()=>i.style.width=i.dataset.w+'%',80)});
m.querySelectorAll('.ring').forEach(r=>{let p=0;const to=+r.dataset.r,t=setInterval(()=>{p+=2;if(p>=to){p=to;clearInterval(t)}r.style.setProperty('--p',p)},18)})}
$$('.nv button').forEach(b=>b.onclick=()=>go(b.dataset.m));addEventListener('resize',()=>cur&&cur.querySelectorAll('canvas').forEach(draw));
const cmd=$('.cmd'),ci=$('.cmd input'),cl=$('#cl');
const lst=()=>{const q=ci.value.toLowerCase();cl.innerHTML='';$$('.nv button').filter(b=>b.textContent.toLowerCase().includes(q)).forEach((b,i)=>{const x=document.createElement('button');x.textContent=b.textContent;if(!i)x.className='sel';x.onclick=()=>{cmd.classList.remove('show');go(b.dataset.m)};cl.append(x)})};
const oc=()=>{cmd.classList.add('show');ci.value='';lst();ci.focus()};$('.srch').onclick=oc;ci.oninput=lst;ci.onkeydown=e=>{if(e.key=='Enter'){const s=$('.cmd .sel');s&&s.click()}};cmd.onclick=e=>{if(e.target==cmd)cmd.classList.remove('show')};
onkeydown=e=>{if(e.ctrlKey&&e.key.toLowerCase()=='k'){e.preventDefault();oc()}if(e.key=='Escape')cmd.classList.remove('show')};
$('.bell').onclick=()=>$('.dd').classList.toggle('show');
$$('.tg input').forEach(i=>i.onchange=()=>toast('Setting saved'));
$$('[data-t]').forEach(el=>el.oninput=()=>{const t=el.dataset.t,q=($(`input[data-t="${t}"]`)||{value:''}).value.toLowerCase(),f=($(`select[data-t="${t}"]`)||{value:''}).value.toLowerCase();$$(`#${t} tbody tr`).forEach(r=>{const x=r.textContent.toLowerCase();r.hidden=!(x.includes(q)&&x.includes(f))})});
$$('form.fm').forEach(f=>{if(f.id=='pf')f.onsubmit=e=>{e.preventDefault();toast('Profile saved')}});
const ck=()=>{const d=new Date(),h=d.getHours();$('#clk').textContent=(h<12?'Good morning':h<17?'Good afternoon':'Good evening')+' · '+d.toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'})};ck();setInterval(ck,30000);
go(location.hash.slice(1));
