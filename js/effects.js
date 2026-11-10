/* ===== EFFECTS: lấp lánh theo chuột, chạm/bấm tạo vòng sáng + sao, card nghiêng theo chuột =====
   Dùng "event delegation" trên document nên vẫn chạy khi SW.render() vẽ lại trang.
   Tắt hết hiệu ứng khi người dùng bật "giảm chuyển động" trong hệ điều hành.
   Muốn chỉnh: đổi COLORS, TRAIL_MS (độ dày vệt sao), BURST (số sao khi chạm). */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const COLORS = ['#c8a24a','#e3c46f','#2a58d4','#7fa4ff'];   // vàng gold + xanh hoàng gia
  const TRAIL_MS = 45, BURST = 9, MAX = 60;
  const rnd = (a,b) => a + Math.random()*(b-a);

  const layer = document.createElement('div');
  layer.className = 'fx-layer'; layer.setAttribute('aria-hidden','true');
  document.body.appendChild(layer);

  const spark = (x,y,o) => {
    if(layer.childElementCount > MAX) return;
    const s = document.createElement('i'); s.className = 'fx-s';
    s.style.left = x+'px'; s.style.top = y+'px';
    s.style.setProperty('--sz', rnd(o.min,o.max)+'px');
    s.style.setProperty('--c', COLORS[(Math.random()*COLORS.length)|0]);
    s.style.setProperty('--dx', o.dx+'px'); s.style.setProperty('--dy', o.dy+'px');
    s.style.setProperty('--d', rnd(o.t0,o.t1)+'ms');
    s.addEventListener('animationend', () => s.remove());
    layer.appendChild(s);
  };

  /* Vệt sao theo chuột (chỉ chuột thật, không áp dụng cho cảm ứng) */
  let last = 0;
  const trail = e => {
    const now = performance.now(); if(now-last < TRAIL_MS) return; last = now;
    spark(e.clientX, e.clientY, {min:6, max:13, dx:rnd(-14,14), dy:rnd(10,30), t0:600, t1:900});
  };

  /* Chạm / bấm: 1 vòng sáng + vài ngôi sao toả ra */
  const tap = e => {
    const r = document.createElement('i'); r.className = 'fx-r';
    r.style.left = e.clientX+'px'; r.style.top = e.clientY+'px';
    r.addEventListener('animationend', () => r.remove()); layer.appendChild(r);
    for(let k=0;k<BURST;k++){
      const a = (k/BURST)*Math.PI*2 + rnd(-.25,.25), d = rnd(34,74);
      spark(e.clientX, e.clientY, {min:7, max:15, dx:Math.cos(a)*d, dy:Math.sin(a)*d, t0:500, t1:800});
    }
  };

  /* Card nghiêng 3D + vệt sáng theo con trỏ (CSS đọc --rx --ry --mx --my) */
  let cur = null;
  const clear = el => ['--rx','--ry','--mx','--my'].forEach(v => el.style.removeProperty(v));
  const tilt = e => {
    const el = e.target.closest ? e.target.closest('.card.link,[data-tilt]') : null;
    if(cur && cur !== el) clear(cur);
    cur = el;
    if(!el) return;
    const b = el.getBoundingClientRect(), px = (e.clientX-b.left)/b.width, py = (e.clientY-b.top)/b.height;
    el.style.setProperty('--mx', px*100+'%'); el.style.setProperty('--my', py*100+'%');
    el.style.setProperty('--ry', (px-.5)*8+'deg'); el.style.setProperty('--rx', (.5-py)*8+'deg');
  };

  addEventListener('pointermove', e => { if(e.pointerType !== 'mouse') return; trail(e); tilt(e); }, {passive:true});
  addEventListener('pointerdown', tap, {passive:true});
  document.addEventListener('pointerout', e => { if(!e.relatedTarget && cur){ clear(cur); cur = null; } });
  document.addEventListener('touchstart', () => {}, {passive:true});   // bật :active trên iOS Safari
})();
