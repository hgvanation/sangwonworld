/* ===== PAGE: gallery — tab (SNS/Magazine/Other) + lọc theo comeback, loại, năm, từ khoá ===== */
SW.gf = { era:'all', sub:'all', year:'all', q:'' };   // trạng thái bộ lọc
SW.pages.gallery = (cat) => {
  const node=SW.find('gallery'); cat=cat||node.subs[0].id;
  if(SW._gcat!==cat){ SW._gcat=cat; SW.gf={era:'all',sub:'all',year:'all',q:''}; }
  const all=SW.gallery.filter(g=>g.cat===cat), subs=SW.gallerySubs[cat]||[];
  const years=[...new Set(all.map(g=>g.year))].sort((a,b)=>b-a), f=SW.gf;
  const list=all.filter(g=>(f.era==='all'||g.era===f.era)&&(f.sub==='all'||g.sub===f.sub)&&(f.year==='all'||String(g.year)===String(f.year))&&(!f.q||(g.title+g.tags.join(' ')+g.source).toLowerCase().includes(f.q.toLowerCase())));
  const chips=(key,label,opts)=>`<div class="chips-label">${label}</div><div class="chips"><button class="chip ${f[key]==='all'?'on':''}" data-k="${key}" data-v="all">${SW.ui_('all')}</button>${opts.map(o=>`<button class="chip ${String(f[key])===String(o.id)?'on':''}" data-k="${key}" data-v="${o.id}">${SW.esc(o.l)}</button>`).join('')}</div>`;
  setTimeout(()=>{
    document.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{SW.gf[b.dataset.k]=b.dataset.v;SW.render(1)});
    const q=document.getElementById('gq'); if(q){q.oninput=()=>{SW.gf.q=q.value;clearTimeout(SW._gt);SW._gt=setTimeout(()=>{SW.render(1);const n=document.getElementById('gq');n.focus();n.setSelectionRange(99,99)},250)}}
    document.querySelectorAll('.masonry figure').forEach(fg=>fg.onclick=()=>SW.lightbox(fg.dataset.src,fg.dataset.cap));
  });
  return `<div class="wrap"><h1>${SW.esc(SW.t(node.label))}</h1><br>${SW.tabs('about/gallery',node.subs,cat)}
  <input id="gq" class="search" placeholder="${SW.ui_('search')}" value="${SW.esc(f.q)}">
  ${chips('era',SW.ui_('era'),SW.eras.map(e=>({id:e.id,l:SW.t(e.l)})))}
  ${subs.length?chips('sub',SW.ui_('type'),subs.map(s=>({id:s.id,l:SW.t(s.l)}))):''}
  ${years.length>1?chips('year',SW.ui_('year'),years.map(y=>({id:y,l:y}))):''}
  <p class="muted" style="margin-bottom:14px">${list.length} / ${all.length}</p>
  ${list.length?`<div class="masonry">${list.map(g=>`<figure data-src="${g.img}" data-cap="${SW.esc(g.title+' · '+g.credit)}"><img src="${g.img}" alt="${SW.esc(g.title)}" loading="lazy"><figcaption>${SW.esc(g.title)}<br><span class="pill">${SW.esc(SW.t(SW.eras.find(e=>e.id===g.era)?.l))}</span><span class="pill">${g.year}</span></figcaption></figure>`).join('')}</div>`:SW.empty()}</div>`;
};
