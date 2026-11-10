/* ===== ADMIN (chung): nút chỉnh sửa JSON cho các mục + hàm upload Cloudinary =====
   Thêm trang cho phép sửa JSON: thêm vào SW.editKeys { tên-trang: [tên biến SW.xxx] }
   Gallery dùng công cụ riêng: js/admin-gallery.js */
SW.editKeys = {
  home:['banners','updates','fanposts','notices'], profile:['profile'], moments:['moments'],
  discography:['discography'], awards:['awards'],
  streaming:['streaming'], voting:['voting'], trending:['trending'], project:['projects'], schedule:['schedule'],
};
SW._defaults = {};
Object.values(SW.editKeys).flat().forEach(k => SW._defaults[k] = JSON.parse(JSON.stringify(SW[k])));

/* Upload 1 ảnh lên Cloudinary → trả về link gốc (secure_url) */
SW.cloudUpload = async (file) => {
  const C = window.SW_CLOUDINARY||{}; if(!C.cloudName||!C.uploadPreset) throw new Error('Chưa điền SW_CLOUDINARY trong js/firebase-config.js');
  const fd = new FormData(); fd.append('file',file); fd.append('upload_preset',C.uploadPreset);
  const j = await (await fetch(`https://api.cloudinary.com/v1_1/${C.cloudName}/image/upload`,{method:'POST',body:fd})).json();
  if(!j.secure_url) throw new Error(j.error?.message||'Upload lỗi'); return j.secure_url;
};
SW.fab = (items) => { document.getElementById('adm-btn')?.remove(); const d=document.createElement('div'); d.id='adm-btn';
  items.forEach(([t,fn,ghost])=>{ const b=document.createElement('button'); b.className='btn'+(ghost?' ghost':''); b.textContent=t; b.onclick=fn; d.appendChild(b); }); document.body.appendChild(d); };

SW.mountAdmin = (page) => {
  document.getElementById('adm-btn')?.remove();
  if(!SW.isAdmin() || !SW.db) return;
  if(page==='gallery') return SW.fab([['📤 Upload ảnh',()=>SW.openUpload()],['🗂 Quản lý hạng mục',()=>SW.openTree(),1]]);
  const keys = SW.editKeys[page]; if(keys) SW.fab([['✏️ Chỉnh sửa trang này',()=>SW.openEditor(keys)]]);
};
SW.openEditor = (keys) => {
  document.getElementById('adm-modal')?.remove();
  const m = document.createElement('div'); m.id='adm-modal';
  m.innerHTML = `<div class="adm-box"><h3>Chỉnh sửa nội dung (JSON)</h3>
    <select id="adm-key">${keys.map(k=>`<option>${k}</option>`).join('')}</select>
    <div class="adm-up"><b>📤 Upload ảnh</b> <input type="file" id="adm-file" accept="image/*" multiple>
      <p class="muted" style="font-size:13px">Upload xong link ảnh được chèn vào ô JSON tại vị trí con trỏ, rồi bấm Lưu.</p></div>
    <textarea id="adm-ta" spellcheck="false"></textarea><p id="adm-msg" class="muted"></p>
    <div class="adm-row"><button class="btn" id="adm-save">Lưu</button><button class="btn ghost" id="adm-reset">Khôi phục mặc định</button><button class="btn ghost" id="adm-x">Đóng</button></div></div>`;
  document.body.appendChild(m);
  const $ = id => document.getElementById(id), msg = t => $('adm-msg').textContent = t;
  const save = async (k,val) => { await SW.db.collection('content').doc(k).set({ json:JSON.stringify(val), by:SW.user.email, at:firebase.firestore.FieldValue.serverTimestamp() }); SW[k]=val; SW.render(1); };
  const load = () => $('adm-ta').value = JSON.stringify(SW[$('adm-key').value], null, 2);
  $('adm-key').onchange = load; load(); $('adm-x').onclick = () => m.remove();
  $('adm-file').onchange = async (e) => { const files=[...e.target.files], urls=[]; if(!files.length) return;
    try{ for(let i=0;i<files.length;i++){ msg(`Đang upload ${i+1}/${files.length}…`); urls.push((await SW.cloudUpload(files[i])).replace('/upload/','/upload/f_auto,q_auto,w_1600/')); }
      const ta=$('adm-ta'); ta.setRangeText(urls.map(u=>JSON.stringify(u)).join(',\n'),ta.selectionStart,ta.selectionEnd,'end'); msg('Đã chèn link ảnh vào ô JSON — nhớ bấm Lưu');
    }catch(err){ msg('Lỗi: '+err.message); } e.target.value=''; };
  $('adm-save').onclick = async () => { const k=$('adm-key').value; let val;
    try{ val = JSON.parse($('adm-ta').value); }catch(e){ return msg('JSON sai cú pháp: '+e.message); }
    try{ await save(k,val); msg('Đã lưu ✔'); }catch(e){ msg('Lỗi lưu (bạn có phải admin trong firestore.rules?): '+e.message); } };
  $('adm-reset').onclick = async () => { const k=$('adm-key').value; if(!confirm('Xoá bản đã sửa của "'+k+'" và dùng lại dữ liệu mặc định?')) return;
    try{ await SW.db.collection('content').doc(k).delete(); SW[k]=JSON.parse(JSON.stringify(SW._defaults[k])); load(); SW.render(1); msg('Đã khôi phục ✔'); }catch(e){ msg('Lỗi: '+e.message); } };
};
