/* =========================================================
   SITE LAR DA CRIANÇA FERMINO MAGNANI
   JAVASCRIPT COMPLETO
========================================================= */


/* =========================================================
   1. MENU MOBILE
========================================================= */

const menuButton =
    document.getElementById("menu-mobile");

menuButton?.addEventListener(
    "click",
    () => {

        console.log("Menu mobile");

    }
);


/* =========================================================
   2. ROLAGEM SUAVE DO MENU
========================================================= */

const linksMenu = document.querySelectorAll(
    'header a[href*="#"], nav a[href*="#"]'
);


linksMenu.forEach(link => {

    link.addEventListener("click", event => {

        const href =
            link.getAttribute("href");


        if (
            !href ||
            href === "#"
        ) {
            return;
        }


        /*
           Pega somente o que vem depois do #
           mesmo se o href estiver como:

           index.html#quem-e-o-lar
           ou
           #quem-e-o-lar
        */

        const idSecao =
            href.includes("#")
                ? href.split("#")[1]
                : null;


        if (!idSecao) return;


        const secao =
            document.getElementById(
                idSecao
            );


        if (!secao) return;


        event.preventDefault();


        secao.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   3. ANIMAÇÕES DE ENTRADA NA ROLAGEM
========================================================= */


/*
   Aqui estão os elementos que irão
   aparecer suavemente conforme o usuário
   rolar pelo site.
*/

const gruposAnimacao = [

    /* HERO */

    ".hero-conteudo > *",


    /* QUEM É O LAR */

    ".quem-lar-foto-area",
    ".quem-lar-texto > *",


    /* O QUE FAZEMOS */

    ".o-que-fazemos-conteudo > *",
    ".o-que-fazemos-card",


    /* IMPACTO */

    ".impacto-cabecalho > *",
    ".impacto-item",


    /* RELATOS */

    ".relatos-intro > *",
    ".relatos-carrossel",


    /* AÇÕES */

    ".acoes-cabecalho > *",
    ".acao-card",


    /* COMO AJUDAR */

    ".como-ajudar-cabecalho > *",
    ".ajuda-card",


    /* INSTAGRAM */

    ".instagram-texto > *",
    ".instagram-foto",


    /* LOCALIZAÇÃO */

    ".localizacao-texto > *",
    ".mapa",


    /* FOOTER */

    ".footer-topo-texto > *",
    ".footer-topo-acao",
    ".footer-col",
    ".footer-bottom"

];


const prefereMenosMovimento =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/*
   Só ativa as animações se o usuário
   não tiver redução de movimento ligada.
*/

if (!prefereMenosMovimento) {

    gruposAnimacao.forEach(
        seletor => {

            const elementos =
                document.querySelectorAll(
                    seletor
                );


            elementos.forEach(
                (elemento, index) => {

                    /*
                       Evita cadastrar duas vezes.
                    */

                    if (
                        elemento.dataset.animado ===
                        "true"
                    ) {
                        return;
                    }


                    elemento.dataset.animado =
                        "true";


                    elemento.style.opacity =
                        "0";


                    /*
                       Alterna levemente a direção.
                    */

                    if (index % 3 === 1) {

                        elemento.style.transform =
                            "translateY(30px)";

                    } else if (
                        index % 3 === 2
                    ) {

                        elemento.style.transform =
                            "translateY(22px) scale(0.98)";

                    } else {

                        elemento.style.transform =
                            "translateY(38px)";

                    }


                    elemento.style.transition =
                        `
                        opacity 0.75s ease,
                        transform 0.75s cubic-bezier(.2,.8,.2,1)
                        `;


                    /*
                       Pequeno efeito cascata.
                    */

                    elemento.style.transitionDelay =
                        `${Math.min(index * 70, 280)}ms`;


                    elemento.style.willChange =
                        "opacity, transform";

                }
            );

        }
    );


    const observerEntrada =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const elemento =
                            entry.target;


                        elemento.style.opacity =
                            "1";


                        elemento.style.transform =
                            "translateY(0) scale(1)";


                        /*
                           Depois da animação,
                           limpa o transform para
                           não interferir nos hovers.
                        */

                        setTimeout(
                            () => {

                                elemento.style
                                    .removeProperty(
                                        "transform"
                                    );

                                elemento.style
                                    .removeProperty(
                                        "will-change"
                                    );

                                elemento.style
                                    .removeProperty(
                                        "transition-delay"
                                    );

                            },
                            1100
                        );


                        observerEntrada.unobserve(
                            elemento
                        );

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -45px 0px"
            }
        );


    document
        .querySelectorAll(
            '[data-animado="true"]'
        )
        .forEach(
            elemento => {

                observerEntrada.observe(
                    elemento
                );

            }
        );

}


/* =========================================================
   4. NOSSA HISTÓRIA
========================================================= */

const elementosHistoria =
    document.querySelectorAll(
        ".historia-item, .historia-reveal"
    );


const observerHistoria =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visivel"
                        );

                        observerHistoria.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.18
        }
    );


elementosHistoria.forEach(
    elemento => {

        observerHistoria.observe(
            elemento
        );

    }
);


/* =========================================================
   5. IMPACTO EM NÚMEROS
========================================================= */

const secaoImpacto =
    document.querySelector(
        ".impacto-numeros"
    );

const contadores =
    document.querySelectorAll(
        ".contador"
    );

let impactoAnimado = false;


function animarContadores() {

    contadores.forEach(
        contador => {

            const alvo =
                Number(
                    contador.getAttribute(
                        "data-target"
                    )
                );


            const duracao = 1800;

            const inicio =
                performance.now();


            function atualizar(tempoAtual) {

                const progresso =
                    Math.min(
                        (
                            tempoAtual -
                            inicio
                        ) /
                        duracao,
                        1
                    );


                /*
                   Ease out.
                */

                const suavizado =
                    1 -
                    Math.pow(
                        1 - progresso,
                        3
                    );


                contador.textContent =
                    Math.round(
                        alvo *
                        suavizado
                    );


                if (
                    progresso < 1
                ) {

                    requestAnimationFrame(
                        atualizar
                    );

                } else {

                    contador.textContent =
                        alvo;

                }

            }


            requestAnimationFrame(
                atualizar
            );

        }
    );

}


if (secaoImpacto) {

    const observerImpacto =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting &&
                            !impactoAnimado
                        ) {

                            impactoAnimado =
                                true;

                            animarContadores();

                        }

                    }
                );

            },
            {
                threshold: 0.35
            }
        );


    observerImpacto.observe(
        secaoImpacto
    );

}


/* =========================================================
   6. CARROSSEL DE RELATOS
========================================================= */

const relatosViewport =
    document.querySelector(
        ".relatos-viewport"
    );

const relatosTrack =
    document.querySelector(
        ".relatos-track"
    );

const relatosCards =
    document.querySelectorAll(
        ".relato-card"
    );

const botaoAnterior =
    document.querySelector(
        ".relato-anterior"
    );

const botaoProximo =
    document.querySelector(
        ".relato-proximo"
    );

const indicadores =
    document.querySelectorAll(
        ".relato-indicador"
    );


let relatoAtual = 0;

let intervaloRelatos;

let scrollTimer;

let animacaoRelatos = null;


/* =========================================================
   INDICADORES
========================================================= */

function atualizarIndicadores() {

    indicadores.forEach(
        (indicador, index) => {

            indicador.classList.toggle(
                "ativo",
                index === relatoAtual
            );

        }
    );

}


/* =========================================================
   POSIÇÃO REAL DO CARD
========================================================= */

function posicaoRelato(card) {

    if (!card) return 0;


    if (relatosTrack) {

        return (
            card.offsetLeft -
            relatosTrack.offsetLeft
        );

    }


    return card.offsetLeft;

}


/* =========================================================
   ANIMAÇÃO HORIZONTAL PERSONALIZADA
========================================================= */

function animarScrollRelatos(
    destino,
    duracao = 650
) {

    if (!relatosViewport) return;


    /*
       Cancela animação anterior.
    */

    if (animacaoRelatos) {

        cancelAnimationFrame(
            animacaoRelatos
        );

    }


    const inicio =
        relatosViewport.scrollLeft;

    const distancia =
        destino - inicio;

    const tempoInicial =
        performance.now();


    /*
       Desativa temporariamente o snap
       para a animação ficar livre.
    */

    const snapAnterior =
        relatosViewport.style
            .scrollSnapType;

    relatosViewport.style
        .scrollSnapType =
        "none";


    function animar(tempoAtual) {

        const progresso =
            Math.min(
                (
                    tempoAtual -
                    tempoInicial
                ) /
                duracao,
                1
            );


        /*
           Curva suave:
           começa devagar, acelera e
           desacelera no final.
        */

        const suavizado =
            progresso < 0.5
                ? 4 *
                  progresso *
                  progresso *
                  progresso
                : 1 -
                  Math.pow(
                      -2 * progresso + 2,
                      3
                  ) /
                  2;


        relatosViewport.scrollLeft =
            inicio +
            distancia *
            suavizado;


        if (
            progresso < 1
        ) {

            animacaoRelatos =
                requestAnimationFrame(
                    animar
                );

        } else {

            relatosViewport.scrollLeft =
                destino;


            relatosViewport.style
                .scrollSnapType =
                snapAnterior;


            animacaoRelatos = null;

        }

    }


    animacaoRelatos =
        requestAnimationFrame(
            animar
        );

}


/* =========================================================
   IR PARA RELATO
========================================================= */

function irParaRelato(indice) {

    if (
        !relatosViewport ||
        relatosCards.length === 0
    ) {
        return;
    }


    if (indice < 0) {

        indice =
            relatosCards.length - 1;

    }


    if (
        indice >=
        relatosCards.length
    ) {

        indice = 0;

    }


    relatoAtual = indice;


    const card =
        relatosCards[
            relatoAtual
        ];


    const destino =
        posicaoRelato(card);


    /*
       Aqui acontece a animação
       dos retângulos realmente
       indo para o lado.
    */

    animarScrollRelatos(
        destino,
        700
    );


    atualizarIndicadores();

}


/* =========================================================
   SETAS
========================================================= */

botaoAnterior?.addEventListener(
    "click",
    () => {

        irParaRelato(
            relatoAtual - 1
        );

        reiniciarCarrosselRelatos();

    }
);


botaoProximo?.addEventListener(
    "click",
    () => {

        irParaRelato(
            relatoAtual + 1
        );

        reiniciarCarrosselRelatos();

    }
);


/* =========================================================
   INDICADORES
========================================================= */

indicadores.forEach(
    indicador => {

        indicador.addEventListener(
            "click",
            () => {

                const indice =
                    Number(
                        indicador.dataset.slide
                    );


                irParaRelato(
                    indice
                );


                reiniciarCarrosselRelatos();

            }
        );

    }
);


/* =========================================================
   DETECTAR CARD APÓS ARRASTAR MANUALMENTE
========================================================= */

relatosViewport?.addEventListener(
    "scroll",
    () => {

        clearTimeout(
            scrollTimer
        );


        scrollTimer =
            setTimeout(
                () => {

                    /*
                       Não interfere enquanto
                       nossa animação roda.
                    */

                    if (
                        animacaoRelatos
                    ) {
                        return;
                    }


                    let maisProximo = 0;

                    let menorDistancia =
                        Infinity;


                    relatosCards.forEach(
                        (card, index) => {

                            const distancia =
                                Math.abs(
                                    posicaoRelato(
                                        card
                                    ) -
                                    relatosViewport
                                        .scrollLeft
                                );


                            if (
                                distancia <
                                menorDistancia
                            ) {

                                menorDistancia =
                                    distancia;

                                maisProximo =
                                    index;

                            }

                        }
                    );


                    relatoAtual =
                        maisProximo;


                    atualizarIndicadores();

                },
                120
            );

    }
);


/* =========================================================
   AUTO PLAY
========================================================= */

function iniciarCarrosselRelatos() {

    clearInterval(
        intervaloRelatos
    );


    if (
        relatosCards.length <= 1
    ) {
        return;
    }


    intervaloRelatos =
        setInterval(
            () => {

                irParaRelato(
                    relatoAtual + 1
                );

            },
            6000
        );

}


function pausarCarrosselRelatos() {

    clearInterval(
        intervaloRelatos
    );

}


function reiniciarCarrosselRelatos() {

    pausarCarrosselRelatos();

    iniciarCarrosselRelatos();

}


/* PAUSA AO PASSAR O MOUSE */

relatosViewport?.addEventListener(
    "mouseenter",
    pausarCarrosselRelatos
);


relatosViewport?.addEventListener(
    "mouseleave",
    iniciarCarrosselRelatos
);


/* =========================================================
   RESPONSIVIDADE DO CARROSSEL
========================================================= */

window.addEventListener(
    "resize",
    () => {

        const cardAtual =
            relatosCards[
                relatoAtual
            ];


        if (
            relatosViewport &&
            cardAtual
        ) {

            relatosViewport.scrollLeft =
                posicaoRelato(
                    cardAtual
                );

        }

    }
);


/* =========================================================
   INICIAR CARROSSEL
========================================================= */

if (
    relatosViewport &&
    relatosCards.length > 0
) {

    relatoAtual = 0;

    relatosViewport.scrollLeft =
        posicaoRelato(
            relatosCards[0]
        );


    atualizarIndicadores();

    iniciarCarrosselRelatos();

}


/* =========================================================
   7. MODAL DE DOAÇÃO
========================================================= */

const doacaoModal =
    document.getElementById(
        "doacaoModal"
    );

const fecharDoacao =
    document.getElementById(
        "fecharDoacao"
    );

const fecharSucesso =
    document.getElementById(
        "fecharSucesso"
    );

const doacaoOverlay =
    document.querySelector(
        ".doacao-modal-overlay"
    );

const doacaoForm =
    document.getElementById(
        "doacaoForm"
    );

const doacaoSucesso =
    document.getElementById(
        "doacaoSucesso"
    );

const valoresDoacao =
    document.querySelectorAll(
        ".valor-doacao"
    );

const valorPersonalizado =
    document.getElementById(
        "valorPersonalizado"
    );


const botoesDoacao =
    document.querySelectorAll(
        `
        .btn-doar,
        .footer-doar-botao,
        .ajuda-card-amarelo .ajuda-botao,
        [data-doacao]
        `
    );


function abrirModalDoacao() {

    if (!doacaoModal) return;


    doacaoModal.classList.add(
        "ativo"
    );


    doacaoModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-aberto"
    );


    setTimeout(
        () => {

            fecharDoacao?.focus();

        },
        300
    );

}


function fecharModalDoacao() {

    if (!doacaoModal) return;


    doacaoModal.classList.remove(
        "ativo"
    );


    doacaoModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-aberto"
    );


    setTimeout(
        () => {

            doacaoForm?.reset();


            valoresDoacao.forEach(
                botao => {

                    botao.classList.remove(
                        "ativo"
                    );

                }
            );


            if (doacaoForm) {

                doacaoForm.style.display =
                    "flex";

            }


            doacaoSucesso?.classList.remove(
                "ativo"
            );

        },
        350
    );

}


botoesDoacao.forEach(
    botao => {

        botao.addEventListener(
            "click",
            event => {

                event.preventDefault();

                abrirModalDoacao();

            }
        );

    }
);


fecharDoacao?.addEventListener(
    "click",
    fecharModalDoacao
);


doacaoOverlay?.addEventListener(
    "click",
    fecharModalDoacao
);


valoresDoacao.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                valoresDoacao.forEach(
                    item => {

                        item.classList.remove(
                            "ativo"
                        );

                    }
                );


                botao.classList.add(
                    "ativo"
                );


                if (
                    valorPersonalizado
                ) {

                    valorPersonalizado.value =
                        botao.dataset.valor;

                }

            }
        );

    }
);


valorPersonalizado?.addEventListener(
    "input",
    () => {

        valoresDoacao.forEach(
            botao => {

                botao.classList.remove(
                    "ativo"
                );

            }
        );

    }
);


doacaoForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        doacaoForm.style.display =
            "none";


        doacaoSucesso?.classList.add(
            "ativo"
        );

    }
);


fecharSucesso?.addEventListener(
    "click",
    fecharModalDoacao
);


/* =========================================================
   8. MODAL DE PARCERIA
========================================================= */

const parceriaModal =
    document.getElementById(
        "parceriaModal"
    );

const fecharParceria =
    document.getElementById(
        "fecharParceria"
    );

const parceriaOverlay =
    document.querySelector(
        ".parceria-modal-overlay"
    );

const parceriaForm =
    document.getElementById(
        "parceriaForm"
    );

const parceriaSucesso =
    document.getElementById(
        "parceriaSucesso"
    );

const fecharParceriaSucesso =
    document.getElementById(
        "fecharParceriaSucesso"
    );

const parceriaOpcoes =
    document.querySelectorAll(
        ".parceria-opcao"
    );

const tipoParceria =
    document.getElementById(
        "tipoParceria"
    );


const botoesParceria =
    document.querySelectorAll(
        `
        .ajuda-card-azul .ajuda-botao,
        [data-parceria-modal]
        `
    );


function abrirModalParceria() {

    if (!parceriaModal) return;


    parceriaModal.classList.add(
        "ativo"
    );


    parceriaModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-aberto"
    );


    setTimeout(
        () => {

            fecharParceria?.focus();

        },
        300
    );

}


function fecharModalParceria() {

    if (!parceriaModal) return;


    parceriaModal.classList.remove(
        "ativo"
    );


    parceriaModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-aberto"
    );


    setTimeout(
        () => {

            parceriaForm?.reset();


            parceriaOpcoes.forEach(
                opcao => {

                    opcao.classList.remove(
                        "ativo"
                    );

                }
            );


            if (tipoParceria) {

                tipoParceria.value = "";

            }


            if (parceriaForm) {

                parceriaForm.style.display =
                    "flex";

            }


            parceriaSucesso?.classList.remove(
                "ativo"
            );

        },
        350
    );

}


botoesParceria.forEach(
    botao => {

        botao.addEventListener(
            "click",
            event => {

                event.preventDefault();

                abrirModalParceria();

            }
        );

    }
);


fecharParceria?.addEventListener(
    "click",
    fecharModalParceria
);


parceriaOverlay?.addEventListener(
    "click",
    fecharModalParceria
);


parceriaOpcoes.forEach(
    opcao => {

        opcao.addEventListener(
            "click",
            () => {

                parceriaOpcoes.forEach(
                    item => {

                        item.classList.remove(
                            "ativo"
                        );

                    }
                );


                opcao.classList.add(
                    "ativo"
                );


                if (tipoParceria) {

                    tipoParceria.value =
                        opcao.dataset.parceria;

                }

            }
        );

    }
);


parceriaForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        parceriaForm.style.display =
            "none";


        parceriaSucesso?.classList.add(
            "ativo"
        );

    }
);


fecharParceriaSucesso?.addEventListener(
    "click",
    fecharModalParceria
);


/* =========================================================
   9. MODAL DE COMPARTILHAMENTO
========================================================= */

const compartilharModal =
    document.getElementById(
        "compartilharModal"
    );

const fecharCompartilhar =
    document.getElementById(
        "fecharCompartilhar"
    );

const compartilharOverlay =
    document.querySelector(
        ".compartilhar-overlay"
    );

const copiarLink =
    document.getElementById(
        "copiarLink"
    );

const compartilharNativo =
    document.getElementById(
        "compartilharNativo"
    );

const compartilharFeedback =
    document.getElementById(
        "compartilharFeedback"
    );


const botoesCompartilhar =
    document.querySelectorAll(
        "[data-compartilhar]"
    );


const compartilharTitulo =
    "Conheça o Lar da Criança Fermino Magnani";


const compartilharTexto =
    "Conheça o trabalho do Lar da Criança Fermino Magnani e ajude essa história a chegar mais longe.";


function obterUrlCompartilhamento() {

    return window.location.href;

}


function abrirModalCompartilhar() {

    if (!compartilharModal) return;


    compartilharModal.classList.add(
        "ativo"
    );


    compartilharModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-aberto"
    );


    setTimeout(
        () => {

            fecharCompartilhar?.focus();

        },
        300
    );

}


function fecharModalCompartilhar() {

    if (!compartilharModal) return;


    compartilharModal.classList.remove(
        "ativo"
    );


    compartilharModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-aberto"
    );

}


botoesCompartilhar.forEach(
    botao => {

        botao.addEventListener(
            "click",
            event => {

                event.preventDefault();

                abrirModalCompartilhar();

            }
        );

    }
);


fecharCompartilhar?.addEventListener(
    "click",
    fecharModalCompartilhar
);


compartilharOverlay?.addEventListener(
    "click",
    fecharModalCompartilhar
);


/* WHATSAPP */

document.querySelector(
    '[data-rede="whatsapp"]'
)?.addEventListener(
    "click",
    () => {

        const url =
            encodeURIComponent(
                obterUrlCompartilhamento()
            );


        const texto =
            encodeURIComponent(
                compartilharTexto
            );


        window.open(
            `https://wa.me/?text=${texto}%20${url}`,
            "_blank"
        );

    }
);


/* FACEBOOK */

document.querySelector(
    '[data-rede="facebook"]'
)?.addEventListener(
    "click",
    () => {

        const url =
            encodeURIComponent(
                obterUrlCompartilhamento()
            );


        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            "_blank"
        );

    }
);


/* INSTAGRAM */

document.querySelector(
    '[data-rede="instagram"]'
)?.addEventListener(
    "click",
    () => {

        window.open(
            "https://www.instagram.com/lar.fermino2018.magnani/",
            "_blank"
        );

    }
);


/* EMAIL */

document.querySelector(
    '[data-rede="email"]'
)?.addEventListener(
    "click",
    () => {

        const destinatario =
            "lar.fermino018@gmail.com";


        const assunto =
            encodeURIComponent(
                "Quero conhecer e apoiar o Lar da Criança Fermino Magnani"
            );


        const corpo =
            encodeURIComponent(
`Olá!

Conheci o trabalho do Lar da Criança Fermino Magnani pelo site e gostaria de saber mais sobre a instituição e as formas de contribuir.

Site:
${window.location.href}

Obrigado!`
            );


        const gmailUrl =
            `https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${assunto}&body=${corpo}`;


        window.open(
            gmailUrl,
            "_blank"
        );

    }
);


/* COMPARTILHAMENTO NATIVO */

compartilharNativo?.addEventListener(
    "click",
    async () => {

        if (navigator.share) {

            try {

                await navigator.share({
                    title:
                        compartilharTitulo,

                    text:
                        compartilharTexto,

                    url:
                        obterUrlCompartilhamento()
                });

            } catch (erro) {

                /*
                   Usuário cancelou.
                */

            }

        } else {

            copiarUrl();

        }

    }
);


/* COPIAR LINK */

let feedbackTimeout;


async function copiarUrl() {

    const url =
        obterUrlCompartilhamento();


    try {

        await navigator.clipboard
            .writeText(
                url
            );


        mostrarFeedbackCompartilhar();

    } catch (erro) {

        /*
           Fallback para navegadores
           que não liberam clipboard.
        */

        const campo =
            document.createElement(
                "textarea"
            );


        campo.value = url;


        campo.style.position =
            "fixed";

        campo.style.opacity =
            "0";


        document.body.appendChild(
            campo
        );


        campo.select();


        document.execCommand(
            "copy"
        );


        campo.remove();


        mostrarFeedbackCompartilhar();

    }

}


copiarLink?.addEventListener(
    "click",
    copiarUrl
);


function mostrarFeedbackCompartilhar() {

    if (
        !compartilharFeedback
    ) {
        return;
    }


    compartilharFeedback.classList.add(
        "ativo"
    );


    clearTimeout(
        feedbackTimeout
    );


    feedbackTimeout =
        setTimeout(
            () => {

                compartilharFeedback
                    .classList
                    .remove(
                        "ativo"
                    );

            },
            1800
        );

}


/* =========================================================
   10. MODAL EVENTOS + VOLUNTARIADO
========================================================= */

const eventosModal =
    document.getElementById(
        "eventosModal"
    );

const fecharEventos =
    document.getElementById(
        "fecharEventos"
    );

const eventosOverlay =
    document.querySelector(
        ".eventos-overlay"
    );

const voluntariadoForm =
    document.getElementById(
        "voluntariadoForm"
    );

const voluntariadoSucesso =
    document.getElementById(
        "voluntariadoSucesso"
    );

const fecharVoluntariadoSucesso =
    document.getElementById(
        "fecharVoluntariadoSucesso"
    );

const voluntarioEvento =
    document.getElementById(
        "voluntarioEvento"
    );

const areaVoluntariado =
    document.getElementById(
        "areaVoluntariado"
    );

const voluntariadoOpcoes =
    document.querySelectorAll(
        ".voluntariado-opcao"
    );

const botoesEvento =
    document.querySelectorAll(
        ".evento-participar"
    );


/*
   IMPORTANTE:
   somente data-eventos abre
   este modal.
*/

const botoesEventos =
    document.querySelectorAll(
        "[data-eventos]"
    );


function abrirModalEventos() {

    if (!eventosModal) return;


    eventosModal.classList.add(
        "ativo"
    );


    eventosModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-aberto"
    );


    setTimeout(
        () => {

            fecharEventos?.focus();

        },
        300
    );

}


function fecharModalEventos() {

    if (!eventosModal) return;


    eventosModal.classList.remove(
        "ativo"
    );


    eventosModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-aberto"
    );


    setTimeout(
        () => {

            voluntariadoForm?.reset();


            voluntariadoOpcoes.forEach(
                opcao => {

                    opcao.classList.remove(
                        "ativo"
                    );

                }
            );


            if (areaVoluntariado) {

                areaVoluntariado.value =
                    "";

            }


            if (voluntariadoForm) {

                voluntariadoForm
                    .style
                    .display =
                    "flex";

            }


            voluntariadoSucesso
                ?.classList
                .remove(
                    "ativo"
                );


            const headerEventos =
                document.querySelector(
                    ".eventos-header"
                );


            const proximosEventos =
                document.querySelector(
                    ".eventos-proximos"
                );


            const area =
                document.querySelector(
                    ".voluntariado-area"
                );


            if (headerEventos) {

                headerEventos.style
                    .display =
                    "";

            }


            if (proximosEventos) {

                proximosEventos.style
                    .display =
                    "";

            }


            if (area) {

                area.style
                    .display =
                    "";

            }

        },
        350
    );

}


botoesEventos.forEach(
    botao => {

        botao.addEventListener(
            "click",
            event => {

                event.preventDefault();

                abrirModalEventos();

            }
        );

    }
);


fecharEventos?.addEventListener(
    "click",
    fecharModalEventos
);


eventosOverlay?.addEventListener(
    "click",
    fecharModalEventos
);


/* =========================================================
   ESCOLHER EVENTO
========================================================= */

botoesEvento.forEach(
    botao => {

        botao.addEventListener(
            "click",
            () => {

                const nomeEvento =
                    botao.dataset.evento;


                if (
                    voluntarioEvento
                ) {

                    voluntarioEvento.value =
                        nomeEvento;

                }


                /*
                   Rola apenas a caixa do modal,
                   e não a página inteira.
                */

                const area =
                    document.querySelector(
                        ".voluntariado-area"
                    );


                const box =
                    document.querySelector(
                        ".eventos-modal-box"
                    );


                if (
                    area &&
                    box
                ) {

                    const destino =
                        area.offsetTop - 25;


                    box.scrollTo({
                        top: destino,
                        behavior: "smooth"
                    });

                }

            }
        );

    }
);


/* =========================================================
   ÁREA DE INTERESSE
========================================================= */

voluntariadoOpcoes.forEach(
    opcao => {

        opcao.addEventListener(
            "click",
            () => {

                voluntariadoOpcoes.forEach(
                    item => {

                        item.classList.remove(
                            "ativo"
                        );

                    }
                );


                opcao.classList.add(
                    "ativo"
                );


                if (
                    areaVoluntariado
                ) {

                    areaVoluntariado.value =
                        opcao.dataset.area;

                }

            }
        );

    }
);


/* =========================================================
   ENVIO DO VOLUNTARIADO
========================================================= */

voluntariadoForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const headerEventos =
            document.querySelector(
                ".eventos-header"
            );


        const proximosEventos =
            document.querySelector(
                ".eventos-proximos"
            );


        const area =
            document.querySelector(
                ".voluntariado-area"
            );


        if (headerEventos) {

            headerEventos.style.display =
                "none";

        }


        if (proximosEventos) {

            proximosEventos.style.display =
                "none";

        }


        if (area) {

            area.style.display =
                "none";

        }


        voluntariadoSucesso
            ?.classList
            .add(
                "ativo"
            );


        document.querySelector(
            ".eventos-modal-box"
        )?.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


fecharVoluntariadoSucesso
    ?.addEventListener(
        "click",
        fecharModalEventos
    );


/* =========================================================
   11. ESC FECHA QUALQUER MODAL
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }


        if (
            doacaoModal
                ?.classList
                .contains(
                    "ativo"
                )
        ) {

            fecharModalDoacao();

            return;

        }


        if (
            parceriaModal
                ?.classList
                .contains(
                    "ativo"
                )
        ) {

            fecharModalParceria();

            return;

        }


        if (
            compartilharModal
                ?.classList
                .contains(
                    "ativo"
                )
        ) {

            fecharModalCompartilhar();

            return;

        }


        if (
            eventosModal
                ?.classList
                .contains(
                    "ativo"
                )
        ) {

            fecharModalEventos();

        }

    }
);