/* ===== AUTH + LOAD NỘI DUNG: Google Sign-In (Firebase Auth) + Firestore ===== */
(function(){
  const cfg = window.SW_FIREBASE;
  SW.isAdmin = () => !!SW.user && SW.adminEmails.some(e => e.toLowerCase() === (SW.user.email||'').toLowerCase());
  if(!cfg || !cfg.apiKey || typeof firebase === 'undefined'){
    console.warn('Chưa cấu hình Firebase (js/firebase-config.js) — web chạy bằng dữ liệu mặc định.');
    SW.signIn = () => alert('Chưa cấu hình Firebase. Làm theo README bước 1–4.');
    SW.signOut = () => {}; SW.loadContent = () => Promise.resolve(); return;
  }
  firebase.initializeApp(cfg);
  const auth = firebase.auth(); SW.db = firebase.firestore();
  SW.signIn  = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(e => alert(e.message));
  SW.signOut = () => auth.signOut();
  auth.onAuthStateChanged(u => {
    SW.user = u ? { name:u.displayName||u.email, email:u.email, uid:u.uid } : null;
    if(SW.user && !SW.isAdmin()){ alert('Tài khoản này không phải admin.'); auth.signOut(); return; }   // chỉ admin được ở lại
    if(SW.renderHeader) SW.renderHeader(); if(SW.render) SW.render(1);
  });
  /* Mỗi mục nội dung = 1 document trong collection "content": id = tên biến (profile, gallery...) */
  SW.loadContent = async () => {
    try{ const snap = await SW.db.collection('content').get();
      snap.forEach(d => { try{ SW[d.id] = JSON.parse(d.data().json); }catch(e){ console.warn('JSON lỗi:',d.id); } });
    }catch(e){ console.warn('Không đọc được Firestore:', e.message); }
    if(SW.syncGalleryNav) SW.syncGalleryNav();
  };
})();
