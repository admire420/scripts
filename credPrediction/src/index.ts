const fs = require("fs");
import numberDigitCount, {
   repeatingDigits,
   repeatingBids,
} from "./numberDigitCount";
import { LATEST_WIN } from "./constants";

type count = {
   [key: number]: number;
};

const allCombinations = (
   array1: number[],
   array2: number[],
   array3: number[],
   array4: number[]
) => {
   const hold: number[][] = [];
   array1.forEach((item1) => {
      array2.forEach((item2) => {
         array3.forEach((item3) => {
            if (!(item3 == item1 && item3 == item2)) {
               array4.forEach((item4) => {
                  // avoid 1333, 3133, 3313, 1133, 1331
                  let first3even =
                     item1 % 2 == 0 && item2 % 2 == 0 && item3 % 2 == 0;

                  let first3odd =
                     item1 % 2 == 1 && item2 % 2 == 1 && item3 % 2 == 1;

                  let last3even =
                     item2 % 2 == 0 && item3 % 2 == 0 && item4 % 2 == 0;

                  let last3odd =
                     item2 % 2 == 1 && item3 % 2 == 1 && item4 % 2 == 1;

                  if (
                     !(
                        (item4 == item3 && item4 == item2) ||
                        (item4 == item3 && item4 == item1) ||
                        (item1 == item2 && item4 == item1) ||
                        (item1 == item2 && item3 == item4) ||
                        (item1 == item4 && item3 == item2) ||
                        // avoid if 3300, 3003
                        (item3 == 0 && item4 == 0) ||
                        (item2 == 0 && item3 == 0) ||
                        // avoid if all the numbers are even
                        (item1 % 2 == 0 &&
                           item2 % 2 == 0 &&
                           item3 % 2 == 0 &&
                           item4 % 2 == 0 &&
                           item1 != 0 &&
                           item2 != 0 &&
                           item3 != 0 &&
                           item4 != 0) ||
                        // avoid if all the numbers are odd
                        (item1 % 2 != 0 &&
                           item2 % 2 != 0 &&
                           item3 % 2 != 0 &&
                           item4 % 2 != 0) ||
                        // avoid if any 3 or more digits are consecutively incresing in order 3451, 2123, 3456
                        (item1 + 1 == item2 && item2 + 1 == item3) ||
                        (item2 + 1 == item3 && item3 + 1 == item4) ||
                        // avoid same number repeating in the last two digit 1233
                        // item4 == item3 ||
                        // avoid same number repeating in the first two digit 1145
                        // item1 == item2 ||
                        //avoid if same number is repeating in the middle
                        // item2 == item3 ||
                        // avoid if last 3 digits are even excluding 0
                        (item2 % 2 == 0 &&
                           item3 % 2 == 0 &&
                           item4 % 2 == 0 &&
                           item2 != 0 &&
                           item3 != 0 &&
                           item4 != 0) ||
                        //avoid repeating 2 digit pattern 2323
                        (item1 == item3 && item2 == item4) ||
                        // avoid if last 3 digits are odd
                        // last3odd ||
                        // avoid if first 3 digits are odd
                        // first3odd ||
                        // avoid if all the numbers are unique
                        new Set([item1, item2, item3, item4]).size == 4 ||
                        // avoid if sum of middle numbers is <=
                        item2 + item3 <= 6 ||
                        //avoid if sum of end number is <=
                        item1 + item4 <= 1 ||
                        //avoid if the sum of last 3 numbers is <=
                        item2 + item3 + item4 <= 8
                     )
                  ) {
                     hold.push([item1, item2, item3, item4]);
                  }
               });
            }
         });
      });
   });
   return hold;
};

let digit1 = Number(LATEST_WIN.toString()[0]);
let digit2 = Number(LATEST_WIN.toString()[1]);
let digit3 = Number(LATEST_WIN.toString()[2]);
let digit4 = Number(LATEST_WIN.toString()[3]);

let array1 = [2];
let array2 = [0, 1, 2, 3, 4, 5, 6, 7];
let array3 = [0, 2, 5, 6, 8];
let array4 = [0, 2, 3, 4, 5, 6, 8];

array2 = array2.concat([8]);
array3 = array3.concat([1, 3, 4, 7]);
array4 = array4.concat([1, 7]);

let array2hasdigit2 = array2.includes(digit2);
let array3hasdigit3 = array3.includes(digit3);
let array4hasdigit4 = array4.includes(digit4);

console.log(array2hasdigit2, array3hasdigit3, array4hasdigit4);

// remove repeating digits
array2.splice(array2.indexOf(digit2), 1);
array3.splice(array3.indexOf(digit3), 1);
array4.splice(array4.indexOf(digit4), 1);

console.log(array1, array2, array3, array4);

console.log("Repeating Winning Bids :\n", repeatingBids.length);
console.log("Repeating Bids :\n", repeatingBids);
const result = allCombinations(array1, array2, array3, array4);
console.log("Total Slots : " + result.length);
console.log(
   "Number of cards to draw : " +
      Math.floor(result.length / 6) +
      " sets and " +
      (result.length % 6) +
      " slots"
);
fs.writeFileSync("results.json", JSON.stringify(result), (err: string) => {
   if (err) {
      console.error(err);
   }
});
