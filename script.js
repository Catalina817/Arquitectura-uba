document.addEventListener("DOMContentLoaded", () => {
  const materias = {
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
      { nombre: "Arquitectura I", req: ["CBC"] },
      { nombre: "Instalaciones A", req: ["CBC"] },
      { nombre: "Sistemas de Representación Gráfica", req: ["CBC"] },
      { nombre: "Introducción a la Tecnología Constructiva", req: ["CBC"] },
      { nombre: "Instalaciones Eléctricas", req: ["CBC"] },
      { nombre: "Física Aplicada a la Arquitectura", req: ["CBC"] },
      { nombre: "Matemática 2", req: ["CBC"] }
    ],

    "2º Año": [
      { nombre: "Arquitectura II", req: ["Arquitectura I"] },
      { nombre: "Representación Arquitectónica", req: ["Sistemas de Representación Gráfica"] },
      { nombre: "Historia 1", req: ["Instalaciones A"] },
      { nombre: "Materiales 1", req: ["Sistemas de Representación Gráfica"] },
      { nombre: "Construcciones 1", req: ["Introducción a la Tecnología Constructiva"] },
      { nombre: "Estructuras 1", req: ["Matemática 2", "Física Aplicada a la Arquitectura"] },
      { nombre: "Instalaciones 1", req: ["Física Aplicada a la Arquitectura"] }
    ],

    "3º Año": [
      { nombre: "Arquitectura III", req: ["Arquitectura II"] },
      { nombre: "Morfología y Percepción", req: ["Representación Arquitectónica"] },
      { nombre: "Materiales 2", req: ["Materiales 1"] },
      { nombre: "Historia 2", req: ["Historia 1"] },
      { nombre: "Construcciones 2", req: ["Construcciones 1"] },
      { nombre: "Estructuras 2", req: ["Estructuras 1"] },
      { nombre: "Instalaciones 2", req: ["Instalaciones 1"] },
      { nombre: "Proyecto Urbano", req: ["Arquitectura III"] }
    ],

    "4º Año": [
      { nombre: "Arquitectura IV", req: ["Arquitectura III", "Morfología y Percepción"] },
      { nombre: "Teoría de la Arquitectura", req: ["Arquitectura III", "Historia 2", "Morfología y Percepción"] },
      { nombre: "Historia 3", req: ["Historia 2"] },
      { nombre: "Construcciones 3", req: ["Construcciones 2"] },
      { nombre: "Estructuras 3", req: ["Estructuras 2"] },
      { nombre: "Instalaciones 3", req: ["Instalaciones 2"] }
    ],

    "5º Año": [
      { nombre: "Proyecto Arquitectónico", req: ["Proyecto Urbano"] },
      { nombre: "Diseño, Legislación y Organización", req: ["Arquitectura IV"] },
      { nombre: "Práctica Profesional Asistida", req: ["Arquitectura IV", "Historia 3", "Construcciones 3", "Estructuras 3", "Instalaciones 3"] },
      { nombre: "Práctica de Investigación", req: ["Arquitectura III", "Historia 2", "Construcciones 2"] },
      { nombre: "Diseño y Planeamiento de la Ciudad", req: ["Arquitectura III", "Historia 2", "Morfología y Percepción"] }
    ]
  };

  const aprobadas = new Set(JSON.parse(localStorage.getItem("aprobadas")) || []);
  const container = document.getElementById("malla-container");

  function render() {
    container.innerHTML = "";

    for (const [anio, lista] of Object.entries(materias)) {
      const bloque = document.createElement("div");
      bloque.className = "anio";

      const titulo = document.createElement("h2");
      titulo.textContent = anio;
      bloque.appendChild(titulo);

      const caja = document.createElement("div");
      caja.className = "materias";

      lista.forEach(m => {
        const nombre = typeof m === 'string' ? m : m.nombre;
        const reqs = typeof m === 'string' ? [] : m.req || [];

        const div = document.createElement("div");
        div.className = "materia";
        div.textContent = nombre;

        const habilitada = reqs.every(r => {
          if (r === "CBC") {
            return materias["Ciclo Básico Común (CBC)"].every(cbc => aprobadas.has(cbc));
          }
          return aprobadas.has(r);
        });

        if (!habilitada && reqs.length) {
          div.classList.add("bloqueada");
        } else if (aprobadas.has(nombre)) {
          div.classList.add("aprobada");
        }

        div.onclick = () => {
          if (div.classList.contains("bloqueada")) return;
          if (aprobadas.has(nombre)) {
            aprobadas.delete(nombre);
          } else {
            aprobadas.add(nombre);
          }
          localStorage.setItem("aprobadas", JSON.stringify([...aprobadas]));
          render();
        };

        caja.appendChild(div);
      });

      bloque.appendChild(caja);
      container.appendChild(bloque);
    }
  }

  render();
});
