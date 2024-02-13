
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let width = canvas.width
let height = canvas.height


let things = []
let Mouse = {
    X:0,
    Y:0,
    Down:0,
}

let gameover = false

document.addEventListener("mousedown", () => {
    Mouse.Down=1;

    const x=Math.floor(Mouse.X/100);
    const y=Math.floor(Mouse.Y/100);

    setTimeout(()=> {
        if (Mouse.Down==1){
            if (VisBoard[y][x]==0){
                VisBoard[y][x] = -1
            }
            else if(VisBoard[y][x]==-1){
                VisBoard[y][x] = 0
            }
        }
        else{
            if (gameover==false && VisBoard[y][x]!=-1){
        
                if (Board[y][x]==1){
                    VisBoard[y][x] = 9
                    gameover = true
        
                    for (let i1=0; i1<10;i1++){
                        for (let i2=0; i2<10;i2++){
                            if (Board[i1][i2]==1){
                                VisBoard[i1][i2]=9
                            }
                        }
                    }
        
                }
                else{
                    let val = 0.1
        
                    val += Board[y][x-1] || 0
                    val += Board[y][x+1] || 0
        
        
                    if (Board[y-1]){
                        val += Board[y-1][x-1] || 0
                        val += Board[y-1][x+1] || 0
                        val += Board[y-1][x] || 0
                    }
                    if (Board[y+1]){
                        val += Board[y+1][x-1] || 0
                        val += Board[y+1][x+1] || 0
                        val += Board[y+1][x] || 0
                    }
                    VisBoard[y][x] = val
                }
            }
        };
     }
     ,100);
});

document.addEventListener("mouseup", () => {
    Mouse.Down = 0
});

document.addEventListener("mousemove", () => {
    Mouse.X = event.clientX
    Mouse.Y = event.clientY
});


Board = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
]
VisBoard = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
]

function Init(){
    let mines = 20;

    do {
        let x=Math.floor(Math.random()*10)
        let y=Math.floor(Math.random()*10)

        if (Board[y][x]==0){
            Board[y][x]=1
            mines--;
        }
      } while (mines > 0);
}

Init()

context.font = "45px serif";
function loop(){

    context.fillStyle = `rgb(0,0,5)`
    context.clearRect(0,0,width,height)
    context.fillStyle = `rgb(255,255,255)`

    for(let y=0;y<10;y++){
        for(let x=0;x<10;x++){

            if (VisBoard[y]){
                if (VisBoard[y][x]==0){
                    context.fillStyle = `rgb(50, 168, 82)`
                    context.fillRect(x*100,y*100,80,80)
                }
                else if(VisBoard[y][x]==9){
                    context.fillStyle = `rgb(255,150,150)`
                    context.fillRect(x*100,y*100,80,80)
                }
                else if(VisBoard[y][x]==-1){
                    context.fillStyle = `rgb(25, 90, 40)`
                    context.fillRect(x*100,y*100,80,80)
                    context.fillStyle = `rgb(255,255,255)`

                    context.fillText("💣", x*100 + 15, y*100 + 55);
                }
                else{
                    context.fillStyle = `rgb(${(VisBoard[y][x]*50) + 25},${150-(VisBoard[y][x]*15)},${150-(VisBoard[y][x]*15)})`
                    context.fillRect(x*100,y*100,80,80)
                    context.fillStyle = `rgb(255,255,255)`

                    context.fillText(Math.floor(VisBoard[y][x]), x*100 + 28, y*100 + 55);
                }
           }
        
        }
    }

    requestAnimationFrame(loop)
};


requestAnimationFrame(loop)



