const Nx = 10, Ny = 10;
const hx = 1 / Nx, hy = 1 / Ny;
const F = 0;
const U = 1;
const a = 1, b = 1;
const A = 1, B = 1;
const PI = Math.PI;
const kvadrat_k = PI*PI;

function Fij(x: number, y: number) {
	return 0;
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


// U_x (0,y)
function gran(x: number, y: number){
	return 0;
}

//краевой случай U(0, y)
function Uxy_0_y(x: number, y: number){
	return 0;
}

//краевой случай U(1, y)
function Uxy_1_y(x: number, y: number){
	return -y;
}

//краевой случай U(x, 0)
function Uxy_x_0(x: number, y: number){
	return 0;
}

//краевой случай U(x, 1)
function Uxy_x_1(x: number, y: number){
	return Math.cos(PI*x);
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
	for(let count=0; count<600000; count++){
		for(let j=1; j<Ny; j++){
			for(let i=1; i<Nx; i++){
				let n = ( ( arrU[j][i+1] + arrU[j][i-1] ) / (hx * hx) + (arrU[j+1][i] + arrU[j-1][i] ) / (hy * hy) - Fij(0+i*hx, 0+j*hy)) / ((2/(hx*hx))	 + (2/(hy*hy)) - kvadrat_k)
				newArrU[j][i] = n;

			}
		}

		for(let j=0; j<=Ny; j++){
			newArrU[j][0] = newArrU[j][1] - gran(0,0+j*hy) * hx;
		}


		for(let j=1; j<Ny; j++){
			for(let i=1; i<Nx; i++){
				arrU[j][i] = newArrU[j][i]
			}
		}

		for(let j=0; j<=Ny; j++){
			arrU[j][0] = newArrU[j][0]
		}

		//logArr(arrU)
	}

}

fillEdges()

arrU[1][0] = 0.1
arrU[2][0] = 0.2
arrU[3][0] = 0.3
arrU[4][0] = 0.4
arrU[5][0] = 0.5
arrU[6][0] = 0.6
arrU[7][0] = 0.7
arrU[8][0] = 0.8
arrU[9][0] = 0.9
arrU[10][0] = 1
logArr(arrU)
f()
logArr(arrU)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function reshenie(x: number, y: number) {
	return y*Math.cos(PI*x);
}

function fillArray(arr: number[][]){
	for(let j=0; j<arr.length; j++){
        for(let i=0; i<arr[j].length; i++){
            arr[j][i] = reshenie(0+i*hx, 0+j*hy) 
            
        }
    }
}


const arrReshenie = initArray(Nx, Ny)

for(let j=0; j<=Ny; j++){
	for(let i=0; i<=Nx; i++){
		arrReshenie[j][i]=0;
	}
}


fillArray(arrReshenie)


function relativeError(arr1: number[][], arrTochnoe: number[][]){
	const resArr = initArray(Nx, Ny)
	for(let i=0; i<arr1.length; i++){
		for(let j=0; j<arr1[i].length; j++){
			resArr[i][j] = Math.abs(arr1[i][j]-arrTochnoe[i][j]) / Math.abs(arrTochnoe[i][j]);
			
		}
	}
	return resArr;
}

//const errorArr = relativeError(arrU, arrReshenie)
//logArr(errorArr)
