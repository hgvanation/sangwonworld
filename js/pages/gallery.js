/* ===== PAGE: gallery — hạng mục nhiều cấp + comeback + năm + tìm kiếm + tải ảnh ===== */
SW.gf = { path:[], era:'', year:'' }; SW.gq = '';
SW.gal = { sig:'', items:[], last:null, done:false, loading:false, err:'' };
const PAGE = 48;   // số ảnh mỗi lần tải (giảm xuống nếu muốn tiết kiệm quota Firestore)
SW.thumb = (u,w) => u.includes('/upload/') ? u.replace('/upload/',`/upload/f_auto,q_auto,w_${w}/`) : u;
SW.dlUrl = u => u.includes('/upload/') ? u.replace('/upload/','/upload/fl_attachment/') : u;   // ép trình duyệt tải về
SW.tnode = (id, arr=SW.galleryTree.cats) => { for(const n of arr){ if(n.id===id) return n; const r=SW.tnode(id,n.children||[]); if(r) return r; } };
SW.syncGalleryNav = () => { SW.find('gallery').subs = SW.galleryTree.cats.map(c=>({id:c.id,label:{vi:c.label,en:c.label}})); };
SW.syncGalleryNav();
SW.galSig = () => [SW._gcat,SW.gf.path.join('/'),SW.gf.era,SW.gf.year].join('|');
SW.galReset = () => { Object.assign(SW.gal,{items:[],last:null,done:false,sig:SW.galSig()}); SW.galLoad(false); };
SW.galLoad = async (more) => {
  const g=SW.gal, f=SW.gf; if(g.loading) return; g.loading=true; g.err=''; SW.galDraw();
  const k = SW.qKey(f.path[f.path.length-1]||SW._gcat, f.era, f.year);
  try{
    if(SW.db){
      let q = SW.db.collection('photos').where('keys','array-contains',k).orderBy('at','desc').limit(PAGE);
      if(more && g.last) q = q.startAfter(g.last);
      const snap = await q.get();
      g.items = (more?g.items:[]).concat(snap.docs.map(d=>({id:d.id,...d.data()})));
      g.last = snap.docs[snap.docs.length-1] || g.last; g.done = snap.size < PAGE;
    } else { g.items = SW.galleryFallback.filter(p=>p.keys.includes(k)); g.done = true; }
  }catch(e){ g.err = e.message; }
  g.loading=false; SW.galDraw();
};
SW.galDraw = () => {
  const ctl=document.getElementById('gal-ctl'), gr=document.getElementById('gal-grid'); if(!ctl||!gr) return;
  const f=SW.gf, g=SW.gal, T=SW.galleryTree, esc=SW.esc; let node=SW.tnode(SW._gcat), rows='';
  for(let i=0; node && node.children && node.children.length; i++){      // mỗi cấp 1 hàng chip
    const sel=f.path[i];
    rows += `<div class="chips"><button class="chip ${sel?'':'on'}" data-lv="${i}" data-id="">${SW.ui_('all')}</button>${node.children.map(c=>`<button class="chip ${sel===c.id?'on':''}" data-lv="${i}" data-id="${c.id}">${esc(c.label)}</button>`).join('')}</div>`;
    node = node.children.find(c=>c.id===sel);
  }
  const yr=new Date().getFullYear(); let ys=''; for(let y=yr;y>=2015;y--) ys+=`<option ${String(f.year)===String(y)?'selected':''}>${y}</option>`;
  ctl.innerHTML = rows + `<div class="chips-label">${SW.ui_('era')}</div><div class="chips"><button class="chip ${f.era?'':'on'}" data-era="">${SW.ui_('all')}</button>${T.eras.map(e=>`<button class="chip ${f.era===e.id?'on':''}" data-era="${e.id}">${esc(e.label)}</button>`).join('')}<select id="gy" class="chip"><option value="">${SW.ui_('year')}: ${SW.ui_('all')}</option>${ys}</select></div>`;
  ctl.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{ f.path=f.path.slice(0,+b.dataset.lv).concat(b.dataset.id?[b.dataset.id]:[]); SW.galReset(); });
  ctl.querySelectorAll('[data-era]').forEach(b=>b.onclick=()=>{ f.era=b.dataset.era; SW.galReset(); });
  ctl.querySelector('#gy').onchange=e=>{ f.year=e.target.value; SW.galReset(); };
  const q=SW.gq.toLowerCase(), list=g.items.filter(p=>!q||((p.title||'')+' '+(p.content||'')+' '+(p.tags||[]).join(' ')).toLowerCase().includes(q));
  gr.innerHTML = (g.err ? `<div class="empty">⚠️ ${esc(g.err)}</div>` : list.length ? `<p class="muted" style="margin-bottom:12px">${list.length}</p><div class="masonry">${list.map(p=>`<figure data-id="${p.id}"><img src="${SW.thumb(p.url,480)}" alt="${esc(p.title)}" loading="lazy"><figcaption>${esc(p.title||'')}${p.content?`<br><span class="muted">${esc(p.content.slice(0,70))}${p.content.length>70?'…':''}</span>`:''}</figcaption></figure>`).join('')}</div>` : (g.loading?'<div class="empty">…</div>':SW.empty()))
    + (g.done||g.err||!g.items.length ? '' : `<p style="text-align:center;margin-top:16px"><button class="btn ghost" id="gmore">${g.loading?'…':'Tải thêm'}</button></p>`);
  gr.querySelectorAll('figure').forEach(fg=>fg.onclick=()=>SW.galOpen(fg.dataset.id));
  const m=gr.querySelector('#gmore'); if(m) m.onclick=()=>SW.galLoad(true);
};
/* Xem ảnh lớn: nội dung đi kèm + nút tải + (admin) sửa/xoá */
SW.galOpen = (id) => {
  const p=SW.gal.items.find(x=>x.id===id); if(!p) return; const esc=SW.esc;
  let el=document.getElementById('lb'); if(!el){ el=document.createElement('div'); el.id='lb'; el.className='lb'; document.body.appendChild(el); }
  el.onclick=()=>el.classList.remove('show');
  const crumbs=(p.path||[]).map(i=>SW.tnode(i)?.label||i).join(' › '), era=SW.galleryTree.eras.find(e=>e.id===p.era)?.label;
  el.innerHTML=`<div class="lbx" onclick="event.stopPropagation()"><img src="${SW.thumb(p.url,1600)}" alt="">
    <h3>${esc(p.title||'')}</h3>${p.content?`<p style="white-space:pre-wrap">${esc(p.content)}</p>`:''}
    <div>${crumbs?`<span class="pill">${esc(crumbs)}</span>`:''}${era?`<span class="pill">${esc(era)}</span>`:''}${p.year?`<span class="pill">${p.year}</span>`:''}${(p.tags||[]).map(t=>`<span class="pill">#${esc(t)}</span>`).join('')}</div>
    ${(p.source||p.credit)?`<p class="muted" style="font-size:13px">${esc(p.source||'')} ${p.credit?'· '+esc(p.credit):''}</p>`:''}
    <div class="adm-row"><a class="btn" href="${SW.dlUrl(p.url)}" download>⬇ Tải ảnh gốc</a><button class="btn ghost" id="lbx">✕</button>
    ${SW.isAdmin()?`<button class="btn ghost" id="lbe">✏️ Sửa</button><button class="btn ghost" id="lbd">🗑 Xoá</button>`:''}</div></div>`;
  el.classList.add('show');
  el.querySelector('#lbx').onclick=()=>el.classList.remove('show');
  if(SW.isAdmin()){
    el.querySelector('#lbe').onclick=async()=>{ const title=prompt('Tiêu đề',p.title||''); if(title===null) return; const content=prompt('Nội dung đi kèm (có thể để trống)',p.content||''); if(content===null) return;
      const tags=prompt('Tag (cách nhau bằng dấu phẩy)',(p.tags||[]).join(',')); if(tags===null) return;
      Object.assign(p,{title,content,tags:tags.split(',').map(s=>s.trim()).filter(Boolean)}); await SW.db.collection('photos').doc(id).update({title:p.title,content:p.content,tags:p.tags}); SW.galOpen(id); SW.galDraw(); };
    el.querySelector('#lbd').onclick=async()=>{ if(!confirm('Xoá ảnh này khỏi gallery? (file trên Cloudinary vẫn còn)')) return;
      await SW.db.collection('photos').doc(id).delete(); SW.gal.items=SW.gal.items.filter(x=>x.id!==id); el.classList.remove('show'); SW.galDraw(); };
  }
};
SW.pages.gallery = (cat) => {
  const node=SW.find('gallery'); cat=cat||node.subs[0].id;
  if(SW._gcat!==cat){ SW._gcat=cat; SW.gf={path:[],era:'',year:''}; }
  setTimeout(()=>{
    const q=document.getElementById('gq'); if(q) q.oninput=()=>{ SW.gq=q.value; SW.galDraw(); };
    if(SW.gal.sig!==SW.galSig()) SW.galReset(); else SW.galDraw();
  });
  return `<div class="wrap"><h1>${SW.esc(SW.t(node.label))}</h1><br>${SW.tabs('about/gallery',node.subs,cat)}
  <input id="gq" class="search" placeholder="${SW.ui_('search')}" value="${SW.esc(SW.gq)}">
  <div id="gal-ctl"></div><div id="gal-grid"></div></div>`;
};
