# Portfólio de Desenvolvedor - Hugo Lima

Este projeto é um portfólio pessoal moderno e responsivo, desenvolvido para apresentar trabalhos reais, habilidades e informações de contato de forma profissional.

Atualmente o catálogo começa com um case publicado: o site institucional do Frigorífico Bezerra.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web padrão, sem dependência de frameworks pesados, garantindo alta performance e facilidade de manutenção.

*   **HTML5**: Estrutura semântica e acessível.
*   **CSS3**: Estilização avançada com:
    *   **CSS Variables**: Para gerenciamento fácil de cores e temas.
    *   **Flexbox & Grid**: Para layouts responsivos e alinhamento.
    *   **Keyframe Animations**: Para efeitos de entrada e interações suaves.
    *   **Media Queries**: Para adaptação total a dispositivos móveis.
*   **JavaScript (ES6+)**: Lógica interativa para:
    *   Renderização dinâmica de projetos (Arrays e DOM).
    *   Sistema de filtragem de catálogo.
    *   Alternância de Tema Claro/Escuro (com persistência no LocalStorage).
    *   Menu Mobile e efeitos de Scroll.
    *   Modal de "Quick View" para detalhes dos projetos.
*   **Bibliotecas Externas**:
    *   **Font Awesome (v6.4.0)**: Ícones vetoriais.
    *   **Google Fonts (Inter)**: Tipografia.

## 📂 Estrutura de Arquivos

A organização do projeto é direta e modular:

```text
/ (Raiz do Projeto)
│
├── index.html              # Página Principal (Home)
│                           # Contém: Hero, Sobre, Preview do Catálogo, Projetos Destaque, Contato.
│
├── catalogoProjetos.html   # Página do Catálogo Completo
│                           # Contém: Grade completa de projetos, Filtros por categoria, Modal.
│
├── style.css               # Estilos Principais
│                           # Usado globalmente e especificamente na Home.
│
├── catalog.css             # Estilos do Catálogo
│                           # Extensão do style.css com regras específicas para Grid e Filtros.
│
├── projects-data.js        # Dados dos projetos exibidos no catálogo.
│
├── script.js               # Lógica principal
│                           # Contém filtros, tema, menu mobile e modal de detalhes.
│
├── assets/                 # Imagens e materiais visuais usados no site.
│
└── README.md               # Documentação do Projeto
```

## 🚀 Funcionalidades Chave

1.  **Catálogo Dinâmico**: Os projetos não estão "chumbados" no HTML. Eles ficam numa lista no `projects-data.js`. Para adicionar um novo, basta incluir um objeto na lista `projectsData`.
2.  **Tema Claro/Escuro**: O site salva a preferência do usuário.
3.  **Filtros de Categoria**: Filtre projetos por "Sites", "Apps", "Landing Pages", etc.
4.  **Modal de Detalhes**: Os visitantes podem ver mais informações sem recarregar a página.

## 📝 Como Adicionar Novo Projeto

Abra o arquivo `projects-data.js` e adicione um novo objeto ao array `projectsData`:

```javascript
{
    title: "Nome do Projeto",
    category: "site", // Opções: site, landing, ecommerce, blog, app
    image: "URL da Imagem",
    description: "Descrição curta para o card.",
    longDescription: "Descrição detalhada para o modal.",
    tags: ["Tech1", "Tech2"],
    links: { code: "#", demo: "#" }
},
```

---
© 2026 Hugo Lima. Todos os direitos reservados.
