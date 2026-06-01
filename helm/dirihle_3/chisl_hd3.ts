const Nx = 10, Ny = 10;
const hx = 1 / Nx, hy = 1 / Ny;
const F = 0;
const U = 1;
const a = 1, b = 1;
const A = 1, B = 1;
const PI = Math.PI;
const kvadrat_k = -(4 + PI*PI);

function Fij(x: number, y: number) {
	return -2*PI*PI*Math.exp(2*x)*Math.sin(PI*y);
}

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

const arrU = initArray(Nx, Ny)

const newArrU = initArray(Nx, Ny)


//краевой случай U(0, y)
function Uxy_0_y(x: number, y: number){
	return Math.sin(PI*y);
}

//краевой случай U(1, y)
function Uxy_1_y(x: number, y: number){
	return Math.exp(2)*Math.sin(PI*y);
}

//краевой случай U(x, 0)
function Uxy_x_0(x: number, y: number){
	return 0;
}

//краевой случай U(x, 1)
function Uxy_x_1(x: number, y: number){
	return 0;
}


// заполнение краев сетки
function fillEdges(){
	for(let i=0; i<=Nx; i++){
		let n1 = Uxy_x_0(hx*i, 0) 
		let n2 = Uxy_x_1(hx*i, 1) 
		arrU[0][i] = n1
		arrU[Ny][i] = n2

		newArrU[0][i] = n1
		newArrU[Ny][i] = n2
	}

	for(let j=0; j<=Ny; j++){
		let n1 = Uxy_0_y(0, hy*j)
		let n2 = Uxy_1_y(1, hy*j)
		arrU[j][0] = n1
		arrU[j][Nx] = n2
		newArrU[j][0] = n1
		newArrU[j][Nx] = n2
	}

	for(let j=1; j<Ny; j++){
		for(let i=1; i<Nx; i++){
			arrU[j][i] = 0
			newArrU[j][i] = 0
		}
	}
}


function f(){
	for(let count=0; count<8000; count++){
		for(let j=1; j<Ny; j++){
			for(let i=1; i<Nx; i++){
				let n = ( ( arrU[j][i+1] + arrU[j][i-1] ) / (hx * hx) + (arrU[j+1][i] + arrU[j-1][i] ) / (hy * hy) - Fij(0+i*hx, 0+j*hy)) / ((2/(hx*hx))	 + (2/(hy*hy)) - kvadrat_k)
				newArrU[j][i] = n;

			}
		}


		for(let j=1; j<Ny; j++){
			for(let i=1; i<Nx; i++){
				arrU[j][i] = newArrU[j][i]
			}
		}
	}

}

fillEdges()
logArr(arrU)
f()

logArr(arrU)