(function () {
    document.querySelectorAll('.fadeIn').forEach(e => setInterval(function(){
        e.classList.add('entrarAnimado')
    }, 100));

    //pegar offset do primeiro elemento da seção de projetos
    let getOffsetProjetos = document.querySelector('.itemProjeto').offsetTop;
    let getOffsetSobre = document.querySelector('.fadeInCur').offsetTop;

    function medirOffset() {
        //inserir animação nos items de projeto
        if (window.pageYOffset >= getOffsetProjetos - 400) {
            document.querySelectorAll('.projetos [deslocarDireita]').forEach(e => {
                e.classList.add('deslocarAnimadoDir');
            })

            document.querySelectorAll('.projetos [deslocarEsquerda]').forEach(e => {
                e.classList.add('deslocarAnimadoEsq');
            })
        }

        if(window.pageYOffset >= getOffsetSobre - 470){
            document.querySelectorAll('.fadeInCur').forEach(e =>{
                e.classList.add('entrarAnimado')
            });

            //remove o evento quando o evento de scroll nao é mais necessario
            document.removeEventListener('scroll', medirOffset);
        }
    }
    document.addEventListener('scroll', medirOffset);
    
})();