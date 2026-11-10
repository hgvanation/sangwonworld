/* ===== CORE: hàm dùng chung, header, ngôn ngữ, đăng nhập, lightbox ===== */
SW.lang = localStorage.getItem('sw_lang') || 'vi';
SW.t = o => (o && typeof o==='object') ? (o[SW.lang]||o.en||o.vi||'') : (o||'');
SW.ui_ = k => SW.t(SW.ui[k]);
SW.esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
SW.find = id => { for(const n of SW.nav){ if(n.id===id) return n; for(const c of n.children||[]) if(c.id===id) return c; } };
SW.tabs = (base,subs,cur) => `<nav class="tabs">${subs.map(s=>`<a href="#/${base}/${s.id}" class="${s.id===cur?'on':''}">${SW.esc(SW.t(s.label))}</a>`).join('')}</nav>`;
SW.empty = () => `<div class="empty">${SW.ui_('noresult')}</div>`;
SW.fmtDate = d => d;

/* --- Đăng nhập: xem js/auth.js (SW.user, SW.signIn, SW.signOut, SW.isAdmin) --- */
SW.user = null;

/* --- Header + dropdown --- */
SW.renderHeader = () => {
  const items = SW.nav.map(n => {
    const dd = n.children ? `<div class="dd">${n.children.map(c=>`<a href="#/${n.id}/${c.id}"><span>${c.icon||''}</span>${SW.esc(SW.t(c.label))}</a>`).join('')}</div>` : '';
    return `<li><a href="#/${n.id}">${SW.esc(SW.t(n.label))}${n.children?'<span class="car">▾</span>':''}</a>${dd}</li>`;
  }).join('');
  const tk = ['Sangwon World', ...SW.nav.map(n=>SW.t(n.label))].map(t=>`<span>${SW.esc(t)}</span>`).join('').repeat(8);
  const ticker = `<div class="ticker" aria-hidden="true"><div class="tk">${tk}</div></div>`;
  document.getElementById('hdr').innerHTML = `<div class="top">
    <a class="logo" href="#/home">Sangwon <b>World</b></a>
    <ul class="nav" id="nav"><li><a href="#/home">Home</a></li>${items}</ul>
    <div class="tools">
      <button class="btn ghost" id="lang">🌐 ${SW.lang.toUpperCase()}</button>
      ${SW.user?`<button class="btn ghost" id="out">${SW.esc(SW.user.name)}${SW.isAdmin()?' ★':''} · ${SW.ui_('signout')}</button>`:''}
      <button class="btn ghost burger" id="bg">☰</button>
    </div></div>${ticker}`;
  const $=id=>document.getElementById(id);
  $('lang').onclick=()=>{const i=SW.langs.indexOf(SW.lang);SW.lang=SW.langs[(i+1)%SW.langs.length];localStorage.setItem('sw_lang',SW.lang);document.documentElement.lang=SW.lang;SW.renderHeader();SW.render(1);};
  if($('out'))$('out').onclick=SW.signOut;   // khách không có nút đăng nhập; admin vào bằng link 'Admin' ở chân trang
  $('bg').onclick=()=>$('nav').classList.toggle('show');
};

/* --- Lightbox --- */
SW.lightbox = (src,cap) => { let el=document.getElementById('lb'); if(!el){el=document.createElement('div');el.id='lb';el.className='lb';el.onclick=()=>el.classList.remove('show');document.body.appendChild(el);}
  el.innerHTML=`<img src="${src}" alt=""><div class="muted">${SW.esc(cap||'')}</div>`; el.classList.add('show'); };
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.getElementById('lb')?.classList.remove('show')});

/* --- Banner carousel --- */
SW.carousel = (slides) => {
  setTimeout(()=>{ const root=document.getElementById('bn'); if(!root) return; const s=[...root.querySelectorAll('.s')]; let i=0;
    const go=n=>{s[i].classList.remove('on');i=(n+s.length)%s.length;s[i].classList.add('on')};
    root.querySelector('.l').onclick=()=>go(i-1); root.querySelector('.r').onclick=()=>go(i+1);
    clearInterval(SW._cy); SW._cy=setInterval(()=>document.getElementById('bn')?go(i+1):clearInterval(SW._cy),5000); });
  return `<div class="banner" id="bn">${slides.map((b,k)=>`<a class="s ${k?'':'on'}" href="${b.link||'#'}" style="background-image:url('${b.img}')"><div class="cap"><h1>${SW.esc(SW.t(b.title))}</h1><p class="muted">${SW.esc(SW.t(b.sub))}</p></div></a>`).join('')}<button class="arr l">‹</button><button class="arr r">›</button></div>`;
};
SW.ph = (t) => `<header class="ph"><h1>${SW.esc(t)}</h1></header>`;   /* đầu trang kiểu tạp chí */
