const destinationGrid = document.getElementById('destinationGrid');
const cards = [...document.querySelectorAll('.destination-card')];
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const showAllBtn = document.getElementById('showAllBtn');
const detailDialog = document.getElementById('detailDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogText = document.getElementById('dialogText');
const dialogClose = document.getElementById('dialogClose');
const startBtn = document.getElementById('startBtn');
const menuBtn = document.getElementById('menuBtn');

const placeCopy = {
  'Maya Bay':'สัมผัสอ่าวสีฟ้าใสที่ล้อมรอบด้วยภูเขาหินปูน เรียนรู้ว่าการท่องเที่ยวอย่างรับผิดชอบช่วยให้ธรรมชาติฟื้นตัวได้อย่างไร',
  'Santorini':'ชมบ้านสีขาวกับโดมสีน้ำเงินบนหน้าผาสูง พร้อมบรรยากาศพระอาทิตย์ตกและทะเลอีเจียนที่เป็นเอกลักษณ์',
  'Bora Bora':'ทำความรู้จักลากูนสีเทอร์ควอยซ์ แนวปะการัง และโลกใต้ทะเลที่เหมาะกับการท่องเที่ยวแบบเคารพธรรมชาติ'
};

function filterCards(){
  const q = searchInput.value.trim().toLowerCase();
  let shown = 0;
  cards.forEach(card=>{
    const hit = !q || `${card.dataset.title} ${card.dataset.country}`.toLowerCase().includes(q);
    card.hidden = !hit;
    if(hit) shown++;
  });
  emptyState.hidden = shown !== 0;
}
searchBtn.addEventListener('click',filterCards);
searchInput.addEventListener('input',filterCards);
showAllBtn.addEventListener('click',()=>{searchInput.value='';filterCards();document.getElementById('destinations').scrollIntoView({behavior:'smooth'});});

document.querySelectorAll('.details-btn').forEach(btn=>btn.addEventListener('click',()=>{
  const place=btn.dataset.place; dialogTitle.textContent=place; dialogText.textContent=placeCopy[place] || 'สำรวจสถานที่ริมทะเลที่สวยงาม พร้อมเรื่องราวเกี่ยวกับธรรมชาติและการท่องเที่ยวอย่างยั่งยืน';
  detailDialog.showModal();
}));
dialogClose.addEventListener('click',()=>detailDialog.close());
detailDialog.addEventListener('click',e=>{ if(e.target===detailDialog) detailDialog.close(); });
document.getElementById('dialogAction').addEventListener('click',()=>detailDialog.close());
startBtn.addEventListener('click',()=>document.getElementById('about').scrollIntoView({behavior:'smooth'}));

menuBtn.addEventListener('click',()=>{
  const nav=document.querySelector('.main-nav');
  nav.style.display = nav.style.display==='flex' ? '' : 'flex';
  nav.style.position='absolute';nav.style.top='72px';nav.style.left='0';nav.style.right='0';nav.style.background='#fffaf0';nav.style.padding='15px 20px';nav.style.flexDirection='column';nav.style.boxShadow='0 15px 30px rgba(0,0,0,.08)';
});


// ===== Scroll Reveal / Fade In =====
const revealItems = document.querySelectorAll('.reveal, .reveal-stagger');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// Fade cards when searching, then bring matching cards back smoothly.
const originalFilterCards = filterCards;
filterCards = function(){
  const q = searchInput.value.trim().toLowerCase();
  let shown = 0;
  cards.forEach(card => {
    const hit = !q || `${card.dataset.title} ${card.dataset.country}`.toLowerCase().includes(q);
    if (!hit && !card.hidden) {
      card.classList.add('is-fading-out');
      setTimeout(() => { card.hidden = true; card.classList.remove('is-fading-out'); }, 220);
    } else if (hit) {
      card.hidden = false;
      requestAnimationFrame(() => card.classList.remove('is-fading-out'));
      shown++;
    }
  });
  emptyState.hidden = shown !== 0;
};
