document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body')
    window.addEventListener('scroll', ()=>{

        if(sobreFestival.getBoundingClientRect().top <0){
            barra.classList.add('fijo')
            body.classList.add('body-scroll')
        }else{
            barra.classList.remove('fijo')
            body.classList.remove('body-scroll')
        }
    })

}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach( enlace =>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll)
            seccion.scrollIntoView({behavior:"smooth"});
        })
    })

}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes')

    for(let i = 1; i<= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Vocalista tocando la pala'nt">
        `

        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen)
        }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Vocalista tocando la pala'nt">
    `
    //crea overlay
    const overlay = document.createElement('div')
    overlay.appendChild(imagen)
    overlay.classList.add('overlay')
    overlay.onclick = function(){
        body.appendChild(overlay)
        body.classList.remove('fijar-body')
        overlay.remove();
    }
    
    //cerrar modal

    const cerrarModal = document.createElement('p')
    cerrarModal.innerHTML = `<i class="bi bi-x-octagon"></i>`
    cerrarModal.onclick = function(){
        body.appendChild(overlay)
        body.classList.remove('fijar-body')
        overlay.remove();
    }
    cerrarModal.classList.add("btn-cerrar")

    overlay.appendChild(cerrarModal)
    
    //añade al body
    const body = document.querySelector('body')
    body.appendChild(overlay)
    body.classList.add('fijar-body')
}