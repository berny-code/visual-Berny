fetch('https://raw.githubusercontent.com/berny-code/visual-Berny/main/trabajos.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('portafolio');
    if (!container) return; // Previene errores si el contenedor no existe.

    data.forEach(item => {
      if (!item.titulo || !item.descripcion || !item.url || !item.tipo) {
        console.error("Elemento con datos faltantes:", item);
        return; // Salta elementos mal formateados
      }

      const elemento = document.createElement('div');
      elemento.classList.add('proyecto');

      let contenido = `
        <h3>${item.titulo}</h3>
        <p>${item.descripcion}</p>
        <p><em>${item.fecha}</em></p>
      `;

      if (item.tipo === "imagen") {
        contenido += `<img src="${item.url}" width="300" alt="${item.titulo}">`;
      } else if (item.tipo === "video") {
        contenido += `
          <video controls width="300">
            <source src="${item.url}" type="video/mp4">
            Tu navegador no soporta el video.
          </video>
        `;
      } else {
        console.error("Tipo desconocido:", item.tipo);
      }

      elemento.innerHTML = contenido;
      container.appendChild(elemento);
    });
  })
  .catch(error => console.error('Error al cargar el JSON:', error));
