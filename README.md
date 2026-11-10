# Sangwon World — hướng dẫn nhanh
Mở `index.html` bằng trình duyệt là chạy (không cần cài gì). Muốn lên mạng: kéo cả thư mục lên Netlify / GitHub Pages / Vercel.

## Muốn sửa/thêm gì → mở file nào
| Việc cần làm | File |
|---|---|
| Thêm/sửa menu, dropdown, tab con | `js/data/site.js` → `SW.nav` |
| Đổi banner, bài update, bài fanbase, thông báo | `js/data/site.js` |
| Chữ nút/nhãn dùng chung, thêm ngôn ngữ | `js/data/site.js` (`SW.langs`, `SW.ui`) |
| Hồ sơ, Fashion/Cheap moment, đĩa nhạc, giải thưởng | `js/data/about.js` |
| Cây hạng mục mặc định gallery | `js/data/gallery.js` (admin sửa trên web) |
| Gallery: giao diện / công cụ admin | `js/pages/gallery.js` / `js/admin-gallery.js` |
| Streaming, vote, trending, project, lịch | `js/data/activity.js` |
| Giao diện từng trang | `js/pages/*.js` |
| Màu sắc, font | `css/base.css` (`:root`) |
| Style thành phần | `css/components.css` |

## Cách thêm
- **Ảnh, hạng mục, comeback mới**: làm bằng nút admin trên trang Gallery (xem mục Gallery lớn bên dưới).
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

## Gallery lớn: upload hàng loạt, hạng mục nhiều cấp, tải ảnh
**Thiết lập Cloudinary (1 lần, miễn phí):** đăng ký cloudinary.com → copy *Cloud name* → *Settings → Upload → Upload presets → Add*: Signing mode **Unsigned**, Folder `sangwon-world`, Allowed formats `jpg,png,webp` → copy tên preset → điền cả hai vào `SW_CLOUDINARY` trong `js/firebase-config.js`.

**Tạo index Firestore (1 lần):** lần đầu mở Gallery khi đã có ảnh, trang sẽ hiện lỗi kèm một đường link dài "create index" → bấm link đó, đăng nhập Firebase, bấm *Create* (đợi 1–3 phút). Hoặc tự tạo: Firestore → Indexes → collection `photos`, field `keys` = *Arrays*, field `at` = *Descending*.

**Admin dùng (đăng nhập bằng chữ Admin ở chân trang → vào trang Gallery):**
- **🗂 Quản lý hạng mục**: thêm / đổi tên / xoá hạng mục ở mọi cấp (SNS › Instagram › …), thêm comeback/giai đoạn. Chỉ admin thấy.
- **📤 Upload ảnh**: chọn hạng mục từ lớn xuống nhỏ, comeback, năm, nguồn, tag, nội dung đi kèm → chọn hàng loạt ảnh (3 ảnh upload song song).
- Bấm 1 ảnh: **✏️ Sửa** tiêu đề/nội dung/tag riêng cho ảnh đó, **🗑 Xoá**.
- Người xem: duyệt theo cấp hạng mục + comeback + năm + tìm kiếm, bấm ảnh xem nội dung và **⬇ Tải ảnh gốc**.

**Giới hạn cần biết:**
- Firestore gói miễn phí ≈ 50.000 lượt đọc/ngày; mỗi lần mở Gallery đọc ~48 ảnh (hằng số `PAGE` trong `js/pages/gallery.js`). Web đông người thì nên nâng Blaze (trả theo mức dùng, rất rẻ ở quy mô fan site) hoặc giảm `PAGE`.
- Cloudinary miễn phí giới hạn băng thông/biến đổi hàng tháng; ảnh tải về nhiều có thể chạm trần.
- Xoá ảnh trên web chỉ xoá khỏi gallery, file trên Cloudinary vẫn còn (xoá trong dashboard Cloudinary).
- Tìm kiếm chữ chỉ lọc trong số ảnh đã tải ra màn hình (bấm "Tải thêm" để tìm rộng hơn); lọc theo hạng mục/comeback/năm thì tìm trên toàn bộ.

## Lưu ý
- Dữ liệu ghi "(Sample)" / "điền vào" là mẫu — admin thay trực tiếp bằng nút chỉnh sửa.
- Daily Quest đã tạm bỏ. Muốn thêm lại: thêm mục vào `SW.nav`, `SW.quests` vào `activity.js` và `SW.pages.quest` vào `js/pages/activity.js`.
