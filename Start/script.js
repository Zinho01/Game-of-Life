const canvas = document.getElementById('gamecanvas');
const ctx = canvas.getContext('2d');
const cellsize = 100;
const rows = 20;
const cols = 20;


canvas.width = cols * cellsize;
canvas.height = rows * cellsize;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    
    const condition = (i + j) % 2 === 0; 


    ctx.fillStyle = 'white';
    ctx.fillRect(j * cellsize, i * cellsize, cellsize, cellsize);

    //condition moet nog worden aangepast
    if (condition) {
        ctx.fillStyle = 'white';
        ctx.fillRect(j * cellsize, i * cellsize, cellsize, cellsize);
    }

    ctx.strokesStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeRect(j * cellsize, i * cellsize, cellsize, cellsize);
  }
}

function clicker() {
    
}