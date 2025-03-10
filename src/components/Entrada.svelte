<script>
  export let entrada = {
    id: 0,
    titulo: "Entrada 0",
    contenido: "Contenido de la entrada 0",
    fecha: "2021-01-01",
    img: "https://picsum.photos/500/500",
  };

  let showingPopup = false;

  const togglePopup = () => {
    showingPopup = !showingPopup;
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      togglePopup();
    }
  };
</script>

<div
  class="entrada"
  on:click={togglePopup}
  on:keydown={handleKeydown}
  tabindex="0"
  role="button"
  aria-expanded={showingPopup}
>
  <div class="preview">
    <img src={entrada.img} alt={entrada.titulo} />
  </div>
  <div class="data">
    <div>
      <h3>{entrada.titulo}</h3>
      <p class="excerpt">{entrada.contenido.substring(0, 100)}...</p>
    </div>
    <p class="fecha">{entrada.fecha}</p>
  </div>
</div>

{#if showingPopup}
  <div class="popup-overlay" on:click={togglePopup}>
    <div class="popup-content" on:click|stopPropagation>
      <button class="close-btn" on:click={togglePopup}>×</button>
      <h2>{entrada.titulo}</h2>
      <div class="popup-image">
        <img src={entrada.img} alt={entrada.titulo} />
      </div>
      <div class="popup-texto">
        <p class="popup-fecha">{entrada.fecha}</p>
        <p class="popup-contenido">{entrada.contenido}</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .entrada {
    background: var(--weird-blu-bg);
    border-radius: 1em;
    margin-top: 2em;
    width: 300px;
    height: 350px;
    text-align: center;
    overflow: hidden;
    transition: all ease-out;
    transition-duration: 0.2s;
    box-shadow: 0px 0px 0px 0px var(--weird-blu);
    text-overflow: ellipsis;
  }

  .entrada:hover {
    transform: scale(1.05);
    box-shadow: 5px 5px 20px 2px var(--weird-blu);
    cursor: pointer;
  }

  .preview {
    width: 100%;
    height: 100px;
    overflow: hidden;
    margin-bottom: 5%;
  }

  .preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h3 {
    color: var(--dark-blu);
    font-size: 1.2em;
    margin: 0.5rem;
  }

  p {
    color: var(--weird-blu);
    font-size: 1em;
    margin: 0.5rem;
  }

  .fecha {
    color: var(--aqua_ig);
    font-weight: bold;
    flex-grow: 1;
  }

  /* Popup styles */
  .popup-overlay {
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

  .popup-content {
    background: white;
    border-radius: 2em;
    padding: 2em;
    width: 70%;
    height: 80%;
    max-width: 80%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    overflow: scroll;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }

  .popup-image {
    justify-self: center;
    width: 80%;
    max-height: 500px;
    overflow: hidden;
    border-radius: 1em;
    margin: 1em 0;
  }

  .popup-image img {
    width: 100%;
    height: 100%;
    object-fit: fill;
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

  .popup-fecha {
    color: var(--aqua_ig);
    font-weight: bold;
    font-size: 1.2em;
  }

  .popup-contenido {
    color: var(--weird-blu);
    font-size: 1.3em;
    line-height: 1.5;
    text-align: left;
  }
</style>
