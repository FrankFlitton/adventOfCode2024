const sampleData = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

const loadData = (sampleData: string) => {
  const dataArr = sampleData.trim().split("\n");
  const arr1: number[] = [];
  const arr2: number[] = [];
  for (let i = 0; i < dataArr.length; i++) {
    const str = dataArr[i];
    let num1 = "";
    let j = 0;
    while (true) {
      num1 += str[j];
      j++;
      if (str[j] === " ") break;
    }
    let num2 = "";
    j = str.length - 1;
    while (true) {
      num2 = `${str[j]}${num2}`;
      j--;
      if (str[j] === " ") break;
    }

    arr1.push(parseFloat(num1));
    arr2.push(parseFloat(num2));
  }

  return [arr1, arr2];
};

const part1 = (sampleData: string) => {
  const [arr1, arr2] = loadData(sampleData);
  arr1.sort((a, b) => b - a);
  arr2.sort((a, b) => b - a);

  let result = 0;
  for (let i = 0; i < arr1.length; i++) {
    const max = Math.max(arr1[i], arr2[i]);
    const min = Math.min(arr1[i], arr2[i]);
    result = result + (max - min);
  }

  return result;
};

const part2 = (sampleData: string) => {
  const [needles, haystack] = loadData(sampleData);
  haystack.sort();

  let result = 0;
  for (let i = 0; i < needles.length; i++) {
    const needle = needles[i];
    const index = haystack.findIndex((h) => h === needle);
    // found
    if (index > -1) {
      const lastIndex = haystack.findLastIndex((h) => h === needle);
      const multiple = lastIndex - index + 1;
      result = result + needle * multiple;
    }
  }
  return result;
};

const path = "./input.txt";
const file = Bun.file(path);
const text = await file.text();

console.log("sample data: ", part1(sampleData));
console.log("real data: ", part1(text));
console.log("sample data: ", part2(sampleData));
console.log("real data: ", part2(text));
