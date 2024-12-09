function parse(input: string) {
  return input
    .split("")
    .flatMap((_, i) =>
      new Array(Number(input[i])).fill(i % 2 === 0 ? Math.max(0, i / 2) : -1)
    );
}

function checksum(blocks: number[]) {
  return blocks.reduce((acc, curr, i) => acc + (curr === -1 ? 0 : curr * i), 0);
}

function defrag(blocks: number[]) {
  for (let j = blocks.length - 1, startBlock = 0; j >= 0; j--) {
    if (blocks[j] === -1) {
      continue;
    }
    for (let i = startBlock; i < j; i++) {
      if (blocks[i] === -1) {
        [blocks[i], blocks[j]] = [blocks[j], -1];
        startBlock = i + 1;
        break;
      }
    }
  }
  return blocks;
}

function quickDefrag(blocks: number[]) {
  for (let j = blocks.length - 1; j >= 0; j--) {
    if (blocks[j] === -1) {
      continue;
    }
    const currentBlock = blocks[j];
    let blockSize = 1;
    while (j > 0 && blocks[j - 1] === currentBlock) {
      blockSize++, j--;
    }
    for (let i = 0, freeSlots = 0; i < j; i++) {
      if (blocks[i] === -1 && ++freeSlots === blockSize) {
        for (let k = 0; k < blockSize; k++) {
          blocks[i - k] = currentBlock;
          blocks[j + k] = -1;
        }
        break;
      }
      if (blocks[i] !== -1) {
        freeSlots = 0;
      }
    }
  }
  return blocks;
}

export const p1 = (input: string) => checksum(defrag(parse(input)));
export const p2 = (input: string) => checksum(quickDefrag(parse(input)));
