/* ===== APP: router theo hash  #/<trang>/<mục>/<tab>  ===== */
SW.render = function(keepScroll){
  let [top='home', child, sub] = location.hash.replace(/^#\/?/,'').split('/');
  const node = SW.find(top);
  if(node?.children && !child){ location.hash = `#/${top}/${node.children[0].id}`; return; }   // /about → /about/moments
  const key = child || top, page = SW.pages[key];
  document.getElementById('app').innerHTML = page ? page(sub) : `<div class="wrap"><div class="empty">404</div></div>`;
  document.title = 'Sangwon World';
  SW.mountAdmin(key);
  if(!keepScroll) window.scrollTo(0,0);
};
window.addEventListener('hashchange',()=>SW.render());
SW.renderHeader(); SW.render();
SW.loadContent().then(()=>SW.render(1));   // nạp nội dung admin đã sửa từ Firestore
document.getElementById('ftr').innerHTML = '© Sangwon World · Fan-made, not affiliated with the agency. · <a href="#" onclick="SW.signIn();return false" style="opacity:.5">Admin</a>';
