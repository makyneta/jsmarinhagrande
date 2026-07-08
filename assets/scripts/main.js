var noticias = [
  {
    img: 'assets/images/gallery/50yjs.jpg',
    tag: 'Evento',
    title: '50 anos da JS celebrados na Marinha Grande',
    text: 'A JS Marinha Grande marcou presença nas comemorações dos 50 anos da Juventude Socialista, num evento que juntou gerações de militantes e dirigentes. A celebração foi um momento de balanço e de renovação do compromisso com os valores socialistas, olhando para o futuro com a mesma determinação que caracteriza a JS desde a sua fundação.',
  },
  {
    img: 'assets/images/gallery/comissaopoliticadist.jpg',
    tag: 'Política',
    title: 'Comissão Política Distrital reúne dirigentes',
    text: 'Realizou-se mais uma reunião da Comissão Política Distrital da JS, com a participação dos representantes da JS Marinha Grande. Foram discutidas as estratégias de intervenção política no distrito, bem como as iniciativas a desenvolver nos próximos meses para fortalecer a presença da JS junto dos jovens de toda a região.',
  },
  {
    img: 'assets/images/gallery/habitacaocapa.jpg',
    tag: 'Habitação',
    title: 'JS defende políticas de habitação jovem',
    text: 'A habitação jovem continua a ser uma das principais preocupações da JS Marinha Grande. Numa iniciativa de sensibilização, os nossos militantes estiveram nas ruas a conversar com os jovens sobre as dificuldades no acesso à habitação e a apresentar as propostas socialistas para garantir uma casa digna para todos.',
  },
  {
    img: 'assets/images/gallery/habitacao.jpg',
    tag: 'Direitos',
    title: 'Ação de rua sobre habitação juntou dezenas',
    text: 'A JS Marinha Grande realizou uma ação de rua para alertar para a crise habitacional que afeta os jovens do concelho. A iniciativa contou com a participação de dezenas de militantes que distribuíram material informativo e recolheram testemunhos de jovens sobre as dificuldades em conseguir habitação digna e a preços acessíveis.',
  },
  {
    img: 'assets/images/gallery/visitaparl.jpg',
    tag: 'Instituições',
    title: 'Visita à Assembleia da República',
    text: 'Um grupo de militantes da JS Marinha Grande visitou a Assembleia da República, numa iniciativa que permitiu conhecer de perto o funcionamento do parlamento português. A visita incluiu uma reunião com deputados socialistas, onde foram discutidos temas como o ensino superior, o emprego jovem e as políticas de juventude.',
  },
  {
    img: 'assets/images/gallery/visitasantacasa.jpg',
    tag: 'Solidariedade',
    title: 'Voluntariado na Santa Casa da Misericórdia',
    text: 'A JS Marinha Grande organizou uma ação de voluntariado na Santa Casa da Misericórdia, onde os nossos militantes passaram uma tarde com os utentes da instituição. Foram momentos de partilha, convívio e solidariedade que reforçam o nosso compromisso com uma sociedade mais justa e inclusiva para todas as idades.',
  },
];

var isNoticiasPage = window.location.pathname.includes('noticias');
var total = isNoticiasPage ? noticias.length : 3;
var cards = document.querySelectorAll('.noticia-card');
var modal = document.getElementById('newsModal');
var modalImg = document.getElementById('nmImg');
var modalTag = document.getElementById('nmTag');
var modalTitle = document.getElementById('nmTitle');
var modalText = document.getElementById('nmText');

noticias.slice(0, total).forEach(function (n, i) {
  var card = cards[i];
  if (!card) return;
  card.querySelector('img').src = n.img;
  card.querySelector('h3').textContent = n.title;
  var p = card.querySelector('p');
  if (p) p.textContent = n.text.length > 120 ? n.text.slice(0, 120) + '…' : n.text;
  var tag = card.querySelector('.noticia-tag');
  if (tag) tag.textContent = n.tag;
  card.addEventListener('click', function (e) {
    e.stopPropagation();
    modalImg.src = n.img;
    modalTag.textContent = n.tag;
    modalTitle.textContent = n.title;
    modalText.textContent = n.text;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// REVEAL ON SCROLL
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add('reveal'); observer.unobserve(e.target); }
  });
}, { threshold: .15 });

document.querySelectorAll('.noticia-card, .contacto-btn').forEach(function (el) { observer.observe(el); });

// MODAL
function fecharModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }
modal.addEventListener('click', function (e) { if (e.target === modal) fecharModal(); });
document.getElementById('nmClose').addEventListener('click', fecharModal);
document.getElementById('nmFechar').addEventListener('click', fecharModal);
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) fecharModal(); });

// PROGRESS BAR
window.addEventListener('scroll', function () {
  var d = document.body.scrollHeight - window.innerHeight;
  document.getElementById('prog').style.width = (d > 0 ? (window.scrollY / d) * 100 : 0) + '%';
});

// NAV TOGGLE
(function () {
  var btn = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', function () {
    btn.classList.toggle('active');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      btn.classList.remove('active');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// HERO SLIDESHOW
(function () {
  var slides = document.querySelectorAll('.hero-slide');
  var indicatorsWrap = document.querySelector('.hero-indicators');
  if (!slides.length || !indicatorsWrap) return;
  var idx = 0, totalSlides = slides.length;
  for (var i = 0; i < totalSlides; i++) { var d = document.createElement('button'); d.className = 'hero-indicator'; d.setAttribute('aria-label','Slide '+(i+1)); if (i===0) d.classList.add('active'); indicatorsWrap.appendChild(d); }
  var indicators = indicatorsWrap.querySelectorAll('.hero-indicator');

  function goTo(i) {
    slides.forEach(function (s) { s.classList.remove('active'); });
    indicators.forEach(function (d) { d.classList.remove('active'); });
    idx = (i + totalSlides) % totalSlides;
    slides[idx].classList.add('active');
    if (indicators[idx]) indicators[idx].classList.add('active');
  }

  indicators.forEach(function (d, i) {
    d.addEventListener('click', function () { goTo(i); });
  });

  setInterval(function () { goTo(idx + 1); }, 5000);
})();
