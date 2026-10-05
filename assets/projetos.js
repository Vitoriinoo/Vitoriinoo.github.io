// Lista de projetos exibida em /projetos/.
// Para adicionar um projeto, copie um dos blocos abaixo e preencha os campos.
// Os filtros por tecnologia são gerados automaticamente a partir de "tecnologias".
// Links são relativos à pasta /projetos/ (ex.: "agrorisk.html") ou endereços completos.
const PROJETOS = [
  {
    titulo: "AgroRisk",
    subtitulo: "Score de risco explicável e IA para o seguro agrícola",
    resumo: "Plataforma de análise de risco para a Sompo Seguros. Um motor de regras gera um score de 0 a 100, um detector de anomalias treinado com 9.050 leituras reais aponta comportamentos fora do padrão, e o resultado chega ao operador, ao produtor e à seguradora.",
    contexto: "Challenge Sompo Seguros · FIAP",
    ano: 2026,
    destaque: true,
    imagem: "../assets/img/agrorisk/analise.webp",
    tecnologias: ["Machine Learning", "Detecção de anomalias", "IA explicável", "Python", "pandas", "Node.js", "PostgreSQL", "Web Push", "Vercel"],
    links: [
      { rotulo: "Ler o case", url: "agrorisk.html", principal: true },
      { rotulo: "Demo ao vivo", url: "https://agrorisk-sompo.vercel.app" },
      { rotulo: "Código", url: "https://github.com/Vitoriinoo/AgroRisk" },
    ],
  },
  {
    titulo: "Análise estatística do seguro rural",
    subtitulo: "1.048.565 apólices do PSR, de 2016 a 2024",
    resumo: "Análise exploratória e descritiva da base pública do Programa de Subvenção ao Prêmio do Seguro Rural. Mostrou que a base é desbalanceada (18,2% com sinistro), que a soja concentra frequência e severidade e que a média distorce o risco.",
    contexto: "Statistical Computing · FIAP",
    ano: 2026,
    tecnologias: ["R", "dplyr", "data.table", "ggplot2", "Estatística"],
    links: [
      { rotulo: "Ver análise", url: "agrorisk.html#dados", principal: true },
    ],
  },
  {
    titulo: "Modelagem de dados do AgroRisk",
    subtitulo: "Modelo relacional com auditoria embutida",
    resumo: "Modelo entidade-relacionamento e modelo físico em Oracle com 12 tabelas, 16 chaves estrangeiras e 49 restrições CHECK. Cada avaliação de risco guarda a versão do modelo usado, e cada incidente registra se houve alerta antes.",
    contexto: "Cognitive Data Science · FIAP",
    ano: 2026,
    tecnologias: ["SQL", "Oracle", "Modelagem de dados"],
    links: [
      { rotulo: "Ver detalhes", url: "agrorisk.html#contribuicao", principal: true },
    ],
  },
  {
    titulo: "Pipeline de risco em Python",
    subtitulo: "MVP de análise de telemetria",
    resumo: "Pipeline que recebe telemetria em CSV ou JSON, valida campos e limites, calcula o score com pandas, separa registros inconsistentes e gera relatórios em CSV, JSON e PNG, com testes automatizados.",
    contexto: "Challenge Sompo Seguros · FIAP",
    ano: 2026,
    tecnologias: ["Python", "pandas", "unittest"],
    links: [
      { rotulo: "Código", url: "https://github.com/Vitoriinoo/AgroRisk/tree/main/python_mvp", principal: true },
    ],
  },
];

(function renderProjetos() {
  const lista = document.getElementById("lista-projetos");
  const filtros = document.getElementById("filtros");
  const contador = document.getElementById("contador");
  if (!lista) return;

  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === "text") node.textContent = value;
      else node.setAttribute(key, value);
    }
    for (const child of children) node.append(child);
    return node;
  };
  const externo = (url) => /^https?:\/\//.test(url);

  function card(projeto) {
    const tags = el("ul", { class: "tags" }, projeto.tecnologias.map((t) => el("li", { text: t })));
    const links = el("div", { class: "actions" }, projeto.links.map((link) => {
      const attrs = { class: "btn" + (link.principal ? " primary" : ""), href: link.url, text: link.rotulo + (externo(link.url) ? " ↗" : "") };
      if (externo(link.url)) Object.assign(attrs, { target: "_blank", rel: "noopener" });
      return el("a", attrs);
    }));
    const corpo = el("div", { class: "project-body" }, [
      el("p", { class: "project-meta", text: `${projeto.contexto} · ${projeto.ano}` }),
      el("h2", { class: "project-title", text: projeto.titulo }),
      el("p", { class: "project-sub", text: projeto.subtitulo }),
      el("p", { class: "muted", text: projeto.resumo }),
      el("p", { class: "project-label", text: "O que usei" }),
      tags,
      links,
    ]);
    const filhos = [];
    if (projeto.imagem) filhos.push(el("img", { src: projeto.imagem, alt: `Tela do projeto ${projeto.titulo}`, loading: "lazy", width: "1600", height: "900" }));
    filhos.push(corpo);
    return el("article", { class: "card project" + (projeto.destaque ? " project-featured" : ""), "data-tec": projeto.tecnologias.join("|") }, filhos);
  }

  PROJETOS.forEach((projeto) => lista.append(card(projeto)));

  // Filtros por tecnologia, ordenados pela quantidade de projetos que usam cada uma.
  const contagem = new Map();
  PROJETOS.forEach((p) => p.tecnologias.forEach((t) => contagem.set(t, (contagem.get(t) || 0) + 1)));
  const tecnologias = [...contagem.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR")).map(([t]) => t);

  let ativo = null;
  function aplicar() {
    let visiveis = 0;
    lista.querySelectorAll(".project").forEach((node) => {
      const mostra = !ativo || node.dataset.tec.split("|").includes(ativo);
      node.hidden = !mostra;
      if (mostra) visiveis++;
    });
    contador.textContent = ativo ? `${visiveis} de ${PROJETOS.length} projetos usam ${ativo}` : `${PROJETOS.length} projetos`;
    filtros.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String((b.dataset.tec || null) === ativo)));
  }

  const botao = (rotulo, tec) => {
    const b = el("button", { type: "button", class: "chip", text: rotulo });
    if (tec) b.dataset.tec = tec;
    b.addEventListener("click", () => { ativo = tec || null; aplicar(); });
    return b;
  };
  filtros.append(botao("Todos", null), ...tecnologias.map((t) => botao(`${t} (${contagem.get(t)})`, t)));
  aplicar();
})();
