// ─── MENU DATA ───
const menuItems = [
  {name:"Belgian Chocolate Sundae",cat:"icecream",desc:"Rich dark chocolate, hot fudge & cherry",price:"₹199",emoji:"🍫",badge:"⭐ Best Seller",rating:"5.0"},
  {name:"Strawberry Sensation",cat:"icecream",desc:"Fresh strawberry, whipped cream, sprinkles",price:"₹149",emoji:"🍓",badge:"🌸 Fresh",rating:"4.8"},
  {name:"Mango Alphonso Scoop",cat:"icecream",desc:"Real Alphonso pulp, coconut flakes",price:"₹169",emoji:"🥭",badge:"🌟 Seasonal",rating:"4.9"},
  {name:"Butterscotch Dream",cat:"icecream",desc:"Creamy butterscotch, caramel swirl",price:"₹139",emoji:"🍮",badge:null,rating:"4.7"},
  {name:"Oreo Thick Shake",cat:"shakes",desc:"Loaded Oreo, ice cream, cookie crumble",price:"₹219",emoji:"🖤",badge:"🔥 Trending",rating:"4.8"},
  {name:"Ferrero Rocher Shake",cat:"shakes",desc:"Hazelnut cream, Ferrero crumble",price:"₹249",emoji:"🍫",badge:"💎 Premium",rating:"4.9"},
  {name:"Kitkat Shake",cat:"shakes",desc:"Kitkat blend, chocolate ice cream",price:"₹229",emoji:"🍫",badge:null,rating:"4.7"},
  {name:"Mixed Berry Shake",cat:"shakes",desc:"Blueberry, strawberry, raspberry blend",price:"₹199",emoji:"🫐",badge:"🌿 Fresh",rating:"4.8"},
  {name:"Red Velvet Waffle",cat:"waffles",desc:"Crimson waffle, cream cheese, vanilla scoop",price:"₹229",emoji:"🧇",badge:"💜 Fan Fav",rating:"4.9"},
  {name:"Nutella Banana Waffle",cat:"waffles",desc:"Belgian waffle, Nutella, fresh banana",price:"₹199",emoji:"🍌",badge:"🏆 Classic",rating:"4.8"},
  {name:"Lotus Biscoff Waffle",cat:"waffles",desc:"Biscoff spread, caramel ice cream",price:"₹249",emoji:"🍂",badge:"✨ Special",rating:"5.0"},
  {name:"Brownie with Ice Cream",cat:"desserts",desc:"Warm gooey brownie, 2 scoops vanilla",price:"₹179",emoji:"🍫",badge:"🔥 Hot Deal",rating:"4.9"},
  {name:"Lava Cake",cat:"desserts",desc:"Molten chocolate centre, gold dust",price:"₹199",emoji:"🎂",badge:"💛 Premium",rating:"4.8"},
  {name:"Tiramisu Cup",cat:"desserts",desc:"Authentic Italian recipe, light & creamy",price:"₹159",emoji:"☕",badge:null,rating:"4.7"},
  {name:"Cold Coffee",cat:"coffee",desc:"Strong brew, cold milk, ice",price:"₹99",emoji:"☕",badge:"⚡ Quick",rating:"4.6"},
  {name:"Affogato",cat:"coffee",desc:"Espresso poured over vanilla gelato",price:"₹149",emoji:"☕",badge:"🌟 Elegant",rating:"4.9"},
  {name:"Mango Cooler",cat:"beverages",desc:"Real mango, mint, soda, ice",price:"₹89",emoji:"🥭",badge:"🌿 Fresh",rating:"4.7"},
  {name:"Blue Ocean Slush",cat:"beverages",desc:"Blue curacao, lychee, crushed ice",price:"₹99",emoji:"🌊",badge:"💙 Instagrammable",rating:"4.8"},
];

let currentFilter = 'all';
let currentSearch = '';

function renderMenu() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  const filtered = menuItems.filter(item => {
    const matchCat = currentFilter === 'all' || item.cat === currentFilter;
    const matchSearch = item.name.toLowerCase().includes(currentSearch) || item.desc.toLowerCase().includes(currentSearch);
    return matchCat && matchSearch;
  });
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px">No items found. Try a different search!</p>';
    return;
  }
  grid.innerHTML = filtered.map(item => `
    <div class="product-card reveal">
      <div class="product-img" style="background:linear-gradient(135deg,var(--plum),var(--lavender))">
        ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
        <div class="product-img-placeholder">${item.emoji}</div>
      </div>
      <div class="product-body">
        <div class="product-name">${item.name}</div>
        <div class="product-desc">${item.desc}</div>
        <div class="product-footer">
          <div class="product-rating"><span class="stars">★★★★★</span><span class="rating-num">${item.rating}</span></div>
          <div class="product-price">${item.price}</div>
        </div>
        <button class="btn-order">Order Now</button>
      </div>
    </div>
  `).join('');
  observeReveal();
}
function setFilter(cat, el) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderMenu();
}
function filterMenu() {
  currentSearch = document.getElementById('menuSearch').value.toLowerCase();
  renderMenu();
}

// ─── PAGE SYSTEM ───
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  window.scrollTo(0,0);
  if (page === 'menu') renderMenu();
  setTimeout(observeReveal, 100);
}

// ─── NAV SCROLL ───
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
  // Progress bar
  const total = document.body.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
  document.getElementById('progress-bar').style.width = pct + '%';
});

// ─── HAMBURGER ───
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('active');
});
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('active');
}

// ─── DARK MODE ───
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// ─── LOADER ───
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

// ─── SCROLL REVEAL ───
function observeReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}
observeReveal();

// ─── FAQ ───
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ─── COUNTDOWN ───
function buildCountdown(targetHours, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const end = Date.now() + targetHours * 3600000;
  const tick = () => {
    const diff = Math.max(0, end - Date.now());
    const h = String(Math.floor(diff / 3600000)).padStart(2,'0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
    el.innerHTML = `
      <div class="cd-block"><div class="cd-num">${h}</div><div class="cd-label">Hrs</div></div>
      <div class="cd-block"><div class="cd-num">${m}</div><div class="cd-label">Min</div></div>
      <div class="cd-block"><div class="cd-num">${s}</div><div class="cd-label">Sec</div></div>`;
    if (diff > 0) setTimeout(tick, 1000);
  };
  tick();
}
buildCountdown(8, 'countdown1');
buildCountdown(23, 'countdown2');

// ─── QUIZ ───
const quizAnswers = {};
let currentQ = 1;

document.querySelectorAll('.quiz-option').forEach(opt => {
  opt.addEventListener('click', () => {
    const q = opt.dataset.q;
    document.querySelectorAll(`.quiz-option[data-q="${q}"]`).forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    quizAnswers[q] = opt.dataset.v;
  });
});

function updateDots(active) {
  document.querySelectorAll('.quiz-dot').forEach((d, i) => {
    d.classList.toggle('active', i < active);
  });
}
function nextQ(current) {
  if (!quizAnswers[current]) { alert('Please pick an option!'); return; }
  document.getElementById('q'+current).classList.remove('active');
  const next = current + 1;
  if (next <= 3) {
    document.getElementById('q'+next).classList.add('active');
    updateDots(next);
    currentQ = next;
  }
}
function prevQ(current) {
  document.getElementById('q'+current).classList.remove('active');
  document.getElementById('q'+(current-1)).classList.add('active');
  updateDots(current - 1);
  currentQ = current - 1;
}
function getRecommendation() {
  if (!quizAnswers[3]) { alert('Please pick an option!'); return; }
  document.getElementById('q3').classList.remove('active');
  document.getElementById('ai-loading').style.display = 'block';
  updateDots(3);

  const prompt = `You are the AI recommendation engine for Scoopy Doopy Ice Cream Cafe in Hyderabad.
Based on this customer's preferences:
- Mood: ${quizAnswers[1]}
- Flavour preference: ${quizAnswers[2]}
- Hunger level: ${quizAnswers[3]}

Recommend ONE specific dessert from our menu (Belgian Chocolate Sundae, Brownie with Ice Cream, Red Velvet Waffle, Oreo Thick Shake, Ferrero Rocher Shake, Alphonso Mango Sundae, Lotus Biscoff Waffle, Nutella Banana Waffle, Tiramisu Cup, Lava Cake, Affogato).

Respond ONLY in JSON with these exact keys:
{
  "name": "dessert name",
  "icon": "single relevant emoji",
  "description": "2-sentence personalized description of why this is perfect for them, written warmly and appetizingly, under 60 words"
}`;

  fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      model:"claude-sonnet-4-6",
      max_tokens:300,
      messages:[{role:"user",content:prompt}]
    })
  })
  .then(r => r.json())
  .then(data => {
    let text = data.content.map(b => b.text || '').join('');
    text = text.replace(/```json|```/g,'').trim();
    const result = JSON.parse(text);
    document.getElementById('resultIcon').textContent = result.icon || '🍦';
    document.getElementById('resultName').textContent = result.name;
    document.getElementById('resultDesc').textContent = result.description;
  })
  .catch(() => {
    document.getElementById('resultIcon').textContent = '🍫';
    document.getElementById('resultName').textContent = 'Belgian Chocolate Sundae';
    document.getElementById('resultDesc').textContent = 'A classic that never fails — rich dark chocolate, hot fudge drizzle, and a cloud of whipped cream. Based on your preferences, this indulgent treat is made exactly for moments like yours.';
  })
  .finally(() => {
    document.getElementById('ai-loading').style.display = 'none';
    document.getElementById('result').classList.add('active');
  });
}
function resetQuiz() {
  quizAnswers[1] = quizAnswers[2] = quizAnswers[3] = undefined;
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
  document.getElementById('result').classList.remove('active');
  document.getElementById('q1').classList.add('active');
  updateDots(1);
  currentQ = 1;
}

// ─── FORM ───
function submitForm(btn) {
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
  setTimeout(() => {
    btn.textContent = 'Send Message ✨';
    btn.style.background = '';
  }, 3000);
}

// ─── ORDER BUTTONS ───
document.addEventListener('click', e => {
  if (e.target.classList.contains('btn-order')) {
    const orig = e.target.textContent;
    e.target.textContent = '✓ Added!';
    e.target.style.background = 'var(--gold)';
    e.target.style.color = 'var(--plum-deep)';
    setTimeout(() => {
      e.target.textContent = orig;
      e.target.style.background = '';
      e.target.style.color = '';
    }, 1500);
  }
});
