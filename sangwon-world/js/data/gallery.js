/* ===== DATA: gallery.js — ảnh + bộ lọc chi tiết =====
   Mỗi ảnh: cat (sns|magazine|other), sub (nhóm nhỏ trong cat), era (comeback/giai đoạn),
   year, tags[], source, credit. Muốn thêm danh mục con → thêm vào subs bên dưới. */
SW.eras = [   // THEO COMEBACK — thêm mới ở cuối
  {id:'predebut', l:{vi:'Trước debut',en:'Pre-debut'}},
  {id:'debut',    l:{vi:'Debut',en:'Debut'}},
  {id:'comeback1',l:{vi:'Comeback 1',en:'Comeback 1'}},
  {id:'comeback2',l:{vi:'Comeback 2',en:'Comeback 2'}},
  {id:'solo',     l:{vi:'Solo / hoạt động riêng',en:'Solo / individual'}},
];
SW.gallerySubs = {   // danh mục con cho từng tab
  sns:[{id:'instagram',l:{en:'Instagram'}},{id:'weverse',l:{en:'Weverse'}},{id:'x',l:{en:'X (Twitter)'}},{id:'tiktok',l:{en:'TikTok'}}],
  magazine:[{id:'cover',l:{vi:'Bìa',en:'Cover'}},{id:'pictorial',l:{vi:'Pictorial',en:'Pictorial'}},{id:'interview',l:{vi:'Phỏng vấn',en:'Interview'}}],
  other:[{id:'concept',l:{vi:'Concept photo',en:'Concept photo'}},{id:'fansign',l:{en:'Fansign'}},{id:'airport',l:{vi:'Sân bay',en:'Airport'}},{id:'stage',l:{vi:'Sân khấu',en:'Stage'}},{id:'bts',l:{vi:'Hậu trường',en:'Behind the scenes'}},{id:'fanart',l:{en:'Fanart'}}],
};
SW.gallery = [
  {img:'assets/img/01.jpg',title:'(Sample) Concept photo',cat:'other',sub:'concept',era:'debut',year:2025,tags:['concept'],source:'Official',credit:'Agency'},
  {img:'assets/img/02.jpg',title:'(Sample) Stage',cat:'other',sub:'stage',era:'comeback1',year:2025,tags:['stage'],source:'—',credit:'—'},
  {img:'assets/img/03.jpg',title:'(Sample) Magazine cover',cat:'magazine',sub:'cover',era:'comeback1',year:2026,tags:['cover'],source:'Magazine',credit:'—'},
  {img:'assets/img/04.jpg',title:'(Sample) Pictorial',cat:'magazine',sub:'pictorial',era:'comeback2',year:2026,tags:['pictorial'],source:'Magazine',credit:'—'},
  {img:'assets/img/05.jpg',title:'(Sample) Instagram post',cat:'sns',sub:'instagram',era:'debut',year:2025,tags:['selfie'],source:'@instagram',credit:'—'},
  {img:'assets/img/06.jpg',title:'(Sample) Weverse post',cat:'sns',sub:'weverse',era:'comeback1',year:2025,tags:['daily'],source:'Weverse',credit:'—'},
  {img:'assets/img/07.jpg',title:'(Sample) Airport',cat:'other',sub:'airport',era:'comeback2',year:2026,tags:['airport','fashion'],source:'—',credit:'Fan'},
  {img:'assets/img/08.jpg',title:'(Sample) Behind the scenes',cat:'other',sub:'bts',era:'solo',year:2026,tags:['bts'],source:'YouTube',credit:'—'},
  {img:'assets/img/09.jpg',title:'(Sample) Fansign',cat:'other',sub:'fansign',era:'comeback2',year:2026,tags:['fansign'],source:'—',credit:'Fan'},
  {img:'assets/img/10.jpg',title:'(Sample) Interview',cat:'magazine',sub:'interview',era:'solo',year:2026,tags:['interview'],source:'Magazine',credit:'—'},
];
