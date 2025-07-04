const challenges = [
    { question: "Selecione 1/2 da pizza", slices: 2, answer: 1 },
    { question: "Selecione 1/3 da pizza", slices: 3, answer: 1 },
    { question: "Selecione 1/4 da pizza", slices: 4, answer: 1 },
    { question: "Selecione 2/4 da pizza", slices: 4, answer: 2 },
    { question: "Selecione 3/4 da pizza", slices: 4, answer: 3 },
    { question: "Selecione 2/3 da pizza", slices: 3, answer: 2 },
    { question: "Selecione 4/6 da pizza", slices: 6, answer: 4 },
    { question: "Selecione 3/8 da pizza", slices: 8, answer: 3 },
    { question: "Selecione 5/8 da pizza", slices: 8, answer: 5 },
    { question: "Selecione 1/5 da pizza", slices: 5, answer: 1 },
    { question: "Selecione 2/5 da pizza", slices: 5, answer: 2 },
    { question: "Selecione 4/5 da pizza", slices: 5, answer: 4 },
    { question: "Selecione 3/6 da pizza", slices: 6, answer: 3 },
    { question: "Selecione 5/6 da pizza", slices: 6, answer: 5 },
    { question: "Selecione 2/8 da pizza", slices: 8, answer: 2 },
    { question: "Selecione 7/8 da pizza", slices: 8, answer: 7 },
    { question: "Selecione 1/10 da pizza", slices: 10, answer: 1 },
    { question: "Selecione 3/10 da pizza", slices: 10, answer: 3 },
    { question: "Selecione 5/10 da pizza", slices: 10, answer: 5 },
    { question: "Selecione 7/10 da pizza", slices: 10, answer: 7 },
    { question: "Selecione 9/10 da pizza", slices: 10, answer: 9 },
    { question: "Selecione 1/12 da pizza", slices: 12, answer: 1 },
    { question: "Selecione 4/12 da pizza", slices: 12, answer: 4 },
    { question: "Selecione 7/12 da pizza", slices: 12, answer: 7 },
    { question: "Selecione 9/12 da pizza", slices: 12, answer: 9 },
    { question: "Selecione 11/12 da pizza", slices: 12, answer: 11 },
    { question: "Selecione 2/7 da pizza", slices: 7, answer: 2 },
    { question: "Selecione 5/7 da pizza", slices: 7, answer: 5 },
    { question: "Selecione 3/9 da pizza", slices: 9, answer: 3 },
    { question: "Selecione 7/9 da pizza", slices: 9, answer: 7 },
    { question: "Selecione 5/12 da pizza", slices: 12, answer: 5 },
    { question: "Selecione 8/12 da pizza", slices: 12, answer: 8 },
    { question: "Selecione 10/12 da pizza", slices: 12, answer: 10 },
    { question: "Selecione 3/5 da pizza", slices: 5, answer: 3 },
    { question: "Selecione 4/9 da pizza", slices: 9, answer: 4 },
    { question: "Selecione 6/9 da pizza", slices: 9, answer: 6 },
    { question: "Selecione 8/9 da pizza", slices: 9, answer: 8 },
    { question: "Selecione 2/11 da pizza", slices: 11, answer: 2 },
    { question: "Selecione 7/11 da pizza", slices: 11, answer: 7 },
    { question: "Selecione 9/11 da pizza", slices: 11, answer: 9 },
    { question: "Selecione 11/11 da pizza", slices: 11, answer: 11 },
    { question: "Selecione 1/16 da pizza", slices: 16, answer: 1 },
    { question: "Selecione 4/16 da pizza", slices: 16, answer: 4 },
    { question: "Selecione 7/16 da pizza", slices: 16, answer: 7 },
    { question: "Selecione 11/16 da pizza", slices: 16, answer: 11 },
    { question: "Selecione 15/16 da pizza", slices: 16, answer: 15 },
    { question: "Selecione 13/16 da pizza", slices: 16, answer: 13 },
    { question: "Selecione 8/15 da pizza", slices: 15, answer: 8 },
    { question: "Selecione 13/15 da pizza", slices: 15, answer: 13 },
];

    
    // Sinta-se livre para adicionar desafios ou incluir um modo “posometria de remédio”!

let currentChallenge = 0;
let selected = [];
let score = 0;

const pizzaCanvas = document.getElementById('pizzaCanvas');
const ctx = pizzaCanvas.getContext('2d');
const challengeText = document.getElementById('challengeText');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const checkBtn = document.getElementById('checkBtn');
const nextBtn = document.getElementById('nextBtn');

function drawPizza(slices, selectedArr) {
    ctx.clearRect(0, 0, pizzaCanvas.width, pizzaCanvas.height);
    const centerX = pizzaCanvas.width/2, centerY = pizzaCanvas.height/2, radius = 120;
    const angleStep = (2 * Math.PI) / slices;

    // Desenha cada fatia
    for (let i = 0; i < slices; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, i * angleStep, (i+1) * angleStep);
        ctx.closePath();
        // Colore fatia selecionada
        ctx.fillStyle = selectedArr[i] ? "#fa7268" : "#f7c873";
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
    }
    // Desenha o centro
    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffe4ad";
    ctx.fill();
}

function startChallenge(index) {
    let ch = challenges[index];
    challengeText.textContent = ch.question;
    selected = Array(ch.slices).fill(false);
    drawPizza(ch.slices, selected);
    feedback.textContent = "";
    checkBtn.disabled = false;
    nextBtn.style.display = "none";
}

pizzaCanvas.addEventListener('click', function(e) {
    let ch = challenges[currentChallenge];
    let rect = pizzaCanvas.getBoundingClientRect();
    let x = e.clientX - rect.left - pizzaCanvas.width/2;
    let y = e.clientY - rect.top - pizzaCanvas.height/2;
    let angle = Math.atan2(y, x);
    if (angle < 0) angle += 2 * Math.PI;

    let idx = Math.floor(angle / ((2*Math.PI)/ch.slices));
    selected[idx] = !selected[idx];
    drawPizza(ch.slices, selected);
});

checkBtn.addEventListener('click', function() {
    let ch = challenges[currentChallenge];
    let totalSel = selected.filter(Boolean).length;
    if (totalSel === ch.answer) {
        feedback.innerHTML = "🎉 <span style='color:#13ce66'>Correto!</span>";
        score += 1;
        scoreDisplay.textContent = "Pontos: " + score;
        confettiEffect();
        checkBtn.disabled = true;
        nextBtn.style.display = "inline-block";
    } else {
        feedback.innerHTML = "⛔ <span style='color:#e24d4d'>Tente de novo.</span>";
    }
});

nextBtn.addEventListener('click', function() {
    currentChallenge++;
    if (currentChallenge < challenges.length) {
        startChallenge(currentChallenge);
    } else {
        challengeText.textContent = "Fim! Você concluiu todos os desafios!";
        drawPizza(6, Array(6).fill(false));
        feedback.textContent = `Pontuação final: ${score}/${challenges.length}`;
        checkBtn.style.display = "none";
        nextBtn.style.display = "none";
    }
});

function confettiEffect() {
    // Simples animação: pisca o canvas
    pizzaCanvas.style.transition = 'box-shadow 0.3s';
    pizzaCanvas.style.boxShadow = "0 0 18px 5px #13ce66";
    setTimeout(()=>pizzaCanvas.style.boxShadow = "0 2px 8px #f2e0c6", 350);
}

// Inicializa o jogo
startChallenge(0);
