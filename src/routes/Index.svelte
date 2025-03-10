<script>
  import Entrada from "../components/Entrada.svelte";
  import Chat from "../components/Chat.svelte";

  export let entradas = [
  {
    "id": 1,
    "titulo": "Narcomenudeo, asesinatos y negligencias: los presuntos criminales que se colaron en la boleta judicial",
    "contenido": "En enero de 2024, dos incidentes graves en cárceles de Sonora, México, pusieron en evidencia irregularidades en el sistema penitenciario, supervisado por Nicollino Cangiamilla, ahora candidato a magistrado. La candidatura de Cangiamilla, junto a otros casos de aspirantes con antecedentes criminales, ha generado indignación y cuestionamientos.",
    "fecha": "2025-03-09",
    "img": "https://cdn.milenio.com/uploads/media/2020/07/05/narcomenudeo-nivel-nacional-record-enero_0_11_1200_745.jpg"
  },
  {
    "id": 2,
    "titulo": "Claudia Sheinbaum logra el respaldo férreo de todo México frente a las amenazas de Trump",
    "contenido": "Claudia Sheinbaum, Presidenta de México, está recibiendo un fuerte apoyo nacional frente a las amenazas arancelarias de Donald Trump. Sus interacciones estratégicas con el presidente estadounidense le han permitido ganar popularidad, logrando el respeto y la confianza internacional.",
    "fecha": "2025-03-09",
    "img": "https://elceo.com/wp-content/uploads/2024/11/donald_trump_claudia_sheinbaum_aranceles.jpg"
  },
  {
    "id": 3,
    "titulo": "Decenas de miles de mujeres desbordan el centro de Ciudad de México por el Día Internacional de la Mujer",
    "contenido": "En el Día Internacional de la Mujer, decenas de miles de mujeres se han movilizado en Ciudad de México para protestar por la violencia de género y exigir igualdad. Este año, la manifestación ha sido la primera con Claudia Sheinbaum en la presidencia, mostrando un enfoque inclusivo con el lema 'Llegamos todas'.",
    "fecha": "2025-03-08",
    "img": "https://th.bing.com/th?id=OIF.7pKoywVPNf%2bPt2QiF%2fUI7A&rs=1&pid=ImgDetMain"
  },
  {
    "id": 4,
    "titulo": "Sheinbaum, en su baño de masas en el Zócalo: 'Ha prevalecido el diálogo y el respeto. No somos ni más ni menos que EE UU'",
    "contenido": "Claudia Sheinbaum, presidenta de México, realizó un multitudinario evento en el Zócalo de la Ciudad de México para informar sobre la negociación de aranceles que Estados Unidos, bajo la presidencia de Donald Trump, pretende imponer. En su discurso, destacó que 'ha prevalecido el diálogo y el respeto' entre ambas naciones.",
    "fecha": "2025-03-09",
    "img": "https://ap-cdn.sfo3.cdn.digitaloceanspaces.com/uploads/2025/03/Discurso-integro-de-Sheinbaum-en-el-Zocalo-tras-acuerdo-con-EU-sobre-aranceles_2-600x400.jpg"
  },
  {
    "id": 5,
    "titulo": "Resolución de la Corte en materia electoral excede límites constitucionales: Loretta Ortiz",
    "contenido": "Al resolver en torno de la suspensión del proceso electoral extraordinario 2024-2025, la Sala Superior del Tribunal Electoral emitió resoluciones para garantizar su continuidad. La ministra Loretta Ortiz Ahlf señaló que la Suprema Corte de Justicia de la Nación (SCJN) debe actuar dentro de los límites de sus facultades.",
    "fecha": "2025-02-14",
    "img": "https://strapi.daliaempower.com/uploads/loretta_ortiz_senado_de_la_rep_en9s_N26_format_jpeg_7e9b8895a2.jpg"
  },
  {
    "id": 6,
    "titulo": "Arranca en el Senado discusión sobre no reelección y nepotismo electoral",
    "contenido": "La propuesta presidencial somete a consideración que se prohíba la reelección para las personas que hayan obtenido un cargo de elección popular, aplicable a partir de los procesos electorales de 2030. Además, propone como requisito que los candidatos no tengan vínculos de matrimonio, concubinato o relación de pareja en los últimos tres años.",
    "fecha": "2025-03-02",
    "img": "https://th.bing.com/th/id/OIP.PUW9Uvog5US_vhQH8dDbPAHaEk?rs=1&pid=ImgDetMain"
  },
  {
    "id": 7,
    "titulo": "Diputados aprueban reforma contra nepotismo y no reelección en México",
    "contenido": "La Cámara de Diputados aprobó con mayoría calificada la reforma constitucional contra el nepotismo y la no reelección, que entrará en vigor en 2030. Esta medida modifica seis artículos de la Constitución y busca combatir prácticas políticas arraigadas en México.",
    "fecha": "2025-03-04",
    "img": "https://th.bing.com/th/id/OIP.x_ATc1urA_xFuuua3XpdaAHaE2?rs=1&pid=ImgDetMain"
  },
  {
    "id": 8,
    "titulo": "SCJN ordena revocar suspensiones contra reforma judicial en materia electoral",
    "contenido": "La Suprema Corte de Justicia de la Nación (SCJN) ordenó a jueces de distrito revocar en 24 horas las suspensiones contra la reforma judicial en materia electoral, dejando intactos los amparos por derechos humanos.",
    "fecha": "2025-02-14",
    "img": "https://th.bing.com/th/id/OIP.p1xUr5_OQLOEsMavw7I9aAHaFD?rs=1&pid=ImgDetMain"
  }
]

</script>

<div class="title">
  <img src="assets/Luci.png" alt="Luci" width="150"/>
  <div class="header">
    <h1>Transparenc-IA</h1>
    <h2>Tu plataforma de acceso a la información con Luci y Lúcio</h2>
  </div>
  <img src="assets/Lucio.png" alt="Lucio" width="150"/>
</div>
<div class="content">
  <div class="entradas">
    {#each entradas as entrada}
      <Entrada {entrada} />
    {/each}
  </div>
  <!-- Pass the entradas to the Chat component -->
  <Chat {entradas} />
</div>

<style>
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    text-align: center;
    align-content: center;
    height: 15vh;
    padding-top: 3%;
  }

  .title h1 {
    font-size: 3em;
    color: var(--dark-blu);
  }

  .title h2 {
    font-size: 1.5em;
    color: var(--weird-blu);
  }

  .content {
    display: flex;
    padding: 0 5% 0 5%;
    margin-bottom: 5%;
    justify-content: space-around;
    width: 100%;
  }

  .entradas {
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>