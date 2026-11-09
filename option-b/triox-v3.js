/* Local concept previews only. No persistence, data processing or network. */
document.querySelectorAll('[role=tablist]').forEach(list=>{const tabs=[...list.querySelectorAll('[role=tab]')];const select=t=>{tabs.forEach(b=>{const on=b===t;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=!on;});};tabs.forEach((t,i)=>{t.addEventListener('click',()=>select(t));t.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();select(tabs[n]);tabs[n].focus();}});});});
function step(id){document.querySelectorAll('[data-step-panel]').forEach(p=>p.hidden=p.id!==id);document.querySelectorAll('[data-step]').forEach(b=>{if(b.dataset.step===id)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});document.querySelectorAll('[data-step-select]').forEach(s=>s.value=id);const h=document.querySelector('#'+id+' h2');if(h)h.focus();const s=document.getElementById('stepstatus');if(s)s.textContent='Showing step '+id.slice(1)+' of 8. Preview only; nothing saved or submitted.';}
document.querySelectorAll('[data-step],[data-goto]').forEach(b=>b.addEventListener('click',()=>step(b.dataset.step||b.dataset.goto)));
document.querySelectorAll('[data-step-select]').forEach(s=>s.addEventListener('change',()=>step(s.value)));
function view(id){document.querySelectorAll('[data-view-panel]').forEach(p=>p.hidden=p.id!==id);document.querySelectorAll('[data-view]').forEach(b=>{if(b.dataset.view===id)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});document.querySelectorAll('.mobile-menu').forEach(m=>m.open=false);document.querySelectorAll('.context,.page,.previewstrip').forEach(el=>el.inert=false);const active=document.getElementById(id);if(active){const h=active.querySelector('h1');h.tabIndex=-1;h.focus();}window.scrollTo(0,0);document.title='TRIOX · '+id.replace('view-','')+' · concept';}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();view(b.dataset.view);}));
/* v2.1 mobile drawer: local disclosure, Escape and keyboard containment. */
document.querySelectorAll('.mobile-menu').forEach(menu=>{
 const summary=menu.querySelector('summary');
 const background=()=>[...menu.parentElement.querySelectorAll(':scope > .context,:scope > .page'),...document.querySelectorAll('.previewstrip')];
 menu.addEventListener('toggle',()=>{background().forEach(el=>el.inert=menu.open);summary.setAttribute('aria-expanded',String(menu.open));});
 menu.addEventListener('keydown',e=>{if(!menu.open)return;if(e.key==='Escape'){e.preventDefault();menu.open=false;summary.focus();}if(e.key==='Tab'){const items=[summary,...menu.querySelectorAll('nav a[href],nav button:not(:disabled)')];const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
});

/* v1.3 · Keep the current sidebar item in view. Scrolls only the sidebar's own
   scroll container (never the window), instantly, roughly centred. The position
   is remembered per tab and per sidebar (portal) in sessionStorage so the rail does not jump between pages. */
(function(){
 const KEY=n=>'triox-rail-scroll:'+(n.getAttribute('aria-label')||'rail');
 const visibleNav=()=>[...document.querySelectorAll('.rail nav')].filter(n=>n.offsetParent!==null&&n.clientHeight>0);
 const activeIn=n=>n.querySelector('.navitem[aria-current="page"]')||n.querySelector('.navitem.active');
 function set(n,top){const b=n.style.scrollBehavior;n.style.scrollBehavior='auto';n.scrollTop=Math.max(0,Math.min(top,n.scrollHeight-n.clientHeight));n.style.scrollBehavior=b;}
 function fits(n,a){const nr=n.getBoundingClientRect(),ar=a.getBoundingClientRect();return ar.top>=nr.top+8&&ar.bottom<=nr.bottom-8;}
 function centre(n){const a=activeIn(n);if(!a||!n.clientHeight)return;const nr=n.getBoundingClientRect(),ar=a.getBoundingClientRect();set(n,n.scrollTop+(ar.top-nr.top)-(n.clientHeight-ar.height)/2);}
 function keep(n,useSaved){const a=activeIn(n);if(!a||!n.clientHeight)return;if(useSaved){let s=null;try{s=sessionStorage.getItem(KEY(n));}catch(e){}if(s!==null){set(n,+s);if(fits(n,a))return;}}if(!fits(n,a))centre(n);}
 function save(n){try{sessionStorage.setItem(KEY(n),String(Math.round(n.scrollTop)));}catch(e){}}
 function run(useSaved){const x=window.scrollX,y=window.scrollY;visibleNav().forEach(n=>keep(n,useSaved));if(window.scrollX!==x||window.scrollY!==y)window.scrollTo(x,y);}
 window.trioxKeepActiveNav=run;
 document.querySelectorAll('.rail nav').forEach(n=>{n.addEventListener('click',e=>{if(e.target.closest('a'))save(n);});});
 window.addEventListener('pagehide',()=>visibleNav().forEach(save));
 /* mobile / tablet drawer: centre the current item each time it opens */
 document.querySelectorAll('.mobile-menu').forEach(m=>m.addEventListener('toggle',()=>{if(!m.open)return;const n=m.querySelector('nav');if(!n)return;requestAnimationFrame(()=>{const a=activeIn(n);if(a&&!fits(n,a))centre(n);});}));
 run(true);
 if(document.readyState!=='complete')window.addEventListener('load',()=>run(false),{once:true});
})();
