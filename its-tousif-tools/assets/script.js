
// Its Tousif Tools - Premium Interactions
document.addEventListener('DOMContentLoaded', ()=>{
  // Stagger cards
  document.querySelectorAll('.tool-card').forEach((el,i)=>{
    el.style.animationDelay = (i*0.1)+'s';
  });
  // Parallax blobs
  const blobs = document.querySelectorAll('.blob');
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(!ticking){
      requestAnimationFrame(()=>{
        const y = window.scrollY;
        blobs.forEach((b,idx)=>{
          const speed = 0.15 + idx*0.05;
          b.style.transform = `translate3d(0, ${y*speed*0.2}px, 0) scale(${1 + y*0.0001})`;
        });
        ticking=false;
      });
      ticking=true;
    }
  },{passive:true});

  // Animated counters
  const counters = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el=e.target;
        const target=+el.dataset.count;
        let cur=0;
        const step=()=>{cur+=target/60; if(cur<target){el.textContent=Math.floor(cur).toLocaleString()+'+';requestAnimationFrame(step);} else el.textContent=target.toLocaleString()+'+';};
        step();
        io.unobserve(el);
      }
    });
  },{threshold:0.6});
  counters.forEach(c=>io.observe(c));

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click',()=>{
      const item=q.parentElement;
      item.classList.toggle('open');
    });
  });

  // Search filter (home)
  const searchInput = document.getElementById('toolSearch');
  if(searchInput){
    searchInput.addEventListener('input',()=>{
      const v=searchInput.value.toLowerCase();
      document.querySelectorAll('.tool-card').forEach(card=>{
        const text=card.textContent.toLowerCase();
        card.style.display = text.includes(v) ? '' : 'none';
      });
    });
  }

  // Magnetic buttons
  document.querySelectorAll('.magnetic').forEach(btn=>{
    btn.addEventListener('mousemove',(e)=>{
      const rect=btn.getBoundingClientRect();
      const x=e.clientX-rect.left-rect.width/2;
      const y=e.clientY-rect.top-rect.height/2;
      btn.style.transform=`translate(${x*0.12}px, ${y*0.25}px) scale(1.02)`;
    });
    btn.addEventListener('mouseleave',()=>{btn.style.transform='translate(0,0) scale(1)';});
  });

  // Drag & Drop generic
  document.querySelectorAll('.upload-zone').forEach(zone=>{
    ['dragenter','dragover'].forEach(ev=>zone.addEventListener(ev,e=>{e.preventDefault();zone.classList.add('dragover');}));
    ['dragleave','drop'].forEach(ev=>zone.addEventListener(ev,e=>{e.preventDefault();zone.classList.remove('dragover');}));
  });
});
