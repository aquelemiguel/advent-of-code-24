type Solution = {
  [key: string]: {
    title: string;
    example: {
      p1: number;
      p2: number;
    };
    custom: {
      p1: number;
      p2: number;
    };
  };
};

function readInputFiles(day: string) {
  let example = "";
  let custom = "";
  try {
    example = Deno.readTextFileSync(`./solutions/${day}/${day}.example`);
  } catch (error) {
    console.warn(
      `Warning: File ${day}.example does not exist. Tests are skipped.`
    );
  }
  try {
    custom = Deno.readTextFileSync(`./solutions/${day}/${day}.in`);
  } catch (error) {
    console.warn(`Warning: File ${day}.in does not exist. Tests are skipped.`);
  }
  return { example, custom };
}

export { type Solution, readInputFiles };
