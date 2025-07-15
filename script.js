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
      { nombre: "Arquitectura I", req: ["Introducción al Conocimiento de la Sociedad y el Estado", "Introducción al Pensamiento Científico", "Introducción al Conocimiento Proyectual 1", "Introducción al Conocimiento Proyectual 2", "Matemática", "Filosofía", "Taller de Dibujo"] },
      { nombre: "Instalaciones A", req: ["Introducción al Conocimiento de la Sociedad y el Estado", "Introducción al Pensamiento Científico", "Introducción al Conocimiento Proyectual 1", "Introducción al Conocimiento Proyectual 2", "Matemática", "Filosofía", "Taller de Dibujo"] },
      { nombre: "Sistemas de Representación Gráfica", req: ["Introducción al Conocimiento de la Sociedad y el Estado", "Introducción al Pensamiento Científico", "Introducción al Conocimiento Proyectual 1", "Introducción al Conocimiento Proyectual 2", "Matemática", "Filosofía", "Taller de Dibujo"] },
      { nombre: "Introducción a la Tecnología Constructiva", req: ["Introducción al Conocimiento de la Sociedad y el Estado", "Introducción al Pensamiento Científico", "Introducción al Conocimiento Proyectual 1", "Introducción al Conocimiento Proyectual 2", "Matemática", "Filosofía", "Taller de Dibujo"] },
      { nombre: "Instalaciones Eléctricas", req: ["Introducción al Conocimiento de la Sociedad y el Estado", "Introducción al Pensamiento Científico", "Introducción al Conocimiento Proyectual 1", "Introducción al Conocimiento Proyectual 2", "Matemática", "Filosofía", "Taller de Dibujo"] },
      { nombre: "Física Aplicada a la Arquitectura", req: ["Introducción al Conocimiento de la Sociedad y el Estado", "Introducción al Pensamiento Científico", "Introducción al Conocimiento Proyectual 1", "Introducción al Conocimiento Proyectual 2", "Matemática", "Filosofía", "Taller de Dibujo"] },
      { nombre: "Matemática 2", req: ["Introducción al Conocimiento de la Sociedad y el Estado", "Introducción al Pensamiento Científico", "Introducción al Conocimiento Proyectual 1", "Introducción al Conocimiento Proyectual 2", "Matemática", "Filosofía", "Taller de Dibujo"] }
    ],

    "2º Año": [
      { nombre: "Arquitectura II", req: ["Arquitectura I", "Sistemas de Representación Gráfica", "Introducción a la Tecnología Constructiva"] },
      { nombre: "Representación Arquitectónica", req: ["Sistemas de Representación Gráfica"] },
      { nombre: "Historia 1", req: ["Instalaciones A"] },
      { nombre: "Materiales 1", req: ["Sistemas de Representación Gráfica"] },
      { nombre: "Construcciones 1", req: ["Introducción a la Tecnología Constructiva", "Instalaciones Eléctricas", "Matemática 2"] },
      { nombre: "Estructuras 1", req: ["Introducción a la Tecnología Constructiva", "Instalaciones Eléctricas", "Matemática 2"] },
      { nombre: "Instalaciones 1", req: ["Física Aplicada a la Arquitectura", "Introducción a la Tecnología Constructiva", "Matemática 2"] }
    ],

    "3º Año": [
      { nombre: "Arquitectura III", req: ["Arquitectura II", "Materiales 1", "Representación Arquitectónica", "Instalaciones A", "Construcciones 1", "Instalaciones 1", "Estructuras 1"] },
      { nombre: "Morfología y Percepción", req: ["Arquitectura II", "Materiales 1", "Representación Arquitectónica", "Instalaciones A", "Construcciones 1", "Instalaciones 1", "Estructuras 1"] },
      { nombre: "Materiales 2", req: ["Arquitectura I", "Materiales 1", "Representación Arquitectónica"] },
      { nombre: "Historia 2", req: ["Arquitectura I", "Sistemas de Representación Gráfica", "Historia 1"] },
      { nombre: "Construcciones 2", req: ["Arquitectura I", "Sistemas de Representación Gráfica", "Construcciones 1"] },
      { nombre: "Estructuras 2", req: ["Arquitectura I", "Sistemas de Representación Gráfica", "Construcciones 1", "Estructuras 1"] },
      { nombre: "Instalaciones 2", req: ["Arquitectura I", "Sistemas de Representación Gráfica", "Construcciones 1", "Instalaciones 1"] },
      { nombre: "Proyecto Urbano", req: ["Arquitectura III"] }
    ],

    "4º Año": [
      { nombre: "Arquitectura IV", req: ["Arquitectura III", "Morfología y Percepción", "Materiales 2", "Proyecto Urbano"] },
      { nombre: "Teoría de la Arquitectura", req: ["Arquitectura III", "Morfología y Percepción", "Historia 2"] },
      { nombre: "Historia 3", req: ["Historia 2"] },
      { nombre: "Construcciones 3", req: ["Construcciones 2"] },
      { nombre: "Estructuras 3", req: ["Estructuras 2"] },
      { nombre: "Instalaciones 3", req: ["Instalaciones 2"] }
    ],

    "5º Año": [
      { nombre: "Proyecto Arquitectónico", req: ["Proyecto Urbano"] },
      { nombre: "Diseño, Legislación y Organización", req: ["Arquitectura IV", "Historia 3", "Construcciones 3", "Estructuras 3", "Instalaciones 3"] },
      { nombre: "Práctica Profesional Asistida", req: ["4º Año"] },
      { nombre: "Práctica de Investigación", req: ["2º Año"] },
      { nombre: "Diseño y Planeamiento de la Ciudad", req: ["Arquitectura II", "Materiales 1", "Representación Arquitectónica"] }
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

        const habilitada = reqs.every(r => aprobadas.has(r));

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
