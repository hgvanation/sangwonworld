# Sangwon World — hướng dẫn nhanh
Mở `index.html` bằng trình duyệt là chạy (không cần cài gì). Muốn lên mạng: kéo cả thư mục lên Netlify / GitHub Pages / Vercel.

## Muốn sửa/thêm gì → mở file nào
| Việc cần làm | File |
|---|---|
| Thêm/sửa menu, dropdown, tab con | `js/data/site.js` → `SW.nav` |
| Đổi banner, bài update, bài fanbase, thông báo | `js/data/site.js` |
| Chữ nút/nhãn dùng chung, thêm ngôn ngữ | `js/data/site.js` (`SW.langs`, `SW.ui`) |
| Hồ sơ, Fashion/Cheap moment, đĩa nhạc, giải thưởng | `js/data/about.js` |
| **Ảnh gallery, comeback (era), danh mục con** | `js/data/gallery.js` |
| Streaming, vote, trending, project, lịch | `js/data/activity.js` |
| Giao diện từng trang | `js/pages/*.js` |
| Màu sắc, font | `css/base.css` (`:root`) |
| Style thành phần | `css/components.css` |

## Cách thêm
- **Ảnh mới**: bỏ file vào `assets/img/`, thêm 1 dòng vào `SW.gallery` (chọn `cat`, `sub`, `era`, `year`).
- **Comeback mới**: thêm 1 dòng vào `SW.eras` — bộ lọc tự xuất hiện.
- **Danh mục con mới**: thêm vào `SW.gallerySubs.sns|magazine|other`.
- **Trang mới**: thêm vào `SW.nav` + tạo `SW.pages.<id> = (sub)=>'<html>'` trong `js/pages/` + thêm `<script>` vào `index.html`.

## Đăng nhập Google thật + admin sửa nội dung trên web
Web là tĩnh (GitHub Pages) nên dùng **Firebase** (miễn phí gói Spark) làm phần đăng nhập và lưu nội dung. Admin sửa trên web → lưu vào Firestore → mọi người thấy ngay, **không cần commit GitHub**.

1. Vào https://console.firebase.google.com → *Add project*.
2. *Build → Authentication → Get started → Sign-in method → Google → Enable*. Ở *Settings → Authorized domains* thêm domain web của bạn (vd `tenban.github.io`; `localhost` có sẵn).
3. *Build → Firestore Database → Create database* (production mode). Vào tab *Rules*, dán nội dung file `firestore.rules` (đã sửa email admin) → *Publish*.
4. *Project settings → Your apps → Web (</>)* → copy `firebaseConfig` vào **`js/firebase-config.js`**, và sửa `SW.adminEmails` thành Gmail admin.
5. Đưa web lên GitHub Pages (hoặc chạy thử: `python -m http.server` trong thư mục rồi mở `http://localhost:8000`). **Không mở bằng file://** vì Google đăng nhập không chạy được.

**Chỉ cần đụng 2 chỗ khi thêm admin:** `SW.adminEmails` trong `js/firebase-config.js` (hiện nút sửa) và danh sách email trong Rules trên Firebase (quyền ghi thật).

Khách **không thấy nút đăng nhập**. Admin bấm chữ nhỏ **Admin** ở chân trang để đăng nhập Google (email không nằm trong danh sách admin sẽ tự bị đăng xuất).

Cách dùng: đăng nhập bằng email admin → trên mỗi trang xuất hiện nút **✏️ Chỉnh sửa trang này** → sửa JSON → *Lưu*. *Khôi phục mặc định* sẽ xoá bản đã sửa và dùng lại dữ liệu trong `js/data/*.js`.

## Lưu ý
- Dữ liệu ghi "(Sample)" / "điền vào" là mẫu — admin thay trực tiếp bằng nút chỉnh sửa.
- Ảnh: chưa có upload. Bỏ ảnh vào `assets/img/` (commit GitHub) rồi ghi đường dẫn, hoặc dán link ảnh online vào JSON.
- Daily Quest đã tạm bỏ. Muốn thêm lại: thêm mục vào `SW.nav`, `SW.quests` vào `activity.js` và `SW.pages.quest` vào `js/pages/activity.js`.
