<script>
  export let entrada = {
    id: 0,
    titulo: "Entrada 0",
    contenido: "Contenido de la entrada 0",
    fecha: "2021-01-01",
    img: "https://picsum.photos/500/500"
  };

  const closeNoticia = () => {
    const element = document.getElementById('noticia');
    if (element) {
      element.remove();
    }
  }
</script>

<div class="noticia-overlay" on:click={closeNoticia}>
  <div class="noticia-content" on:click|stopPropagation>
    <button class="close-btn" on:click={closeNoticia}>×</button>
    <h2>{entrada.titulo}</h2>
    <div class="noticia-image">
      <img src={entrada.img} alt={entrada.titulo} />
    </div>
    <div class="noticia-texto">
      <p class="noticia-fecha">{entrada.fecha}</p>
      <p class="noticia-contenido">{entrada.contenido}</p>
    </div>
  </div>
</div>

<style>
  .noticia-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .noticia-content {
    background: white;
    border-radius: 2em;
    padding: 2em;
    max-width: 80%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }

  .noticia-image {
    width: 100%;
    max-height: 400px;
    overflow: hidden;
    border-radius: 1em;
    margin: 1em 0;
  }

  .noticia-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 2em;
    cursor: pointer;
    color: var(--dark-blu);
  }

  h2 {
    color: var(--dark-blu);
    font-size: 2.8em;
    margin-top: 0;
  }

  .noticia-fecha {
    color: var(--aqua_ig);
    font-weight: bold;
    font-size: 1.2em;
  }

  .noticia-contenido {
    color: var(--weird-blu);
    font-size: 1.3em;
    line-height: 1.5;
    text-align: left;
  }
</style>