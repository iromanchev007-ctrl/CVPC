/* ═══════════════════════════════════════════════
   TELEGRAM BOT CONFIGURATION
   ─────────────────────────────────────────────
   1. Создайте бота: @BotFather → /newbot
   2. Скопируйте токен в TG_BOT_TOKEN
   3. @ilya4u отправляет /start вашему боту
   4. Узнайте chat_id: отправьте боту любое сообщение,
      затем откройте в браузере:
      https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
      chat.id из ответа → вставьте в TG_CHAT_ID
═══════════════════════════════════════════════ */
const TG_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const TG_CHAT_ID   = 'YOUR_CHAT_ID_HERE';

/* ═══════════════════════════════════════════════
   CAR DATA (make → models)
═══════════════════════════════════════════════ */
const CAR_DATA = {
  'Volkswagen':    ['Golf', 'Golf GTI/R', 'Passat', 'Passat CC', 'Tiguan', 'Tiguan 2', 'Touareg', 'Jetta', 'Polo', 'Arteon', 'T-Roc', 'T-Cross', 'Sharan', 'Multivan / Caravelle', 'Touran'],
  'Audi':          ['A1', 'A3', 'A3 Sportback', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'RS3', 'RS4', 'RS5', 'RS6', 'S3', 'S4', 'S5'],
  'Skoda':         ['Octavia', 'Octavia RS', 'Superb', 'Kodiaq', 'Karoq', 'Fabia', 'Rapid', 'Scala', 'Kamiq', 'Yeti'],
  'SEAT':          ['Leon', 'Leon Cupra', 'Ateca', 'Tarraco', 'Ibiza', 'Arona', 'Alhambra'],
  'Porsche':       ['Cayenne', 'Macan', 'Panamera', 'Taycan', '911', '718 Boxster / Cayman'],
  'BMW':           ['1 серия', '2 серия', '3 серия', '4 серия', '5 серия', '6 серия', '7 серия', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'M3', 'M5'],
  'Mercedes-Benz': ['A-класс', 'B-класс', 'C-класс', 'E-класс', 'S-класс', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'AMG GT', 'CLA', 'CLS'],
  'Toyota':        ['Corolla', 'Camry', 'RAV4', 'Land Cruiser 200', 'Land Cruiser 300', 'Hilux', 'Fortuner', 'Highlander', 'Prado'],
  'Kia':           ['Sportage', 'Sorento', 'Stinger', 'K5 (Optima)', 'Telluride', 'EV6', 'Ceed'],
  'Hyundai':       ['Tucson', 'Santa Fe', 'Sonata', 'Elantra', 'Palisade', 'Ioniq 5', 'i30 N'],
  'Mazda':         ['CX-5', 'CX-30', 'CX-60', 'Mazda3', 'Mazda6', 'MX-5'],
  'Nissan':        ['Qashqai', 'X-Trail', 'Patrol', 'Pathfinder', 'Murano', 'Juke'],
  'Mitsubishi':    ['Outlander', 'Eclipse Cross', 'Pajero Sport', 'L200'],
  'Subaru':        ['Outback', 'Forester', 'Impreza', 'Legacy', 'Levorg', 'WRX STI'],
  'Другая марка':  ['Другая модель'],
};

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initBurger();
  initScrollAnimations();
  initCarSelects();
  initPhoneMask();
  initForm();
});

/* ═══════════════════════════════════════════════
   HEADER — scroll shadow
═══════════════════════════════════════════════ */
function initHeader() {
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ═══════════════════════════════════════════════
   BURGER MENU
═══════════════════════════════════════════════ */
function initBurger() {
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ═══════════════════════════════════════════════
   SCROLL ANIMATIONS (Intersection Observer)
═══════════════════════════════════════════════ */
function initScrollAnimations() {
  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
}

/* ═══════════════════════════════════════════════
   CAR MAKE / MODEL SELECTS
═══════════════════════════════════════════════ */
function initCarSelects() {
  const makeSelect  = document.getElementById('make');
  const modelSelect = document.getElementById('model');

  Object.keys(CAR_DATA).forEach(make => {
    makeSelect.appendChild(new Option(make, make));
  });

  makeSelect.addEventListener('change', () => {
    const models = CAR_DATA[makeSelect.value] || [];
    modelSelect.innerHTML = '';

    if (!models.length) {
      modelSelect.appendChild(new Option('— Сначала выберите марку —', ''));
      modelSelect.disabled = true;
      return;
    }

    modelSelect.appendChild(new Option('— Выберите модель —', ''));
    models.forEach(m => modelSelect.appendChild(new Option(m, m)));
    modelSelect.disabled = false;
    modelSelect.focus();
  });
}

/* ═══════════════════════════════════════════════
   PHONE MASK  +7 (XXX) XXX-XX-XX
═══════════════════════════════════════════════ */
function initPhoneMask() {
  const input = document.getElementById('phone');

  input.addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, '');
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);
    if (digits.startsWith('7')) digits = digits.slice(1);
    digits = digits.slice(0, 10);

    let formatted = '';
    if (digits.length > 0) formatted = '+7 (' + digits.slice(0, 3);
    if (digits.length >= 4) formatted += ') ' + digits.slice(3, 6);
    if (digits.length >= 7) formatted += '-' + digits.slice(6, 8);
    if (digits.length >= 9) formatted += '-' + digits.slice(8, 10);

    e.target.value = formatted;
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && input.value === '+7 (') {
      input.value = '';
    }
  });
}

/* ═══════════════════════════════════════════════
   FORM SUBMISSION
═══════════════════════════════════════════════ */
function initForm() {
  const form       = document.getElementById('bookingForm');
  const submitBtn  = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const submitLdr  = document.getElementById('submitLoader');
  const successEl  = document.getElementById('formSuccess');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    setLoading(true);
    try {
      const data = collectFormData(form);
      await sendToTelegram(data);
    } catch (err) {
      console.error('Telegram send error:', err);
      /* При ошибке отправки — логируем, но показываем успех клиенту.
         Исправьте TG_BOT_TOKEN и TG_CHAT_ID, чтобы заявки доходили! */
    } finally {
      setLoading(false);
      form.style.visibility = 'hidden';
      successEl.hidden = false;
    }
  });

  function setLoading(on) {
    submitBtn.disabled = on;
    submitText.hidden  = on;
    submitLdr.hidden   = !on;
  }
}

function collectFormData(form) {
  const fd = new FormData(form);
  return {
    name:    fd.get('name')    || '—',
    phone:   fd.get('phone')   || '—',
    email:   fd.get('email')   || '—',
    service: fd.get('service') || '—',
    make:    fd.get('make')    || '—',
    model:   fd.get('model')   || '—',
    comment: fd.get('comment') || '—',
  };
}

async function sendToTelegram(d) {
  const now  = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Saratov',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const text =
    `🚗 <b>Новая заявка — ДСГсервис Саратов</b>\n\n` +
    `👤 <b>Имя:</b> ${escHtml(d.name)}\n` +
    `📞 <b>Телефон:</b> ${escHtml(d.phone)}\n` +
    `📧 <b>Email:</b> ${escHtml(d.email)}\n\n` +
    `🔧 <b>Услуга:</b> ${escHtml(d.service)}\n` +
    `🚘 <b>Автомобиль:</b> ${escHtml(d.make)} ${escHtml(d.model)}\n\n` +
    `💬 <b>Симптомы:</b>\n${escHtml(d.comment)}\n\n` +
    `⏰ ${now}`;

  const resp = await fetch(
    `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'HTML' }),
    }
  );

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.description || `HTTP ${resp.status}`);
  }
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ═══════════════════════════════════════════════
   FORM VALIDATION
═══════════════════════════════════════════════ */
function validateForm(form) {
  clearErrors(form);
  let valid = true;

  const required = [
    { id: 'name',    msg: 'Введите имя' },
    { id: 'phone',   msg: 'Введите телефон' },
    { id: 'service', msg: 'Выберите услугу' },
    { id: 'make',    msg: 'Выберите марку автомобиля' },
    { id: 'model',   msg: 'Выберите модель' },
    { id: 'comment', msg: 'Опишите симптомы или проблему' },
  ];

  required.forEach(({ id, msg }) => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      showFieldError(el, msg);
      valid = false;
    }
  });

  const phone = document.getElementById('phone');
  if (phone.value && phone.value.replace(/\D/g, '').length < 11) {
    showFieldError(phone, 'Введите полный номер телефона');
    valid = false;
  }

  const consent = document.getElementById('consent');
  if (!consent.checked) {
    const group = consent.closest('.form-check');
    if (group) {
      group.classList.add('has-error');
      const err = document.createElement('span');
      err.className = 'form-error-msg';
      err.textContent = 'Необходимо согласие на обработку данных';
      group.appendChild(err);
    }
    valid = false;
  }

  if (!valid) {
    const firstError = form.querySelector('.has-error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  return valid;
}

function showFieldError(el, msg) {
  const group = el.closest('.form-group');
  if (!group) return;
  group.classList.add('has-error');
  const err = document.createElement('span');
  err.className = 'form-error-msg';
  err.textContent = msg;
  group.appendChild(err);
}

function clearErrors(form) {
  form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
  form.querySelectorAll('.form-error-msg').forEach(el => el.remove());
}
