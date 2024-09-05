const rows = 28;
let cols = 28;

let playing = false;
let grid = new Array(rows);
const nextGrid = new Array(rows);

let timer;
let reproductionTime = 50;

function initializeGrids() {
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

function resetGrids() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

function copyAndResetGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}

function initialize() {
    createTable();
    initializeGrids();
    resetGrids();
    setupControlButtons();
}

function createTable() {
    let gridContainer = document.getElementById('gridContainer');
    if (!gridContainer) {
        console.error("Problem: No div for the grid table!");
    }
    let table = document.createElement("table");

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

function cellClickHandler() {
    const rowcol = this.id.split("_");
    const row = rowcol[0];
    const col = rowcol[1];

    const classes = this.getAttribute("class");
    if (classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][col] = 0;
    } else {
        this.setAttribute("class", "live");
        grid[row][col] = 1;
    }
}

function updateView() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.getElementById(i + "_" + j);
            if (grid[i][j] == 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
            }
        }
    }
}

function setupControlButtons() {
    const startButton = document.getElementById('start');
    startButton.onclick = startButtonHandler;

    let clearButton = document.getElementById('clear');
    clearButton.onclick = clearButtonHandler;

    const randomButton = document.getElementById("random");
    randomButton.onclick = randomButtonHandler;
}

function startButtonHandler() {
    if (playing) {
        playing = false;
        this.id = "start";
        this.innerHTML = "Start";
        clearTimeout(timer);
    } else {
        playing = true;
        this.id = "pause";
        this.innerHTML = "Pause";
        play();
    }
}


function clearButtonHandler() {
    if (playing) {
        playing = false;
        const startButton = document.getElementById('pause');
        startButton.id = "start";
        startButton.innerHTML = "Start";
        clearTimeout(timer);
    }

    const cellsList = document.getElementsByClassName("live");
    const cells = [];
    for (let i = 0; i < cellsList.length; i++) {
        cells.push(cellsList[i]);
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].setAttribute("class", "dead");
    }
    resetGrids();
}

function randomButtonHandler() {
    clearButtonHandler();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let isLive = Math.round(Math.random());
            if (isLive == 1) {
                let cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "live");
                grid[i][j] = 1;
            }
        }
    }
}

function play() {
    computeNextGen();

    if (playing) {
        timer = setTimeout(play, reproductionTime);
    }
}

function computeNextGen() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            applyRules(i, j);
        }
    }

    copyAndResetGrid();
    updateView();
}

function applyRules(row, col) {
    const numNeighbors = countNeighbors(row, col);
    if (grid[row][col] == 1) {
        if (numNeighbors < 2) {
            nextGrid[row][col] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3 || numNeighbors == 6) {
            nextGrid[row][col] = 1;
        } else if (numNeighbors > 3) {
            nextGrid[row][col] = 0;
        }
    } else if (grid[row][col] == 0) {
        if (numNeighbors == 3) {
            nextGrid[row][col] = 1;
        }
    }
}

function countNeighbors(row, col) {
    let count = 0;
    if (row - 1 >= 0) {
        if (grid[row - 1][col] == 1) count++;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
        if (grid[row - 1][col - 1] == 1) count++;
    }
    if (row - 1 >= 0 && col + 1 < cols) {
        if (grid[row - 1][col + 1] == 1) count++;
    }
    if (col - 1 >= 0) {
        if (grid[row][col - 1] == 1) count++;
    }
    if (col + 1 < cols) {
        if (grid[row][col + 1] == 1) count++;
    }
    if (row + 1 < rows) {
        if (grid[row + 1][col] == 1) count++;
    }
    if (row + 1 < rows && col - 1 >= 0) {
        if (grid[row + 1][col - 1] == 1) count++;
    }
    if (row + 1 < rows && col + 1 < cols) {
        if (grid[row + 1][col + 1] == 1) count++;
    }
    return count;
}

let intervalId = null;
let slider = document.getElementById("slider");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    updateSpeed();
}

function updateSpeed() {
    const sliderValue = slider.value;
    reproductionTime = 100 - slider.value;
    clearTimeout(timer);
    if (playing) {
        play();
    }
}

slider.addEventListener('wheel', function (event) {
    event.preventDefault();
    let newValue = parseInt(slider.value) - Math.sign(event.deltaY);
    newValue = Math.min(Math.max(newValue, slider.min), slider.max); // Limiet tussen min en max
    slider.value = newValue;
    output.innerHTML = slider.value;
    updateSpeed();
});

function updateSliderColor() {
    const value = slider.value;
    // Bereken de kleurovergang tussen groen (0, 255, 0) en rood (255, 0, 0)
    const red = Math.floor((value - 1) * 255 / 99);
    const green = Math.floor(255 - (value - 1) * 255 / 99);
    const color = `rgb(${red}, ${green}, 0)`;

    // Pas de achtergrondkleur van de slider aan
    slider.style.background = `linear-gradient(to right, ${color} ${value}%, #ddd ${value}%)`;
}

// Pas de kleur aan bij het bewegen van de slider
slider.oninput = function () {
    output.innerHTML = this.value;
    updateSpeed();
    updateSliderColor();
}

// Kleur bij het laden van de pagina instellen
window.onload = function () {
    initialize();
    updateSliderColor();
};

// De Konami Code volgorde
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
let konamiIndex = 0;

// Functie om de code te checken bij toetsaanslagen
document.addEventListener('keydown', function(event) {
    // Check of de huidige toetsaanslag overeenkomt met de juiste toets in de Konami Code
    if (event.key === konamiCode[konamiIndex]) {
        konamiIndex++;
    } else {
        // Als het niet overeenkomt, reset de index
        konamiIndex = 0;
    }

    // Als de volledige code correct is ingevoerd
    if (konamiIndex === konamiCode.length) {
        activateKonamiCode();
        konamiIndex = 0; // Reset de index voor een eventuele volgende keer
    }
});

// Functie die wordt geactiveerd bij het invoeren van de Konami Code
function activateKonamiCode() {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    window.location.href = url;
}

let isDrawing = false; 
let currentDrawState = null; 

function initialize() {
    createTable();
    initializeGrids();
    resetGrids();
    setupControlButtons();
    setupClickHandler(); 
    setupDragHandler(); 
}


function setupClickHandler() {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.addEventListener('click', clickCell);  
}

function clickCell(e) {
    const cell = e.target;
    if (cell.tagName === 'TD') {
        const classes = cell.getAttribute("class");
        const rowcol = cell.id.split("_");
        const row = rowcol[0];
        const col = rowcol[1];


        if (classes.indexOf("live") > -1) {
            cell.setAttribute("class", "dead");
            grid[row][col] = 0;
        } else {
            cell.setAttribute("class", "live");
            grid[row][col] = 1;
        }
    }
}


function setupDragHandler() {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.addEventListener('mousedown', startDrawing);
    gridContainer.addEventListener('mouseup', stopDrawing);
    gridContainer.addEventListener('mousemove', dragOverCell);
}

function startDrawing(e) {
    isDrawing = true;

    const cell = e.target;
    if (cell.tagName === 'TD') {
        const classes = cell.getAttribute("class");

       
        currentDrawState = classes.indexOf("live") > -1 ? 0 : 1;
        toggleCellState(cell); 
    }
}

function stopDrawing() {
    isDrawing = false;
    currentDrawState = null;
}

function dragOverCell(e) {
    if (isDrawing) {
        const cell = e.target;
        if (cell.tagName === 'TD') {
            toggleCellState(cell); 
        }
    }
}

function toggleCellState(cell) {
    const rowcol = cell.id.split("_");
    const row = rowcol[0];
    const col = rowcol[1];

    if (currentDrawState === 1) {
        cell.setAttribute("class", "live");
        grid[row][col] = 1;
    } else {
        cell.setAttribute("class", "dead");
        grid[row][col] = 0;
    }
}

window.onload = initialize;