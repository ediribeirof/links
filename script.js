// script.js

// Variável de estado para controlar a exibição do pop-up (uma vez por sessão)
let hasPopupBeenShown = false;

// Dados dos links exibidos na seção "Links Exclusivos"
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

// Seleção de elementos do DOM
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const backToTopButton = document.getElementById('backToTop');
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popup-close');
const popupForm = document.getElementById('popup-form');
const popupName = document.getElementById('popup-name');
const popupEmail = document.getElementById('popup-email');
const popupWhatsApp = document.getElementById('popup-whatsapp');
const popupConsent = document.getElementById('popup-consent');
const linksContainer = document.getElementById('links-container');
const noLinksMessage = document.getElementById('no-links-message');
const categoryTabs = document.querySelectorAll('.category-tab');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesButton = document.getElementById('accept-cookies');
const rejectCookiesButton = document.getElementById('reject-cookies');

// Função para mostrar o alerta personalizado
function showCustomAlert(message) {
    const customAlert = document.createElement('div');
    customAlert.id = 'custom-alert';
    customAlert.innerHTML = `
        <i class="fas fa-heart mr-2" aria-hidden="true"></i>
        <span>${message}</span>
    `;
    customAlert.className = 'fixed top-4 right-4 bg-gradient-to-r from-pink-500 to-pink-300 text-white p-4 rounded-lg shadow-lg z-50 flex items-center gap-2 font-lora text-sm max-w-xs opacity-0';
    document.body.appendChild(customAlert);

    // Aplica a classe 'show' para ativar a animação
    setTimeout(() => customAlert.classList.add('show'), 10);

    // Remove o alerta após 5 segundos
    setTimeout(() => {
        customAlert.classList.remove('show');
        setTimeout(() => customAlert.remove(), 500); // Aguarda o fim da animação
    }, 5000);

    // Fecha ao clicar no alerta
    customAlert.addEventListener('click', () => {
        customAlert.classList.remove('show');
        setTimeout(() => customAlert.remove(), 500);
    }, { once: true });

    console.log('Alerta personalizado exibido:', message);
}

// Verifica se os elementos principais do DOM existem
if (!linksContainer || !noLinksMessage || !categoryTabs.length) {
    console.error('Erro: Elementos do DOM não encontrados', {
        linksContainer: !!linksContainer,
        noLinksMessage: !!noLinksMessage,
        categoryTabs: categoryTabs.length
    });
}

// Validação em tempo real para o campo Nome
if (popupName) {
    popupName.addEventListener('input', (e) => {
        const value = e.target.value.replace(/[^A-Za-záàèéíìóòúùâêîôûãõÇç^~`´\s]/g, '');
        e.target.value = value;
        console.log('Nome filtrado:', value);
    });
}

// Formata o campo WhatsApp com IMask.js
if (popupWhatsApp) {
    IMask(popupWhatsApp, {
        mask: '(00) 00000-0000'
    });
    console.log('IMask aplicado ao campo WhatsApp');
}

// Função para criar mensagem de erro
function createErrorMessage(input, message) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        input.classList.add('border-red-500');
    } else {
        console.error('Erro: Elemento .error-message não encontrado para', input);
    }
}

// Função para remover mensagem de erro
function removeErrorMessage(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.classList.add('hidden');
        input.classList.remove('border-red-500');
    } else {
        console.error('Erro: Elemento .error-message não encontrado para', input);
    }
}

// Funções de validação
function validateName(nameValue) {
    return /^[A-Za-záàèéíìóòúùâêîôûãõÇç^~`´\s]{2,}$/.test(nameValue.trim());
}

function validateEmail(emailValue) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim());
}

function validateWhatsApp(whatsappValue) {
    const cleanedValue = whatsappValue.replace(/\D/g, '');
    return /^\d{11}$/.test(cleanedValue) && cleanedValue.charAt(2) === '9';
}

function validateConsent(consentChecked) {
    return consentChecked;
}

// Gerenciamento do banner de cookies (LGPD, Art. 7, I)
if (cookieBanner && acceptCookiesButton && rejectCookiesButton) {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        cookieBanner.classList.remove('hidden');
        console.log('Banner de cookies exibido');
    } else if (consent === 'accepted') {
        window.clarity('consent');
        console.log('Consentimento de cookies já aceito, Clarity ativado');
    }

    acceptCookiesButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.add('hidden');
        window.clarity('consent');
        console.log('Cookies aceitos, Clarity ativado');
    });

    rejectCookiesButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieBanner.classList.add('hidden');
        console.log('Cookies recusados, Clarity desativado');
    });
}

// Validação do formulário do pop-up
if (popupForm && popupName && popupEmail && popupWhatsApp && popupConsent) {
    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Evento submit acionado');

        let isValid = true;

        const nameValue = popupName.value.trim();
        if (!validateName(nameValue)) {
            createErrorMessage(popupName, 'O nome deve conter apenas letras, acentos (á, à, è, é, í, ì, ó, ò, ú, ù, â, ê, î, ô, û, ã, õ, Ç, ç), símbolos (^, ~, `, ´) e espaços, com no mínimo 2 caracteres.');
            isValid = false;
        } else {
            removeErrorMessage(popupName);
        }

        const emailValue = popupEmail.value.trim();
        if (!validateEmail(emailValue)) {
            createErrorMessage(popupEmail, 'Por favor, insira um e-mail válido (ex.: nome@dominio.com).');
            isValid = false;
        } else {
            removeErrorMessage(popupEmail);
        }

        const whatsappValue = popupWhatsApp.value.replace(/\D/g, '');
        if (!validateWhatsApp(whatsappValue)) {
            createErrorMessage(popupWhatsApp, 'O WhatsApp deve conter 11 dígitos, incluindo o DDD e o 9 na frente (ex.: (85) 99730-4019).');
            isValid = false;
        } else {
            removeErrorMessage(popupWhatsApp);
        }

        if (!validateConsent(popupConsent.checked)) {
            createErrorMessage(popupConsent, 'Você deve concordar com a Política de Privacidade para enviar o formulário.');
            isValid = false;
        } else {
            removeErrorMessage(popupConsent);
        }

        if (isValid) {
            const formData = new FormData(popupForm);
            console.log('Formulário válido, dados:', {
                name: formData.get('name'),
                email: formData.get('email'),
                whatsapp: `+55${whatsappValue}`
            });
            popup.classList.add('hidden');
            showCustomAlert('Informações enviadas com sucesso, minha fia! 💖');
            popupForm.reset();
            console.log('Formulário enviado e resetado');
        } else {
            console.log('Formulário inválido, envio bloqueado');
        }
    });
} else {
    console.error('Erro: Elementos do formulário não encontrados', {
        popupForm: !!popupForm,
        popupName: !!popupName,
        popupEmail: !!popupEmail,
        popupWhatsApp: !!popupWhatsApp,
        popupConsent: !!popupConsent
    });
}

// Exibe o pop-up 10 segundos após o carregamento da página
if (popup) {
    console.log('Elemento popup encontrado:', popup);
    window.addEventListener('load', () => {
        console.log('Evento load disparado');
        if (!hasPopupBeenShown) {
            setTimeout(() => {
                if (!hasPopupBeenShown) {
                    popup.classList.remove('hidden');
                    hasPopupBeenShown = true;
                    console.log('Pop-up exibido após 10 segundos');
                } else {
                    console.log('Pop-up não exibido: já foi mostrado nesta sessão');
                }
            }, 10000); // 10 segundos
        } else {
            console.log('Pop-up não será exibido: já foi mostrado nesta sessão');
        }
    });
} else {
    console.error('Erro: Elemento popup não encontrado');
}

// Controle do pop-up (fechar ao clicar no botão, fora ou com Esc)
if (popup && popupClose) {
    popupClose.addEventListener('click', () => {
        popup.classList.add('hidden');
        console.log('Pop-up fechado pelo botão');
    });

    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.add('hidden');
            console.log('Pop-up fechado ao clicar fora');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !popup.classList.contains('hidden')) {
            popup.classList.add('hidden');
            console.log('Pop-up fechado com tecla Esc');
        }
    });
} else {
    console.error('Erro: Elementos popup ou popup-close não encontrados', {
        popup: !!popup,
        popupClose: !!popupClose
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

// Função para selecionar categoria de links
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

    linksContainer.innerHTML = '';
    noLinksMessage.classList.add('hidden');

    let filteredLinks;
    if (category === 'all') {
        filteredLinks = linksData;
    } else if (category === 'promocoes') {
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

    const newFadeElements = linksContainer.querySelectorAll('.fade-in');
    console.log(`Aplicando observador a ${newFadeElements.length} cartões`);
    newFadeElements.forEach((element, idx) => {
        animationObserver.observe(element);
        console.log(`Observador de animação aplicado ao cartão ${idx + 1}`);
    });

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

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !imageModal.classList.contains('hidden')) {
            imageModal.classList.add('hidden');
            console.log('Modal de imagem fechado com tecla Esc');
        }
    });
} else {
    console.error('imageModal, modalClose ou modalImage não encontrado');
}

// Inicializa com todos os links após o DOM carregar e verifica se deve rolar para #links
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando links para categoria "all"');
    setTimeout(() => {
        window.selectCategory('all');
        if (window.location.hash === '#links') {
            const linksSection = document.querySelector('#links');
            if (linksSection) {
                linksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log('Rolagem automática para #links ao carregar a página');
            }
        }
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