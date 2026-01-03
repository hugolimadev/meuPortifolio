document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Theme Logic
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');

            if (isLight) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    } else {
        console.error('Theme toggle button not found!');
    }

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Project Data
    const projectsData = [
        {
            title: "E-commerce Dashboard",
            category: "ecommerce",
            image: "https://placehold.co/600x400/2a2a2a/ffffff?text=E-commerce+Dashboard",
            description: "Um painel administrativo completo para gestão de vendas e estoque com gráficos interativos.",
            longDescription: "Este dashboard foi desenvolvido para otimizar a gestão de e-commerces de grande porte. Conta com integração em tempo real com APIs de pagamento, gráficos de vendas diários e mensais, e controle de estoque automatizado.",
            tags: ["HTML", "CSS", "JS"],
            links: { code: "#", demo: "#" }
        },
        {
            title: "Task Manager App",
            category: "site",
            image: "https://placehold.co/600x400/2a2a2a/ffffff?text=Task+Manager",
            description: "Aplicação de produtividade com funcionalidades de drag-and-drop e colaboração em tempo real.",
            longDescription: "Uma solução robusta para gerenciamento de projetos. Permite arrastar e soltar tarefas (Kanban), atribuir membros da equipe, definir prazos e receber notificações em tempo real usando WebSockets.",
            tags: ["React", "Node.js"],
            links: { code: "#", demo: "#" }
        },
        {
            title: "AI Image Generator",
            category: "landing",
            image: "https://placehold.co/600x400/2a2a2a/ffffff?text=AI+Generator",
            description: "Integração com APIs de IA para gerar imagens baseadas em prompts de texto.",
            longDescription: "Utilizando o poder da IA Generativa, este projeto permite que usuários criem artes visuais únicas apenas descrevendo o que desejam. Interface limpa e resposta rápida via API.",
            tags: ["Python", "AI"],
            links: { code: "#", demo: "#" }
        },
        {
            title: "Institucional Lawyer",
            category: "site",
            image: "https://placehold.co/600x400/2a2a2a/ffffff?text=Lawyer+Site",
            description: "Site institucional para escritório de advocacia com agendamento online.",
            longDescription: "Design sóbrio e profissional transmitindo confiança. Inclui sistema de agendamento de consultas integrado ao Google Calendar e área de blog para artigos jurídicos.",
            tags: ["WordPress", "PHP"],
            links: { code: "#", demo: "#" }
        },
        {
            title: "Blog Tech News",
            category: "blog",
            image: "https://placehold.co/600x400/2a2a2a/ffffff?text=Tech+News",
            description: "Blog de tecnologia com CMS personalizado e newsletter.",
            longDescription: "Plataforma de conteúdo focada em performance e SEO. Carregamento instantâneo de páginas, integração com ferramentas de newsletter e painel de administração customizado.",
            tags: ["Next.js", "GraphQL"],
            links: { code: "#", demo: "#" }
        },
        {
            title: "Landing Page Evento",
            category: "landing",
            image: "https://placehold.co/600x400/2a2a2a/ffffff?text=Event+LP",
            description: "Landing page de alta conversão para evento de marketing digital.",
            longDescription: "Focada em conversão, esta LP utiliza gatilhos mentais, contagem regressiva e formulários otimizados. Totalmente responsiva e integrada a ferramentas de CRM.",
            tags: ["HTML", "Tailwind"],
            links: { code: "#", demo: "#" }
        },
        {
            title: "Fitness App Mobile",
            category: "app",
            image: "https://placehold.co/600x400/2a2a2a/ffffff?text=Fitness+App",
            description: "App mobile para treino e dieta com gamificação.",
            longDescription: "Aplicativo cross-platform (iOS e Android) que ajuda usuários a manterem a forma. Gamificação com conquistas, rastreamento de calorias e planos de treino em vídeo.",
            tags: ["React Native", "Firebase"],
            links: { code: "#", demo: "#" }
        }
    ];

    // Catalog Rendering Logic
    const projectsGrid = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Modal Elements
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalCode = document.getElementById('modal-code');
    const modalDemo = document.getElementById('modal-demo');

    if (projectsGrid) {
        function openModal(project) {
            if (!modal) return;
            modalImg.src = project.image;
            modalImg.alt = project.title;
            modalTitle.textContent = project.title;
            modalDesc.textContent = project.longDescription || project.description;

            modalTags.innerHTML = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');

            modalCode.href = project.links.code;
            modalDemo.href = project.links.demo;

            modal.style.display = 'flex';
            // Small delay to allow display flex to apply before opacity transition
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }

        function closeModal() {
            if (!modal) return;
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Wait for transition
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        function renderProjects(filter = 'all') {
            projectsGrid.innerHTML = '';

            const filteredProjects = filter === 'all'
                ? projectsData
                : projectsData.filter(project => project.category === filter);

            filteredProjects.forEach((project, index) => {
                const projectCard = document.createElement('article');
                projectCard.className = 'project-card';
                // Add index for potential animations
                projectCard.style.animationDelay = `${index * 50}ms`;

                projectCard.innerHTML = `
                    <div class="project-img" style="cursor: pointer;">
                         <img src="${project.image}" alt="${project.title}" style="width:100%; height:100%; object-fit:cover;">
                         <div class="img-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; opacity:0; transition:0.3s;">
                            <i class="fas fa-search-plus" style="color:white; font-size:2rem;"></i>
                         </div>
                    </div>
                    <div class="project-info">
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                        </div>
                        <span class="project-category" style="display:block; color:var(--accent-color); font-size:0.8rem; font-weight:600; text-transform:uppercase; margin-bottom:0.5rem;">${project.category.replace('site', 'Site Institucional').replace('landing', 'Landing Page').replace('ecommerce', 'E-commerce').replace('blog', 'Blog').replace('app', 'App Mobile')}</span>
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-desc">${project.description}</p>
                        <div class="project-links">
                            <button class="link-btn open-modal-btn" style="background:none; border:none; cursor:pointer; font-family:inherit;"><i class="fas fa-eye"></i> Detalhes</button>
                        </div>
                    </div>
                `;

                // Add click events
                const imgContainer = projectCard.querySelector('.project-img');
                const overlay = projectCard.querySelector('.img-overlay');
                const btn = projectCard.querySelector('.open-modal-btn');

                // Hover effect for image overlay
                imgContainer.addEventListener('mouseenter', () => overlay.style.opacity = '1');
                imgContainer.addEventListener('mouseleave', () => overlay.style.opacity = '0');

                imgContainer.addEventListener('click', () => openModal(project));
                btn.addEventListener('click', () => openModal(project));

                projectsGrid.appendChild(projectCard);
            });
        }

        // Initial Render
        renderProjects();

        // Filter Click Events
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');
                // Filter
                renderProjects(btn.dataset.filter);
            });
        });
    }
});
