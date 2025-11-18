function toggleMenu(id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.display = (el.style.display === 'block') ? 'none' : 'block';
    }

    function mostrarInfo(texto) {
      const box = document.getElementById('info-box');
      box.classList.remove('hide');
      setTimeout(() => {
        box.innerHTML = `<p>${texto}</p>`;
        box.classList.add('hide');
      }, 120);
    }

    function cambiarIdioma(idioma) {
      const traducciones = {
        es: { titulo: "EL ANGEL CAIDO", info: "Tocá un botón..." },
        en: { titulo: "THE FALLEN ANGEL", info: "Click a button..." },
        fr: { titulo: "L'ANGE DÉCHU", info: "Cliquez sur un bouton..." }
      };
      const t = traducciones[idioma] || traducciones.es;
      document.getElementById('titulo').innerText = t.titulo;
      document.getElementById('info-box').innerHTML = `<p id="info-default">${t.info}</p>`;
    }

    function mostrarDetail(id) {
      document.querySelectorAll('.detail-section').forEach(sec => {
        sec.classList.remove('active');
        sec.setAttribute('aria-hidden','true');
      });
      const target = document.getElementById(id);
      if (target) {
        target.classList.add('active');
        target.setAttribute('aria-hidden','false');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    document.getElementById('boton-continuar').addEventListener('click', () => {
      document.getElementById('pantalla-inicial').style.display = 'none';
      document.getElementById('musicaFondo').play().catch(()=>{});
    });

    document.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        const s = document.getElementById('clic');
        if(s){ s.currentTime = 0; s.play().catch(()=>{}); }
      });
    });

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.cuadro').forEach((c,i) => {
        setTimeout(()=> c.classList.add('show'), 300 + i*120);
      });
      setTimeout(()=> { 
        const p = document.getElementById('pantalla-inicial'); 
        if(p) p.style.display='none'; 
      }, 10000);
    });

    const adImages = [
      "Sin título6.jpg",
      "Sin título9.jpg",
      "https://i.pinimg.com/originals/fe/11/3b/fe113b351de387646ccf7e58139950e4.jpg"
    ];

    let currentAd = 0;
    const adImageElement = document.getElementById('ad-image');

    setInterval(() => {
      currentAd = (currentAd + 1) % adImages.length;
      adImageElement.style.opacity = 0;
      setTimeout(() => {
        adImageElement.src = adImages[currentAd];
        adImageElement.style.opacity = 1;
      }, 900);
    }, 4000);

    window.addEventListener('load', () => {
      const musica = document.getElementById('musicaFondo');
      musica.volume = 0.5;

      const playPromise = musica.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          document.addEventListener('click', () => {
            musica.play();
          }, { once: true });
        });
      }
    });
 