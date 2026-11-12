(function(){
var CV='Nadzeya-Huts-CV.pdf';
var css='.hero-cta{position:relative;z-index:30}.ct-wrap{position:relative;display:inline-flex}.ct-wrap>.btn{white-space:nowrap}.ct-pop{position:absolute;top:calc(100% + 10px);left:50%;transform:translate(-50%,6px);min-width:290px;padding:8px;border-radius:16px;border:1px solid rgba(255,255,255,.1);background:#1a1a1f;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 24px 60px rgba(0,0,0,.5);display:flex;flex-direction:column;gap:2px;opacity:0;visibility:hidden;transition:opacity .2s,transform .2s,visibility .2s;z-index:80;text-align:left}.ct-wrap.open .ct-pop{opacity:1;visibility:visible;transform:translate(-50%,0)}@media(max-width:600px){.ct-pop{left:0;transform:translateY(6px);min-width:min(290px,calc(100vw - 40px))}.ct-wrap.open .ct-pop{transform:none}}.ct-pop a{display:grid;grid-template-columns:36px minmax(0,1fr);gap:12px;align-items:center;padding:9px 10px;border-radius:11px;color:#fff;text-decoration:none;transition:background .15s}.ct-pop a:hover{background:rgba(255,255,255,.07)}.ct-pop .gl{width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);display:flex;align-items:center;justify-content:center}.ct-pop svg{width:17px;height:17px}.ct-pop b{display:block;font-weight:500;font-size:14.5px;line-height:1.25}.ct-pop small{display:block;font-size:12.5px;color:rgba(255,255,255,.55);line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}';
var I={tg:'<svg viewBox="0 0 20 20" fill="currentColor"><path d="M17.14 1.1a1.4 1.4 0 0 1 1.84 1.46l-2.03 12.32c-.2 1.19-1.5 1.87-2.59 1.28-.91-.5-2.27-1.26-3.48-2.06-.61-.4-2.48-1.67-2.25-2.58.2-.78 3.33-3.7 5.12-5.43.7-.68.38-1.07-.45-.45-2.06 1.56-5.37 3.92-6.47 4.59-.97.59-1.47.69-2.07.59-1.1-.18-2.12-.47-2.95-.81-1.12-.47-1.07-2.01 0-2.46L17.14 1.1z"/></svg>',
ml:'<svg viewBox="0 0 20 20" fill="currentColor"><path d="M18.33 6.28v7.89a2.5 2.5 0 0 1-2.35 2.5H4.17a2.5 2.5 0 0 1-2.5-2.36V6.28l7.87 5.25.1.05a.83.83 0 0 0 .72 0l.1-.05 7.87-5.25z"/><path d="M15.83 3.33c.9 0 1.69.48 2.13 1.19L10 9.83 2.04 4.52a2.5 2.5 0 0 1 2.13-1.19h11.66z"/></svg>',
ln:'<svg viewBox="0 0 20 20" fill="currentColor"><path d="M7.94 7.58h2.97v1.48c.43-.85 1.53-1.62 3.18-1.62 3.16 0 3.91 1.7 3.91 4.8V18h-3.2v-5.05c0-1.77-.43-2.77-1.52-2.77-1.51 0-2.14 1.08-2.14 2.77V18h-3.2V7.58zM2.46 17.86h3.2V7.44h-3.2v10.42zM6.11 4.04a2.05 2.05 0 1 1-4.1 0 2.05 2.05 0 0 1 4.1 0z"/></svg>'};
var html='<a href="https://t.me/NadzeyaHu" target="_blank" rel="noopener"><span class="gl">'+I.tg+'</span><span><b>Telegram</b><small>@NadzeyaHu</small></span></a><a href="mailto:nadzeyahuts@gmail.com"><span class="gl">'+I.ml+'</span><span><b>Email</b><small>nadzeyahuts@gmail.com</small></span></a><a href="https://www.linkedin.com/in/nadzeya-huts/" target="_blank" rel="noopener"><span class="gl">'+I.ln+'</span><span><b>LinkedIn</b><small>linkedin.com/in/nadzeya-huts</small></span></a>';
function init(){
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
document.querySelectorAll('.hero-cta').forEach(function(box){
box.querySelectorAll('a,button').forEach(function(b){
var tx=b.textContent.trim();
if(/^CV$/i.test(tx)&&b.tagName==='A'){b.setAttribute('href',CV);b.setAttribute('download',CV);b.removeAttribute('target');}
if(/^Contact me$/i.test(tx)){
var w=document.createElement('span');w.className='ct-wrap';b.parentNode.insertBefore(w,b);w.appendChild(b);
var p=document.createElement('div');p.className='ct-pop';p.setAttribute('role','menu');p.innerHTML=html;w.appendChild(p);
b.setAttribute('aria-haspopup','true');b.setAttribute('aria-expanded','false');
b.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();var o=w.classList.toggle('open');b.setAttribute('aria-expanded',o);},true);
}});});
document.addEventListener('click',function(e){document.querySelectorAll('.ct-wrap.open').forEach(function(w){if(!w.contains(e.target)){w.classList.remove('open');w.firstChild.setAttribute('aria-expanded','false');}});});
document.addEventListener('keydown',function(e){if(e.key==='Escape')document.querySelectorAll('.ct-wrap.open').forEach(function(w){w.classList.remove('open');});});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
