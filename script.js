fetch('https://raw.githubusercontent.com/berny-code/visual-Berny/main/trabajos.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('portafolio'); // <div id="portafolio"></div>


    data.forEach(item => {
      const elemento = document.createElement('div');
      elemento.classList.add('proyecto');

      let contenido = `
        <h3>${item.titulo}</h3>
        <p>${item.descripcion}</p>
        <p><em>${item.fecha}</em></p>
      `;

      if (item.tipo === "imagen" || item.tipo === "fotografía") {
        contenido += `<img src="${item.enlace || item.url}" width="300" alt="${item.titulo}">`;
      } else if (item.tipo === "video") {
        contenido += `
          <video controls width="300">
            <source src="${item.enlace || item.url}" type="video/mp4">
          </video>
        `;
      }

      elemento.innerHTML = contenido;
      container.appendChild(elemento);
    });
  })
  .catch(error => console.error('Error al cargar el JSON:', error));
