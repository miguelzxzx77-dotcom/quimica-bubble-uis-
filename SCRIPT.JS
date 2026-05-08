const questions = [
    { q: "¿Símbolo del Flúor?", opts: ["F", "Fl", "Fu", "O"], a: "F", pts: 5 },
    { q: "¿Símbolo del Oro?", opts: ["Ag", "Au", "Fe", "Or"], a: "Au", pts: 5 },
    { q: "¿pH Neutro?", opts: ["0", "14", "7", "1"], a: "7", pts: 5 },
    { q: "¿Número atómico C?", opts: ["4", "12", "6", "8"], a: "6", pts: 10 },
    { q: "¿Enlace que comparte e-?", opts: ["Iónico", "Covalente", "Metálico", "Puente H"], a: "Covalente", pts: 10 },
    { q: "¿Elemento más electronegativo?", opts: ["Cloro", "Oxígeno", "Flúor", "Francio"], a: "Flúor", pts: 10 },
    { q: "¿Gas noble periodo 1?", opts: ["He", "Ne", "Ar", "Kr"], a: "He", pts: 10 },
    { q: "¿Símbolo del Plomo?", opts: ["Pl", "Pb", "Pd", "Po"], a: "Pb", pts: 10 },
    { q: "¿Masa molar H2O?", opts: ["10", "16", "18", "22"], a: "18", pts: 15 },
    { q: "¿Ley P1V1=P2V2?", opts: ["Boyle", "Charles", "Dalton", "Gases"], a: "Boyle", pts: 15 },
    { q: "¿Partícula negativa?", opts: ["Protón", "Neutrón", "Electrón", "Quark"], a: "Electrón", pts: 15 },
    { q: "¿Padre de la tabla periódica?", opts: ["Mendeleiev", "Lavoisier", "Dalton", "Bohr"], a: "Mendeleiev", pts: 15 },
    { q: "¿Fórmula Ácido Sulfúrico?", opts: ["HCl", "H2SO4", "HNO3", "H2O"], a: "H2SO4", pts: 15 },
    { q: "¿Valencias del Carbono?", opts: ["2,4", "1,2", "3,5", "4,6"], a: "2,4", pts: 15 },
    { q: "¿Principal gas del aire?", opts: ["O2", "CO2", "N2", "Ar"], a: "N2", pts: 15 }
];

let currentIdx = 0; let score = 0; let timer; let timeLeft = 15;

// Crear burbujas de fondo
function createBubbles() {
    const bg = document.getElementById('burbujas');
    for(let i=0; i<20; i++) {
        const b = document.createElement('div');
        b.className = 'burbuja';
        const size = Math.random() * 50 + 10 + 'px';
        b.style.width = size; b.style.height = size;
        b.style.left = Math.random() * 100 + '%';
        b.style.animationDelay = Math.random() * 4 + 's';
        bg.appendChild(b);
    }
}

// Control de flujo
document.getElementById('btn-jugar').onclick = () => {
    document.getElementById('pantalla-inicio').classList.add('hidden');
    document.getElementById('pantalla-juego').classList.remove('hidden');
    loadQuestion();
};

function loadQuestion() {
    if(currentIdx >= questions.length) { endGame(); return; }
    
    const q = questions[currentIdx];
    document.getElementById('texto-pregunta').innerText = q.q;
    document.getElementById('current-level').innerText = `${currentIdx + 1}/15`;
    
    const grid = document.getElementById('opciones-grid');
    grid.innerHTML = "";
    
    q.opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-opcion';
        btn.innerText = opt;
        btn.onclick = () => checkAns(opt, btn);
        grid.appendChild(btn);
    });
    
    startTimer();
}

function startTimer() {
    timeLeft = 15;
    document.getElementById('progreso-fill').style.width = '100%';
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-label').innerText = timeLeft;
        document.getElementById('progreso-fill').style.width = (timeLeft/15)*100 + '%';
        if(timeLeft <= 0) { checkAns(null); }
    }, 1000);
}

function checkAns(selected, btn) {
    clearInterval(timer);
    const correct = questions[currentIdx].a;
    const btns = document.querySelectorAll('.btn-opcion');
    btns.forEach(b => b.style.pointerEvents = 'none');

    if(selected === correct) {
        score += questions[currentIdx].pts;
        if(btn) btn.classList.add('correcto');
    } else {
        if(btn) btn.classList.add('incorrecto');
        btns.forEach(b => { if(b.innerText === correct) b.classList.add('correcto'); });
    }

    setTimeout(() => {
        currentIdx++;
        loadQuestion();
        document.getElementById('score').innerText = score.toString().padStart(3, '0');
    }, 1200);
}

function endGame() {
    document.getElementById('pantalla-juego').classList.add('hidden');
    document.getElementById('pantalla-final').classList.remove('hidden');
    document.getElementById('puntaje-final').innerText = score;
    document.getElementById('resultado-titulo').innerText = score > 70 ? "¡EXCELENTE!" : "¡SIGUE ASÍ!";
    document.getElementById('trofeo-emoji').innerText = score > 70 ? "🏆" : "🧪";
}

createBubbles();