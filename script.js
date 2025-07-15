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
      { nombre: "Arquitectura 1", req: ["CBC"] },
      { nombre: "Introducción a la Arquitectura Contemporánea", req: ["CBC"] },
      { nombre: "Sistemas de Representación Geométrica", req: ["CBC"] },
      { nombre: "Introducción a los Tipos Constructivos", req: ["CBC"] },
      { nombre: "Introducción a los Tipos Estructurales", req: ["CBC"] },
      { nombre: "Física Aplicada a la Arquitectura", req: ["CBC"] },
      { nombre: "Matemática 2", req: ["CBC"] }
    ],

    "2º Año": [
      { nombre: "Arquitectura 2", req: ["Arquitectura I", "Sistemas de Representación Geométrica", "Introducción a los Tipos Constructivos"] },
      { nombre: "Representación Arquitectónica", req: ["Sistemas de Representación Geométrica"] },
      { nombre: "Historia 1", req: ["Introducción a la Arquitectura Contemporánea"] },
      { nombre: "Morfología 1", req: ["Sistemas de Representación Geométrica"] },
      { nombre: "Construcciones 1", req: ["Introducción a los Tipos Constructivos", "Introducción a los Tipos Estructurales", "Matemática 2"] },
      { nombre: "Estructuras 1", req: ["Introducción a los Tipos Constructivos", "Introducción a los Tipos Estructurales", "Matemática 2"] },
      { nombre: "Instalaciones 1", req: ["Introducción a los Tipos Constructivos", "Física Aplicada a la Arquitectura", "Matemática 2"] }
    ],

    "3º Año": [
      { nombre: "Arquitectura 3", req: ["Arquitectura 2", "Morfología 1", "Representación Arquitectónica", "Introducción a la Arquitectura Contemporánea", "Construcciones 1", "Instalaciones 1", "Estructuras 1"] },
      { nombre: "Morfología 2", req: ["Arquitectura 1", "Morfología 1", "Representación Arquitectónica"] },
      { nombre: "Historia 2", req: ["Historia 1", "Sistemas de Representación Geométrica", "Arquitectura 1"] },
      { nombre: "Construcciones 2", req: ["Construcciones 1", "Sistemas de Representación Geométrica", "Arquitectura 1] },
      { nombre: "Estructuras 2", req: ["Estructuras 1", "Sistemas de Representación Geométrica", "Arquitectura 1", "Construcciones 1"] },
      { nombre: "Instalaciones 2", req: ["Instalaciones 1", "Sistemas de Representación Geométrica", "Arquitectura 1", "Construcciones 1"] },
      { nombre: "Materialización de Proyectos", req: ["Arquitectura 2", "Morfología 1", "Representación Arquitectónica", "Introducción a la Arquitectura Contemporánea", "Construcciones 1", "Instalaciones 1", "Estructuras 1"] }
    ],

    "4º Año": [
      { nombre: "Arquitectura 4", req: ["Introducción a la Arquitectura Contemporánea", "Introducción a los Tipos Constructivos", "Introducción a los Tipos Estructurales", "Física Aplicada a la Arquitectura", "Matemática 2", "Arquitectura 3", "Morfología 2", "Materialización de Proyectos", "Construcciones 2", "Instalaciones 2", "Estructuras 1", "Historia 1"] },
      { nombre: "Teoría de la Arquitectura", req: ["Introducción a la Arquitectura Contemporánea", "Introducción a los Tipos Constructivos", "Introducción a los Tipos Estructurales", "Física Aplicada a la Arquitectura", "Matemática 2", "Arquitectura 3", "Morfología 2", "Materialización de Proyectos", "Construcciones 1", "Instalaciones 1", "Estructuras 1", "Historia 1"] },
      { nombre: "Historia 3", req: ["Introducción a la Arquitectura Contemporánea", "Introducción a los Tipos Constructivos", "Introducción a los Tipos Estructurales", "Física Aplicada a la Arquitectura", "Matemática 2", "Arquitectura 2", "Morfología 1", "Representación Arquitectónica", "Historia 2", "3º Año"] },
      { nombre: "Construcciones 3", req: ["Introducción a la Arquitectura Contemporánea", "Introducción a los Tipos Constructivos", "Introducción a los Tipos Estructurales", "Física Aplicada a la Arquitectura", "Matemática 2", "Arquitectura 2", "Morfología 1", "Representación Arquitectónica", "Construcciones 2", "3º Año"] },
      { nombre: "Estructuras 3", req: ["Introducción a la Arquitectura Contemporánea", "Introducción a los Tipos Constructivos", "Introducción a los Tipos Estructurales", "Física Aplicada a la Arquitectura", "Matemática 2", "Arquitectura 2", "Morfología 1", "Representación Arquitectónica", "Estructuras 3", "3º Año"] },
      { nombre: "Planificación Urbana", req: ["Introducción a la Arquitectura Contemporánea", "Introducción a los Tipos Constructivos", "Introducción a los Tipos Estructurales", "Física Aplicada a la Arquitectura", "Matemática 2", "Arquitectura 3", "Morfología 1", "Representación Arquitectónica", "Instalaciones 1", "Estructuras 1", "Historia 1", "Historia 2", "3º Año"] },
      { nombre: "Materias Optativas", 
      { nombre: "Prácticas Profesionales Asistidas", req: ["4º Año"] },
      { nombre: "Instalaciones 3", req: ["Introducción a la Arquitectura Contemporánea", "Introducción a los Tipos Constructivos", "Introducción a los Tipos Estructurales", "Física Aplicada a la Arquitectura", "Matemática 2", "Arquitectura 2", "Morfología 1", "Representación Arquitectónica", "Construcciones 2", "Instalaciones 2", "3º Año"] }
    ],

    "5º Año": [
      { nombre: "Proyecto Arquitectónico", req: ["Proyecto Urbano"] },
      { nombre: "Dirección y Legislación de Obra", req: ["Arquitectura IV"] },
      { nombre: "Prácticas Profesionales Asistidas", req: ["Instalaciones 3"] },
      { nombre: "Proyecto Urbano", req: ["Arquitectura III", "Historia 2", "Construcciones 2"] },
      { nombre: "Materias Optativas",
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
