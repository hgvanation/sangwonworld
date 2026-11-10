/* ===== PAGE: home — bìa tạp chí: chữ khổng lồ + banner đè lên, hồ sơ, thông báo, bài mới (lưới lệch), fanbase (khối burgundy) ===== */
SW.pages.home = () => {
  const p=SW.profile, esc=SW.esc, pad=n=>String(n).padStart(2,'0');
  const post=(x,img)=>`<a class="card link post" href="${x.link||'#'}">${img&&x.img?`<div class="fr"><img src="${x.img}" alt="" loading="lazy"></div>`:''}<div class="meta">${x.date}</div><h3>${esc(SW.t(x.title))}</h3></a>`;
  const notices=[...SW.notices].sort((a,b)=>(b.pin?1:0)-(a.pin?1:0)||b.date.localeCompare(a.date));
  return `<div class="wrap">
  <div class="cover" aria-hidden="true"><span>${esc((SW.name||'Sangwon').split(' ')[0])}</span><i>© ${new Date().getFullYear()}</i></div>
  ${SW.carousel(SW.banners)}
  <section class="two"><div class="card profile"><img src="${p.img}" alt=""><div><div class="bigname">${esc(p.name)}</div><h2>${SW.ui_('profileTitle')}</h2><dl class="kv">${p.fields.slice(0,3).map(f=>`<dt>${esc(SW.t(f.k))}</dt><dd>${esc(f.v)}</dd>`).join('')}</dl><p style="margin-top:16px"><a class="btn" href="#/about/profile">→</a></p></div></div>
  <div class="card"><h2>${SW.ui_('notice')}</h2>${notices.map((n,i)=>`<div class="row"><span><span class="no">${pad(i+1)}</span> ${n.pin?'<span class="pill pin">PIN</span>':''}${esc(SW.t(n.title))}</span><span class="meta">${n.date}</span></div>`).join('')}</div></section>
  <div class="strip" aria-hidden="true"><div class="tk">${`<span>${esc(p.name)}</span>`.repeat(20)}</div></div>
  <section><h2>${SW.ui_('updates')}</h2><div class="mag">${SW.updates.map(x=>post(x,1)).join('')}</div></section>
  <section class="band"><h2>${SW.ui_('fan')}</h2><div class="grid">${SW.fanposts.map(x=>post(x)).join('')}</div></section></div>`;
};
