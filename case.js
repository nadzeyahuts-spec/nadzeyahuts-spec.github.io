
(function(){
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 8), {passive:true});

  const toTop = document.getElementById('toTop');
  if (toTop){
    addEventListener('scroll', () => toTop.classList.toggle('show', scrollY > 600), {passive:true});
    toTop.addEventListener('click', () => window.scrollTo({ top:0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
  }

  // right-side section rail (scroll-spy)
  const rail = document.getElementById('rail');
  const secs = [...document.querySelectorAll('main section[data-screen-label]')];
  if (rail && secs.length){
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nice = s => s.replace(/^\d+\s*/,'');
    const links = secs.map(sec=>{
      const a = document.createElement('a'); a.href = '#';
      const lbl = document.createElement('span'); lbl.className='rl'; lbl.textContent = nice(sec.getAttribute('data-screen-label'));
      const dot = document.createElement('span'); dot.className='rd';
      a.appendChild(lbl); a.appendChild(dot); a.title = lbl.textContent;
      a.addEventListener('click', e=>{ e.preventDefault(); const y = sec.getBoundingClientRect().top + scrollY - 72; window.scrollTo({ top:y, behavior: smooth ? 'smooth' : 'auto' }); });
      rail.appendChild(a); return { sec, a };
    });
    let rTick = false;
    const setActive = () => {
      if (rTick) return; rTick = true;
      requestAnimationFrame(()=>{ rTick = false; let cur = links[0]; for (const l of links){ if (l.sec.getBoundingClientRect().top <= 140) cur = l; } links.forEach(l=> l.a.classList.toggle('active', l === cur)); });
    };
    addEventListener('scroll', setActive, {passive:true});
    addEventListener('resize', setActive, {passive:true});
    setActive();
  }

  // reveal on scroll
  const els = Array.from(document.querySelectorAll('.reveal'));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window){
    document.documentElement.classList.add('anim');
    const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.05});
    els.forEach(el=>io.observe(el));
    const inview=()=>els.forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)el.classList.add('in');});
    addEventListener('load',inview); inview();
  }

  // image lightbox
  const lb=document.createElement('div'); lb.id='lightbox';
  const lbimg=document.createElement('img'); lbimg.alt=''; lb.appendChild(lbimg);
  document.body.appendChild(lb);
  const bindLB = img => img.addEventListener('click',()=>{ lbimg.src=img.currentSrc||img.src; lb.classList.add('open'); });
  document.querySelectorAll('.shot, .fpanel .fshot, .nb-device, .gallery img').forEach(bindLB);
  lb.addEventListener('click',()=>lb.classList.remove('open'));
  addEventListener('keydown',e=>{ if(e.key==='Escape') lb.classList.remove('open'); });

  // tab-less feature reveal
  document.querySelectorAll('.feat').forEach(feat=>{
    if(feat.querySelector('.ftabs')) return;
    const panel = feat.querySelector('.fpanel.active');
    if(panel) setTimeout(()=> requestAnimationFrame(()=> panel.classList.add('info-in')), 240);
  });

  // Product Features tab switcher
  document.querySelectorAll('.feat .ftabs').forEach(tablist=>{
    const tabs = [...tablist.querySelectorAll('.ftab')];
    const panels = [...tablist.parentElement.querySelectorAll('.fpanel')];
    const byName = n => panels.find(p => p.dataset.panel === n);
    const revealInfo = panel => { const go=()=>requestAnimationFrame(()=>panel.classList.add('info-in')); setTimeout(go,120); };
    const init = panels.find(p => p.classList.contains('active'));
    if (init) revealInfo(init);
    tabs.forEach(tab=>{
      tab.addEventListener('click', ()=>{
        if(tab.getAttribute('aria-selected') === 'true') return;
        tabs.forEach(t=>t.setAttribute('aria-selected', String(t===tab)));
        panels.forEach(p=> p.classList.remove('active','info-in'));
        const next = byName(tab.dataset.fpanel);
        void next.offsetWidth; next.classList.add('active'); revealInfo(next);
      });
    });
  });
})();
