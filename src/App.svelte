<script>
  import Router from "svelte-spa-router";
  import Noticia from "./routes/Noticia.svelte";
  import Index from "./routes/Index.svelte";
  import NotFound from "./routes/NotFound.svelte";
  
  
  const routes = {
    "/": Index,
    "*": NotFound,
  };
</script>

<main>
  <Router {routes} />
</main>

<style>
  main {
    background-color: var(--bg-cyan);
    min-height: 100vh;
    height: 100%;
    font-family: "Afacad Flux";
  }
</style>
