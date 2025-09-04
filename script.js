// script.js

// Dados dos links
const linksData = [
    {
        title: "Sorteio Pix do Milhão",
        description: "Participe do sorteio de R$1.000.000 via Pix!",
        url: "https://example.com/pix-milhao",
        category: "pix",
        icon: "money-bill-wave",
        color: "bg-green-500",
        image: "image/FTdeFundo.png",
        hasCoupon: false
    },
    {
        title: "Pix do Milhão - Edição Especial",
        description: "Nova chance de ganhar no sorteio Pix do Milhão!",
        url: "https://example.com/pix-milhao-especial",
        category: "pix",
        icon: "money-bill-wave",
        color: "bg-green-500",
        image: "image/FTdeFundo.png",
        hasCoupon: false
    },
    {
        title: "Queima Diária - Descontos Exclusivos",
        description: "Aproveite promoções relâmpago com até 90% OFF!",
        url: "https://example.com/queima-diaria",
        category: "queima",
        icon: "fire",
        color: "bg-red-500",
        image: "image/FTdeFundo.png",
        hasCoupon: false
    },
    {
        title: "Queima Diária - Ofertas do Dia",
        description: "Ofertas diárias com descontos imperdíveis!",
        url: "https://example.com/queima-diaria-ofertas",
        category: "queima",
        icon: "fire",
        color: "bg-red-500",
        image: "image/FTdeFundo.png",
        hasCoupon: false
    },
    {
        title: "Shopee - Cupom Exclusivo",
        description: "Use o cupom da Ediribeirof para descontos na Shopee!",
        url: "https://shopee.com.br",
        category: "shopee",
        icon: "shopping-bag",
        color: "bg-pink-500",
        image: "image/FTdeFundo.png",
        hasCoupon: true,
        couponInfo: "Use o cupom EDI para 10% de desconto na Shopee!"
    },
    {
        title: "Shopee - Oferta Especial",
        description: "Aproveite ofertas exclusivas na Shopee com o código da Ediribeirof!",
        url: "https://shopee.com.br/oferta",
        category: "shopee",
        icon: "shopping-cart",
        color: "bg-pink-500",
        image: "image/FTdeFundo.png",
        hasCoupon: true,
        couponInfo: "Use o cupom EDI10 para 15% de desconto em produtos selecionados!"
    },
    {
        title: "Power Fit - Plano Especial",
        description: "Assine o plano Power Fit com desconto especial!",
        url: "https://example.com/power-fit",
        category: "powerfit",
        icon: "dumbbell",
        color: "bg-blue-500",
        image: "image/FTdeFundo.png",
        hasCoupon: true,
        couponInfo: "Use o cupom EDI para 10% de desconto no plano Power Fit!"
    },
    {
        title: "Grupo Exclusivo no WhatsApp",
        description: "Entre no grupo VIP para promoções exclusivas!",
        url: "https://chat.whatsapp.com/example-group",
        category: "whatsapp",
        icon: "users",
        color: "bg-pink-500",
        image: "image/FTdeFundo.png",
        hasCoupon: false
    },
    {
        title: "Ofertas Especiais - Promoções",
        description: "Confira as melhores promoções selecionadas pela Ediribeirof!",
        url: "https://example.com/promocoes",
        category: "promocoes",
        icon: "star",
        color: "bg-purple-500",
        image: "image/FTdeFundo.png",
        hasCoupon: false
    },
    {
        title: "Super Promoção do Mês",
        description: "As melhores ofertas do mês com descontos incríveis!",
        url: "https://example.com/super-promocao",
        category: "promocoes",
        icon: "star",
        color: "bg-purple-500",
        image: "image/FTdeFundo.png",
        hasCoupon: false
    }
];

// Elementos do DOM
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const backToTopButton = document.getElementById('backToTop');
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popup-close');
const popupForm = document.getElementById('popup-form');
const popupName = document.getElementById('popup-name');
const popupEmail = document.getElementById('popup-email');
const popupWhatsApp = document.getElementById('popup-whatsapp');
const linksContainer = document.getElementById('links-container');
const noLinksMessage = document.getElementById('no-links-message');
const categoryTabs = document.querySelectorAll('.category-tab');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');

// Verifica se os elementos principais do DOM existem
if (!linksContainer || !noLinksMessage || !categoryTabs.length) {
    console.error('Erro: Elementos do DOM não encontrados', {
        linksContainer: !!linksContainer,
        noLinksMessage: !!noLinksMessage,
        categoryTabs: categoryTabs.length
    });
}

// Função para criar mensagem de erro
function createErrorMessage(input, message) {
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
    input.classList.add('border-red-500');
}

// Função para remover mensagem de erro
function removeErrorMessage(input) {
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    input.classList.remove('border-red-500');
}

// Validação do formulário do pop-up
if (popupForm) {
    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validação do Nome (apenas letras, espaço e ç, á, é, í, ó, ú, ã, õ, â, ê, î, ô, û; mínimo 2 letras)
        const nameValue = popupName.value.trim();
        const nameRegex = /^[A-Za-zçáéíóúãõâêîôûÇÁÉÍÓÚÃÕÂÊÎÔÛ ]{2,}$/;
        if (!nameRegex.test(nameValue)) {
            createErrorMessage(popupName, 'O nome deve ter no mínimo 2 letras, sem números ou caracteres especiais, exceto ç, á, é, í, ó, ú, ã, õ, â, ê, î, ô, û.');
            isValid = false;
        } else {
            removeErrorMessage(popupName);
        }

        // Validação do Email
        const emailValue = popupEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            createErrorMessage(popupEmail, 'Por favor, insira um e-mail válido (ex.: nome@dominio.com).');
            isValid = false;
        } else {
            removeErrorMessage(popupEmail);
        }

        // Validação do WhatsApp (apenas números, mínimo 10 dígitos)
        const whatsappValue = popupWhatsApp.value.replace(/[^0-9]/g, '');
        if (whatsappValue.length < 10) {
            createErrorMessage(popupWhatsApp, 'O WhatsApp deve conter apenas números, com no mínimo 10 dígitos.');
            isValid = false;
        } else {
            removeErrorMessage(popupWhatsApp);
        }

        // Se válido, processa o formulário
        if (isValid) {
            const formData = new FormData(popupForm);
            console.log('Pop-up Form Data:', {
                name: formData.get('name'),
                email: formData.get('email'),
                whatsapp: whatsappValue
            });
            popup.classList.add('hidden');
            alert('Informações enviadas com sucesso! Entraremos em contato em breve.');
            popupForm.reset();
        }
    });
}

// Exibe o pop-up ao carregar a página
if (popup) {
    window.addEventListener('load', () => {
        popup.classList.remove('hidden');
        console.log('Pop-up exibido ao carregar a página');
    });

    if (popupClose) {
        popupClose.addEventListener('click', () => {
            popup.classList.add('hidden');
            console.log('Pop-up fechado');
        });
    }

    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.add('hidden');
            console.log('Pop-up fechado ao clicar fora');
        }
    });
}

// Controle do menu mobile
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const isExpanded = !mobileMenu.classList.contains('hidden');
        mobileMenuButton.setAttribute('aria-expanded', isExpanded);
        console.log('Menu mobile toggled:', isExpanded);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            console.log('Menu mobile fechado ao clicar em link');
        });
    });

    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            console.log('Menu mobile fechado ao clicar fora');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            console.log('Menu mobile fechado ao redimensionar');
        }
    });
}

// Controle do botão "Voltar ao Topo"
if (backToTopButton && document.querySelector('nav')) {
    const nav = document.querySelector('nav');
    const backToTopObserver = new IntersectionObserver(
        ([entry]) => {
            if (!entry.isIntersecting) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        },
        { threshold: 0 }
    );
    backToTopObserver.observe(nav);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Botão Voltar ao Topo clicado');
    });
}

// Rolagem suave para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
            console.log('Rolagem suave para:', targetId);
        }
    });
});

// Função para selecionar categoria
window.selectCategory = function(category) {
    console.log('Selecionando categoria:', category);
    categoryTabs.forEach(tab => {
        const tabCategory = tab.getAttribute('data-category');
        tab.classList.remove('active', 'text-white');
        tab.setAttribute('aria-selected', 'false');
        if (tabCategory === category) {
            tab.classList.add('active', 'text-white');
            tab.setAttribute('aria-selected', 'true');
        }
    });
    filterLinks(category);
};

// Função para filtrar e exibir links por categoria
function filterLinks(category) {
    console.log('Filtrando links para categoria:', category);
    if (!linksContainer || !noLinksMessage) {
        console.error('linksContainer ou noLinksMessage não encontrado');
        return;
    }

    // Limpa o container de links antes de renderizar
    linksContainer.innerHTML = '';
    noLinksMessage.classList.add('hidden');

    // Filtra os links
    let filteredLinks;
    if (category === 'all') {
        filteredLinks = linksData;
    } else if (category === 'promocoes') {
        // Inclui links com category: "promocoes" ou hasCoupon: true
        filteredLinks = linksData.filter(link => link.category === 'promocoes' || link.hasCoupon);
    } else {
        filteredLinks = linksData.filter(link => link.category === category);
    }

    console.log('Links filtrados:', filteredLinks.map(link => ({ title: link.title, category: link.category, hasCoupon: link.hasCoupon })));

    if (filteredLinks.length === 0) {
        noLinksMessage.classList.remove('hidden');
        console.log('Nenhum link encontrado para a categoria:', category);
        return;
    }

    // Cria um cartão para cada link filtrado
    filteredLinks.forEach((link, index) => {
        const linkCard = document.createElement('div');
        linkCard.className = `link-card bg-white shadow-md overflow-hidden fade-in`;
        linkCard.style.animationDelay = `${index * 0.1}s`;
        linkCard.innerHTML = `
            <div class="h-2 ${link.color}"></div>
            <div class="p-6">
                <img src="${link.image}" alt="${link.title}" class="product-image w-full h-48 object-cover rounded-md mb-4 cursor-pointer" data-image="${link.image}">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 rounded-full ${link.color} flex items-center justify-center text-white text-xl mr-4">
                        <i class="fas fa-${link.icon}"></i>
                    </div>
                    <h3 class="text-xl font-bold font-playfair text-gray-800">${link.title}</h3>
                </div>
                <p class="text-gray-600 mb-4">${link.description}</p>
                ${link.hasCoupon ? `
                    <p class="coupon-title text-sm">CUPOM DE DESCONTO</p>
                    <p class="coupon-info text-sm mb-4">${link.couponInfo}</p>
                ` : ''}
                <a href="${link.url}" target="_blank" class="block w-full bg-pink-500 hover:bg-pink-600 text-white text-center font-bold py-2 px-4 rounded transition duration-300">
                    Acessar Link <i class="fas fa-external-link-alt ml-2"></i>
                </a>
            </div>
        `;
        linksContainer.appendChild(linkCard);
        console.log(`Link adicionado: ${link.title} (Categoria: ${link.category}, Imagem: ${link.image}, hasCoupon: ${link.hasCoupon})`);
    });

    // Aplica o observador de animação aos novos cartões
    const newFadeElements = linksContainer.querySelectorAll('.fade-in');
    console.log(`Aplicando observador a ${newFadeElements.length} cartões`);
    newFadeElements.forEach((element, idx) => {
        animationObserver.observe(element);
        console.log(`Observador de animação aplicado ao cartão ${idx + 1}`);
    });

    // Adiciona eventos de clique às imagens dos produtos
    const productImages = linksContainer.querySelectorAll('.product-image');
    console.log(`Adicionando eventos de clique a ${productImages.length} imagens`);
    productImages.forEach(image => {
        image.addEventListener('click', () => {
            if (modalImage && imageModal) {
                modalImage.src = image.getAttribute('data-image');
                imageModal.classList.remove('hidden');
                console.log('Modal de imagem aberto:', image.getAttribute('data-image'));
            } else {
                console.error('modalImage ou imageModal não encontrado');
            }
        });
    });
}

// Controle do modal de imagens
if (imageModal && modalClose && modalImage) {
    modalClose.addEventListener('click', () => {
        imageModal.classList.add('hidden');
        console.log('Modal de imagem fechado');
    });

    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            imageModal.classList.add('hidden');
            console.log('Modal de imagem fechado ao clicar fora');
        }
    });
} else {
    console.error('imageModal, modalClose ou modalImage não encontrado');
}

// Inicializa com todos os links após o DOM carregar
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando links para categoria "all"');
    setTimeout(() => {
        window.selectCategory('all');
    }, 100);
});

// Adiciona eventos de clique às abas de categoria
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        console.log('Clicou na aba de categoria:', category);
        window.selectCategory(category);
    });
});

// Observador para animações de fade-in
const animationObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
                console.log('Animação fade-in aplicada ao elemento:', entry.target);
            }
        });
    },
    { rootMargin: '0px 0px -20% 0px' }
);