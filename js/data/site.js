/* ===== DATA: site.js — menu, banner, bài đăng trang chủ =====
   Ngôn ngữ: mỗi chữ là {vi:'', en:''}. Thêm 'ko' nếu muốn.
   Thêm menu: thêm 1 object vào nav (id phải trùng tên trang trong js/pages/*.js) */
window.SW = { pages:{}, data:{} };
SW.langs = ['vi','en'];
SW.name = 'Sangwon World';

SW.nav = [
  { id:'about', label:{vi:'Về Sangwon',en:'About Sangwon'}, icon:'✦', children:[
    { id:'moments',    label:{vi:'Sangwon · Thời trang & khoảnh khắc',en:'Sangwon · Fashion & Moments'}, icon:'👕' },
    { id:'profile',    label:{vi:'Hồ sơ',en:'Profile'}, icon:'🪪' },
    { id:'discography',label:{vi:'Đĩa nhạc',en:'Discography'}, icon:'💿', subs:[
      {id:'group',label:{vi:'Bài hát nhóm',en:'Group songs'}},
      {id:'solo', label:{vi:'Bài hát solo',en:'Solo songs'}} ]},
    { id:'gallery',    label:{vi:'Thư viện ảnh',en:'Gallery'}, icon:'🖼️', subs:[
      {id:'sns',label:{vi:'SNS',en:'SNS'}},
      {id:'magazine',label:{vi:'Tạp chí',en:'Magazine'}},
      {id:'other',label:{vi:'Khác',en:'Other'}} ]},
    { id:'awards',     label:{vi:'Giải thưởng',en:'Awards'}, icon:'🏆', subs:[
      {id:'group',label:{vi:'Giải nhóm',en:'Group awards'}},
      {id:'solo', label:{vi:'Giải solo',en:'Solo awards'}} ]},
  ]},
  { id:'activity', label:{vi:'Hoạt động',en:'Activity'}, icon:'⚡', children:[
    { id:'streaming', label:{vi:'Streaming',en:'Streaming'}, icon:'🎧' },
    { id:'voting',    label:{vi:'Bình chọn',en:'Voting'}, icon:'🗳️', subs:[
      {id:'focus',label:{vi:'Vote quan trọng',en:'Important / Focus vote'}},
      {id:'app',  label:{vi:'App vote',en:'Voting apps'}},
      {id:'guide',label:{vi:'Hướng dẫn vote',en:'Voting guide'}} ]},
    { id:'trending',  label:{vi:'Trending',en:'Trending'}, icon:'🔥', subs:[
      {id:'rank',label:{vi:'Bảng xếp hạng',en:'Trending rank'}},
      {id:'guide',label:{vi:'Hướng dẫn',en:'Trending guide'}},
      {id:'sample',label:{vi:'Câu mẫu',en:'Example sentences'}} ]},
  ]},
  { id:'project',  label:{vi:'Dự án',en:'Project'} },
  { id:'schedule', label:{vi:'Lịch trình',en:'Schedule'} },
];

/* MAIN BANNER trang chủ — img nằm trong assets/img */
SW.banners = [
  { img:'assets/img/02.jpg', title:{vi:'Chào mừng đến Sangwon World',en:'Welcome to Sangwon World'}, sub:{vi:'Nơi fan Việt Nam theo dõi mọi thứ về Lee Sangwon',en:'Everything about Lee Sangwon, by Vietnamese fans'}, link:'#/about/profile' },
  { img:'assets/img/06.jpg', title:{vi:'Streaming mỗi ngày',en:'Stream every day'}, sub:{vi:'Cùng hoàn thành mục tiêu tuần này',en:'Let us hit this week\'s goal'}, link:'#/activity/streaming' },
  { img:'assets/img/08.jpg', title:{vi:'Bình chọn đang mở',en:'Voting is open'}, sub:{vi:'Xem hướng dẫn và app vote',en:'See guides and voting apps'}, link:'#/activity/voting/focus' },
];

/* ẢNH NGẪU NHIÊN ĐẦU TRANG CHỦ — mỗi lần vào web hiện 1 ảnh trong danh sách. Thêm link ảnh vào đây (vd 'assets/img/05.jpg'). Để trống = không hiện. */
SW.heroImages = [];

/* BÀI ĐĂNG TRANG CHỦ — thêm bài mới lên đầu mảng */
SW.updates = [   // Sangwon new update post
  { date:'2026-11-08', title:{vi:'(Mẫu) Sangwon đăng ảnh mới trên SNS',en:'(Sample) Sangwon posted new photos'}, img:'assets/img/07.jpg', link:'#/about/gallery/sns' },
  { date:'2026-11-05', title:{vi:'(Mẫu) Pictorial tạp chí mới',en:'(Sample) New magazine pictorial'}, img:'assets/img/03.jpg', link:'#/about/gallery/magazine' },
];
SW.fanposts = [  // Fanbase post
  { date:'2026-11-09', title:{vi:'(Mẫu) Tổng kết streaming tuần',en:'(Sample) Weekly streaming recap'}, link:'#/activity/streaming' },
  { date:'2026-11-03', title:{vi:'(Mẫu) Fanart do thành viên gửi',en:'(Sample) Member fanart'}, link:'#/about/gallery/other' },
];
SW.notices = [   // Notice — pin:true để ghim
  { date:'2026-11-10', pin:true, title:{vi:'(Mẫu) Quy tắc cộng đồng',en:'(Sample) Community rules'} },
  { date:'2026-11-01', title:{vi:'(Mẫu) Web đang cập nhật thêm mục',en:'(Sample) New sections coming'} },
];

/* Chữ giao diện chung */
SW.ui = {
  signin:{vi:'Đăng nhập Google',en:'Sign in with Google'}, signout:{vi:'Đăng xuất',en:'Sign out'},
  profileTitle:{vi:'Hồ sơ nhanh',en:'Quick profile'}, updates:{vi:'Cập nhật mới của Sangwon',en:'New from Sangwon'},
  fan:{vi:'Bài đăng của fanbase',en:'Fanbase posts'}, notice:{vi:'Thông báo',en:'Notices'},
  all:{vi:'Tất cả',en:'All'}, search:{vi:'Tìm theo tên, tag…',en:'Search title, tag…'}, noresult:{vi:'Chưa có nội dung ở mục này.',en:'Nothing here yet.'},
  era:{vi:'Theo comeback / giai đoạn',en:'By comeback / era'}, type:{vi:'Loại',en:'Type'}, year:{vi:'Năm',en:'Year'},
  more:{vi:'Tải thêm',en:'Load more'}, download:{vi:'Tải ảnh gốc',en:'Download original'},
  copy:{vi:'Sao chép',en:'Copy'}, copied:{vi:'Đã chép!',en:'Copied!'}, open:{vi:'Mở',en:'Open'},
};
