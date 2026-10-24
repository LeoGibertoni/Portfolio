// Tema claro/escuro
const raiz = document.documentElement;
const temaBtn = document.getElementById('temaBtn');

try {
  const salvo = localStorage.getItem('tema');
  if (salvo) raiz.dataset.tema = salvo;
} catch (e) {}

temaBtn.addEventListener('click', () => {
  const escuroAgora =
    raiz.dataset.tema === 'escuro' ||
    (!raiz.dataset.tema && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const novo = escuroAgora ? 'claro' : 'escuro';
  raiz.dataset.tema = novo;
  try { localStorage.setItem('tema', novo); } catch (e) {}
});

// Menu no celular
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  const aberto = nav.classList.toggle('aberto');
  menuBtn.setAttribute('aria-expanded', String(aberto));
});
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('aberto');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// Sombra no topo ao rolar
const topo = document.getElementById('topo');
const aoRolar = () => topo.classList.toggle('rolou', window.scrollY > 8);
window.addEventListener('scroll', aoRolar, { passive: true });
aoRolar();

// Filtro de projetos
const filtros = document.querySelectorAll('.filtro');
const projetos = document.querySelectorAll('.projeto');
const vazio = document.getElementById('vazio');

filtros.forEach((botao) => {
  botao.addEventListener('click', () => {
    filtros.forEach((b) => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    const tipo = botao.dataset.filtro;
    let visiveis = 0;
    projetos.forEach((p) => {
      const mostrar = tipo === 'todos' || p.dataset.tipo === tipo;
      p.hidden = !mostrar;
      if (mostrar) visiveis++;
    });
    vazio.hidden = visiveis > 0;
  });
});

// Texto que se escreve sozinho no título
const alvo = document.getElementById('digita');
const frases = ['com HTML', 'com CSS', 'com JavaScript', 'do zero'];
const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduzMovimento) {
  let f = 0, c = frases[0].length, apagando = true;
  const passo = () => {
    const frase = frases[f];
    alvo.textContent = frase.slice(0, c);
    let espera = apagando ? 45 : 85;

    if (!apagando && c === frase.length) { apagando = true; espera = 1600; }
    else if (apagando && c === 0) { apagando = false; f = (f + 1) % frases.length; espera = 300; }
    else { c += apagando ? -1 : 1; }

    setTimeout(passo, espera);
  };
  setTimeout(passo, 1800);
}

// Aparecer ao rolar
const reveladas = document.querySelectorAll('.revela');
if ('IntersectionObserver' in window && !reduzMovimento) {
  const obs = new IntersectionObserver((itens) => {
    itens.forEach((item) => {
      if (item.isIntersecting) {
        item.target.classList.add('visivel');
        obs.unobserve(item.target);
      }
    });
  }, { threshold: 0.12 });
  reveladas.forEach((el) => obs.observe(el));
} else {
  reveladas.forEach((el) => el.classList.add('visivel'));
}

// Ano do rodapé
document.getElementById('ano').textContent = new Date().getFullYear();
