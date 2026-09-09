document.addEventListener('DOMContentLoaded',()=>{
  const header=document.getElementById('site-header');
  const menu=document.querySelector('.menu-toggle');
  const nav=document.getElementById('main-nav');
  const updateHeader=()=>header.classList.toggle('scrolled',window.scrollY>30);
  updateHeader(); window.addEventListener('scroll',updateHeader,{passive:true});

  menu?.addEventListener('click',()=>{
    const open=nav.classList.toggle('is-open');
    menu.setAttribute('aria-expanded',String(open));
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menu?.setAttribute('aria-expanded','false')}));

  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal,.reveal-left').forEach(el=>observer.observe(el));

  const counters=document.querySelectorAll('.counter[data-target]');
  const counterObserver=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,target=Number(el.dataset.target),suffix=el.dataset.suffix||'';const start=performance.now();const duration=1200;
    const tick=now=>{const p=Math.min((now-start)/duration,1),ease=1-Math.pow(1-p,3);el.textContent=`${Math.floor(target*ease)}${suffix}`;if(p<1)requestAnimationFrame(tick)};
    requestAnimationFrame(tick);counterObserver.unobserve(el);
  }),{threshold:.7});
  counters.forEach(c=>counterObserver.observe(c));

  const carousel=document.querySelector('[data-carousel]');
  if(carousel){
    const slides=[...carousel.querySelectorAll('.testimonial-slide')],dots=[...carousel.querySelectorAll('.dot')],prev=carousel.querySelector('.prev'),next=carousel.querySelector('.next');let current=0,timer;
    const show=i=>{current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('is-active',n===current));dots.forEach((d,n)=>d.classList.toggle('is-active',n===current))};
    const restart=()=>{clearInterval(timer);timer=setInterval(()=>show(current+1),6500)};
    prev?.addEventListener('click',()=>{show(current-1);restart()});next?.addEventListener('click',()=>{show(current+1);restart()});dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);restart()}));show(0);restart();
  }

  const copy=document.getElementById('copyPix'),pix=document.getElementById('pixKey');
  copy?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(pix.textContent.trim());copy.textContent='Copiado!';setTimeout(()=>copy.textContent='Copiar chave',1600)}catch{copy.textContent='Copie manualmente'}});
});
