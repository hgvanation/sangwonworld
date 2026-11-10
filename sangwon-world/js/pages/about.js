/* ===== PAGES: moments, profile, discography, awards ===== */
SW.pages.moments = (sub) => {
  const types=SW.momentTypes, cur=sub||'all', list=SW.moments.filter(m=>cur==='all'||m.type===cur);
  SW._sub=null;
  setTimeout(()=>document.querySelectorAll('[data-mt]').forEach(b=>b.onclick=()=>{location.hash='#/about/moments/'+b.dataset.mt}));
  return `<div class="wrap"><h1>${SW.esc(SW.t(SW.find('moments').label))}</h1><br>
  <div class="chips"><button class="chip ${cur==='all'?'on':''}" data-mt="all">${SW.ui_('all')}</button>${types.map(t=>`<button class="chip ${cur===t.id?'on':''}" data-mt="${t.id}">${SW.esc(SW.t(t.l))}</button>`).join('')}</div>
  ${list.length?`<div class="grid">${list.map(m=>`<div class="card"><img src="${m.img}" alt="" style="border-radius:10px;aspect-ratio:4/3;object-fit:cover;width:100%;margin-bottom:10px"><span class="pill">${SW.esc(SW.t(types.find(t=>t.id===m.type)?.l))}</span><h3>${SW.esc(SW.t(m.title))}</h3><p class="muted">${SW.esc(SW.t(m.note))} · ${m.date}</p></div>`).join('')}</div>`:SW.empty()}</div>`;
};
SW.pages.profile = () => { const p=SW.profile; return `<div class="wrap"><h1>${p.name}</h1><br><div class="card profile"><img src="${p.img}" alt=""><div><dl class="kv">${p.fields.map(f=>`<dt>${SW.esc(SW.t(f.k))}</dt><dd>${SW.esc(f.v)}</dd>`).join('')}</dl></div></div><section><h2>TMI</h2><div class="card">${p.tmi.map(t=>`<p>• ${SW.esc(SW.t(t))}</p>`).join('')}</div></section></div>`; };
SW.pages.discography = (sub) => { const node=SW.find('discography'), cur=sub||node.subs[0].id, list=SW.discography.filter(d=>d.sub===cur).sort((a,b)=>b.date.localeCompare(a.date));
  return `<div class="wrap"><h1>${SW.esc(SW.t(node.label))}</h1><br>${SW.tabs('about/discography',node.subs,cur)}${list.length?`<div class="grid">${list.map(d=>`<a class="card link" href="${d.link}" target="_blank" rel="noopener"><img src="${d.cover}" alt="" style="border-radius:10px;aspect-ratio:1;object-fit:cover;width:100%;margin-bottom:10px"><h3>${SW.esc(d.title)}</h3><p class="muted">${d.type} · ${d.date}</p></a>`).join('')}</div>`:SW.empty()}</div>`; };
SW.pages.awards = (sub) => { const node=SW.find('awards'), cur=sub||node.subs[0].id, list=SW.awards.filter(a=>a.sub===cur).sort((a,b)=>b.year-a.year);
  return `<div class="wrap"><h1>${SW.esc(SW.t(node.label))}</h1><br>${SW.tabs('about/awards',node.subs,cur)}<div class="card">${list.length?list.map(a=>`<div class="row"><div><h3>${SW.esc(a.award)}</h3><span class="muted">${SW.esc(a.show)} ${SW.esc(a.note)}</span></div><b>${a.year}</b></div>`).join(''):SW.empty()}</div></div>`; };
