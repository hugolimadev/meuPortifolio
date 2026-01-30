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

    // Project Data is now loaded from projects-data.js


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
