const menuButton = document.getElementById("menu-mobile");

menuButton.addEventListener("click", () => {

    console.log("Menu mobile");

});

/* ========================================
   NOSSA HISTÓRIA - ANIMAÇÕES
======================================== */

const elementosHistoria = document.querySelectorAll(
    ".historia-item, .historia-reveal"
);

const observerHistoria = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visivel");

            }

        });

    },
    {
        threshold: 0.18
    }
);


elementosHistoria.forEach((elemento) => {

    observerHistoria.observe(elemento);

});

/* ========================================
   IMPACTO EM NÚMEROS - CONTADOR
======================================== */

const secaoImpacto = document.querySelector(".impacto-numeros");
const contadores = document.querySelectorAll(".contador");

let impactoAnimado = false;

function animarContadores() {

    contadores.forEach((contador) => {

        const alvo = +contador.getAttribute("data-target");
        let atual = 0;

        const duracao = 1800;
        const incremento = Math.max(1, Math.ceil(alvo / (duracao / 16)));

        const atualizar = () => {
            atual += incremento;

            if (atual >= alvo) {
                contador.textContent = alvo;
            } else {
                contador.textContent = atual;
                requestAnimationFrame(atualizar);
            }
        };

        atualizar();
    });
}

if (secaoImpacto) {

    const observerImpacto = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting && !impactoAnimado) {
                impactoAnimado = true;
                animarContadores();
            }

        });

    }, {
        threshold: 0.35
    });

    observerImpacto.observe(secaoImpacto);
}

/* ========================================
   CARROSSEL DE RELATOS
======================================== */

const relatosViewport =
    document.querySelector(".relatos-viewport");

const relatosCards =
    document.querySelectorAll(".relato-card");

const botaoAnterior =
    document.querySelector(".relato-anterior");

const botaoProximo =
    document.querySelector(".relato-proximo");

const indicadores =
    document.querySelectorAll(".relato-indicador");


let relatoAtual = 0;

let intervaloRelatos;

let scrollTimer;


/* ========================================
   ATUALIZAR INDICADORES
======================================== */

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


/* ========================================
   IR PARA RELATO
======================================== */

function irParaRelato(indice) {

    if (
        !relatosViewport ||
        relatosCards.length === 0
    ) {
        return;
    }


    /* VOLTAR PARA O ÚLTIMO */

    if (indice < 0) {

        indice =
            relatosCards.length - 1;

    }


    /* VOLTAR PARA O PRIMEIRO */

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


    /*
       Usa a posição real do card
       dentro do viewport.

       Isso evita qualquer erro
       causado pelo gap.
    */

    relatosViewport.scrollTo({
        left: card.offsetLeft,
        behavior: "smooth"
    });


    atualizarIndicadores();

}


/* ========================================
   ANTERIOR
======================================== */

botaoAnterior?.addEventListener(
    "click",
    () => {

        irParaRelato(
            relatoAtual - 1
        );

        reiniciarCarrosselRelatos();

    }
);


/* ========================================
   PRÓXIMO
======================================== */

botaoProximo?.addEventListener(
    "click",
    () => {

        irParaRelato(
            relatoAtual + 1
        );

        reiniciarCarrosselRelatos();

    }
);


/* ========================================
   INDICADORES
======================================== */

indicadores.forEach(
    (indicador) => {

        indicador.addEventListener(
            "click",
            () => {

                const indice =
                    Number(
                        indicador.dataset.slide
                    );


                irParaRelato(indice);

                reiniciarCarrosselRelatos();

            }
        );

    }
);


/* ========================================
   DETECTAR CARD VISÍVEL
======================================== */

relatosViewport?.addEventListener(
    "scroll",
    () => {

        clearTimeout(
            scrollTimer
        );


        scrollTimer =
            setTimeout(
                () => {

                    let maisProximo = 0;

                    let menorDistancia =
                        Infinity;


                    relatosCards.forEach(
                        (card, index) => {

                            const distancia =
                                Math.abs(
                                    card.offsetLeft -
                                    relatosViewport.scrollLeft
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
                100
            );

    }
);


/* ========================================
   AUTO PLAY
======================================== */

function iniciarCarrosselRelatos() {

    clearInterval(
        intervaloRelatos
    );


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


/* ========================================
   REINICIAR AUTO PLAY
======================================== */

function reiniciarCarrosselRelatos() {

    clearInterval(
        intervaloRelatos
    );


    iniciarCarrosselRelatos();

}


/* ========================================
   RESPONSIVIDADE
======================================== */

window.addEventListener(
    "resize",
    () => {

        /*
           Após mudar o tamanho da tela,
           reposiciona o slide atual
           usando a posição REAL dele.
        */

        if (
            relatosViewport &&
            relatosCards[
                relatoAtual
            ]
        ) {

            relatosViewport.scrollLeft =
                relatosCards[
                    relatoAtual
                ].offsetLeft;

        }

    }
);


/* ========================================
   INICIAR
======================================== */

if (
    relatosViewport &&
    relatosCards.length > 0
) {

    relatoAtual = 0;

    relatosViewport.scrollLeft = 0;

    atualizarIndicadores();

    iniciarCarrosselRelatos();

}