/* ===== DATA: gallery.js — CÂY HẠNG MỤC mặc định + ảnh mẫu =====
   Ảnh thật nằm trong Firestore (collection "photos"), KHÔNG nằm ở file này.
   Cây hạng mục (galleryTree) admin sửa trực tiếp trên web: nút "🗂 Quản lý hạng mục" ở trang Gallery.
   File này chỉ là giá trị khởi đầu / dự phòng khi chưa cấu hình Firebase. */
SW.galleryTree = {
  eras: [   // lọc theo comeback / giai đoạn (cắt ngang mọi hạng mục)
    {id:'predebut', label:'Pre-debut'}, {id:'debut', label:'Debut'},
    {id:'comeback1', label:'Comeback 1'}, {id:'comeback2', label:'Comeback 2'}, {id:'solo', label:'Solo / individual'},
  ],
  cats: [   // hạng mục lớn → nhỏ, lồng nhau bao nhiêu cấp cũng được
    {id:'sns', label:'SNS', children:[{id:'instagram',label:'Instagram'},{id:'weverse',label:'Weverse'},{id:'x',label:'X (Twitter)'},{id:'tiktok',label:'TikTok'}]},
    {id:'magazine', label:'Magazine', children:[{id:'cover',label:'Cover'},{id:'pictorial',label:'Pictorial'},{id:'interview',label:'Interview'}]},
    {id:'other', label:'Other', children:[{id:'concept',label:'Concept photo'},{id:'fansign',label:'Fansign'},{id:'airport',label:'Airport'},{id:'stage',label:'Stage'},{id:'bts',label:'Behind the scenes'},{id:'fanart',label:'Fanart'}]},
  ],
};
/* keys: mảng khoá dùng để truy vấn Firestore nhanh. Mỗi ảnh có khoá cho từng hạng mục cha, kèm comeback/năm. */
SW.mkKeys = (path, era, year) => { const k=[]; for(const n of ['_',...path]){ k.push(n); if(era)k.push(`${n}~e:${era}`); if(year)k.push(`${n}~y:${year}`); if(era&&year)k.push(`${n}~e:${era}~y:${year}`);} return k; };
SW.qKey = (node, era, year) => `${node||'_'}${era?'~e:'+era:''}${year?'~y:'+year:''}`;
const _p = (i,path,era,year,title,content) => ({id:'s'+i,url:`assets/img/${String(i).padStart(2,'0')}.jpg`,title,content,path,era,year,tags:[],source:'',credit:'',keys:SW.mkKeys(path,era,year)});
SW.galleryFallback = [   // chỉ hiện khi chưa có Firebase
  _p(1,['other','concept'],'debut',2025,'(Sample) Concept photo','Nội dung đi kèm ảnh hiển thị ở đây.'),
  _p(3,['magazine','cover'],'comeback1',2026,'(Sample) Magazine cover',''),
  _p(5,['sns','instagram'],'debut',2025,'(Sample) Instagram post',''),
  _p(7,['other','airport'],'comeback2',2026,'(Sample) Airport',''),
];
