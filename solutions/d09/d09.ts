function parse(input: string) {
  const blocks: number[] = [];
  for (let i = 0; i < input.length; i++) {
    blocks.push(
      ...new Array(Number(input[i])).fill(
        i % 2 === 0 ? Math.max(0, i / 2) : NaN
      )
    );
  }
  return blocks;
}

function fullDefrag(blocks: number[]) {
  let startBlock = 0;

  for (let j = blocks.length - 1; j >= 0; j--) {
    if (Number.isNaN(blocks[j])) {
      continue;
    }
    for (let i = startBlock; i < j; i++) {
      if (Number.isNaN(blocks[i])) {
        blocks[i] = blocks[j];
        blocks[j] = NaN;
        startBlock = i + 1;
        break;
      }
    }
  }
  return blocks;
}

function quickDefrag(blocks: number[]) {
  console.log(blocks);
  for (let j = blocks.length - 1; j >= 0; j--) {
    if (Number.isNaN(blocks[j])) {
      continue;
    }
    const currentBlock = blocks[j];
    let blockSize = 1;

    while (blocks[j - 1] === currentBlock) {
      j--;
      blockSize++;
    }

    findFreeSlots: for (let i = 0, freeSlots = 0; i < j; ) {
      while (Number.isNaN(blocks[i])) {
        freeSlots++;
        if (freeSlots === blockSize) {
          for (let k = freeSlots; k > 0; k--, i--) {
            blocks[i] = currentBlock;
          }
          for (let k = j; k < j + blockSize; k++) {
            blocks[k] = NaN;
          }
          break findFreeSlots;
        }
        i++;
      }
      i++;
      freeSlots = 0;
    }
  }
  return blocks;
}

function checksum(blocks: number[]): number {
  return blocks.reduce(
    (acc, curr, i) => acc + (Number.isNaN(curr) ? 0 : curr * i),
    0
  );
}

export const p1 = (input: string) => checksum(fullDefrag(parse(input)));
export const p2 = (input: string) => checksum(quickDefrag(parse(input)));
