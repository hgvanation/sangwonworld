/* ===== PAGE: home — main banner, profile, update post, fanbase post, notice ===== */
SW.pages.home = () => {
  const p=SW.profile, post=(x,img)=>`<a class="card link" href="${x.link||'#'}" style="display:block">${img&&x.img?`<img src="${x.img}" alt="" style="border-radius:10px;margin-bottom:10px;aspect-ratio:4/3;object-fit:cover;width:100%">`:''}<div class="muted" style="font-size:13px">${x.date}</div><h3>${SW.esc(SW.t(x.title))}</h3></a>`;
  const notices=[...SW.notices].sort((a,b)=>(b.pin?1:0)-(a.pin?1:0)||b.date.localeCompare(a.date));
  return `<div class="wrap">${SW.carousel(SW.banners)}
  <section class="two"><div class="card profile"><img src="${p.img}" alt=""><div><h2>${SW.ui_('profileTitle')}</h2><dl class="kv">${p.fields.slice(0,3).map(f=>`<dt>${SW.esc(SW.t(f.k))}</dt><dd>${SW.esc(f.v)}</dd>`).join('')}</dl><p style="margin-top:14px"><a class="btn" href="#/about/profile">→</a></p></div></div>
  <div class="card"><h2>${SW.ui_('notice')}</h2>${notices.map(n=>`<div class="row"><span>${n.pin?'<span class="pill pin">PIN</span>':''}${SW.esc(SW.t(n.title))}</span><span class="muted">${n.date}</span></div>`).join('')}</div></section>
  <section><h2>${SW.ui_('updates')}</h2><div class="grid">${SW.updates.map(x=>post(x,1)).join('')}</div></section>
  <section><h2>${SW.ui_('fan')}</h2><div class="grid">${SW.fanposts.map(x=>post(x)).join('')}</div></section></div>`;
};
