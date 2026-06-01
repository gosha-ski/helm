const U = 1;
const a = 1;
const b = 1;
const PI = Math.PI;
const A=1, B=1;

function sh(arg: number){
	return Math.sinh(arg)
}
function sin(arg: number){
	return Math.sin(arg)
}

function cos(arg: number){
	return Math.cos(arg)
}

function reshenie(x: number, y: number) {
	const C1 = B*sh(PI*(b-y)/a)*sin(PI*x/a) / sh(PI*b/a);
	const C2 = 8*A*(b*b)/(PI*PI*PI)
	let sum = 0;
	for(let n=0; n < 100; n++){
		let S = ( Math.sinh( (2*n+1)*(a-x)*PI / b) * Math.sin((2*n+1)*PI*y / b) ) / ((2*n+1)*(2*n+1)*(2*n+1)*Math.sinh((2*n+1)*PI*a/b))
		sum = sum + S;
		//console.log(Math.sinh( (2*n+1)*(a-x)*PI / b)*Math.sin((2*n+1)*PI*y / b))
	}

	return C1+ C2*sum;
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