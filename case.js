
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

  // counter animation for .nb-statcard .n and .kpi .n
  if (!reduced && 'IntersectionObserver' in window){
    function animCount(el){
      const raw = el.textContent.trim();
      const m = raw.match(/^(\d+(?:\.\d+)?)(.*?)(\d*)(.*)$/);
      if(!m || isNaN(parseFloat(m[1]))) return;
      const target = parseFloat(m[1]); const dec = m[1].includes('.') ? m[1].split('.')[1].length : 0;
      const prefix = ''; const suffix = m[2] + (m[3] ? m[3]+m[4] : '');
      const dur = 1400; const start = performance.now();
      (function step(now){
        const p = Math.min((now - start)/dur, 1);
        const ease = 1 - Math.pow(1-p, 3);
        el.textContent = (ease * target).toFixed(dec) + suffix;
        if(p < 1) requestAnimationFrame(step);
      })(start);
    }
    const cntEls = [...document.querySelectorAll('.nb-statcard .n, .kpi .n')];
    const cio = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ animCount(e.target); cio.unobserve(e.target); } });
    },{threshold:0.5});
    cntEls.forEach(el=>cio.observe(el));

    // bar animation
    document.querySelectorAll('.bar i, .tr i').forEach(bar=>{
      const targetW = bar.style.width || '0%';
      bar.style.width = '0';
      const bio = new IntersectionObserver(entries=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.style.transition='width 1.2s cubic-bezier(.22,1,.36,1)'; e.target.style.width=targetW; bio.unobserve(e.target); } });
      },{threshold:0.3});
      bio.observe(bar);
    });
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
