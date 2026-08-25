const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 40));
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.service-card, .about-copy, .about-visual, .steps article, .project-tile, .trust-grid article, .material-list article').forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.project-filters button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.project-filters .active')?.classList.remove('active');
    button.classList.add('active');
    document.querySelectorAll('.project-tile').forEach(tile => {
      const categories = tile.dataset.category.split(' ');
      tile.classList.toggle('hidden', button.dataset.filter !== 'all' && !categories.includes(button.dataset.filter));
    });
  });
});

const comparison = document.querySelector('.compare');
comparison?.querySelectorAll('.compare-controls button').forEach(button => {
  button.addEventListener('click', () => {
    comparison.dataset.state = button.dataset.view;
    comparison.querySelector('.compare-controls .active')?.classList.remove('active');
    button.classList.add('active');
  });
});

const themeButton = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('as-theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeButton.textContent = '☀';
  themeButton.setAttribute('aria-label', 'Switch to light mode');
}
themeButton?.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark-mode');
  themeButton.textContent = dark ? '☀' : '☾';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem('as-theme', dark ? 'dark' : 'light');
});

const numberElements = document.querySelectorAll('.hero-proof strong');
const numberObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.counted) return;
    entry.target.dataset.counted = 'true';
    const match = entry.target.textContent.match(/\d+/);
    if (!match) return;
    const target = Number(match[0]);
    const suffix = entry.target.textContent.replace(match[0], '');
    const start = performance.now();
    const animate = now => {
      const progress = Math.min((now - start) / 900, 1);
      entry.target.textContent = `${Math.round(target * progress)}${suffix}`;
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  });
}, { threshold: .7 });
numberElements.forEach(element => numberObserver.observe(element));

const translationGroups = [
  { selector: '.site-header nav>a:not(.nav-cta)', ur: ['ہوم', 'خدمات', 'ڈیزائن آئیڈیاز', 'ہمارے بارے میں', 'کام کا طریقہ'] },
  { selector: '.nav-cta', ur: ['قیمت معلوم کریں'] },
  { selector: '.eyebrow', ur: ['<span></span> 35+ سال کی ماہر کاریگری'], html: true },
  { selector: '.hero h1', ur: ['جگہوں کو بنائیں<br><em>بامقصد اور خوبصورت۔</em>'], html: true },
  { selector: '.hero-copy', ur: ['لاہور میں سعودی تجربے کے ساتھ پروفیشنل لکڑی کا کام، کسٹم کچن، دروازے، سیلنگ اور پارٹیشن کی مکمل سہولت۔'] },
  { selector: '.hero-actions a', ur: ['اپنا کام شروع کریں <span>↗</span>', 'ہماری خدمات دیکھیں'], html: true },
  { selector: '.hero-proof>div>span', ur: ['سال کا<br>تجربہ', 'بین الاقوامی<br>کام کا معیار', 'لاہور میں<br>کام کا تجربہ'], html: true },
  { selector: '.scroll', ur: ['نیچے دیکھیں <span>↓</span>'], html: true },
  { selector: '.intro .section-label', ur: ['ہم کیا بناتے ہیں'] },
  { selector: '.intro h2', ur: ['ایک ماہر ٹیم، ہر تفصیل پر توجہ۔<br><span>مضبوط اور دیرپا کام۔</span>'], html: true },
  { selector: '.intro>p:last-child', ur: ['ایک دروازے سے مکمل انٹیریئر تک، ہم ماہر کاریگری، عملی ڈیزائن اور معیاری مٹیریل کے ساتھ صاف اور پائیدار کام فراہم کرتے ہیں۔'] },
  { selector: '.services .section-label', ur: ['ہماری مہارت'] },
  { selector: '.services .section-head h2', ur: ['انٹیریئر کی تمام<br>ضروری خدمات۔'], html: true },
  { selector: '.services .section-head>p', ur: ['گھروں، دفاتر، دکانوں اور کاروباری جگہوں کے لیے پیمائش سے آخری فٹنگ تک قابلِ اعتماد کام۔'] },
  { selector: '.service-card h3', ur: ['کسٹم لکڑی کا کام', 'کچن کیبنٹس', 'دروازے اور فریم', 'سیلنگ کے حل', 'پارٹیشن اور کمرے', 'ووڈ فلورنگ'] },
  { selector: '.service-card>p', ur: ['آپ کی جگہ کے مطابق فرنیچر، بیڈ روم الماریاں، وال پینلز اور نفیس فنشنگ۔', 'فارمیکا، لیمینیٹ، ایم ڈی ایف اور معیاری بورڈ سے جدید اور کارآمد کچن۔', 'مضبوط فریم کے ساتھ درست پیمائش میں لکڑی اور پی وی سی کے دروازے۔', 'صاف ستھری فالز سیلنگ جو کمرے کی خوبصورتی، روشنی اور آرام بہتر بنائے۔', 'نئے کمروں، دفاتر اور دکانوں کے لیے جگہ کی سمجھدار تقسیم۔', 'درست لائن اور دیرپا فنشنگ کے ساتھ خوبصورت لکڑی کے فرش۔'] },
  { selector: '.service-card li', ur: ['بیڈ روم الماریاں', 'آرائشی لکڑی کا کام', 'وال پینلنگ', 'فارمیکا کچن', 'کیبنٹ کی تنصیب', 'اسٹوریج کے حل', 'لکڑی کے دروازے', 'پی وی سی دروازے', 'دروازوں کے فریم', 'جپسم بورڈ سیلنگ', 'پی وی سی سیلنگ', 'ایلیمنٹ بورڈ کا کام', 'جپسم پارٹیشن', 'لکڑی کی پارٹیشن', 'کمرے کی پارٹیشن', 'لیمینیٹ فلورنگ', 'ووڈ فلورنگ', 'فرش کی فنشنگ'] },
  { selector: '.project-showcase .section-label', ur: ['ڈیزائن کی تجاویز'] },
  { selector: '.project-showcase .section-head h2', ur: ['دیکھیے ہم آپ کی جگہ کو<br><span>کیسا خوبصورت بنا سکتے ہیں۔</span>'], html: true },
  { selector: '.project-showcase .section-head>p', ur: ['یہ تصاویر مختلف اسٹائل، مٹیریل اور ممکنہ حل دکھاتی ہیں جنہیں ہم آپ کی جگہ اور بجٹ کے مطابق گھر، دفتر یا دکان کے لیے تیار کر سکتے ہیں۔'] },
  { selector: '.project-filters button', ur: ['تمام آئیڈیاز', 'لکڑی کا کام', 'کچن', 'سیلنگ', 'فنشنگ'] },
  { selector: '.project-tile span', ur: ['ڈیزائن آئیڈیا • کچن', 'ڈیزائن آئیڈیا • لکڑی', 'ڈیزائن آئیڈیا • لکڑی', 'ڈیزائن آئیڈیا • سیلنگ', 'ڈیزائن آئیڈیا • پارٹیشن', 'ڈیزائن آئیڈیا • فلورنگ', 'ڈیزائن آئیڈیا • لکڑی', 'ڈیزائن آئیڈیا • لکڑی', 'ڈیزائن آئیڈیا • کچن', 'ڈیزائن آئیڈیا • کچن', 'ڈیزائن آئیڈیا • کچن', 'ڈیزائن آئیڈیا • سیلنگ', 'ڈیزائن آئیڈیا • سیلنگ', 'ڈیزائن آئیڈیا • کمرشل', 'ڈیزائن آئیڈیا • انٹیریئر'] },
  { selector: '.project-tile h3', ur: ['کارآمد ماڈیولر کچن', 'پوری دیوار کی الماری', 'دروازے اور فریم', 'جپسم اور کو لائٹنگ', 'ڈسپلے پارٹیشن', 'لیمینیٹ ووڈ فلورنگ', 'ٹی وی میڈیا وال', 'ہوم آفس اسٹوریج', 'سفید یو وی کچن', 'فارمیکا اپارٹمنٹ کچن', 'گرے اور اوک کچن', 'بیڈ روم کو لائٹ سیلنگ', 'پی وی سی پینل سیلنگ', 'آفس ریسپشن سیلنگ', 'کچن اور سیلنگ فنش'] },
  { selector: '.transform-copy .section-label', ur: ['تبدیلی کا تصور'] },
  { selector: '.transform-copy h2', ur: ['دیکھیے آپ کی جگہ<br>کیسی بن سکتی ہے۔'], html: true },
  { selector: '.transform-copy>p:not(.section-label)', ur: ['یہ تصوراتی موازنہ آپ کو دکھاتا ہے کہ کس طرح کسٹم اسٹوریج اور صاف تنصیب اسی کمرے کو بدل سکتی ہے۔ مکمل یکساں جگہ دیکھنے کے لیے پہلے یا بعد کا بٹن منتخب کریں۔'] },
  { selector: '.transform-points span', ur: ['✓ درست پیمائش', '✓ کارآمد اسٹوریج', '✓ صاف تنصیب'] },
  { selector: '.compare-controls button', ur: ['پہلے', 'بعد میں'] },
  { selector: '.trust .section-label', ur: ['ہمیں کیوں منتخب کریں'] },
  { selector: '.trust-head h2', ur: ['ایسا تجربہ جو<br>آپ کے کام آئے۔'], html: true },
  { selector: '.trust-grid h3', ur: ['35+ سال', 'سائٹ کی پیمائش', 'مٹیریل کا انتخاب', 'براہِ راست رابطہ'] },
  { selector: '.trust-grid p', ur: ['بین الاقوامی اور لاہور مارکیٹ کے تجربے کا امتزاج۔', 'ہر کام درست پیمائش اور عملی مشورے سے شروع ہوتا ہے۔', 'آپ کے استعمال، پسند اور بجٹ کے مطابق واضح آپشنز۔', 'اپنا کام سنبھالنے والے تجربہ کار شخص سے براہِ راست بات کریں۔'] },
  { selector: '.area-strip p', ur: ['کام کے علاقے'] },
  { selector: '.materials .section-label', ur: ['مٹیریل کے آپشنز'] },
  { selector: '.materials .section-head h2', ur: ['درست مٹیریل،<br>درست استعمال۔'], html: true },
  { selector: '.materials .section-head>p', ur: ['ہم آپ کو ایسا فنش منتخب کرنے میں مدد دیتے ہیں جو خوبصورت، پائیدار اور بجٹ کے مطابق ہو۔'] },
  { selector: '.material-list h3', ur: ['ایم ڈی ایف اور لیمینیٹ', 'یو وی شیٹ', 'لکڑی اور وینیر', 'جپسم بورڈ', 'پی وی سی'] },
  { selector: '.material-list p', ur: ['الماریاں، کچن اور اسٹوریج', 'چمکدار جدید کچن فنش', 'دروازے، فریم اور آرائشی کام', 'سیلنگ اور کمروں کی پارٹیشن', 'دروازے اور نمی برداشت کرنے والی سیلنگ'] },
  { selector: '.about-copy .section-label', ur: ['ہماری کہانی'] },
  { selector: '.about-copy h2', ur: ['ایسا تجربہ جو<br><span>ہر تفصیل میں نظر آئے۔</span>'], html: true },
  { selector: '.about-copy>p:not(.section-label)', ur: ['اے ایس انٹیریئر ورکس سعودی عرب کی تعمیراتی اور انٹیریئر صنعت میں تین دہائیوں کے عملی تجربے پر قائم ہے۔ ہمارے بانی نے سعودی بن لادن گروپ میں 15 سال فورمین، آسیان انٹرنیشنل میں 6 سال اور سعودی اوجر میں 7 سال کام کیا۔', 'گزشتہ 5 سال سے ہم یہی بین الاقوامی تجربہ لاہور میں لا رہے ہیں۔ ڈی ایچ اے، ماڈل ٹاؤن اور جوہر ٹاؤن میں رہائشی و کاروباری کام کیے ہیں، جن میں کسٹم کچن، دروازے، سیلنگ، پارٹیشن اور بیڈ روم الماریاں شامل ہیں۔', 'پہلی پیمائش سے آخری تنصیب تک ہر کام منظم طریقے، درست فنشنگ اور دیانت دار کاریگری کے ساتھ کیا جاتا ہے۔'] },
  { selector: '.experience span', ur: ['سال کا<br>تجربہ'], html: true },
  { selector: '.about-visual>p', ur: ['سعودی معیار۔<br>پاکستانی کاریگری۔'], html: true },
  { selector: '.company-strip small', ur: ['سعودی بن لادن گروپ', 'آسیان انٹرنیشنل', 'سعودی اوجر', 'لاہور کے کام'] },
  { selector: '.process .section-label', ur: ['ہمارا طریقۂ کار'] },
  { selector: '.process .section-head h2', ur: ['سادہ طریقہ،<br>مضبوط نتیجہ۔'], html: true },
  { selector: '.steps h3', ur: ['بات چیت', 'پیمائش', 'تیاری', 'تنصیب'] },
  { selector: '.steps p', ur: ['اپنی ضرورت، پسند، جگہ اور بجٹ ہمیں بتائیں۔', 'ہم سائٹ پر آ کر درست پیمائش کرتے ہیں۔', 'ہماری ماہر ٹیم ہر چیز احتیاط سے تیار کرتی ہے۔', 'ہم فٹنگ اور فنشنگ مکمل کر کے جگہ آپ کے حوالے کرتے ہیں۔'] },
  { selector: '.contact .section-label', ur: ['آئیے کچھ خوبصورت بنائیں'] },
  { selector: '.contact h2', ur: ['کوئی نیا کام<br>کروانا چاہتے ہیں؟'], html: true },
  { selector: '.contact-copy>p:not(.section-label)', ur: ['ہمیں اپنے کام کی مختصر تفصیل بھیجیں۔ ہم آپ سے رابطہ کر کے آپ کی جگہ کے لیے بہترین حل پر بات کریں گے۔'] },
  { selector: '.contact-links span', ur: ['فون کریں', 'ای میل کریں', 'ہمارا پتہ'] },
  { selector: '.field label', ur: ['آپ کا نام', 'فون نمبر', 'درکار خدمت', 'کام کی جگہ', 'متوقع بجٹ', 'اپنے کام کے بارے میں بتائیں'] },
  { selector: '#service option', ur: ['خدمت منتخب کریں', 'کسٹم لکڑی کا کام', 'کچن کیبنٹس', 'دروازے اور فریم', 'سیلنگ کے حل', 'پارٹیشن اور کمرے', 'ووڈ فلورنگ', 'دیگر انٹیریئر کام'] },
  { selector: '#budget option', ur: ['بجٹ منتخب کریں', '100,000 روپے سے کم', '100,000 سے 300,000 روپے', '300,000 سے 700,000 روپے', '700,000 روپے سے زیادہ'] },
  { selector: '.form-btn', ur: ['واٹس ایپ پر بھیجیں <span>↗</span>'], html: true },
  { selector: '.form-note', ur: ['آپ کی درخواست محفوظ طریقے سے واٹس ایپ میں کھلے گی۔'] },
  { selector: 'footer>p', ur: ['لکڑی کا کام • کچن • دروازے • سیلنگ • پارٹیشن', '© <span id="year"></span> اے ایس انٹیریئر ورکس۔ جملہ حقوق محفوظ ہیں۔'], html: true }
];

const placeholderTranslations = [
  ['#name', 'اپنا نام درج کریں'],
  ['#phone', '03XX XXXXXXX'],
  ['#location', 'مثال: ڈی ایچ اے، لاہور'],
  ['#message', 'کام کی قسم، جگہ اور ضروریات']
];

translationGroups.forEach(group => {
  document.querySelectorAll(group.selector).forEach(element => {
    element.dataset.englishCopy = group.html ? element.innerHTML : element.textContent;
  });
});
placeholderTranslations.forEach(([selector]) => {
  const element = document.querySelector(selector);
  if (element) element.dataset.englishPlaceholder = element.placeholder;
});

const languageButton = document.querySelector('.lang-toggle');
languageButton?.addEventListener('click', () => {
  const urdu = !document.body.classList.contains('urdu-mode');
  document.body.classList.toggle('urdu-mode', urdu);
  document.documentElement.lang = urdu ? 'ur' : 'en';
  document.documentElement.dir = urdu ? 'rtl' : 'ltr';
  languageButton.textContent = urdu ? 'English' : 'اردو';
  translationGroups.forEach(group => {
    document.querySelectorAll(group.selector).forEach((element, index) => {
      const copy = urdu ? group.ur[index] : element.dataset.englishCopy;
      if (copy === undefined) return;
      if (group.html) element.innerHTML = copy;
      else element.textContent = copy;
    });
  });
  placeholderTranslations.forEach(([selector, urduPlaceholder]) => {
    const element = document.querySelector(selector);
    if (element) element.placeholder = urdu ? urduPlaceholder : element.dataset.englishPlaceholder;
  });
  document.getElementById('year').textContent = new Date().getFullYear();
});

document.getElementById('quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const urdu = document.body.classList.contains('urdu-mode');
  const text = urdu ? [
    'السلام علیکم، میں اے ایس انٹیریئر ورکس سے قیمت معلوم کرنا چاہتا/چاہتی ہوں۔',
    '',
    `نام: ${data.get('name')}`,
    `فون: ${data.get('phone')}`,
    `درکار خدمت: ${data.get('service')}`,
    `جگہ: ${data.get('location') || 'نہیں بتایا'}`,
    `متوقع بجٹ: ${data.get('budget') || 'منتخب نہیں کیا'}`,
    `کام کی تفصیل: ${data.get('message') || 'نہیں بتائی'}`
  ].join('\n') : [
    'Assalam-o-Alaikum, I want a quote from AS Interior Works.',
    '',
    `Name: ${data.get('name')}`,
    `Phone: ${data.get('phone')}`,
    `Service: ${data.get('service')}`,
    `Location: ${data.get('location') || 'Not provided'}`,
    `Estimated budget: ${data.get('budget') || 'Not selected'}`,
    `Project details: ${data.get('message') || 'Not provided'}`
  ].join('\n');
  window.open(`https://wa.me/923206857809?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
