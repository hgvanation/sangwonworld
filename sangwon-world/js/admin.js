/* ===== ADMIN: nút "Chỉnh sửa trang này" (chỉ hiện khi đăng nhập bằng email admin) =====
   Thêm trang cho phép sửa: thêm vào SW.editKeys  { tên-trang: [tên biến dữ liệu SW.xxx] } */
SW.editKeys = {
  home:['banners','updates','fanposts','notices'], profile:['profile'], moments:['moments'],
  discography:['discography'], awards:['awards'], gallery:['gallery'],
  streaming:['streaming'], voting:['voting'], trending:['trending'], project:['projects'], schedule:['schedule'],
};
SW._defaults = {};  // bản gốc trong file data/*.js, dùng cho nút "Khôi phục mặc định"
Object.values(SW.editKeys).flat().forEach(k => SW._defaults[k] = JSON.parse(JSON.stringify(SW[k])));

SW.mountAdmin = (page) => {
  document.getElementById('adm-btn')?.remove();
  const keys = SW.editKeys[page]; if(!keys || !SW.isAdmin() || !SW.db) return;
  const b = document.createElement('button'); b.id='adm-btn'; b.className='btn'; b.textContent='✏️ Chỉnh sửa trang này';
  b.onclick = () => SW.openEditor(keys); document.body.appendChild(b);
};
SW.openEditor = (keys) => {
  document.getElementById('adm-modal')?.remove();
  const m = document.createElement('div'); m.id='adm-modal';
  m.innerHTML = `<div class="adm-box"><h3>Chỉnh sửa nội dung (JSON)</h3>
    <select id="adm-key">${keys.map(k=>`<option>${k}</option>`).join('')}</select>
    <textarea id="adm-ta" spellcheck="false"></textarea><p id="adm-msg" class="muted"></p>
    <div class="adm-row"><button class="btn" id="adm-save">Lưu</button><button class="btn ghost" id="adm-reset">Khôi phục mặc định</button><button class="btn ghost" id="adm-x">Đóng</button></div></div>`;
  document.body.appendChild(m);
  const $ = id => document.getElementById(id), msg = t => $('adm-msg').textContent = t;
  const load = () => $('adm-ta').value = JSON.stringify(SW[$('adm-key').value], null, 2);
  $('adm-key').onchange = load; load();
  $('adm-x').onclick = () => m.remove();
  $('adm-save').onclick = async () => {
    const k = $('adm-key').value; let val;
    try{ val = JSON.parse($('adm-ta').value); }catch(e){ return msg('JSON sai cú pháp: '+e.message); }
    try{ await SW.db.collection('content').doc(k).set({ json:JSON.stringify(val), by:SW.user.email, at:firebase.firestore.FieldValue.serverTimestamp() });
      SW[k] = val; msg('Đã lưu ✔'); SW.render(1); }catch(e){ msg('Lỗi lưu (bạn có phải admin trong firestore.rules?): '+e.message); }
  };
  $('adm-reset').onclick = async () => {
    const k = $('adm-key').value; if(!confirm('Xoá bản đã sửa của "'+k+'" và dùng lại dữ liệu mặc định?')) return;
    try{ await SW.db.collection('content').doc(k).delete(); SW[k] = JSON.parse(JSON.stringify(SW._defaults[k])); load(); msg('Đã khôi phục ✔'); SW.render(1); }catch(e){ msg('Lỗi: '+e.message); }
  };
};
