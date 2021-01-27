const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementById("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle =INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}

function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleColorClick2(e){
    if(e.target.className=="controls__color jsColor"){
        const color = e.target.style.backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }
}

function handleRangeChange(e){
    const size = e.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(e){
    if(filling===true){
        filling=false;
        mode.innerText="Fill"
    }else{
        filling=true;
        mode.innerText="Paint"
    }
}

function handleCanvasClick(e){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(e){
    e.preventDefault();
}

function handleSaveClick(e){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download="PaintJS[EXPORT]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting)
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

if(colors){
    // Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));
    // 이벤트 위임한 경우
    colors.addEventListener("click",handleColorClick2);
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}