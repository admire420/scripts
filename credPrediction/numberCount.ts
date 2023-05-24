type countType = {
   [digitPositionKey: number]: { [numberKey: number]: number };
};

//print the count of all numbers in each digit of a number
const numberDigitCount = (numbers: number[]) => {
   let count: countType = {};

   numbers.forEach((num: number) => {
      const len = num.toString().length;
      for (let i = 0; i < len; i++) {
         let digit = Math.trunc(num / Math.pow(10, i)) % 10;
         let digitPosition = len - i;
         if (count[digitPosition]?.[digit]) {
            count[digitPosition][digit] = count[digitPosition][digit] + 1;
         } else {
            if (!count[digitPosition]) count[digitPosition] = {};
            count[digitPosition][digit] = 1;
         }
      }
   });

   return count;
};

console.log(
   numberDigitCount([
      4574, 3735, 5586, 2668, 5685, 5355, 6152, 2320, 1656, 2067, 3708, 5254,
      2615, 3968, 4046, 5122, 1559, 3024, 1686, 3660, 3203, 4068, 4465, 2440,
      4306, 4704, 1828, 5453, 1613, 3967,
   ])
);
