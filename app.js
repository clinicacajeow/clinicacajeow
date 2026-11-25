/* Clínica Cajeow: lógica do site. Sem backend: pedidos viram mensagem pronta no WhatsApp da clínica. */
(function () {
  'use strict';

  /* ===== Configuração ===== */
  var CFG = {
    whatsapp: '5511992588029',
    /* Todos os formulários chegam ao e-mail da clínica, sem aviso ao visitante (serviço FormSubmit; exige hospedagem fora do Claude e a ativação única do e-mail). */
    endpoint: 'https://formsubmit.co/ajax/florescercajeow@gmail.com',
    /* Link direto da avaliação no Google: https://search.google.com/local/writereview?placeid=SEU_PLACE_ID  (vazio = busca pela clínica no Google) */
    googleReview: 'https://www.google.com/search?q=Cl%C3%ADnica%20Cajeow%20Desenvolvimento%20Humano%20Osasco%20avalia%C3%A7%C3%B5es#lrd=0x94ceff9df4efa049:0x4c5d40013f9d3698,3,,,,'
  };

  /* Avaliações reais do Google (copiar do perfil, com autorização). Formato: {nome, nota, texto, data}, ex.: data 'mai. de 2026'. Vazio = convite. */
  var REVIEWS = [
 {
  "nome": "Maria Gabriela Pinheiro",
  "nota": 5,
  "texto": "Todas são sempre muito atenciosas. As profissionais realmente dedicadas e acolhem muito bem o meu filho. Ele ama o dia da consulta. São comprometidas e sempre prontas pra ajudar. Dá pra ver que querem o melhor pros nossos filhos.",
  "data": "5 meses atrás"
 },
 {
  "nome": "Rodrigo Ferreira da Silva",
  "nota": 5,
  "texto": "Profissional excepcional! A Dra. Camila é extremamente atenciosa, acolhedora e transmite muita segurança em seus atendimentos. Sua escuta sensível e abordagem cuidadosa têm sido fundamentais no meu processo de desenvolvimento pessoal. Sou muito grato por todo o suporte que tem me oferecido. Recomendo com total confiança!",
  "data": "um ano atrás"
 },
 {
  "nome": "Ana Paula Carmona",
  "nota": 5,
  "texto": "Excelente profissional! Cuida do meu filho há 3 anos e é super atenciosa com ele e conosco.",
  "data": "5 meses atrás"
 },
 {
  "nome": "Lucas Vinnicius",
  "nota": 5,
  "texto": "Sou muito grato pelo cuidado e profissionalismo da psicóloga Camila. Meu filho se desenvolveu super bem durante o acompanhamento e sempre foi muito bem atendido, com atenção, acolhimento e paciência em cada detalhe. A Camila realmente se importa com o bem-estar, não só do meu filho mas o de minha família também, e isso fez toda a diferença no progresso.",
  "data": "um ano atrás"
 },
 {
  "nome": "Lilian Napolitano",
  "nota": 5,
  "texto": "A psicóloga Camila acompanha minha filha há mais de um ano e só vejo evolução, carinho e cuidado! Profissional competente, atenciosa e disposta a ouvir e acolher o paciente e a família! Há alguns meses a fono Jaque acompanha minha filha, e também observo o mesmo perfil de cuidado e acolhimento.",
  "data": "um ano atrás"
 },
 {
  "nome": "Luciene Gomes",
  "nota": 5,
  "texto": "Clínica ótima excelente profissionais a minha psicóloga é maravilhosa a Dra Raquel",
  "data": "5 meses atrás"
 },
 {
  "nome": "Solarie Odontologia",
  "nota": 5,
  "texto": "atendimento excelente, me sinto muito melhor a cada sessão",
  "data": "5 meses atrás"
 },
 {
  "nome": "Flávia Castro",
  "nota": 5,
  "texto": "Faço acompanhamento com a Camila há anos e não tenho palavras pra descrever o quanto ela me ajudou ao longo desse período. Uma profissional excelente, responsável e extremamente humana!",
  "data": "um ano atrás"
 },
 {
  "nome": "Gabrielle Lima Rocha de Melo",
  "nota": 5,
  "texto": "O lugar é ótimo e com profissionais devidamente capacitados, tem opções de consulta presencial e online. Não me arrependo de ter escolhido a clínica Cajeow, comecei as consultas a pouco tempo e me sinto melhor por ter alguém com quem conversar sobre meus problemas e situações normais do dia a dia.",
  "data": "um ano atrás"
 },
 {
  "nome": "Leandro Ribeiro",
  "nota": 5,
  "texto": "Boa clínica. Psicóloga Raquel Sakatauskas excelente",
  "data": "5 meses atrás"
 },
 {
  "nome": "Lucas Carvalho",
  "nota": 5,
  "texto": "Um lugar de muito acolhimento e cuidado! Só tenho a agradecer.",
  "data": "5 meses atrás"
 },
 {
  "nome": "Cinthia Santos",
  "nota": 5,
  "texto": "Mesmo no início do tratamento, já me sinto acolhida e confiante no processo. Sinto que estou no caminho certo para o cuidar da minha saúde mental. Obrigada pelo cuidado e atenção.",
  "data": "um ano atrás"
 },
 {
  "nome": "Dyanna Jesus Lima",
  "nota": 5,
  "texto": "Profissionais bem capacitados, ambiente saudável e agradável. Atualmente, faço minha terapia na clínica e me sinto bem acolhida.",
  "data": "um ano atrás"
 },
 {
  "nome": "Dayane Araújo",
  "nota": 5,
  "texto": "Meu filho faz terapia aqui e ele adora, com excelentes profissionais, meu filho é paciente da Alessandra, uma ótima profissional, muito atenciosa.",
  "data": "um ano atrás"
 },
 {
  "nome": "Michelle Pedroso",
  "nota": 5,
  "texto": "Adoro o atendimento, inclusive minha família toda passa por lá... ajuda muito em nossas vidas cuidar de nós mesmas.... amo esse lugar e as pisicos estão de parabéns!",
  "data": "um ano atrás"
 },
 {
  "nome": "Paloma Mendes",
  "nota": 5,
  "texto": "A melhor psicóloga que ja tive!! Pode marcar sua consulta q vc nao vai se arrepender.",
  "data": "um ano atrás"
 },
 {
  "nome": "Aline Galdino Souza Rodrigues",
  "nota": 5,
  "texto": "Ambiente acolhedor, ótimas profissionais!",
  "data": "5 meses atrás"
 },
 {
  "nome": "Elizabeth Pereira",
  "nota": 5,
  "texto": "Lugar acolhedor, moderno e com profissionais capacitados para as demandas informadas, minha família AMA, indicamos de olhos fechados!",
  "data": "um ano atrás"
 },
 {
  "nome": "Izaneide Souza",
  "nota": 5,
  "texto": "Excelente. Está me ajudando muito",
  "data": "5 meses atrás"
 }
];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  function waUrl(text) { return 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(text); }
  function clean(v) { return (v || '').replace(/\s+/g, ' ').trim(); }
  function phoneOk(v) { return (v || '').replace(/\D/g, '').length >= 10; }
  function fmtDate(v) { if (!v) return ''; var p = v.split('-'); return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : v; }
  /* Envia o registro ao e-mail da clínica. Resolve true se o serviço confirmou; false em qualquer falha (o fluxo do visitante segue pelo WhatsApp). */
  function sendLead(kind, text, nome, tel, file) {
    if (!CFG.endpoint) return Promise.resolve(false);
    try {
      var fd = new FormData();
      fd.append('_subject', '[Site Cajeow] ' + kind + (nome ? ' | ' + nome : ''));
      fd.append('_template', 'table'); fd.append('_captcha', 'false');
      fd.append('Formulário', kind); if (nome) fd.append('Nome', nome); if (tel) fd.append('Telefone', tel);
      fd.append('Dados completos', text);
      fd.append('Enviado em', new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }));
      if (file) fd.append('attachment', file, file.name);
      return fetch(CFG.endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
        .then(function (r) { return r.ok; }, function () { return false; });
    } catch (e) { return Promise.resolve(false); }
  }

  /* links com mensagem pronta */
  $$('[data-wa]').forEach(function (a) { a.href = waUrl(a.getAttribute('data-wa')); });
  $$('[data-google]').forEach(function (a) { a.href = CFG.googleReview || 'https://www.google.com/search?q=' + encodeURIComponent('Clínica Cajeow Desenvolvimento Humano Osasco avaliações'); });

  /* ===== Menu ===== */
  var burger = $('#burger'), nav = $('#nav');
  burger.addEventListener('click', function () {
    var o = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', o ? 'true' : 'false');
  });
  $$('#nav a, #nav button').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }); });

  /* ===== Modais ===== */
  var agendarPreset = '';
  function openDlg(name, esp) {
    var d = $('#m-' + name);
    if (!d) return;
    if (name === 'agendar') { agendarPreset = esp || ''; agReset(); }
    if (!d.open) d.showModal();
  }
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); openDlg(o.getAttribute('data-open'), o.getAttribute('data-esp')); return; }
    var c = e.target.closest('[data-close]');
    if (c) { var d = c.closest('dialog'); if (d) d.close(); return; }
    if (e.target.tagName === 'DIALOG' && e.target.open) e.target.close();
  });

  /* ===== Abas de especialidades ===== */
  var tabs = $$('.tabs [role=tab]');
  function selTab(t) {
    tabs.forEach(function (b) {
      var on = b === t;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      $('#' + b.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selTab(t); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { var n = tabs[(i + 1) % tabs.length]; n.focus(); selTab(n); }
      if (e.key === 'ArrowLeft') { var p = tabs[(i + tabs.length - 1) % tabs.length]; p.focus(); selTab(p); }
    });
  });

  /* ===== Faixas em movimento ===== */
  function marquee(t) {
    if (!t) return;
    var gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    t.style.columnGap = '0px';
    function pad() { if (gap > 0) $$(':scope > *', t).forEach(function (c) { c.style.marginRight = gap + 'px'; }); }
    pad();
    var base = $$(':scope > *', t), g = 0;
    while (t.scrollWidth < window.innerWidth + 300 && g < 12) { base.forEach(function (c) { t.appendChild(c.cloneNode(true)); }); g++; }
    $$(':scope > *', t).slice().forEach(function (c) { var k = c.cloneNode(true); k.setAttribute('aria-hidden', 'true'); t.appendChild(k); });
    pad();
    var sp = t.getAttribute('data-speed') || 28;
    t.style.animationDuration = Math.round(t.scrollWidth / 2 / sp) + 's';
  }

  /* ===== Avaliações (cartões no formato do Google) ===== */
  (function () {
    var tr = $('#revtrack'); if (!tr) return;
    var COLS = ['#E24F82', '#F2784B', '#E3A21A', '#0E9A9A', '#2FAE86', '#6DBE5B'];
    function card(r, i) {
      var n = r.nota || 5, ini = (r.nome || '?').trim().charAt(0).toUpperCase();
      var av = h('span', { class: 'av', text: ini }); av.style.background = COLS[i % COLS.length];
      return h('div', { class: 'rcard' }, [
        h('div', { class: 'st', 'aria-label': n + ' de 5 estrelas', text: new Array(n + 1).join('★') }),
        h('p', { text: r.texto }),
        h('div', { class: 'who' }, [av, h('div', null, [h('b', { text: r.nome }), h('small', { text: 'Avaliação no Google' + (r.data ? ' · ' + r.data : '') })])])
      ]);
    }
    if (REVIEWS.length) {
      REVIEWS.forEach(function (r, i) { tr.appendChild(card(r, i)); });
      tr.setAttribute('data-mq', ''); tr.setAttribute('data-speed', '32');
    } else {
      tr.style.animation = 'none'; tr.style.width = 'auto'; tr.style.justifyContent = 'center'; tr.parentNode.style.padding = '6px 16px';
      var e = card({ nome: 'Clínica Cajeow', nota: 5, texto: 'Foi atendido pela Clínica Cajeow? Conte como foi a sua experiência na nossa página do Google.' }, 0);
      e.classList.add('empty'); tr.appendChild(e);
    }
  })();

  /* ===== Convênios ===== */
  var PLANS = {
    hapvida: { svc: [['Psicologia', 'Psicoterapia para crianças, adolescentes e adultos.'], ['Fonoaudiologia', 'Comunicação, linguagem e fala, em sala exclusiva.']], note: 'Atendimento pelo plano Hapvida NotreDame Intermédica. Confirme com a equipe a cobertura do seu plano e se há necessidade de encaminhamento.' },
    amil: { svc: [['Psicologia', 'Psicoterapia para crianças, adolescentes e adultos.'], ['Fonoaudiologia', 'Comunicação, linguagem e fala, em sala exclusiva.'], ['Avaliação neuropsicológica', 'Investigação de atenção, memória, linguagem e funções executivas.']], note: 'Atendimento pelo plano Amil. Confirme com a equipe a cobertura do seu plano e se há necessidade de encaminhamento.' },
    part: { svc: [['Psicologia', 'Psicoterapia para crianças, adolescentes e adultos.'], ['Fonoaudiologia', 'Comunicação, linguagem e fala, em sala exclusiva.'], ['Avaliação neuropsicológica', 'Investigação de atenção, memória, linguagem e funções executivas.']], note: 'No atendimento particular você pode solicitar reembolso ao seu plano, conforme o contrato. Fale com a equipe para saber os documentos que fornecemos.' }
  };
  function showPlan(k) {
    var p = PLANS[k], box = $('#svc');
    box.textContent = '';
    p.svc.forEach(function (s, i) {
      var r = h('div', { class: 'row' }, [h('span', { class: 'mk', text: '✓' }), h('div', null, [h('b', { text: s[0] }), h('small', { text: s[1] })])]);
      r.style.animationDelay = (i * 80) + 'ms';
      box.appendChild(r);
    });
    var n = $('#pnote'); n.textContent = p.note + ' ';
    n.appendChild(h('a', { href: '#', 'data-open': 'agendar', text: 'Solicitar agendamento' }));
    $$('.seg button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-plan') === k ? 'true' : 'false'); });
  }
  $$('.seg button').forEach(function (b) { b.addEventListener('click', function () { showPlan(b.getAttribute('data-plan')); }); });
  showPlan('part');

  /* ===== Formulário genérico ===== */
  function showDone(doneEl, formEl, title, text, msg, sent) {
    if (formEl) formEl.hidden = true;
    doneEl.textContent = '';
    if (sent) {
      doneEl.appendChild(h('h3', { text: 'Recebemos o seu pedido' }));
      doneEl.appendChild(h('p', { text: 'A equipe da Clínica Cajeow entra em contato pelo telefone informado. Se preferir agilizar, você também pode chamar no WhatsApp.' }));
      doneEl.appendChild(h('a', { class: 'btn b-wa', href: waUrl(msg), target: '_blank', rel: 'noopener', text: 'Falar no WhatsApp' }));
    } else {
      doneEl.appendChild(h('h3', { text: title }));
      doneEl.appendChild(h('p', { text: text }));
      doneEl.appendChild(h('a', { class: 'btn b-wa', href: waUrl(msg), target: '_blank', rel: 'noopener', text: 'Enviar pelo WhatsApp' }));
      doneEl.appendChild(h('p', { class: 'msg', text: 'Importante: o pedido só chega à equipe quando a mensagem é enviada no WhatsApp.' }));
    }
    doneEl.hidden = false;
  }
  function err(el, t) { el.textContent = t; el.hidden = false; el.focus && el.focus(); }
  function simpleForm(id, cfg) {
    var f = $('#' + id); if (!f) return;
    var dlg = f.closest('dialog');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = $('#' + cfg.p + '-msg'); m.hidden = true;
      var msg = cfg.check();
      if (msg) { err(m, msg); return; }
      var text = cfg.build() + '\n[origem: site]';
      var nm = $('#' + cfg.nm) ? clean($('#' + cfg.nm).value) : '', tl = $('#' + cfg.tl) ? clean($('#' + cfg.tl).value) : '';
      var btn = f.querySelector('[type=submit]'); if (btn) btn.disabled = true;
      sendLead(cfg.label, text, nm, tl).then(function (ok) { if (btn) btn.disabled = false; showDone($('#' + cfg.p + '-done'), f, cfg.title, cfg.text, text, ok); });
    });
    if (dlg) dlg.addEventListener('close', function () { f.hidden = false; f.reset(); $('#' + cfg.p + '-done').hidden = true; $('#' + cfg.p + '-msg').hidden = true; });
  }
  function v(id) { return clean($('#' + id).value); }
  function basic(n, t, o) { if (!v(n)) return 'Informe o seu nome.'; if (!phoneOk($('#' + t).value)) return 'Informe um WhatsApp com DDD.'; if (!$('#' + o).checked) return 'Marque a autorização de contato para enviar.'; return ''; }

  simpleForm('f-duvida', {
    p: 'd', nm: 'd-nome', tl: 'd-tel', label: 'Dúvida (questionário)', title: 'Recebemos a sua dúvida', text: 'Falta só um passo: envie a mensagem pelo WhatsApp e a equipe entra em contato com você.',
    check: function () { if (!v('d-sit')) return 'Escolha a situação que mais se parece com a sua.'; if (!v('d-quem')) return 'Diga quem precisa de atendimento.'; return basic('d-nome', 'd-tel', 'd-ok'); },
    build: function () {
      return 'Olá! Sou ' + v('d-nome') + ' e deixei uma dúvida pelo site da Clínica Cajeow.\n' +
        'Situação: ' + v('d-sit') + '\nQuem precisa: ' + v('d-quem') + (v('d-idade') ? '\nIdade: ' + v('d-idade') : '') +
        (v('d-diag') ? '\nDiagnóstico ou relatório: ' + v('d-diag') : '') + (v('d-ant') ? '\nJá fez acompanhamento: ' + v('d-ant') : '') +
        (v('d-txt') ? '\nDúvida: ' + v('d-txt') : '') + '\nContato preferido: ' + v('d-como') + (v('d-turno') ? ' (' + v('d-turno') + ')' : '') + '\nTelefone: ' + v('d-tel');
    }
  });
  simpleForm('f-visita', {
    p: 'v', nm: 'v-nome', tl: 'v-tel', label: 'Agendar visita', title: 'Pedido de visita pronto', text: 'Envie pelo WhatsApp e a equipe combina o dia e o horário com você.',
    check: function () { return basic('v-nome', 'v-tel', 'v-ok'); },
    build: function () { return 'Olá! Sou ' + v('v-nome') + ' e gostaria de agendar uma visita à Clínica Cajeow.' + (v('v-data') ? '\nDia preferido: ' + fmtDate(v('v-data')) : '') + (v('v-turno') ? '\nPeríodo: ' + v('v-turno') : '') + (v('v-obs') ? '\nObservação: ' + v('v-obs') : '') + '\nTelefone: ' + v('v-tel'); }
  });
  simpleForm('f-dep', {
    p: 'dp', title: 'Obrigado por contar a sua experiência', text: 'Envie pelo WhatsApp para a equipe receber o seu depoimento. Nada é publicado sem a sua autorização e a revisão da equipe.',
    check: function () {
      if (!v('dp-nome')) return 'Informe o seu nome.'; if (!phoneOk($('#dp-tel').value)) return 'Informe um WhatsApp com DDD.';
      if (v('dp-txt').length < 15) return 'Escreva um pouco mais sobre a sua experiência.'; if (!$('#dp-ok').checked) return 'Marque a concordância com a Política de Privacidade.'; return '';
    },
    build: function () { return 'Depoimento para a Clínica Cajeow\nNome: ' + v('dp-nome') + '\n“' + v('dp-txt') + '”\nPublicação autorizada após revisão: ' + ($('#dp-pub').checked ? 'sim' : 'não') + '\nTelefone: ' + v('dp-tel'); }
  });
  /* Candidatura com anexo: o envio do arquivo exige endpoint (hospedagem própria). Sem ele, a mensagem vai pelo WhatsApp e o currículo segue depois. */
  (function () {
    var f = $('#f-trab'); if (!f) return;
    var fi = $('#tr-file'), fn = $('#tr-fname'), dlg = f.closest('dialog');
    var OKEXT = /\.(pdf|doc|docx)$/i, MAX = 5 * 1024 * 1024;
    fi.addEventListener('change', function () {
      var x = fi.files && fi.files[0];
      fn.textContent = x ? x.name + ' (' + Math.max(1, Math.round(x.size / 1024)) + ' KB)' : 'Nenhum arquivo selecionado.';
    });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = $('#tr-msg'); m.hidden = true;
      if (!v('tr-area')) return err(m, 'Escolha a área de atuação.');
      var b = basic('tr-nome', 'tr-tel', 'tr-ok'); if (b) return err(m, b);
      var x = fi.files && fi.files[0];
      if (x && (!OKEXT.test(x.name) || x.size > MAX)) return err(m, 'Anexe o currículo em PDF, DOC ou DOCX, com até 5 MB.');
      var text = 'Olá! Sou ' + v('tr-nome') + ' e gostaria de trabalhar na Clínica Cajeow.\nÁrea: ' + v('tr-area') + (v('tr-reg') ? '\nRegistro: ' + v('tr-reg') : '') + (v('tr-obs') ? '\nExperiência: ' + v('tr-obs') : '') + (x ? '\nCurrículo anexado no site: ' + x.name : '') + '\nTelefone: ' + v('tr-tel') + '\n[origem: site, trabalhe conosco]';
      var done = $('#tr-done');
      var finish = function (sent) {
        f.hidden = true; done.textContent = '';
        done.appendChild(h('h3', { text: sent ? 'Candidatura enviada' : 'Candidatura pronta' }));
        done.appendChild(h('p', { text: sent ? 'Recebemos os seus dados e o currículo. Se houver uma vaga compatível, entraremos em contato.' : 'Envie a mensagem pelo WhatsApp para a equipe receber o seu contato.' }));
        if (!sent) {
          done.appendChild(h('a', { class: 'btn b-wa', href: waUrl(text), target: '_blank', rel: 'noopener', text: 'Enviar pelo WhatsApp' }));
          done.appendChild(h('p', { class: 'msg', text: x ? 'Importante: neste momento o arquivo anexado não é enviado pelo site. Depois da mensagem, envie o currículo à equipe pelo mesmo WhatsApp.' : 'Importante: a candidatura só chega à equipe quando a mensagem é enviada no WhatsApp.' }));
        }
        done.hidden = false;
      };
      var btn = f.querySelector('[type=submit]'); if (btn) btn.disabled = true;
      sendLead('Trabalhe conosco', text, v('tr-nome'), v('tr-tel'), x).then(function (ok) { if (btn) btn.disabled = false; finish(ok); });
    });
    if (dlg) dlg.addEventListener('close', function () { f.hidden = false; f.reset(); fn.textContent = 'Nenhum arquivo selecionado.'; $('#tr-done').hidden = true; $('#tr-msg').hidden = true; });
  })();

  /* ===== Agendamento em 4 etapas ===== */
  var agStep = 1, agPartial = false;
  var ALL = ['Psicologia', 'Fonoaudiologia', 'Avaliação neuropsicológica'];
  function fillEsp(keep) {
    var forma = v('a-forma'), list = forma === 'Hapvida NotreDame Intermédica' ? ALL.slice(0, 2) : ALL;
    var s = $('#a-esp'); s.textContent = '';
    s.appendChild(h('option', { value: '', text: 'Selecione' }));
    list.forEach(function (n) { s.appendChild(h('option', { value: n, text: n })); });
    if (keep && list.indexOf(keep) > -1) s.value = keep;
  }
  function agShow() {
    $$('#m-agendar .sp').forEach(function (p) { p.classList.toggle('on', +p.getAttribute('data-s') === agStep); });
    var marks = $$('#ag-steps > *');
    marks.forEach(function (m) {
      if (m.tagName === 'I') { var n = +m.textContent; m.className = n === agStep ? 'on' : n < agStep ? 'ok' : ''; }
      else { var idx = marks.indexOf(m); m.className = (idx / 2) < agStep ? 'ok' : ''; }
    });
    $('#a-back').style.visibility = agStep === 1 ? 'hidden' : 'visible';
    $('#a-next').textContent = agStep === 4 ? 'Enviar pelo WhatsApp' : 'Próximo';
    if (agStep === 4) agSummary();
    $('#a-msg').hidden = true;
  }
  function agReset() {
    agStep = 1; agPartial = false;
    ['a-pac', 'a-nasc', 'a-resp', 'a-tel', 'a-mail', 'a-forma', 'a-data', 'a-turno', 'a-obs'].forEach(function (i) { $('#' + i).value = ''; });
    $('#a-ok').checked = false;
    fillEsp(agendarPreset);
    $('#a-turno').innerHTML = TURNOS; $('#a-hint').textContent = 'Atendemos de segunda a sexta, das 8h às 19h, e aos sábados, das 8h às 12h30.';
    $('#a-done').hidden = true;
    $$('#m-agendar .sp, #m-agendar .nav2, #ag-steps').forEach(function (e) { e.style.display = ''; });
    agShow();
  }
  function agSummary() {
    var rows = [['Paciente', v('a-pac')], ['Nascimento', fmtDate($('#a-nasc').value)], ['Responsável', v('a-resp')], ['Telefone', v('a-tel')], ['E-mail', v('a-mail')],
      ['Forma de atendimento', v('a-forma')], ['Especialidade', v('a-esp')], ['Data preferida', fmtDate($('#a-data').value)], ['Período', v('a-turno')], ['Observações', v('a-obs')]];
    var box = $('#a-sum'); box.textContent = '';
    rows.forEach(function (r) { if (r[1]) box.appendChild(h('div', null, [h('span', { text: r[0] }), h('b', { text: r[1] })])); });
  }
  function agCheck() {
    if (agStep === 1) { if (!v('a-pac')) return 'Informe o nome do paciente.'; }
    if (agStep === 2) { if (!v('a-resp')) return 'Informe o nome do responsável.'; if (!phoneOk($('#a-tel').value)) return 'Informe um telefone com DDD.'; }
    if (agStep === 3) { if (!v('a-forma')) return 'Escolha a forma de atendimento.'; if (!v('a-esp')) return 'Escolha a especialidade.'; }
    if (agStep === 4) { if (!$('#a-ok').checked) return 'Marque a autorização de contato para enviar.'; }
    return '';
  }
  var TURNOS = $('#a-turno').innerHTML;
  $('#a-data').addEventListener('change', function () {
    var v = this.value, hint = $('#a-hint'), sel = $('#a-turno');
    if (!v) { sel.innerHTML = TURNOS; hint.textContent = 'Atendemos de segunda a sexta, das 8h às 19h, e aos sábados, das 8h às 12h30.'; return; }
    var d = new Date(v + 'T12:00:00').getDay();
    if (d === 0) { this.value = ''; sel.innerHTML = TURNOS; hint.textContent = 'Não atendemos aos domingos. Escolha outra data.'; return; }
    var last = d === 6 ? 12 : 18, o = '<option value="">Sem preferência</option>';
    for (var h = 8; h <= last; h++) o += '<option>' + (h < 10 ? '0' : '') + h + ':00</option>';
    sel.innerHTML = o;
    hint.textContent = d === 6 ? '✓ Aos sábados atendemos das 08:00 às 12:30.' : '✓ Atendemos das 08:00 às 19:00.';
  });
  $('#a-forma').addEventListener('change', function () { fillEsp($('#a-esp').value); });
  $('#a-back').addEventListener('click', function () { if (agStep > 1) { agStep--; agShow(); } });
  $('#a-next').addEventListener('click', function () {
    var m = agCheck();
    if (m) { var el = $('#a-msg'); el.textContent = m; el.hidden = false; return; }
    if (agStep === 2 && !agPartial) {
      agPartial = true;
      sendLead('Agendamento (etapa de contato concluída)', 'Paciente: ' + v('a-pac') + '\nResponsável: ' + v('a-resp') + '\nTelefone: ' + v('a-tel') + (v('a-mail') ? '\nE-mail: ' + v('a-mail') : ''), v('a-resp'), v('a-tel'));
    }
    if (agStep < 4) { agStep++; agShow(); return; }
    var text = 'Olá! Gostaria de solicitar um agendamento na Clínica Cajeow.\nPaciente: ' + v('a-pac') + (v('a-nasc') ? ' (nascimento ' + fmtDate($('#a-nasc').value) + ')' : '') +
      '\nResponsável: ' + v('a-resp') + '\nTelefone: ' + v('a-tel') + (v('a-mail') ? '\nE-mail: ' + v('a-mail') : '') +
      '\nForma de atendimento: ' + v('a-forma') + '\nEspecialidade: ' + v('a-esp') + (v('a-data') ? '\nData preferida: ' + fmtDate($('#a-data').value) : '') +
      (v('a-turno') ? '\nPeríodo: ' + v('a-turno') : '') + (v('a-obs') ? '\nObservações: ' + v('a-obs') : '') + '\n[origem: site]';
    var nx = $('#a-next'); nx.disabled = true;
    sendLead('Agendamento de atendimento', text, v('a-resp'), v('a-tel')).then(function (ok) {
      nx.disabled = false;
      $$('#m-agendar .sp, #m-agendar .nav2, #ag-steps, #a-msg').forEach(function (e) { e.style.display = 'none'; });
      showDone($('#a-done'), null, 'Pedido de agendamento pronto', 'Falta só um passo: envie a mensagem pelo WhatsApp e a equipe confirma o horário com você.', text, ok);
    });
  });

  /* ===== Guia de desenvolvimento infantil =====
     Base: marcos do CDC/AAP "Learn the Signs. Act Early." (revisão de 2022; Zubler et al., Pediatrics 2022;149(3):e2021052138),
     tradução da Sociedade Brasileira de Pediatria (2024) e Caderneta da Criança do Ministério da Saúde (7ª ed.). Redação geral, para famílias. */
  var OPT = ['Sim, já faz', 'Não tenho certeza', 'Ainda não'];
  var DOM = { s: 'Social e emocional', l: 'Linguagem e comunicação', c: 'Cognição e aprendizagem', m: 'Movimento e coordenação' };
  var ALERTS = [
    ['Para qualquer idade', 'A criança perdeu alguma habilidade que já tinha?'],
    ['Para qualquer idade', 'Há algo que a criança faz ou deixa de fazer que preocupa você?']
  ];
  var AGES = {
    '6': { label: '6 meses', sub: '', q: [
      ['s', 'Reconhece pessoas familiares?'], ['s', 'Dá risadas?'],
      ['l', 'Alterna sons com você, como numa conversa?'], ['l', 'Sopra “framboesas” (põe a língua para fora e sopra)?'],
      ['c', 'Coloca coisas na boca para explorá-las?'], ['c', 'Estica-se para pegar um brinquedo que quer?'],
      ['m', 'Rola de barriga para baixo para barriga para cima?'], ['m', 'Apoia-se nas mãos para se sustentar quando sentado?']] },
    '9': { label: '9 meses', sub: '', q: [
      ['s', 'Olha quando você o chama pelo nome?'], ['s', 'Sorri ou ri quando você brinca de esconde-achou?'],
      ['l', 'Faz sons diferentes, como “mamama” e “bababa”?'], ['l', 'Levanta os braços para ser pego no colo?'],
      ['c', 'Procura objetos que caíram fora de vista?'], ['c', 'Bate duas coisas uma na outra?'],
      ['m', 'Senta-se sem apoio?'], ['m', 'Passa objetos de uma mão para a outra?']] },
    '12': { label: '12 meses', sub: '1 ano', q: [
      ['s', 'Brinca de jogos com você, como bater palminhas?'],
      ['l', 'Acena “tchau”?'], ['l', 'Chama os responsáveis de “mamã”, “papá” ou outro nome especial?'], ['l', 'Entende o “não”, parando por um instante?'],
      ['c', 'Coloca algo dentro de um recipiente, como um bloco num copo?'], ['c', 'Procura coisas que viu você esconder?'],
      ['m', 'Puxa-se para ficar de pé?'], ['m', 'Pega objetos pequenos entre o polegar e o indicador?']] },
    '18': { label: '18 meses', sub: '1 ano e meio', q: [
      ['s', 'Aponta para mostrar algo interessante?'], ['s', 'Olha algumas páginas de um livro com você?'],
      ['l', 'Tenta dizer três ou mais palavras além de “mamã” e “papá”?'], ['l', 'Segue pedidos simples sem gestos, como “me dá isso”?'],
      ['c', 'Imita você em tarefas da casa, como varrer?'], ['c', 'Brinca com brinquedos de forma simples, como empurrar um carrinho?'],
      ['m', 'Anda sem se segurar?'], ['m', 'Tenta usar a colher para comer?']] },
    '24': { label: '2 anos', sub: '24 meses', q: [
      ['s', 'Percebe quando alguém está machucado ou chateado?'], ['s', 'Olha para o seu rosto para saber como reagir numa situação nova?'],
      ['l', 'Diz pelo menos duas palavras juntas, como “mais leite”?'], ['l', 'Aponta pelo menos duas partes do corpo quando você pede?'],
      ['c', 'Segura algo com uma mão enquanto usa a outra?'], ['c', 'Brinca com mais de um brinquedo ao mesmo tempo?'],
      ['m', 'Chuta uma bola?'], ['m', 'Sobe alguns degraus andando, com ou sem ajuda?']] },
    '30': { label: '2 anos e meio', sub: '30 meses', q: [
      ['s', 'Brinca ao lado de outras crianças e às vezes com elas?'], ['s', 'Segue rotinas simples quando pedido, como guardar os brinquedos?'],
      ['l', 'Diz cerca de 50 palavras?'], ['l', 'Junta duas ou mais palavras com uma de ação, como “cachorro corre”?'],
      ['c', 'Usa objetos para fingir, como dar um bloco à boneca como se fosse comida?'], ['c', 'Segue pedidos de dois passos, como “guarde o brinquedo e feche a porta”?'],
      ['m', 'Pula com os dois pés?'], ['m', 'Vira as páginas de um livro uma a uma?']] },
    '36': { label: '3 anos', sub: '36 meses', q: [
      ['s', 'Percebe outras crianças e se junta a elas para brincar?'], ['s', 'Acalma-se em até 10 minutos depois que você sai (por exemplo, na creche)?'],
      ['l', 'Conversa com você com pelo menos duas trocas de ida e volta?'], ['l', 'Fala bem o suficiente para que outras pessoas entendam na maior parte do tempo?'],
      ['c', 'Desenha um círculo quando você mostra como?'], ['c', 'Evita tocar em coisas quentes quando você avisa?'],
      ['m', 'Enfia contas grandes ou macarrão num fio?'], ['m', 'Veste sozinha algumas peças de roupa?']] },
    '48': { label: '4 anos', sub: '48 meses', q: [
      ['s', 'Finge ser outra coisa na brincadeira, como professor ou super-herói?'], ['s', 'Consola quem está machucado ou triste?'],
      ['l', 'Diz frases com quatro ou mais palavras?'], ['l', 'Conta pelo menos uma coisa que aconteceu durante o dia?'],
      ['c', 'Nomeia algumas cores?'], ['c', 'Desenha uma pessoa com três ou mais partes do corpo?'],
      ['m', 'Pega uma bola grande na maioria das vezes?'], ['m', 'Segura o lápis entre os dedos e o polegar, e não com o punho fechado?']] },
    '60': { label: '5 anos', sub: '60 meses', q: [
      ['s', 'Segue regras ou espera a vez em jogos com outras crianças?'], ['s', 'Faz pequenas tarefas em casa, como ajudar a tirar a mesa?'],
      ['l', 'Conta uma história, ouvida ou inventada, com pelo menos dois acontecimentos?'], ['l', 'Mantém uma conversa com mais de três trocas?'],
      ['c', 'Conta até 10?'], ['c', 'Presta atenção por 5 a 10 minutos em uma atividade (tela não conta)?'],
      ['m', 'Pula num pé só?'], ['m', 'Abotoa alguns botões?']] }
  };
  var ck = $('#ck'), S = null;

  function ckStart() {
    S = null; ck.textContent = '';
    ck.appendChild(h('h3', { text: 'Qual é a idade da criança?' }));
    ck.appendChild(h('p', { text: 'Escolha a idade mais próxima. Se estiver entre duas, use a mais nova. Para bebês prematuros, use a idade corrigida.', style: 'color:var(--ink2);font-weight:600' }));
    var g = h('div', { class: 'ages' });
    Object.keys(AGES).forEach(function (k) {
      var b = h('button', { type: 'button' }, [AGES[k].label, h('small', { text: AGES[k].sub || ' ' })]);
      b.addEventListener('click', function () { S = { age: k, i: 0, a: [] }; ckQ(); });
      g.appendChild(b);
    });
    ck.appendChild(g);
    ck.appendChild(h('p', { class: 'warn', text: '10 perguntas, em cerca de dois minutos. Ao final, você pode baixar um resumo em PDF.' }));
  }
  function qs() { return AGES[S.age].q.concat(ALERTS); }
  function ckQ() {
    var A = AGES[S.age], all = qs(), q = all[S.i], isA = S.i >= A.q.length;
    ck.textContent = '';
    ck.appendChild(h('div', { class: 'qhead' }, [h('span', { text: A.label }), h('span', { text: 'Pergunta ' + (S.i + 1) + ' de ' + all.length })]));
    var pb = h('div', { class: 'pbar' }, [h('i')]); ck.appendChild(pb);
    requestAnimationFrame(function () { pb.firstChild.style.width = (S.i / all.length * 100) + '%'; });
    ck.appendChild(h('p', { class: 'q' }, [h('small', { text: isA ? q[0] : DOM[q[0]] }), q[1]]));
    var o = h('div', { class: 'opts' });
    (isA ? ['Sim', 'Não'] : OPT).forEach(function (t, n) {
      var b = h('button', { type: 'button', text: t });
      b.addEventListener('click', function () { S.a.push(n); S.i++; if (S.i >= all.length) ckEnd(); else ckQ(); });
      o.appendChild(b);
    });
    ck.appendChild(o);
    var row = h('div', { style: 'display:flex;gap:16px;flex-wrap:wrap' });
    if (S.i > 0) { var bk = h('button', { class: 'sm-link', type: 'button', text: 'Voltar uma pergunta' }); bk.addEventListener('click', function () { S.a.pop(); S.i--; ckQ(); }); row.appendChild(bk); }
    var rs = h('button', { class: 'sm-link', type: 'button', text: 'Recomeçar' }); rs.addEventListener('click', ckStart); row.appendChild(rs);
    ck.appendChild(row);
  }
  function tally() {
    var n = AGES[S.age].q.length, c = [0, 0, 0]; S.a.slice(0, n).forEach(function (x) { c[x]++; }); return c;
  }
  function alerted() { var n = AGES[S.age].q.length; return S.a[n] === 0 || S.a[n + 1] === 0; }
  function ckEnd() {
    var A = AGES[S.age], c = tally(), al = alerted();
    ck.textContent = '';
    ck.appendChild(h('div', { class: 'pbar' }, [h('i', { style: 'width:100%' })]));
    ck.appendChild(h('h3', { text: 'Resumo pronto' }));
    var res = h('div', { class: 'res' });
    var lv;
    if (al) lv = ['hi', 'Você indicou perda de uma habilidade ou uma preocupação. Isso merece conversa com o pediatra, sem esperar. Leve a Caderneta da Criança e este resumo à consulta.'];
    else if (c[2] === 0 && c[1] <= 2) lv = ['ok', 'A criança já faz a maior parte das ações observadas para ' + A.label + '. Continue acompanhando e leve as dúvidas às consultas de rotina.'];
    else if (c[2] <= 2) lv = ['mid', 'Algumas ações ainda não apareceram ou você não tem certeza. Isso pede observação e conversa, não conclusão. Leve o resumo ao pediatra.'];
    else lv = ['hi', 'Várias ações ainda não apareceram. Vale conversar em breve com o pediatra e, se quiser, com a equipe da clínica.'];
    res.appendChild(h('div', { class: 'lvl ' + lv[0], text: lv[1] }));
    res.appendChild(h('p', { text: 'Sim: ' + c[0] + '  ·  Não tenho certeza: ' + c[1] + '  ·  Ainda não: ' + c[2], style: 'font-weight:700' }));
    res.appendChild(h('p', { class: 'warn', text: 'Este resumo é educativo. Não é triagem, avaliação, anamnese nem diagnóstico, e não substitui instrumentos padronizados e validados (como ASQ-3 ou Denver II), aplicados por profissionais, nem a avaliação de um médico. Cada criança tem o seu ritmo.' }));
    ck.appendChild(res);
    ck.appendChild(h('h3', { text: 'Receba o resumo em PDF', style: 'margin-top:22px' }));
    ck.appendChild(h('p', { text: 'Informe seus dados para baixar o PDF com as respostas, as orientações e as fontes. A clínica pode entrar em contato para tirar dúvidas.', style: 'color:var(--ink2);font-weight:600;margin-bottom:12px' }));
    var f = h('form', { class: 'f', novalidate: 'novalidate', id: 'f-ck' });
    f.innerHTML = '<label>Seu nome<input id="k-nome" autocomplete="name" required></label>' +
      '<label>WhatsApp com DDD<input id="k-tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="(11) 90000-0000" required></label>' +
      '<label class="full">Nome da criança (opcional)<input id="k-crianca"></label>' +
      '<label class="ck full"><input type="checkbox" id="k-ok"><span>Autorizo a Clínica Cajeow a entrar em contato comigo, conforme a <a data-open="privacidade">Política de Privacidade</a>.</span></label>' +
      '<p class="msg err" id="k-msg" hidden></p><button class="btn b-pink full" type="submit">Baixar resumo em PDF</button>';
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = $('#k-msg'); m.hidden = true;
      var nome = clean($('#k-nome').value), tel = $('#k-tel').value, cr = clean($('#k-crianca').value);
      if (!nome) return err(m, 'Informe o seu nome.');
      if (!phoneOk(tel)) return err(m, 'Informe um WhatsApp com DDD.');
      if (!$('#k-ok').checked) return err(m, 'Marque a autorização de contato para baixar o PDF.');
      ckPdf(nome, clean(tel), cr, c, f);
    });
    ck.appendChild(f);
    var rs = h('button', { class: 'sm-link', type: 'button', text: 'Refazer com outra idade' }); rs.addEventListener('click', ckStart); ck.appendChild(rs);
  }

  function ckPdf(nome, tel, cr, c, form) {
    var A = AGES[S.age], leadMsg = 'Olá! Preenchi o guia de desenvolvimento infantil (' + A.label + ') no site da Clínica Cajeow.\nResponsável: ' + nome + (cr ? '\nCriança: ' + cr : '') +
      '\nResumo: sim ' + c[0] + ', não tenho certeza ' + c[1] + ', ainda não ' + c[2] + (alerted() ? '\nIndicou perda de habilidade ou preocupação' : '') + '\nTelefone: ' + tel + '\n[origem: site, guia de desenvolvimento]';
    sendLead('Guia de desenvolvimento (PDF)', leadMsg, nome, tel);
    var status = h('div', { class: 'res' });
    var after = function (txt, ok) {
      form.hidden = true;
      status.textContent = '';
      status.appendChild(h('div', { class: 'lvl ' + (ok ? 'ok' : 'mid'), text: txt }));
      status.appendChild(h('a', { class: 'btn b-wa', href: waUrl(leadMsg), target: '_blank', rel: 'noopener', text: 'Enviar meus dados à clínica pelo WhatsApp' }));
      status.appendChild(h('p', { class: 'warn', text: 'O contato com a clínica só acontece quando você envia a mensagem no WhatsApp.' }));
      ck.insertBefore(status, form);
    };
    if (!window.jspdf) { after('Não foi possível gerar o PDF agora. Tente de novo em instantes.', false); return; }
    var doc;
    try { doc = buildPdf(nome, cr, c); } catch (e) { after('Não foi possível gerar o PDF agora. Tente de novo em instantes.', false); return; }
    var fname = 'guia-desenvolvimento-infantil-' + A.label.replace(/\s+/g, '-') + '.pdf';
    var done = function () { after('PDF gerado. Se o download não iniciou, toque no botão abaixo para tentar novamente.', true); };
    var save = function () {
      try {
        if (window.claude && claude.use) {
          return claude.use('downloads').then(function (d) {
            if (!d) { doc.save(fname); return; }
            return d.save({ filename: fname, data: doc.output('arraybuffer') });
          }).then(done, function (er) { if (er && er.code === 'declined') after('Download cancelado. Você pode gerar o PDF de novo.', false); else { try { doc.save(fname); } catch (x) {} done(); } });
        }
        doc.save(fname); done();
      } catch (e) { after('Não foi possível baixar o PDF agora.', false); }
    };
    save();
    var again = h('button', { class: 'btn b-sky sm', type: 'button', text: 'Baixar PDF novamente' });
    again.addEventListener('click', save);
    setTimeout(function () { if (status.parentNode) status.insertBefore(again, status.children[1] || null); }, 0);
  }

  /* logomarca para o cabeçalho do PDF (arquivo do próprio site, convertido em PNG) */
  var LOGO = null;
  (function () {
    var im = new Image();
    im.onload = function () {
      try { var cv = document.createElement('canvas'); cv.width = im.naturalWidth; cv.height = im.naturalHeight; cv.getContext('2d').drawImage(im, 0, 0); LOGO = { d: cv.toDataURL('image/png'), w: im.naturalWidth, h: im.naturalHeight }; } catch (e) {}
    };
    im.src = 'img/simbolo.png';
  })();

  function buildPdf(nome, cr, c) {
    var J = window.jspdf.jsPDF, doc = new J({ unit: 'mm', format: 'a4' }), A = AGES[S.age], n = A.q.length;
    var W = 210, M = 18, y = 0, maxW = W - 2 * M, TOP = 48, BOT = 272;
    var NAVY = [22, 48, 79], PINK = [226, 79, 130], CORAL = [242, 120, 75], SUN = [247, 183, 51], MINT = [47, 174, 134], AQUA = [14, 154, 154], MUTED = [72, 90, 115], CREAM = [255, 247, 236];
    var STRIPE = [PINK, CORAL, SUN, MINT, AQUA];
    function chk(k) { if (y + k > BOT) { doc.addPage(); y = TOP; } }
    function para(t, size, bold, color, gap) {
      doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(size); doc.setTextColor.apply(doc, color || NAVY);
      var lines = doc.splitTextToSize(t, maxW); chk(lines.length * size * 0.5 + 2);
      doc.text(lines, M, y); y += lines.length * size * 0.42 + (gap == null ? 3 : gap);
    }
    function stripe(yy, hh) { STRIPE.forEach(function (c2, i) { doc.setFillColor.apply(doc, c2); doc.rect(i * W / 5, yy, W / 5 + 0.2, hh, 'F'); }); }
    function header() {
      doc.setFillColor.apply(doc, CREAM); doc.rect(0, 0, W, 36, 'F');
      stripe(36, 2.6);
      var tx = M;
      if (LOGO) { var lh = 27, lw = lh * LOGO.w / LOGO.h; try { doc.addImage(LOGO.d, 'PNG', M, 4.5, lw, lh); } catch (e) {} tx = M + lw + 5; }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(19); doc.setTextColor.apply(doc, NAVY); doc.text('Clínica Cajeow', tx, 17);
      doc.setFontSize(11); doc.setTextColor.apply(doc, PINK); doc.text('Desenvolvimento Humano', tx, 24);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor.apply(doc, MUTED); doc.text('Guia de desenvolvimento infantil', W - M, 15, { align: 'right' });
      doc.text('Resumo de observação para a família', W - M, 20, { align: 'right' });
    }
    function footer(p, total) {
      doc.setFillColor.apply(doc, CREAM); doc.rect(0, 280, W, 17, 'F');
      stripe(280, 1.4);
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5);
      var a1 = 'WhatsApp (11) 99258-8029', a2 = 'Instagram @clinicacajeow', sep = '   |   ';
      var w1 = doc.getTextWidth(a1), ws = doc.getTextWidth(sep), w2 = doc.getTextWidth(a2), x0 = (W - (w1 + ws + w2)) / 2;
      doc.setTextColor.apply(doc, NAVY);
      try { doc.textWithLink(a1, x0, 287, { url: 'https://wa.me/5511992588029' }); } catch (e) { doc.text(a1, x0, 287); }
      doc.setTextColor.apply(doc, PINK); doc.text(sep, x0 + w1, 287);
      doc.setTextColor.apply(doc, NAVY);
      try { doc.textWithLink(a2, x0 + w1 + ws, 287, { url: 'https://www.instagram.com/clinicacajeow/' }); } catch (e) { doc.text(a2, x0 + w1 + ws, 287); }
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7.8); doc.setTextColor.apply(doc, MUTED);
      doc.text('Av. dos Autonomistas, 896, Torre Santorini, salas 1103 e 1903 · Vila Yara, Osasco/SP · Seg a sex 8h às 19h · Sáb 8h às 12h30', W / 2, 292, { align: 'center' });
      doc.text(p + ' / ' + total, W - M, 292, { align: 'right' });
    }
    y = TOP;
    para('Resumo de observação: ' + A.label, 15, true, NAVY, 3);
    para('Responsável: ' + nome + (cr ? '    Criança: ' + cr : '') + '    Data: ' + new Date().toLocaleDateString('pt-BR'), 10, false, MUTED, 5);
    para('Aviso importante: este resumo é educativo e de observação. Não é triagem, avaliação, anamnese nem diagnóstico, e não substitui instrumentos padronizados e validados (como o ASQ-3 ou o Denver II), aplicados por profissionais, nem a avaliação de um médico. Cada criança tem o seu ritmo.', 9.5, true, [200, 50, 95], 6);
    para('Total: sim ' + c[0] + ' · não tenho certeza ' + c[1] + ' · ainda não ' + c[2], 11, true, NAVY, 4);
    var lab = ['Sim, já faz', 'Não tenho certeza', 'Ainda não'], col = [MINT, [150, 105, 0], PINK];
    var last = '';
    A.q.forEach(function (q, i) {
      if (q[0] !== last) { last = q[0]; chk(12); para(DOM[q[0]], 11.5, true, AQUA, 1.5); }
      var lines = doc.splitTextToSize((i + 1) + '. ' + q[1], maxW - 52); chk(lines.length * 4.6 + 3);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor.apply(doc, NAVY); doc.text(lines, M, y);
      doc.setFont('helvetica', 'bold'); doc.setTextColor.apply(doc, col[S.a[i]]); doc.text(lab[S.a[i]], W - M, y, { align: 'right' });
      y += lines.length * 4.6 + 1.5; doc.setDrawColor(240, 227, 211); doc.line(M, y - 1, W - M, y - 1); y += 1.5;
    });
    y += 3;
    para('Perguntas para qualquer idade', 11.5, true, AQUA, 1.5);
    ALERTS.forEach(function (q, k) {
      var r = S.a[n + k] === 0 ? 'Sim' : 'Não';
      var lines = doc.splitTextToSize((n + k + 1) + '. ' + q[1], maxW - 30); chk(lines.length * 4.6 + 3);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor.apply(doc, NAVY); doc.text(lines, M, y);
      doc.setFont('helvetica', 'bold'); doc.setTextColor.apply(doc, r === 'Sim' ? PINK : MINT); doc.text(r, W - M, y, { align: 'right' });
      y += lines.length * 4.6 + 3;
    });
    y += 3;
    var pend = []; A.q.forEach(function (q, i) { if (S.a[i] !== 0) pend.push(q[1]); });
    if (pend.length) { para('Pontos para conversar com o pediatra', 12, true, NAVY, 2); pend.forEach(function (t) { para('• ' + t, 10, false, NAVY, 1.5); }); y += 2; }
    para('Próximos passos sugeridos', 12, true, NAVY, 2);
    [ 'Leve este resumo e a Caderneta da Criança à próxima consulta de rotina e converse com o pediatra sobre o que você observou.',
      'Anote exemplos do dia a dia (quando e como a criança faz ou não faz cada ação). Isso ajuda muito na conversa com os profissionais.',
      'Se a criança perdeu habilidades que já tinha, ou se algo preocupa você, procure atendimento médico sem esperar.',
      'Peça ao pediatra a triagem do desenvolvimento com instrumento padronizado, recomendada em consultas de rotina.',
      'Se quiser conversar com a nossa equipe, chame no WhatsApp (11) 99258-8029.'
    ].forEach(function (t) { para('• ' + t, 10, false, NAVY, 1.5); });
    y += 4;
    para('Base técnica', 11, true, NAVY, 2);
    [ 'CDC e Academia Americana de Pediatria. Learn the Signs. Act Early. Marcos do desenvolvimento, revisão de 2022. Zubler JM et al. Evidence-Informed Milestones for Developmental Surveillance Tools. Pediatrics 2022;149(3):e2021052138.',
      'Sociedade Brasileira de Pediatria. Cartilha de Desenvolvimento, 2 meses a 5 anos (Aprenda os Sinais. Aja Cedo), tradução autorizada, 2024.',
      'Ministério da Saúde. Caderneta da Criança, 7ª edição: vigilância do desenvolvimento.',
      'Sociedade Brasileira de Pediatria, Dep. de Neurologia. Sinais de alerta na avaliação neurológica da criança e do adolescente. Manual de Orientação nº 1, 2020.',
      'Lipkin PH, Macias MM. Promoting Optimal Development: Identifying Infants and Young Children With Developmental Disorders Through Developmental Surveillance and Screening. Pediatrics 2020;145(1):e20193449.'
    ].forEach(function (t) { para('• ' + t, 8.5, false, MUTED, 1.5); });
    y += 3;
    para('Os marcos indicam o que a maioria das crianças (75% ou mais) já faz até cada idade e não definem, sozinhos, o desenvolvimento de uma criança. As perguntas foram adaptadas em linguagem simples a partir das fontes acima.', 8.5, false, MUTED, 4);
    var total = doc.getNumberOfPages();
    for (var p = 1; p <= total; p++) { doc.setPage(p); header(); footer(p, total); }
    return doc;
  }
  ckStart();

  /* ===== Vídeo do mapa ===== */
  var vid = $('#zoom');
  if (vid) {
    var src = vid.querySelector('source') ? vid.querySelector('source').getAttribute('src') : '', ready = false;
    function load() {
      if (ready || !src) return; ready = true;
      try {
        fetch(src).then(function (r) { return r.blob(); }).then(function (b) { vid.src = URL.createObjectURL(b); vid.load(); }).catch(function () {});
      } catch (e) {}
    }
    function play() { try { var p = vid.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { load(); if (!reduce) { if (vid.readyState >= 3) play(); else vid.addEventListener('canplaythrough', play, { once: true }); } } }); }, { threshold: .35 }).observe(vid);
    }
    $('#replay').addEventListener('click', function () { vid.currentTime = 0; play(); });
  }

  /* ===== Navegação por páginas ===== */
  var VIEWS = $$('[data-view]'), NAMES = VIEWS.map(function (v) { return v.getAttribute('data-view'); }), cur = '';
  var PARENT = { psicologia: 'especialidades', fonoaudiologia: 'especialidades', neuropsicologia: 'especialidades' };
  function runMq() {
    $$('[data-mq]').forEach(function (t) {
      if (t.getAttribute('data-done') || !t.offsetParent) return;
      t.setAttribute('data-done', '1'); marquee(t);
    });
  }
  function show(name, push) {
    if (NAMES.indexOf(name) < 0) name = 'inicio';
    cur = name;
    VIEWS.forEach(function (v) { v.classList.toggle('on', v.getAttribute('data-view') === name); });
    $$('#nav a.l').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-go') === (PARENT[name] || name)); });
    try { $('#pagetop').scrollIntoView({ block: 'start', behavior: 'auto' }); } catch (e) { window.scrollTo(0, 0); }
    runMq();
  }
  document.addEventListener('click', function (e) {
    var g = e.target.closest('[data-go]');
    if (!g) return;
    e.preventDefault();
    nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
    var d = g.closest('dialog'); if (d) d.close();
    show(g.getAttribute('data-go'), true);
  });
  window.addEventListener('hashchange', function () { var n = location.hash.slice(1); if (n && n !== cur) show(n, false); });
  show(NAMES.indexOf(location.hash.slice(1)) > -1 ? location.hash.slice(1) : 'inicio', false);
})();
