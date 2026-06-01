interface HelmholtzSolution {
  grid: number[][];
  iterations: number;
  error: number;
}

class HelmholtzJacobiSolver {
  private N: number; // Размер сетки
  private xMin: number;
  private xMax: number;
  private yMin: number;
  private yMax: number;
  private kSquared: number;
  private maxIterations: number;
  private tolerance: number;

  constructor(
    N: number = 50,
    xRange: [number, number] = [0, 1],
    yRange: [number, number] = [0, 1],
    kSquared: number = 1,
    maxIterations: number = 10000,
    tolerance: number = 1e-6
  ) {
    this.N = N;
    [this.xMin, this.xMax] = xRange;
    [this.yMin, this.yMax] = yRange;
    this.kSquared = kSquared;
    this.maxIterations = maxIterations;
    this.tolerance = tolerance;
  }

  // Вычисление шага сетки
  private getStep(): number {
    const dx = (this.xMax - this.xMin) / (this.N - 1);
    const dy = (this.yMax - this.yMin) / (this.N - 1);
    return Math.sqrt(dx * dx + dy * dy) / 2;
  }

  // Инициализация сетки с граничными условиями
  private initializeGrid(
  boundaryConditions: {
    left: (y: number) => number;
    right: (y: number) => number;
    bottom: (x: number) => number;
    top: (x: number) => number;
  }): number[][] {
    const grid: number[][] = Array(this.N).fill(null).map(() => Array(this.N).fill(0));
    const dx = (this.xMax - this.xMin) / (this.N - 1);
    const dy = (this.yMax - this.yMin) / (this.N - 1);

    // Установка граничных условий
    for (let i = 0; i < this.N; i++) {
      const y = this.yMin + i * dy;
      grid[i][0] = boundaryConditions.left(y); // Левая граница
      grid[i][this.N - 1] = boundaryConditions.right(y); // Правая граница
    }

    for (let j = 0; j < this.N; j++) {
      const x = this.xMin + j * dx;
      grid[0][j] = boundaryConditions.bottom(x); // Нижняя граница
      grid[this.N - 1][j] = boundaryConditions.top(x); // Верхняя граница
    }

    return grid;
  }

  // Метод Якоби для решения уравнения Гельмгольца
  solve(
    boundaryConditions: {
      left: (y: number) => number;
      right: (y: number) => number;
      bottom: (x: number) => number;
      top: (x: number) => number;
    }
  ): HelmholtzSolution {
    const h = this.getStep();
    const hSquared = h * h;
    const coefficient = 4 + hSquared * this.kSquared;

    // Инициализируем сетки для текущей и следующей итерации
    let currentGrid = this.initializeGrid(boundaryConditions);
    let nextGrid = this.copyGrid(currentGrid);

    let iteration = 0;
    let maxError = Infinity;

    console.log("Начало итераций метода Якоби...");

    while (iteration < this.maxIterations && maxError > this.tolerance) {
      maxError = 0;

      // Обновляем внутренние точки (не затрагиваем границы)
      for (let i = 1; i < this.N - 1; i++) {
        for (let j = 1; j < this.N - 1; j++) {
          // Формула метода Якоби для уравнения Гельмгольца
          nextGrid[i][j] = (
            currentGrid[i - 1][j] +
            currentGrid[i + 1][j] +
            currentGrid[i][j - 1] +
            currentGrid[i][j + 1]
          ) / coefficient;

          // Вычисляем ошибку
          const error = Math.abs(nextGrid[i][j] - currentGrid[i][j]);
          if (error > maxError) {
            maxError = error;
          }
        }
      }

      // Копируем значения для следующей итерации (сохраняем границы)
      for (let i = 1; i < this.N - 1; i++) {
        for (let j = 1; j < this.N - 1; j++) {
          currentGrid[i][j] = nextGrid[i][j];
        }
      }

      iteration++;

      if (iteration % 100 === 0) {
        console.log(`Итерация ${iteration}, ошибка: ${maxError.toFixed(8)}`);
      }
    }

    console.log(`Решение завершено за ${iteration} итераций, ошибка: ${maxError.toFixed(8)}`);

    return {
      grid: currentGrid,
      iterations: iteration,
      error: maxError
    };
  }

  // Копирование сетки
  private copyGrid(grid: number[][]): number[][] {
    return grid.map(row => [...row]);
  }
}

// Пример использования
function main() {
  // Создаём решатель для единичного квадрата с k² = 1
  const solver = new HelmholtzJacobiSolver(10, [0, 1], [0, 1], -5, 5000, 1e-5);

  // Задаём граничные условия Дирихле
  const boundaryConditions = {
    left: (y: number) => Math.exp(y), // u(0, y) = 0
    right: (y: number) => Math.exp(2+y), // u(1, y) = y·sin(1)
    bottom: (x: number) => Math.exp(2*x), // u(x, 0) = 0
    top: (x: number) => Math.exp(2*x+1) // u(x, 1) = sin(x)
  };

  // Решаем уравнение
  console.log("Решаем уравнение Гельмгольца методом Якоби...");
  const result = solver.solve(boundaryConditions);
  console.log("Решение получено!");

  // Вывод некоторых значений для проверки
  console.log(`u(0.5, 0.5) ≈ ${result.grid[5][5].toFixed(4)}`);
  //console.log(`u(1, 0.5) ≈ ${result.grid[20][39].toFixed(4)}`);
  console.log(`Количество итераций: ${result.iterations}`);
  console.log(`Итоговая ошибка: ${result.error.toFixed(8)}`);
}

// Запуск примера
main();
