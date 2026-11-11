/* ===== ADMIN (chung): nút chỉnh sửa JSON cho các mục + hàm upload Cloudinary =====
   Thêm trang cho phép sửa JSON: thêm vào SW.editKeys { tên-trang: [tên biến SW.xxx] }
   Gallery dùng công cụ riêng: js/admin-gallery.js */
SW.editKeys = {
  home:['heroImages','banners','updates','fanposts','notices'], 
  profile:['profile'], 
  moments:['moments'],
  discography:['discography'], 
  awards:['awards'],
  streaming:['streaming'], 
  voting:['voting'], 
  trending:['trending'], 
  project:['projects'], 
  schedule:['schedule'],
};

SW._defaults = {};
Object.values(SW.editKeys).flat().forEach(k => SW._defaults[k] = JSON.parse(JSON.stringify(SW[k])));
SW._defaults.nav = JSON.parse(JSON.stringify(SW.nav));   // để nút "Khôi phục mặc định" của Quản lý menu hoạt động

/* Upload 1 ảnh lên Cloudinary → trả về link gốc (secure_url) */
SW.cloudUpload = async (file) => {
  const C = window.SW_CLOUDINARY||{}; 
  if(!C.cloudName||!C.uploadPreset) throw new Error('Chưa điền SW_CLOUDINARY trong js/firebase-config.js');
  const fd = new FormData(); 
  fd.append('file',file); 
  fd.append('upload_preset',C.uploadPreset);
  const j = await (await fetch(`https://api.cloudinary.com/v1_1/${C.cloudName}/image/upload`,{method:'POST',body:fd})).json();
  if(!j.secure_url) throw new Error(j.error?.message||'Upload lỗi'); 
  return j.secure_url;
};

SW.fab = (items) => { 
  document.getElementById('adm-btn')?.remove(); 
  const d=document.createElement('div'); 
  d.id='adm-btn';
  items.forEach(([t,fn,ghost])=>{ 
    const b=document.createElement('button'); 
    b.className='btn'+(ghost?' ghost':''); 
    b.textContent=t; 
    b.onclick=fn; 
    d.appendChild(b); 
  }); 
  document.body.appendChild(d); 
};

SW.mountAdmin = (page) => {
  document.getElementById('adm-btn')?.remove(); 
  document.body.classList.remove('has-adm');
  if(!SW.isAdmin() || !SW.db) return;
  const items = page==='gallery' ? [['📤 Upload ảnh',()=>SW.openUpload()],['🗂 Quản lý hạng mục',()=>SW.openTree(),1]]
    : (SW.editKeys[page] ? [['✏️ Chỉnh sửa trang này',()=>SW.openEditor(SW.editKeys[page])]] : []);
  items.push(['🧭 Quản lý menu',()=>SW.openNav(),1]);
  SW.fab(items); 
  document.body.classList.add('has-adm');   // has-adm: chừa chỗ ở chân trang để nút admin không che chữ
};

SW.openEditor = (keys) => {
  document.getElementById('adm-modal')?.remove();
  const m = document.createElement('div'); 
  m.id = 'adm-modal';
  
  m.innerHTML = `<div class="adm-box" style="max-width:850px; width:92%; max-height:90vh; display:flex; flex-direction:column; padding:20px; background:#18181c; color:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
    <h3 style="margin-top:0; margin-bottom:12px; font-size:18px;">Chỉnh sửa nội dung trang</h3>
    <div style="display:flex; gap:10px; align-items:center; margin-bottom:10px;">
      <label><b>Mục chỉnh sửa:</b></label>
      <select id="adm-key" style="background:#2b2b30; color:#fff; border:1px solid #444; padding:6px 12px; border-radius:6px; flex:1;">
        ${keys.map(k=>`<option>${k}</option>`).join('')}
      </select>
    </div>
    
    <div id="adm-form-container" style="flex:1; overflow-y:auto; padding-right:8px; margin:10px 0; border:1px solid #333; border-radius:8px; padding:12px; background:#0d0d11;"></div>
    
    <p id="adm-msg" class="muted" style="min-height:20px; color:#93c5fd; font-size:13px; margin:5px 0;"></p>
    <div class="adm-row" style="display:flex; gap:8px; justify-content:flex-end; flex-wrap:wrap;">
      <button class="btn" id="adm-save" style="padding:8px 16px;">💾 Lưu thay đổi</button>
      <button class="btn ghost" id="adm-toggle-mode" style="padding:8px 16px;">🔄 Bật gõ JSON thô</button>
      <button class="btn ghost" id="adm-reset" style="padding:8px 16px;">Khôi phục mặc định</button>
      <button class="btn ghost" id="adm-x" style="padding:8px 16px;">Đóng</button>
    </div>
  </div>`;
  
  document.body.appendChild(m);
  const $ = id => document.getElementById(id), msg = t => $('adm-msg').textContent = t;
  let rawMode = false;

  const save = async (k,val) => { 
    await SW.db.collection('content').doc(k).set({ 
      json: JSON.stringify(val), 
      by: SW.user.email, 
      at: firebase.firestore.FieldValue.serverTimestamp() 
    }); 
    SW[k] = val; 
    SW.render(1); 
  };

  // Render Form động phân cấp theo cấu trúc dữ liệu Object / Array
  const buildForm = (obj, path = '') => {
    if (typeof obj !== 'object' || obj === null) {
      return `<input class="adm-inp" data-path="${path}" value="${String(obj).replace(/"/g, '&quot;')}" style="width:100%; padding:6px 10px; background:#1e1e24; color:#fff; border:1px solid #333; border-radius:4px; box-sizing:border-box;"/>`;
    }
    
    let html = '<div style="margin-left:10px; border-left:2px solid #3b82f6; padding-left:10px; margin-bottom:8px;">';
    for (let key in obj) {
      const currentPath = path ? `${path}.${key}` : key;
      const val = obj[key];
      const isImg = typeof val === 'string' && (val.includes('/') || val.match(/\.(jpg|jpeg|png|webp|gif)/i));

      html += `<div style="margin-top:8px;">
        <label style="font-size:12px; color:#93c5fd; font-weight:bold; display:block; margin-bottom:2px;">${key}:</label>`;
      
      if (typeof val === 'object' && val !== null) {
        html += buildForm(val, currentPath);
      } else {
        html += `<div style="display:flex; gap:6px; align-items:center;">
          <input class="adm-inp" data-path="${currentPath}" value="${String(val).replace(/"/g, '&quot;')}" style="flex:1; padding:6px 10px; background:#1e1e24; color:#fff; border:1px solid #333; border-radius:4px; box-sizing:border-box;"/>`;
        if (isImg) {
          html += `<input type="file" accept="image/*" class="adm-img-up" data-path="${currentPath}" style="width:110px; font-size:11px; color:#aaa;"/>`;
        }
        html += `</div>`;
      }
      html += `</div>`;
    }
    return html + '</div>';
  };

  const load = () => {
    const k = $('adm-key').value;
    const container = $('adm-form-container');
    if (rawMode) {
      container.innerHTML = `<textarea id="adm-ta" spellcheck="false" style="width:100%; height:360px; background:#0d0d11; color:#a9b7c6; font-family:Consolas, monospace; padding:12px; border:none; box-sizing:border-box; outline:none;">${JSON.stringify(SW[k], null, 2)}</textarea>`;
    } else {
      container.innerHTML = buildForm(SW[k]);
      // Xử lý Upload ảnh trực tiếp tại từng ô input
      container.querySelectorAll('.adm-img-up').forEach(input => {
        input.onchange = async (e) => {
          const file = e.target.files[0]; if (!file) return;
          try {
            msg('Đang upload ảnh lên Cloudinary…');
            const url = (await SW.cloudUpload(file)).replace('/upload/','/upload/f_auto,q_auto,w_1600/');
            const path = e.target.getAttribute('data-path');
            const targetInp = container.querySelector(`input[data-path="${path}"]`);
            if (targetInp) targetInp.value = url;
            msg('Đã tải ảnh lên và điền link thành công! ✔');
          } catch(err) { msg('Lỗi upload: ' + err.message); }
        };
      });
    }
  };

  // Gom dữ liệu từ Form chuyển lại về JSON Object
  const getFormData = () => {
    const k = $('adm-key').value;
    if (rawMode) return JSON.parse($('adm-ta').value);
    
    let result = JSON.parse(JSON.stringify(SW[k]));
    $('adm-form-container').querySelectorAll('.adm-inp').forEach(inp => {
      const path = inp.getAttribute('data-path').split('.');
      let target = result;
      for (let i = 0; i < path.length - 1; i++) {
        target = target[path[i]];
      }
      target[path[path.length - 1]] = inp.value;
    });
    return result;
  };

  $('adm-key').onchange = load;
  $('adm-toggle-mode').onclick = () => { 
    rawMode = !rawMode; 
    $('adm-toggle-mode').textContent = rawMode ? '🔄 Bật giao diện Form' : '🔄 Bật gõ JSON thô'; 
    load(); 
  };
  $('adm-x').onclick = () => m.remove();
  
  $('adm-save').onclick = async () => {
    const k = $('adm-key').value;
    try {
      const val = getFormData();
      await save(k, val);
      msg('Đã lưu thành công! ✔');
    } catch(e) { msg('Lỗi lưu: ' + e.message); }
  };

  $('adm-reset').onclick = async () => {
    const k = $('adm-key').value;
    if(!confirm(`Xoá bản đã sửa của "${k}" và dùng lại dữ liệu mặc định?`)) return;
    try {
      await SW.db.collection('content').doc(k).delete();
      SW[k] = JSON.parse(JSON.stringify(SW._defaults[k]));
      load(); SW.render(1); msg('Đã khôi phục ✔');
    } catch(e) { msg('Lỗi: ' + e.message); }
  };

  load();
};
