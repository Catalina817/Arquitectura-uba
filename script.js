const subjects = {
  "1º Año": [
    { code: "ICSE" },
    { code: "IPC" },
    { code: "ICP1" },
    { code: "ICP2" },
    { code: "Matemática" },
    { code: "Filosofía" },
    { code: "T. de Dibujo" },
  ],
  "2º Año": [
    { code: "AI", prereq: ["ICSE", "IPC", "ICP1", "ICP2", "Matemática", "Filosofía", "T. de Dibujo"] },
    { code: "IAC" },
    { code: "SRG" },
    { code: "ITC" },
    { code: "ITE" },
    { code: "FAA" },
    { code: "MAT2" },
  ],
  // ... continuar con los años 3 a 6
};

let completed = new Set();

function canUnlock(subject) {
  if (!subject.prereq) return true;
  return subject.prereq.every(req => completed.has(req));
}

function renderMalla() {
  const container = document.getElementById("malla-container");
  container.innerHTML = "";

  Object.entries(subjects).forEach(([year, ramos]) => {
    const yearDiv = document.createElement("div");
    yearDiv.className = "year-block";

    const title = document.createElement("div");
    title.className = "year-title";
    title.textContent = year;
    yearDiv.appendChild(title);

    ramos.forEach(ramo => {
      const btn = document.createElement("div");
      btn.className = "subject";

      if (completed.has(ramo.code)) {
        btn.classList.add("completed");
      } else if (!canUnlock(ramo)) {
        btn.classList.add("locked");
      } else {
        btn.classList.add("pending");
      }

      btn.textContent = ramo.code;
      btn.onclick = () => {
        if (!canUnlock(ramo)) return;

        if (completed.has(ramo.code)) {
          completed.delete(ramo.code);
        } else {
          completed.add(ramo.code);
        }
        renderMalla();
      };

      yearDiv.appendChild(btn);
    });

    container.appendChild(yearDiv);
  });
}

renderMalla();
