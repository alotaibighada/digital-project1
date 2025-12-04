// Simple interactions for the site
document.addEventListener('DOMContentLoaded', ()=>{
  // fade in on load for cards
  document.querySelectorAll('.card').forEach((c,i)=> setTimeout(()=> c.classList.add('show'), 120*i));
  // scroll fade
  window.addEventListener('scroll', ()=>{
    document.querySelectorAll('.fade').forEach(el=>{ const top = el.getBoundingClientRect().top; if(top < window.innerHeight - 80) el.classList.add('show'); });
  });
  // nav mobile toggle (simple)
  const nav = document.querySelector('nav'); const burger = document.getElementById('burger');
  if(burger){ burger.addEventListener('click', ()=>{ const links = nav.querySelector('.links'); if(links.style.display==='flex') links.style.display='none'; else links.style.display='flex'; }); }
});

// Problem -> Solution simple logic (local)
const library = [
  {k:['نسيان','كلمة','سر','password'], title:'استرجاع كلمة المرور', steps:['استخدمي خيار استعادة كلمة المرور في الموقع','تحققي من بريدك أو جوالك لاستلام رمز التفعيل','فعّلي المصادقة الثنائية لحماية الحساب']},
  {k:['انترنت','بطيء','شبكة'], title:'تحسين الإنترنت المنزلي', steps:['أعدي تشغيل الراوتر','قربي الجهاز من الراوتر أو استخدمي كابل','اتصلي بمزود الخدمة إن استمرت المشكلة']},
  {k:['حجز','موعد','صحتي','مستشفى'], title:'حجز موعد صحي', steps:['افتح تطبيق صحتي أو موقع المستشفى','اختر الخدمة والتاريخ المناسب','أكد الحجز وتابع الرسائل']}
];

function findSolution(q){
  const s = q.toLowerCase();
  for(const item of library){
    for(const k of item.k) if(s.includes(k)) return item;
  }
  return {title:'حل عام','steps':['صف المشكلة بدقة وحاولي البحث في مكتبة الحلول','اطلبي مساعدة من مركز الدعم المحلي']};
}

function submitProblem(ev){
  ev.preventDefault();
  const inp = document.getElementById('problemInput'); const q = inp.value.trim();
  if(!q){ alert('اكتبي مشكلتك أولاً'); return; }
  const sol = findSolution(q);
  // save to localStorage for demo persistence
  localStorage.setItem('musaid_query', q); localStorage.setItem('musaid_solution', JSON.stringify(sol));
  window.location.href = 'solution.html';
}

function renderSolution(){
  const box = document.getElementById('solutionBox');
  const sol = JSON.parse(localStorage.getItem('musaid_solution') || 'null');
  const q = localStorage.getItem('musaid_query') || '';
  if(!box) return;
  if(!sol){ box.innerHTML = '<p class="small-muted">لم نَجد حلًا بعد، جرّبي العودة وإرسال المشكلة.</p>'; return; }
  let html = `<h3>${sol.title}</h3><p class="small-muted">المشكلة: "${q}"</p><ol>`;
  for(const s of sol.steps) html += `<li>${s}</li>`;
  html += `</ol><button class="btn" onclick="copySolution()">نسخ الحل</button>`;
  box.innerHTML = html;
}
function copySolution(){ navigator.clipboard.writeText(document.getElementById('solutionBox').innerText).then(()=> alert('تم نسخ الحل')); }
window.addEventListener('DOMContentLoaded', ()=>{ if(document.getElementById('solutionBox')) renderSolution(); });
