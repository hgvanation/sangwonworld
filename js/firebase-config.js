/* ===== CẤU HÌNH FIREBASE — chỉ cần sửa file này =====
   Lấy từ Firebase Console → Project settings → Your apps → Web app → firebaseConfig.
   (Các giá trị này KHÔNG phải bí mật, an toàn để đưa lên GitHub. Bảo mật nằm ở firestore.rules) */
window.SW_FIREBASE = {
  apiKey: '',
  authDomain: '',      // dạng  ten-project.firebaseapp.com
  projectId: '',
  appId: '',
};
/* Email admin (Gmail dùng để đăng nhập). Chỉ để HIỆN nút chỉnh sửa;
   quyền ghi thật được khoá trong firestore.rules — nhớ sửa cả 2 chỗ khi thêm admin. */
SW.adminEmails = ['email-cua-ban@gmail.com'];

/* ===== UPLOAD ẢNH: Cloudinary (miễn phí, không cần thẻ) — xem README mục "Upload ảnh" ===== */
window.SW_CLOUDINARY = { cloudName: '', uploadPreset: '' };
