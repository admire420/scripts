import { WINNING_BIDS } from "./constants";

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

export default numberDigitCount(WINNING_BIDS);
