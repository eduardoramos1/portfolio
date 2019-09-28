class CacaNiquel {
    constructor() {
        this.btnJogar = document.querySelector('.jogar');
        this.fichas = 2000;
        this.alertaDeFichas = document.querySelector('.fichas');
        this.avisoDeVitoriaOuDerrota = document.querySelector('.aviso')

        this.iniciarJogo();
    }

    rodarSlots() {
        let slot = document.querySelectorAll('[slot]');
        let elResultados = []  // para pegar todos os elementos com os valores após o sorteio dos slots

        slot.forEach(e => {
            let intervalos = setInterval(function () {
                e.innerHTML = Math.floor(Math.random() * (9)) + 1;
            }, 50);

            setTimeout(function () {
                clearInterval(intervalos)
                return elResultados.push(e)
            }, 2000);
        })

        return elResultados
    }


    iniciarJogo() {
        this.btnJogar.addEventListener('click', e => {
            this.retirarFichas(100);
            this.atualizarFichas()
            this.btnJogar.disabled = true;
            this.btnJogar.style.cursor = 'not-allowed'

            if (this.fichas >= 100) {
                let slots = this.rodarSlots();

                setTimeout(combs.bind(this), 2100)

                function combs() {
                    //combinações de resultado;
                    let comb1 = slots[0].innerHTML == slots[1].innerHTML && slots[0].innerHTML == slots[2].innerHTML;
                    let comb2 = slots[3].innerHTML == slots[4].innerHTML && slots[3].innerHTML == slots[5].innerHTML;
                    let comb3 = slots[6].innerHTML == slots[7].innerHTML && slots[6].innerHTML == slots[8].innerHTML;
                    let comb4 = slots[0].innerHTML == slots[3].innerHTML && slots[0].innerHTML == slots[6].innerHTML;
                    let comb5 = slots[1].innerHTML == slots[4].innerHTML && slots[1].innerHTML == slots[7].innerHTML;
                    let comb6 = slots[2].innerHTML == slots[5].innerHTML && slots[2].innerHTML == slots[8].innerHTML;
                    let comb7 = slots[0].innerHTML == slots[4].innerHTML && slots[0].innerHTML == slots[8].innerHTML;
                    let comb8 = slots[2].innerHTML == slots[4].innerHTML && slots[2].innerHTML == slots[6].innerHTML;

                    //Após a verificação de resultado, esta variavél será preenchida com os valos combinados e os seus elementos sofrerão animações
                    let todasAsComb = [];

                    if (comb1) {
                        todasAsComb.push(slots[0], slots[1], slots[2])
                    }
                    if (comb2) {
                        todasAsComb.push(slots[3], slots[4], slots[5])
                    }
                    if (comb3) {
                        todasAsComb.push(slots[6], slots[7], slots[8])
                    }
                    if (comb4) {
                        todasAsComb.push(slots[0], slots[3], slots[6])
                    }
                    if (comb5) {
                        todasAsComb.push(slots[1], slots[4], slots[7])
                    }
                    if (comb6) {
                        todasAsComb.push(slots[2], slots[5], slots[8])
                    }
                    if (comb7) {
                        todasAsComb.push(slots[0], slots[4], slots[8])
                    }
                    if (comb8) {
                        todasAsComb.push(slots[2], slots[4], slots[6])
                    }

                    if (todasAsComb.length) {
                        this.avisoVitoriaOuDerrota(true)
                        this.slotsVencedores(todasAsComb);
                        if (todasAsComb.length > 3) {
                            this.acrescentarFichas(10000);
                            this.atualizarFichas()
                        } else {
                            this.acrescentarFichas(2000);
                            this.atualizarFichas()
                        }
                    } else {
                        this.avisoVitoriaOuDerrota(false)
                    }

                    this.btnJogar.disabled = false;
                    this.btnJogar.style.cursor = 'pointer'
                };
            } else {
                alert('Você não tem fichas o suficiente, reinicie o jogo!')
            }
        });
    }


    slotsVencedores(elementosParaAnimar) {
        //para retirar elementos repetidos do array
        let elementos = [...new Set(elementosParaAnimar)];
        console.log(elementos)

        let animar = setInterval(function () {
            elementos.forEach(e => e.classList.toggle('slot-vencedor'));
        }, 450)

        //parar a animação quando reiniciar o jogo
        this.btnJogar.addEventListener('click', e => {
            clearInterval(animar);
            elementos.forEach(e => e.classList.contains('slot-vencedor') ? e.classList.remove('slot-vencedor') : false);
        })
    }

    retirarFichas(numeroDeFichas) {
        this.fichas -= numeroDeFichas;
    }
    acrescentarFichas(numeroDeFichas) {
        this.fichas += numeroDeFichas;
    }

    atualizarFichas() {
        this.alertaDeFichas.innerHTML = `Número de fichas: ${this.fichas}`
    }

    avisoVitoriaOuDerrota(venceu = true) {
        this.avisoDeVitoriaOuDerrota.style.visibility = 'visible';
        function removerAviso() {
            this.avisoDeVitoriaOuDerrota.style.visibility = 'hidden';
        }

        if (venceu) {
            this.avisoDeVitoriaOuDerrota.classList.add('venceu')
            if (this.avisoDeVitoriaOuDerrota.classList.contains('perdeu')) {
                this.avisoDeVitoriaOuDerrota.classList.remove('perdeu')
            }
            this.avisoDeVitoriaOuDerrota.innerHTML = `Parabéns, você venceu!!`

            setTimeout(removerAviso.bind(this), 2000)

        } else {
            this.avisoDeVitoriaOuDerrota.classList.add('perdeu')
            if (this.avisoDeVitoriaOuDerrota.classList.contains('venceu')) {
                this.avisoDeVitoriaOuDerrota.classList.remove('venceu')
            }

            this.avisoDeVitoriaOuDerrota.innerHTML = `Que pena, você perdeu!!`

            setTimeout(removerAviso.bind(this), 2000)
        }
    }


}

