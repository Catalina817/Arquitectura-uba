document.addEventListener("DOMContentLoaded", function () {
  const materiasPorAnio = {
    "Ciclo Básico Común (CBC)": [
      "Introducción al Conocimiento de la Sociedad y el Estado",
      "Introducción al Pensamiento Científico",
      "Introducción al Conocimiento Proyectual 1",
      "Introducción al Conocimiento Proyectual 2",
      "Matemática",
      "Filosofía",
      "Taller de Dibujo"
    ],
    "1º Año": [
      "Arquitectura I", "Instalaciones A", "Sistemas de Representación Gráfica",
      "Introducción a la Tecnología Constructiva", "Instalaciones Eléctricas",
      "Física Aplicada a la Arquitectura", "Matemática 2"
    ],
    "2º Año": [
      "Arquitectura II", "Representación Arquitectónica", "Historia 1", "Materiales 1",
      "Construcciones 1", "Estructuras 1", "Instalaciones 1"
    ],
    "3º Año": [
      "Arquitectura III", "Morfología y Percepción", "Materiales 2", "Historia 2",
      "Construcciones 2", "Estructuras 2", "Instalaciones 2", "Proyecto Urbano"
    ],
    "4º Año": [
      "Arquitectura IV", "Teoría de la Arquitectura", "Historia 3",
      "Construcciones 3", "Estructuras 3", "Instalaciones 3"
    ],
    "5º Año": [
      "Proyecto Arquitectónico", "Diseño, Legislación y Organización",
      "Práctica Profesional Asistida", "Práctica de Investigación",
      "Diseño y Planeamiento de la Ciudad"
    ]
  };

  const container = document.getElementById("malla-container");

  for (const [anio, materias] of Object.entries(materiasPorAnio)) {
    const section = document.createElement("div");
    section.className = "anio";

    const title = document.createElement("h2");
    title.textContent = anio;
    section.appendChild(title);

    const materiaDiv = document.createElement("div");
    materiaDiv.className = "materias";

    materias.forEach(nombre => {
      const div = document.createElement("div");
      div.className = "materia";
      div.textContent = nombre;
      div.onclick = () => {
        if (!div.classList.contains("bloqueada")) {
          div.classList.toggle("aprobada");
        }
      };
      materiaDiv.appendChild(div);
    });

    section.appendChild(materiaDiv);
    container.appendChild(section);
  }
});
