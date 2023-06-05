import { WINNING_BIDS } from "./constants";

type countType = {
   [digitPositionKey: number]: { [numberKey: number]: number };
};

//print the count of all numbers in each digit of a number
const digitCount = (numbers: number[]) => {
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

//print the count of all numbers in each digit of a number
const repeatingDigitCount = (numbers: number[]) => {
   let count: countType = {};

   numbers.forEach((num: number) => {
      let digits = [];
      const len = num.toString().length;

      for (let i = 0; i < len; i++) {
         let digit = Math.trunc(num / Math.pow(10, i)) % 10;
         digits.push(digit);
      }

      // check if any number is repeating
      if (new Set(digits).size != 4) {
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
      }
   });

   return count;
};

const printRepeatingBids = (bids: number[]) => {
   let len = bids.length;
   let s = new Set();
   let repeatingSet = [];

   for (let i = 0; i < len; i++) {
      if (s.has(bids[i])) {
         repeatingSet.push(bids[i]);
      } else {
         s.add(bids[i]);
      }
   }
   return repeatingSet;
};
let repeatingBids = printRepeatingBids(WINNING_BIDS);

let repeatingDigits = repeatingDigitCount(WINNING_BIDS);

export default digitCount(WINNING_BIDS);
export { repeatingDigits, repeatingBids };
