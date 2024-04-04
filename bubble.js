let audioCtx=null;

function play(){
    const swaps=bubbleSort([...array]);
    animate(swaps);
}

function animate(swaps){
    if(swaps.length==0){
        showBars();
        return;
    }
    const [i,j]=swaps.shift(0);
    [array[i],array[j]]=[array[j],array[i]];
    showBars([i,j]);
    playNote(200+array[i]*500);
    playNote(200+array[j]*500);

    setTimeout(function(){
        animate(swaps);
    },100);
}

function bubbleSort(array){
    const swaps=[];
    do{
        var swapped=false;
        for(let i=1;i<array.length;i++){
            if(array[i-1]>array[i]){
                swaps.push([i-1,i]);
                swapped=true;
                [array[i-1],array[i]]=[array[i],array[i-1]];
            }
        }
    }while(swapped);
    return swaps;
}

function playNote(freq){
    if(audioCtx==null){
        audioCtx=new(
            AudioContext || 
            webkitAudioContext || 
            window.webkitAudioContext
        )();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime+dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}