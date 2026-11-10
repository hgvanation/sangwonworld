/* ===== PAGES: moments (collage), profile (chiến dịch thời trang), discography, awards ===== */
SW.pages.moments = (sub) => {
  const types=SW.momentTypes, cur=sub||'all', list=SW.moments.filter(m=>cur==='all'||m.type===cur);
  SW._sub=null;
  setTimeout(()=>document.querySelectorAll('[data-mt]').forEach(b=>b.onclick=()=>{location.hash='#/about/moments/'+b.dataset.mt}));
  return `<div class="wrap">${SW.ph(SW.t(SW.find('moments').label))}
  <div class="chips"><button class="chip ${cur==='all'?'on':''}" data-mt="all">${SW.ui_('all')}</button>${types.map(t=>`<button class="chip ${cur===t.id?'on':''}" data-mt="${t.id}">${SW.esc(SW.t(t.l))}</button>`).join('')}</div>
  ${list.length?`<div class="collage">${list.map((m,i)=>`<div class="card mo" data-k="${i%5}"><span class="no">${String(i+1).padStart(2,'0')}</span><img src="${m.img}" alt="" loading="lazy"><span class="pill">${SW.esc(SW.t(types.find(t=>t.id===m.type)?.l))}</span><h3>${SW.esc(SW.t(m.title))}</h3><p class="meta">${SW.esc(SW.t(m.note))} · ${m.date}</p></div>`).join('')}</div>`:SW.empty()}</div>`;
};
SW.pages.profile = () => { const p=SW.profile;
  return `<div class="wrap">${SW.ph(p.name)}
  <div class="camp"><div class="camp-img"><img src="${p.img}" alt=""></div>
    <div class="camp-info"><div class="card"><dl class="kv">${p.fields.map(f=>`<dt>${SW.esc(SW.t(f.k))}</dt><dd>${SW.esc(f.v)}</dd>`).join('')}</dl></div></div></div>
  <section class="tmi"><h2>TMI</h2><ol>${p.tmi.map((t,i)=>`<li><b>${String(i+1).padStart(2,'0')}</b><span>${SW.esc(SW.t(t))}</span></li>`).join('')}</ol></section></div>`; };
SW.pages.discography = (sub) => { const node=SW.find('discography'), cur=sub||node.subs[0].id, list=SW.discography.filter(d=>d.sub===cur).sort((a,b)=>b.date.localeCompare(a.date));
  return `<div class="wrap">${SW.ph(SW.t(node.label))}${SW.tabs('about/discography',node.subs,cur)}${list.length?`<div class="mag disc">${list.map(d=>`<a class="card link" href="${d.link}" target="_blank" rel="noopener"><img src="${d.cover}" alt="" loading="lazy"><h3>${SW.esc(d.title)}</h3><p class="meta">${d.type} · ${d.date}</p></a>`).join('')}</div>`:SW.empty()}</div>`; };
SW.pages.awards = (sub) => { const node=SW.find('awards'), cur=sub||node.subs[0].id, list=SW.awards.filter(a=>a.sub===cur).sort((a,b)=>b.year-a.year);
  return `<div class="wrap">${SW.ph(SW.t(node.label))}${SW.tabs('about/awards',node.subs,cur)}<div class="card">${list.length?list.map(a=>`<div class="awd"><div class="yr">${a.year}</div><div><h3>${SW.esc(a.award)}</h3><span class="meta">${SW.esc(a.show)} ${SW.esc(a.note)}</span></div></div>`).join(''):SW.empty()}</div></div>`; };
