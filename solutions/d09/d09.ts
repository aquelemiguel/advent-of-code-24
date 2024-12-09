function parse(input: string) {
  return input
    .split("")
    .flatMap((_, i) =>
      new Array(Number(input[i])).fill(i % 2 === 0 ? Math.max(0, i / 2) : -1)
    );
}

function checksum(arr: number[]) {
  return arr.reduce((acc, curr, i) => acc + (curr === -1 ? 0 : curr * i), 0);
}

function defrag(arr: number[]) {
  for (let j = arr.length - 1, start = 0; j >= 0; j--) {
    if (arr[j] === -1) {
      continue;
    }
    for (let i = start; i < j; i++) {
      if (arr[i] === -1) {
        [arr[i], arr[j]] = [arr[j], -1];
        start = i + 1;
        break;
      }
    }
  }
  return arr;
}

function quickDefrag(arr: number[]) {
  for (let j = arr.length - 1; j >= 0; j--) {
    if (arr[j] === -1) {
      continue;
    }
    const current = arr[j];
    let size = 1;
    while (j > 0 && arr[j - 1] === current) {
      size++, j--;
    }
    for (let i = 0, free = 0; i < j; i++) {
      if (arr[i] === -1 && ++free === size) {
        for (let k = 0; k < size; k++) {
          arr[i - k] = current;
          arr[j + k] = -1;
        }
        break;
      }
      if (arr[i] !== -1) {
        free = 0;
      }
    }
  }
  return arr;
}

export const p1 = (input: string) => checksum(defrag(parse(input)));
export const p2 = (input: string) => checksum(quickDefrag(parse(input)));
