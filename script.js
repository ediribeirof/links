// Controle para exibir o pop-up apenas uma vez por sessão
let hasPopupBeenShown = false;

// Dados dos links exibidos na seção "Links Exclusivos"
const linksData = [
    {
        title: "Sorteio Pix do Milhão",
        description: "Compre o eBook e concorra a R$ 1 milhão na sexta e R$ 100 mil na segunda e quarta! — tudo na mesma semana!",
        url: "https://checkout.pixdomilhao.com/?pdv_code=e0731a",
        category: "pix",
        icon: "money-bill-wave",
        color: "bg-yellow-500",
        image: "image/Pix_do_milhão.png",
        hasCoupon: false,
        couponInfo: "Pix do milhão 100% legalizado pela Susep: 15414.640619/2025-23 para maiores de 18 anos, vinclulado à compra de eBooks."
    },
    {
        title: "Queima Diária",
        description: "A Queima Diária é uma plataforma com programas de exercícios para fazer em casa.",
        url: "https://quei.ma/Edi_Pereira_Recomp",
        category: "queima",
        icon: "fire",
        color: "bg-red-500",
        image: "image/queima_diaria.png",
        hasCoupon: false,
        couponInfo: ""
    },
    {
        title: "Power Fit",
        description: "Moda fitness e casual, as peças vão do slim ao plus size do 34 ao 60.",
        url: "https://powerfitbr.com.br/",
        category: "powerfit",
        icon: "dumbbell",
        color: "bg-blue-500",
        image: "image/power_fit.png",
        hasCoupon: true,
        couponInfo: "Use o cupom EDI e garanta o seu desconto!"
    },
    {
        title: "Grupo Exclusivo no WhatsApp",
        description: "Participe do grupo VIP e receba ofertas, novidades e conteúdos exclusivos!",
        url: "https://api.whatsapp.com/send?phone=5585999473474",
        category: "whatsapp",
        icon: "users",
        color: "bg-pink-500",
        image: "image/FTdeFundo.png",
        hasCoupon: false,
        couponInfo: ""
    }
];

// Seleção de elementos do DOM
const mobileMenuButton = document.getElementById('mobile-menu-button'); // Botão hamburguer
const mobileMenu = document.getElementById('mobile-menu'); // Menu mobile
const backToTopButton = document.getElementById('backToTop'); // Botão "Voltar ao topo"
const popup = document.getElementById('popup'); // Pop-up de cadastro
const popupClose = document.getElementById('popup-close'); // Botão de fechar pop-up
const popupForm = document.getElementById('popup-form'); // Formulário do pop-up
const popupName = document.getElementById('popup-name'); // Campo de nome
const popupEmail = document.getElementById('popup-email'); // Campo de email
const popupWhatsApp = document.getElementById('popup-whatsapp'); // Campo de WhatsApp
const popupConsent = document.getElementById('popup-consent'); // Checkbox de consentimento
const linksContainer = document.getElementById('links-container'); // Container dos cards de links
const noLinksMessage = document.getElementById('no-links-message'); // Mensagem de "nenhum link"
const categoryTabs = document.querySelectorAll('.category-tab'); // Abas de categoria
const imageModal = document.getElementById('image-modal'); // Modal de imagem expandida
const modalImage = document.getElementById('modal-image'); // Imagem no modal
const modalClose = document.getElementById('modal-close'); // Botão de fechar modal
const cookieBanner = document.getElementById('cookie-banner'); // Banner de cookies
const acceptCookiesButton = document.getElementById('accept-cookies'); // Botão de aceitar cookies
const rejectCookiesButton = document.getElementById('reject-cookies'); // Botão de rejeitar cookies
const showMoreButton = document.getElementById('show-more-about'); // Botão "Leia mais"
const collapseButton = document.getElementById('collapse-about'); // Botão "Recolher"
const aboutTextHidden = document.querySelector('.about-text-hidden'); // Texto oculto da seção "Quem sou eu"
const aboutTextInitial = document.querySelector('.about-text-initial'); // Texto inicial da seção "Quem sou eu"

// Função para exibir alertas personalizados
function showCustomAlert(message) {
    const customAlert = document.createElement('div');
    customAlert.id = 'custom-alert';
    customAlert.innerHTML = `<i class="fas fa-heart mr-2" aria-hidden="true"></i><span>${message}</span>`;
    customAlert.className = 'fixed bg-gradient-to-r from-pink-500 to-pink-300 text-white p-4 rounded-lg shadow-lg z-50 flex items-center gap-2';
    document.body.appendChild(customAlert);
    setTimeout(() => customAlert.classList.add('show'), 10); // Exibe o alerta com animação
    setTimeout(() => {
        customAlert.classList.remove('show');
        setTimeout(() => customAlert.remove(), 500); // Remove após animação
    }, 7000);
    customAlert.addEventListener('click', () => {
        customAlert.classList.remove('show');
        setTimeout(() => customAlert.remove(), 500); // Remove ao clicar
    }, { once: true });
    console.log('Alerta personalizado exibido:', message);
}

// Verifica se os elementos principais da seção de links existem
if (!linksContainer || !noLinksMessage || !categoryTabs.length) {
    console.error('Erro: Elementos do DOM não encontrados', { 
        linksContainer: !!linksContainer, 
        noLinksMessage: !!noLinksMessage, 
        categoryTabs: categoryTabs.length 
    });
}

// Validação do campo de nome no pop-up
if (popupName) {
    popupName.addEventListener('input', (e) => {
        const value = e.target.value.replace(/[^A-Za-záàèéíìóòúùâêîôûãõÇç^~`´\s]/g, ''); // Filtra caracteres inválidos
        e.target.value = value;
        if (!validateName(value)) createErrorMessage(popupName, 'O nome deve conter apenas letras, acentos e espaços, com no mínimo 2 caracteres.');
        else removeErrorMessage(popupName);
        console.log('Nome filtrado:', value);
    });
}

// Validação do campo de email no pop-up
if (popupEmail) {
    popupEmail.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (!validateEmail(value)) createErrorMessage(popupEmail, 'Por favor, insira um e-mail válido (ex.: nome@dominio.com).');
        else removeErrorMessage(popupEmail);
        console.log('Email validado:', value);
    });
}

// Validação e formatação do campo de WhatsApp no pop-up
if (popupWhatsApp) {
    IMask(popupWhatsApp, { mask: '(00) 00000-0000' }); // Aplica máscara de telefone
    popupWhatsApp.addEventListener('input', (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (!validateWhatsApp(value)) createErrorMessage(popupWhatsApp, 'O WhatsApp deve conter 11 dígitos, incluindo DDD e 9 (ex.: (85) 99730-4019).');
        else removeErrorMessage(popupWhatsApp);
        console.log('WhatsApp validado:', value);
    });
    console.log('IMask aplicado ao campo WhatsApp');
}

// Função para criar mensagens de erro nos campos do formulário
function createErrorMessage(input, message) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        input.classList.add('border-red-500');
    } else console.error('Erro: Elemento .error-message não encontrado para', input);
}

// Função para remover mensagens de erro
function removeErrorMessage(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.classList.add('hidden');
        input.classList.remove('border-red-500');
    } else console.error('Erro: Elemento .error-message não encontrado para', input);
}

// Funções de validação
function validateName(nameValue) { return /^[A-Za-záàèéíìóòúùâêîôûãõÇç^~`´\s]{2,}$/.test(nameValue.trim()); }
function validateEmail(emailValue) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim()); }
function validateWhatsApp(whatsappValue) { 
    const cleanedValue = whatsappValue.replace(/\D/g, ''); 
    return /^\d{11}$/.test(cleanedValue) && cleanedValue.charAt(2) === '9'; 
}
function validateConsent(consentChecked) { return consentChecked; }

// Gerenciamento do banner de cookies
if (cookieBanner && acceptCookiesButton && rejectCookiesButton) {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) cookieBanner.classList.remove('hidden'); // Exibe banner se não houver consentimento
    else if (consent === 'accepted') window.clarity('consent'); // Ativa Clarity se consentido

    acceptCookiesButton.addEventListener('click', () => { 
        localStorage.setItem('cookieConsent', 'accepted'); 
        cookieBanner.classList.add('hidden'); 
        window.clarity('consent'); 
    });
    rejectCookiesButton.addEventListener('click', () => { 
        localStorage.setItem('cookieConsent', 'rejected'); 
        cookieBanner.classList.add('hidden'); 
    });
}

// Validação e envio do formulário do pop-up
if (popupForm && popupName && popupEmail && popupWhatsApp && popupConsent) {
    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const nameValue = popupName.value.trim(); 
        if (!validateName(nameValue)) { 
            createErrorMessage(popupName, 'O nome deve conter apenas letras, acentos e espaços, com no mínimo 2 caracteres.'); 
            isValid = false; 
        } else removeErrorMessage(popupName);
        const emailValue = popupEmail.value.trim(); 
        if (!validateEmail(emailValue)) { 
            createErrorMessage(popupEmail, 'Por favor, insira um e-mail válido (ex.: nome@dominio.com).'); 
            isValid = false; 
        } else removeErrorMessage(popupEmail);
        const whatsappValue = popupWhatsApp.value.replace(/\D/g, ''); 
        if (!validateWhatsApp(whatsappValue)) { 
            createErrorMessage(popupWhatsApp, 'O WhatsApp deve conter 11 dígitos, incluindo DDD e 9 (ex.: (85) 99730-4019).'); 
            isValid = false; 
        } else removeErrorMessage(popupWhatsApp);
        if (!validateConsent(popupConsent.checked)) { 
            createErrorMessage(popupConsent, 'Você deve concordar com a Política de Privacidade para enviar o formulário.'); 
            isValid = false; 
        } else removeErrorMessage(popupConsent);
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
        }
    });
} else console.error('Erro: Elementos do formulário não encontrados', { 
    popupForm: !!popupForm, 
    popupName: !!popupName, 
    popupEmail: !!popupEmail, 
    popupWhatsApp: !!popupWhatsApp, 
    popupConsent: !!popupConsent 
});

// Controle do pop-up (exibe após 10 segundos)
if (popup) {
    window.addEventListener('load', () => {
        if (!hasPopupBeenShown) setTimeout(() => { 
            if (!hasPopupBeenShown) { 
                popup.classList.remove('hidden'); 
                hasPopupBeenShown = true; 
            } 
        }, 10000);
    });
} else console.error('Erro: Elemento popup não encontrado');

// Fechar pop-up ao clicar fora ou pressionar Esc
if (popup && popupClose) {
    popupClose.addEventListener('click', () => { popup.classList.add('hidden'); });
    popup.addEventListener('click', (event) => { 
        if (event.target === popup) popup.classList.add('hidden'); 
    });
    document.addEventListener('keydown', (event) => { 
        if (event.key === 'Escape' && !popup.classList.contains('hidden')) 
            popup.classList.add('hidden'); 
    });
} else console.error('Erro: Elementos popup ou popup-close não encontrados', { 
    popup: !!popup, 
    popupClose: !!popupClose 
});

// Controle do menu mobile
if (mobileMenuButton && mobileMenu) {
    // Alterna a visibilidade do menu ao clicar no botão hamburguer
    mobileMenuButton.addEventListener('click', (e) => {
        e.preventDefault(); // Impede comportamento padrão do botão
        e.stopPropagation(); // Impede propagação do evento para outros elementos
        mobileMenu.classList.toggle('hidden'); 
        mobileMenuButton.setAttribute('aria-expanded', !mobileMenu.classList.contains('hidden')); 
        // Remove foco de todos os links ao abrir o menu
        setTimeout(() => {
            mobileMenu.querySelectorAll('a').forEach(link => link.blur());
        }, 0);
    });
    // Fecha o menu ao clicar em um link
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { 
        mobileMenu.classList.add('hidden'); 
        mobileMenuButton.setAttribute('aria-expanded', 'false'); 
    }));
    // Fecha o menu ao clicar fora
    document.addEventListener('click', (event) => { 
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) { 
            mobileMenu.classList.add('hidden'); 
            mobileMenuButton.setAttribute('aria-expanded', 'false'); 
        } 
    });
    // Fecha o menu ao redimensionar para desktop
    window.addEventListener('resize', () => { 
        if (window.innerWidth >= 1024 && !mobileMenu.classList.contains('hidden')) { 
            mobileMenu.classList.add('hidden'); 
            mobileMenuButton.setAttribute('aria-expanded', 'false'); 
        } 
    });
    // Fecha o menu ao rolar a página em mobile
    window.addEventListener('scroll', () => {
        if (window.innerWidth < 768 && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
}

// Controle do botão "Voltar ao topo"
if (backToTopButton && document.querySelector('nav')) {
    const nav = document.querySelector('nav');
    const backToTopObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) 
            backToTopButton.classList.replace('opacity-0', 'opacity-100').replace('invisible', 'visible');
        else 
            backToTopButton.classList.replace('opacity-100', 'opacity-0').replace('visible', 'invisible');
    }, { threshold: 0 });
    backToTopObserver.observe(nav);
    backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Rolagem suave para âncoras
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
        } else console.error('Elemento de destino não encontrado:', targetId);
    });
});

// Função para selecionar categoria e atualizar abas
window.selectCategory = function(category) {
    console.log('Selecionando categoria:', category);
    categoryTabs.forEach(tab => { 
        tab.classList.remove('active', 'text-white', 'bg-pink-500'); 
        tab.setAttribute('aria-selected', 'false'); 
    });
    if (category && category !== 'all') {
        const activeTab = Array.from(categoryTabs).find(tab => tab.getAttribute('data-category') === category);
        if (activeTab) {
            activeTab.classList.add('active', 'text-white', 'bg-pink-500');
            activeTab.setAttribute('aria-selected', 'true');
        } else console.warn('Aba para categoria', category, 'não encontrada');
    }
    filterLinks(category === 'all' ? null : category);
};

// Função para filtrar e exibir links na seção "Links Exclusivos"
function filterLinks(category) {
    console.log('Filtrando links para categoria:', category);
    if (!linksContainer || !noLinksMessage) { 
        console.error('linksContainer ou noLinksMessage não encontrado'); 
        return; 
    }
    linksContainer.innerHTML = '';
    noLinksMessage.classList.add('hidden');
    let filteredLinks = !category ? linksData : category === 'promocoes' ? linksData.filter(link => link.category === 'promocoes' || link.hasCoupon) : linksData.filter(link => link.category === category);
    if (filteredLinks.length === 0) { 
        noLinksMessage.classList.remove('hidden'); 
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
                ${link.couponInfo.trim() ? `<div class="coupon-info text-sm mb-4 ${link.couponInfo.trim() ? 'highlight-coupon' : ''}">${link.hasCoupon ? '<span class="coupon-highlight">CUPOM DE DESCONTO</span><br>' : ''}<span class="coupon-title ${link.couponInfo.includes('%') || link.couponInfo.includes('R$') ? 'coupon-value' : ''}">${link.couponInfo}</span></div>` : ''}
                <a href="${link.url}" target="_blank" class="block w-full bg-pink-500 hover:bg-pink-600 text-white text-center font-bold py-2 px-4 rounded transition duration-300">Acessar Link <i class="fas fa-external-link-alt ml-2"></i></a>
            </div>`;
        linksContainer.appendChild(linkCard);
    });
    const newFadeElements = linksContainer.querySelectorAll('.fade-in');
    newFadeElements.forEach((element, idx) => animationObserver.observe(element));
    const productImages = linksContainer.querySelectorAll('.product-image');
    productImages.forEach(image => image.addEventListener('click', () => { 
        if (modalImage && imageModal) { 
            modalImage.src = image.getAttribute('data-image'); 
            imageModal.style.display = 'flex'; 
        } 
    }));
}

// Controle do modal de imagem
if (imageModal && modalClose && modalImage) {
    modalClose.addEventListener('click', () => { 
        imageModal.style.display = 'none'; 
        modalImage.src = ''; 
    });
    imageModal.addEventListener('click', (event) => { 
        if (event.target === imageModal) { 
            imageModal.style.display = 'none'; 
            modalImage.src = ''; 
        } 
    });
    document.addEventListener('keydown', (event) => { 
        if (event.key === 'Escape' && imageModal.style.display === 'flex') { 
            imageModal.style.display = 'none'; 
            modalImage.src = ''; 
        } 
    });
} else console.error('imageModal, modalClose ou modalImage não encontrado');

// Controle da seção "Quem sou eu" (botões "Leia mais" e "Recolher")
if (showMoreButton && collapseButton && aboutTextHidden && aboutTextInitial) {
    showMoreButton.addEventListener('click', () => { 
        aboutTextHidden.classList.remove('hidden'); 
        showMoreButton.classList.add('hidden'); 
        collapseButton.classList.remove('hidden'); 
    });
    collapseButton.addEventListener('click', () => { 
        aboutTextHidden.classList.add('hidden'); 
        showMoreButton.classList.remove('hidden'); 
        collapseButton.classList.add('hidden'); 
    });
} else console.error('Erro: Elementos da seção "Quem sou eu" não encontrados', { 
    showMoreButton: !!showMoreButton, 
    collapseButton: !!collapseButton, 
    aboutTextHidden: !!aboutTextHidden, 
    aboutTextInitial: !!aboutTextInitial 
});

// Inicialização ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.location.hash === '#links') {
            const linksSection = document.querySelector('#links');
            if (linksSection) linksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (imageModal) imageModal.style.display = 'none';
    }, 100);
});

// Adiciona eventos de clique nas abas de categoria
categoryTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        const category = tab.getAttribute('data-category');
        console.log('Clicou na aba de categoria:', category);
        window.selectCategory(category);
    });
});

// Observador para animações de fade-in
const animationObserver = new IntersectionObserver((entries) => entries.forEach(entry => {
    if (entry.isIntersecting) { 
        entry.target.classList.add('visible'); 
        animationObserver.unobserve(entry.target); 
    }
}), { rootMargin: '0px 0px -20% 0px' });