/* ===== DATA: about.js — hồ sơ, moments, đĩa nhạc, giải thưởng ===== */
SW.profile = {
  img:'assets/img/01.jpg',
  name:'Lee Sangwon', group:'ALPHA DRIVE ONE',
  fields:[  // thêm dòng mới tại đây
    {k:{vi:'Tên',en:'Name'}, v:'Lee Sangwon (이상원)'},
    {k:{vi:'Nhóm',en:'Group'}, v:'ALPHA DRIVE ONE'},
    {k:{vi:'Ngày sinh',en:'Birthday'}, v:'—  (điền vào)'},
    {k:{vi:'Vị trí',en:'Position'}, v:'—  (điền vào)'},
    {k:{vi:'Debut',en:'Debut'}, v:'—  (điền vào)'},
  ],
  tmi:[{vi:'(Mẫu) Thêm sở thích / TMI tại đây',en:'(Sample) Add TMI here'}],
};

/* SANGWON: FASHION, CHEAP MOMENT (book, movie, location, food...) */
SW.momentTypes = [{id:'fashion',l:{vi:'Thời trang',en:'Fashion'}},{id:'book',l:{vi:'Sách',en:'Book'}},{id:'movie',l:{vi:'Phim',en:'Movie'}},{id:'location',l:{vi:'Địa điểm',en:'Location'}},{id:'food',l:{vi:'Đồ ăn',en:'Food'}}];
SW.moments = [
  { type:'fashion', img:'assets/img/04.jpg', title:{vi:'(Mẫu) Outfit sân bay',en:'(Sample) Airport outfit'}, note:{vi:'Ghi chú thương hiệu/giá tại đây',en:'Brand / price notes'}, date:'2026-10-20' },
  { type:'location',img:'assets/img/09.jpg', title:{vi:'(Mẫu) Quán cafe Sangwon ghé',en:'(Sample) Cafe he visited'}, note:{vi:'Địa chỉ',en:'Address'}, date:'2026-10-02' },
];

/* DISCOGRAPHY — sub: group | solo */
SW.discography = [
  { sub:'group', title:'(Sample) Group song', date:'2025-01-01', type:'Single', cover:'assets/img/05.jpg', link:'#' },
  { sub:'solo',  title:'(Sample) Solo song',  date:'2026-01-01', type:'Digital', cover:'assets/img/10.jpg', link:'#' },
];

/* AWARDS — sub: group | solo */
SW.awards = [
  { sub:'group', year:2025, show:'(Sample) Music show', award:'Rookie of the Year', note:'' },
  { sub:'solo',  year:2026, show:'(Sample) Award show', award:'Best Solo', note:'' },
];
