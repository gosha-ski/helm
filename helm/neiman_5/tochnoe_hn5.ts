const U = 1;
const a = 1;
const b = 1;
const PI = Math.PI;


function reshenie(x: number, y: number) {
	return y*Math.cos(PI*x);
}


//console.log(reshenie(0.25,0.25))



const Nx = 10, Ny = 10;
const hx = 1 / Nx, hy = 1 / Ny;


function initArray(Nx: number, Ny: number){
	let array: number[][] = []
	for(let i=0; i<=Ny; i++){
		array.push([])
	}
	return array
} 

function logArr(arr:number[][]){
    for(let j=0; j<arr.length; j++){
        for(let i=0; i<arr[j].length; i++){
            arr[j][i] = Math.round(arr[j][i] * 1000) / 1000
        }
    }
    for(let i=0; i<arr.length; i++){
        console.log(...arr[i])
    }
    console.log("----------------------------------------------------------")
}

function fillArray(arr: number[][]){
	for(let j=0; j<arr.length; j++){
        for(let i=0; i<arr[j].length; i++){
            arr[j][i] = reshenie(0+i*hx, 0+j*hy) 
            
        }
    }
}


const arrU = initArray(Nx, Ny)

for(let j=0; j<=Ny; j++){
	for(let i=0; i<=Nx; i++){
		arrU[j][i]=0;
	}
}


fillArray(arrU)
logArr(arrU)