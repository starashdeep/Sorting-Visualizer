const n=40;
const array=[];


init();

function init(){
    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    showBars();
}

function showBars(indices){
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        if(indices && indices.includes(i)){
            bar.style.backgroundColor="red";
        }
        container.appendChild(bar);
    }   
}