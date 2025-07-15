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
      {
        nombre: "Arquitectura I",
        req: [
          "Introducción al Conocimiento de la Sociedad y el Estado",
          "Introducción al Pensamiento Científico",
          "Introducción al Conocimiento Proyectual 1",
          "Introducción al Conocimiento Proyectual 2",
          "Matemática",
          "Filosofía",
          "Taller de Dibujo"
        ]
      },
      {
        nombre: "Instalaciones A",
        req: [
          "Introducción al Conocimiento de la Sociedad y el Estado",
          "Introducción al Pensamiento Científico",
          "Introducción al Conocimiento Proyectual 1",
          "Introducción al Conocimiento Proyectual 2",
          "Matemática",
          "Filosofía",
          "Taller de Dibujo"
        ]
      },
      {
        nombre: "Sistemas de Representación Gráfica",
        req: [
          "Introducción al Conocimiento de la Sociedad y el Estado",
          "Introducción al Pensamiento Científico",
          "Introducción al Conocimiento Proyectual 1",
          "Introducción al Conocimiento Proyectual 2",
          "Matemática",
          "Filosofía",
          "Taller de Dibujo"
        ]
      },
      {
        nombre: "Introducción a la Tecnología Constructiva",
        req: [
          "Introducción al Conocimiento de la Sociedad y el Estado",
          "Introducción al Pensamiento Científico",
          "Introducción al Conocimiento Proyectual 1",
          "Introducción al Conocimiento Proyectual 2",
          "Matemática",
          "Filosofía",
          "Taller de Dibujo"
        ]
      },
      {
        nombre: "Instalaciones Eléctricas",
        req: [
          "Introducción al Conocimiento de la Sociedad y el Estado",
          "Introducción al Pensamiento Científico",
          "Introducción al Conocimiento Proyectual 1",
          "Introducción al Conocimiento Proyectual 2",
          "Matemática",
          "Filosofía",
          "Taller de Dibujo"
        ]
      },
      {
        nombre: "Física Aplicada a la Arquitectura",
        req: [
          "Introducción al Conocimiento de la Sociedad y el Estado",
          "Introducción al Pensamiento Científico",
          "Introducción al Conocimiento Proyectual 1",
          "Introducción al Conocimiento Proyectual 2",
          "Matemática",
          "Filosofía",
          "Taller de Dibujo"
        ]
      },
      {
        nombre: "Matemática 2",
        req: [
          "Introducción al Conocimiento de la Sociedad y el Estado",
          "Introducción al Pensamiento Científico",
          "Introducción al Conocimiento Proyectual 1",
          "Introducción al Conocimiento Proyectual 2",
          "Matemática",
          "Filosofía",
          "Taller de Dibujo"
        ]
      }
    ],

    "4º Año": [
      {
        nombre: "Teoría de la Arquitectura",
        req: [
          "Arquitectura III",
          "Historia 2",
          "Instalaciones 2",
          "Construcciones 2",
          "Estructuras 2",
          "Sistemas de Representación Gráfica",
          "Instalaciones A",
          "Instalaciones 1"
        ]
      }
    ],

    "5º Año": [
      {
        nombre: "Práctica de Investigación",
        req: [
          "Segundo Nivel Completo"
        ]
      },
      {
        nombre: "Diseño y Planeamiento de la Ciudad",
        req: [
          "Arquitectura II",
          "Materiales 1",
          "Representación Arquitectónica",
          "Instalaciones A",
          "Construcciones 1",
          "Instalaciones 1",
          "Estructuras 1"
        ]
      }
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
