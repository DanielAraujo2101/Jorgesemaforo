// Elementos do DOM
const redLight = document.querySelector('.red');
const yellowLight = document.querySelector('.yellow');
const greenLight = document.querySelector('.green');
const redBtn = document.getElementById('redBtn');
const yellowBtn = document.getElementById('yellowBtn');
const greenBtn = document.getElementById('greenBtn');
const manualModeBtn = document.getElementById('manualMode');
const autoModeBtn = document.getElementById('autoMode');
const statusText = document.getElementById('status');
const body = document.body;

// Variáveis de controle
let isAutoMode = true;
let autoInterval;

// Função para ativar uma luz específica
function activateLight(light) {
    // Desativa todas as luzes
    redLight.classList.remove('active');
    yellowLight.classList.remove('active');
    greenLight.classList.remove('active');
    
    // Ativa a luz especificada
    light.classList.add('active');
    
    // Muda a cor de fundo baseado na luz ativa
    if (light === redLight) {
        body.style.backgroundColor = '#3a1a2e';
    } else if (light === yellowLight) {
        body.style.backgroundColor = '#3a3a1e';
    } else if (light === greenLight) {
        body.style.backgroundColor = '#1a3a2e';
    }
}

// Função para alternar para o modo automático
function switchToAutoMode() {
    isAutoMode = true;
    statusText.textContent = 'Modo: Automático';
    autoModeBtn.disabled = true;
    manualModeBtn.disabled = false;
    
    // Inicia o ciclo automático
    startAutoCycle();
}

// Função para alternar para o modo manual
function switchToManualMode() {
    isAutoMode = false;
    statusText.textContent = 'Modo: Manual';
    autoModeBtn.disabled = false;
    manualModeBtn.disabled = true;
    
    // Para o ciclo automático
    clearInterval(autoInterval);
}

// Função para iniciar o ciclo automático do semáforo
function startAutoCycle() {
    // Inicia com a luz vermelha
    activateLight(redLight);
    
    // Define o intervalo para mudar as luzes
    autoInterval = setInterval(() => {
        if (redLight.classList.contains('active')) {
            activateLight(greenLight);
        } else if (greenLight.classList.contains('active')) {
            activateLight(yellowLight);
        } else if (yellowLight.classList.contains('active')) {
            activateLight(redLight);
        }
    }, 3000); // Muda a cada 3 segundos
}

// Event listeners para os botões de modo
manualModeBtn.addEventListener('click', switchToManualMode);
autoModeBtn.addEventListener('click', switchToAutoMode);

// Event listeners para os botões de luz (só funcionam no modo manual)
redBtn.addEventListener('click', () => {
    if (!isAutoMode) activateLight(redLight);
});

yellowBtn.addEventListener('click', () => {
    if (!isAutoMode) activateLight(yellowLight);
});

greenBtn.addEventListener('click', () => {
    if (!isAutoMode) activateLight(greenLight);
});

// Inicia no modo automático
switchToAutoMode();