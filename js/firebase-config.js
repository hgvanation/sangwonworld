/* ===== CẤU HÌNH FIREBASE — chỉ cần sửa file này =====
   Lấy từ Firebase Console → Project settings → Your apps → Web app → firebaseConfig.
   (Các giá trị này KHÔNG phải bí mật, an toàn để đưa lên GitHub. Bảo mật nằm ở firestore.rules) */
window.SW_FIREBASE = {
  apiKey: 'AIzaSyATspqM4GzmLH5Dnocjx4JDI8LhSNwma_Q',
  authDomain: 'sangwonworld.firebaseapp.com',
  projectId: 'sangwonworld',
  appId: '1:563269284189:web:86b455088c5ff817ea2d46',
};

/* Email admin (Gmail dùng để đăng nhập). Chỉ để HIỆN nút chỉnh sửa;
   quyền ghi thật được khoá trong firestore.rules — nhớ sửa cả 2 chỗ khi thêm admin. */
SW.adminEmails = ['23001571@hus.edu.vn'];

/* ===== UPLOAD ẢNH: Cloudinary (miễn phí, không cần thẻ) — xem README mục "Upload ảnh" ===== */
window.SW_CLOUDINARY = { cloudName: '', uploadPreset: '' };
