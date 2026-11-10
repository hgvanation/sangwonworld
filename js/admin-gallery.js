/* ===== ADMIN GALLERY: upload hàng loạt + quản lý cây hạng mục (chỉ admin thấy) ===== */
const slug = s => (s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'m')+'-'+Math.random().toString(36).slice(2,6);
const modal = (html) => { document.getElementById('adm-modal')?.remove(); const m=document.createElement('div'); m.id='adm-modal'; m.innerHTML=`<div class="adm-box">${html}</div>`; document.body.appendChild(m); return m; };

/* ---------- UPLOAD ---------- */
SW.openUpload = () => {
  const m = modal(`<h3>Upload ảnh vào gallery</h3>
    <div class="chips-label">Hạng mục (chọn từ lớn xuống nhỏ)</div><div id="up-path" class="adm-row"></div>
    <div class="adm-row"><select id="up-era"><option value="">— Comeback/giai đoạn —</option>${SW.galleryTree.eras.map(e=>`<option value="${e.id}">${SW.esc(e.label)}</option>`).join('')}</select>
      <input id="up-year" type="number" style="width:90px" placeholder="Năm" value="${new Date().getFullYear()}"><input id="up-src" placeholder="Nguồn"><input id="up-cr" placeholder="Credit"><input id="up-tags" placeholder="Tag (a, b, c)"></div>
    <textarea id="up-content" style="min-height:90px" class="adm-ta2" placeholder="Nội dung đi kèm (áp dụng cho tất cả ảnh lần này; để trống nếu không cần — sửa riêng từng ảnh sau)"></textarea>
    <div class="adm-up"><input type="file" id="up-files" accept="image/*" multiple></div><p id="adm-msg" class="muted"></p>
    <div class="adm-row"><button class="btn" id="up-go">Bắt đầu upload</button><button class="btn ghost" id="adm-x">Đóng</button></div>`);
  const $=id=>document.getElementById(id), msg=t=>$('adm-msg').textContent=t;
  let path=[SW._gcat, ...SW.gf.path];
  const drawPath = () => { let node=null, html='', arr=SW.galleryTree.cats;      // mỗi cấp 1 ô chọn
    for(let i=0;;i++){ const sel=path[i]; if(i>0 && !(node.children&&node.children.length)) break;
      const opts = i===0 ? arr : node.children; html+=`<select data-i="${i}">${i>0?'<option value="">— dừng ở đây —</option>':''}${opts.map(o=>`<option value="${o.id}" ${o.id===sel?'selected':''}>${SW.esc(o.label)}</option>`).join('')}</select>`;
      node = opts.find(o=>o.id===sel); if(!node) break; }
    $('up-path').innerHTML=html; $('up-path').querySelectorAll('select').forEach(s=>s.onchange=()=>{ path=path.slice(0,+s.dataset.i); if(s.value) path.push(s.value); drawPath(); }); };
  path = path.filter(Boolean); drawPath(); $('adm-x').onclick=()=>m.remove();
  $('up-go').onclick = async () => {
    const files=[...$('up-files').files]; if(!files.length) return msg('Chưa chọn ảnh.');
    const era=$('up-era').value, year=+$('up-year').value||0, tags=$('up-tags').value.split(',').map(s=>s.trim()).filter(Boolean);
    let done=0, fail=0, i=0; $('up-go').disabled=true;
    const worker = async () => { while(i<files.length){ const f=files[i++];
      try{ const url=await SW.cloudUpload(f);
        await SW.db.collection('photos').add({ url, title:f.name.replace(/\.[^.]+$/,''), content:$('up-content').value.trim(), path, era, year, tags,
          source:$('up-src').value, credit:$('up-cr').value, keys:SW.mkKeys(path,era,year), at:firebase.firestore.FieldValue.serverTimestamp(), by:SW.user.email }); done++;
      }catch(e){ fail++; console.warn(f.name,e.message); msg('Lỗi: '+e.message); }
      msg(`Đã xong ${done}/${files.length}${fail?` · lỗi ${fail}`:''}`); } };
    await Promise.all([worker(),worker(),worker()]);      // 3 ảnh song song
    $('up-go').disabled=false; msg(`Hoàn tất: ${done} ảnh${fail?`, lỗi ${fail}`:''} ✔`); SW.galReset();
  };
};

/* ---------- QUẢN LÝ HẠNG MỤC ---------- */
SW.openTree = () => {
  const T = JSON.parse(JSON.stringify(SW.galleryTree));
  const m = modal(`<h3>Quản lý hạng mục gallery</h3><p class="muted" style="font-size:13px">Đổi tên không ảnh hưởng ảnh cũ. Xoá hạng mục không xoá ảnh (ảnh vẫn nằm ở hạng mục cha).</p><div id="tr" style="overflow:auto;flex:1"></div><p id="adm-msg" class="muted"></p>
    <div class="adm-row"><button class="btn" id="tr-save">Lưu</button><button class="btn ghost" id="adm-x">Đóng</button></div>`);
  const $=id=>document.getElementById(id), find=(arr,id)=>{ for(const n of arr){ if(n.id===id) return {n,arr}; const r=find(n.children||[],id); if(r) return r; } };
  const li = (n,d) => `<div class="tr-row" style="padding-left:${d*22}px"><span>${d?'└ ':''}${SW.esc(n.label)}</span><span class="adm-row"><button class="chip" data-a="add" data-id="${n.id}">＋ con</button><button class="chip" data-a="ren" data-id="${n.id}">✏️</button><button class="chip" data-a="del" data-id="${n.id}">🗑</button></span></div>${(n.children||[]).map(c=>li(c,d+1)).join('')}`;
  const draw = () => { $('tr').innerHTML = `<h4>Hạng mục</h4>${T.cats.map(c=>li(c,0)).join('')}<p><button class="chip" data-a="addtop">＋ Hạng mục lớn</button></p>
    <h4 style="margin-top:16px">Comeback / giai đoạn</h4>${T.eras.map(e=>`<div class="tr-row"><span>${SW.esc(e.label)}</span><span class="adm-row"><button class="chip" data-a="eren" data-id="${e.id}">✏️</button><button class="chip" data-a="edel" data-id="${e.id}">🗑</button></span></div>`).join('')}<p><button class="chip" data-a="eadd">＋ Comeback / giai đoạn</button></p>`;
    $('tr').querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>act(b.dataset.a,b.dataset.id)); };
  const act = (a,id) => { let v;
    if(a==='addtop'){ v=prompt('Tên hạng mục lớn'); if(v) T.cats.push({id:slug(v),label:v,children:[]}); }
    if(a==='add'){ v=prompt('Tên hạng mục con'); if(v){ const n=find(T.cats,id).n; (n.children=n.children||[]).push({id:slug(v),label:v,children:[]}); } }
    if(a==='ren'){ const r=find(T.cats,id); v=prompt('Tên mới',r.n.label); if(v) r.n.label=v; }
    if(a==='del'){ const r=find(T.cats,id); if(confirm(`Xoá "${r.n.label}" và các mục con?`)) r.arr.splice(r.arr.indexOf(r.n),1); }
    if(a==='eadd'){ v=prompt('Tên comeback / giai đoạn'); if(v) T.eras.push({id:slug(v),label:v}); }
    if(a==='eren'){ const e=T.eras.find(x=>x.id===id); v=prompt('Tên mới',e.label); if(v) e.label=v; }
    if(a==='edel'){ if(confirm('Xoá mục này khỏi bộ lọc?')) T.eras=T.eras.filter(x=>x.id!==id); }
    draw(); };
  draw(); $('adm-x').onclick=()=>m.remove();
  $('tr-save').onclick = async () => { try{
    await SW.db.collection('content').doc('galleryTree').set({json:JSON.stringify(T),by:SW.user.email,at:firebase.firestore.FieldValue.serverTimestamp()});
    SW.galleryTree=T; SW.syncGalleryNav(); $('adm-msg').textContent='Đã lưu ✔'; SW.render(1);
  }catch(e){ $('adm-msg').textContent='Lỗi: '+e.message; } };
};
