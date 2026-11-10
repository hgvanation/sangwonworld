/* ===== DATA: activity.js — streaming, quest, voting, trending, project, schedule ===== */
SW.streaming = {
  goal:{label:{vi:'Mục tiêu tuần này',en:'This week\'s goal'}, current:1200, target:5000, unit:'streams'},
  links:[ {name:'Spotify',url:'#'},{name:'YouTube Music',url:'#'},{name:'Melon',url:'#'},{name:'Stationhead',url:'#'} ],
};
SW.voting = [  // sub: focus | app | guide
  {sub:'focus',title:{vi:'(Mẫu) Giải đang vote',en:'(Sample) Active poll'},deadline:'2026-11-30',note:{vi:'Ghi chú cách vote',en:'How to vote'},link:'#',pin:true},
  {sub:'app',title:'(Sample) Voting app',note:{vi:'Link tải & mô tả',en:'Download link'},link:'#'},
  {sub:'guide',title:{vi:'(Mẫu) Hướng dẫn tạo tài khoản',en:'(Sample) Account guide'},note:{vi:'Các bước…',en:'Steps…'},link:'#'},
];
SW.trending = {
  rank:[{tag:'#LeeSangwon',n:12400},{tag:'#SANGWON',n:9800},{tag:'#ALPHADRIVEONE',n:7600}],
  guide:[{vi:'Dùng hashtag đúng giờ đã hẹn.',en:'Use the hashtag at the scheduled time.'},{vi:'Không spam, mỗi bài chỉ 1 hashtag chính.',en:'No spam; one main hashtag per post.'}],
  sample:['Sangwon is so talented! #LeeSangwon','Waiting for more of #SANGWON ✨','Proud of you #LeeSangwon'],
};
SW.projects = [{title:{vi:'(Mẫu) Quà sinh nhật',en:'(Sample) Birthday project'},status:'open',deadline:'2026-12-01',desc:{vi:'Mô tả dự án',en:'Project description'},img:'assets/img/09.jpg'}];
SW.schedule = [{date:'2026-11-15',time:'18:00',title:'(Sample) Live broadcast',type:'Broadcast'},{date:'2026-11-22',time:'20:00',title:'(Sample) Fansign',type:'Event'}];
