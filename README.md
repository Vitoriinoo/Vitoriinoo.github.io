# Vitoriinoo.github.io

Portfólio pessoal de Vitor Barbosa Vitorino, estudante de Inteligência Artificial na FIAP.

Site estático (HTML + CSS + um pouco de JavaScript), publicado pelo GitHub Pages em https://vitoriinoo.github.io.

## Estrutura

```text
index.html              página inicial (habilidades, projeto em destaque, sobre, contato)
projetos/index.html     lista de todos os projetos, com filtro por tecnologia
projetos/agrorisk.html  case do projeto AgroRisk
assets/projetos.js      dados da lista de projetos
assets/style.css        estilos compartilhados (tema claro e escuro)
assets/img/             imagens e capturas de tela
.nojekyll               publica os arquivos sem processamento Jekyll
```

## Adicionar um projeto

1. Abra `assets/projetos.js`.
2. Copie um dos blocos dentro de `PROJETOS` e preencha `titulo`, `subtitulo`, `resumo`,
   `contexto`, `ano`, `tecnologias` e `links`.
3. Opcional: coloque uma captura em `assets/img/` e aponte o campo `imagem` para ela
   (ex.: `"../assets/img/meu-projeto.webp"`).
4. Opcional: crie uma página de case em `projetos/` usando `agrorisk.html` como modelo.

Os filtros por tecnologia são gerados sozinhos a partir do campo `tecnologias`.

## Rodar localmente

```bash
python -m http.server 8000
```

Depois, abra http://localhost:8000.
