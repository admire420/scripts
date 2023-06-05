const fs = require("fs");
import numberDigitCount, { repeatingDigits } from "./numberDigitCount";
import {
   LATEST_WIN,
   array1,
   array2,
   array3,
   array4,
   WINNING_BIDS,
} from "./constants";
import evenOdd, {
   findRepeatingBids,
   findUniqueBids,
   findRepeatingPattern,
} from "./calc";

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

let array2hasdigit2 = array2.includes(digit2);
let array3hasdigit3 = array3.includes(digit3);
let array4hasdigit4 = array4.includes(digit4);

// console.log(array2hasdigit2, array3hasdigit3, array4hasdigit4);

// remove repeating digits
array2.splice(array2.indexOf(digit2), 1);
array3.splice(array3.indexOf(digit3), 1);
array4.splice(array4.indexOf(digit4), 1);

const result = allCombinations(array1, array2, array3, array4);
const totalBids = WINNING_BIDS.length;
const REPEATING_BIDS = findRepeatingBids(WINNING_BIDS);
const totalRepeatingBids = REPEATING_BIDS.length;
const UNIQUE_BIDS = findUniqueBids(WINNING_BIDS);
const totalUniqueBids = UNIQUE_BIDS.length;

//do calculations

console.log("Total Winnings Bids :", totalBids);

console.log(
   "Repeating Winning Bids : " +
      totalRepeatingBids +
      " | Probability :" +
      ((totalRepeatingBids / totalBids) * 100).toFixed(2) +
      "%"
);
// console.log("Repeating Bids :\n", repeatingBids);

console.log(
   "Unique Winning Bids :" +
      totalUniqueBids +
      " | Probability :" +
      ((totalUniqueBids / totalBids) * 100).toFixed(2) +
      "%"
);

const evenOddResult = evenOdd(WINNING_BIDS);
console.log(
   "\nAll Even :" + evenOddResult.e1234.length,
   "| Probability :" +
      ((evenOddResult.e1234.length / totalBids) * 100).toFixed(2) +
      "%"
);
console.log(
   "All Even Except 0:",
   evenOddResult.e1234exe0.length,
   "| Probability :",
   ((evenOddResult.e1234exe0.length / totalBids) * 100).toFixed(2) + "%"
);
console.log(
   "All Odd :",
   evenOddResult.o1234.length,
   "| Probability :",
   ((evenOddResult.o1234.length / totalBids) * 100).toFixed(2) + "%"
);
console.log(
   "First 3 Even :",
   evenOddResult.e123.length,
   "| Probability :",
   ((evenOddResult.e123.length / totalBids) * 100).toFixed(2) + "%"
);
console.log(
   "First 3 Odd :",
   evenOddResult.o123.length,
   "| Probability :",
   ((evenOddResult.o123.length / totalBids) * 100).toFixed(2) + "%"
);
console.log(
   "Last 3 Even :",
   evenOddResult.e234.length,
   "| Probability :",
   ((evenOddResult.e234.length / totalBids) * 100).toFixed(2) + "%"
);
console.log(
   "Last 3 Odd :",
   evenOddResult.o234.length,
   "| Probability :",
   ((evenOddResult.o234.length / totalBids) * 100).toFixed(2) + "%"
);

// when repeating
const evenOddResultRepeating = evenOdd(REPEATING_BIDS);
console.log(
   "\nRepeating All Even :",
   evenOddResultRepeating.e1234.length,
   "| Probability :",
   ((evenOddResultRepeating.e1234.length / totalRepeatingBids) * 100).toFixed(
      2
   ) + "%"
);
console.log(
   "Repeating All Even Except 0:",
   evenOddResultRepeating.e1234exe0.length,
   "| Probability :",
   (
      (evenOddResultRepeating.e1234exe0.length / totalRepeatingBids) *
      100
   ).toFixed(2) + "%"
);
console.log(
   "Repeating All Odd :",
   evenOddResultRepeating.o1234.length,
   "| Probability :",
   ((evenOddResultRepeating.o1234.length / totalRepeatingBids) * 100).toFixed(
      2
   ) + "%"
);
console.log(
   "Repeating First 3 Even :",
   evenOddResultRepeating.e123.length,
   "| Probability :",
   ((evenOddResultRepeating.e123.length / totalRepeatingBids) * 100).toFixed(
      2
   ) + "%"
);
console.log(
   "Repeating First 3 Odd :",
   evenOddResultRepeating.o123.length,
   "| Probability :",
   ((evenOddResultRepeating.o123.length / totalRepeatingBids) * 100).toFixed(
      2
   ) + "%"
);
console.log(
   "Repeating Last 3 Even :",
   evenOddResultRepeating.e234.length,
   "| Probability :",
   ((evenOddResultRepeating.e234.length / totalRepeatingBids) * 100).toFixed(
      2
   ) + "%"
);
console.log(
   "Repeating Last 3 Odd :",
   evenOddResultRepeating.o234.length,
   "| Probability :",
   ((evenOddResultRepeating.o234.length / totalRepeatingBids) * 100).toFixed(
      2
   ) + "%"
);

// pattern number check
const repeatingPattern = findRepeatingPattern(REPEATING_BIDS);
const {
   r12,
   r23,
   r34,
   r13,
   r14,
   r24,
   r123,
   r234,
   r134,
   r124,
   r12r34,
   r14r23,
   r13r24,
} = repeatingPattern;
let patterns = [
   { name: "r12", data: r12 },
   { name: "r23", data: r23 },
   { name: "r34", data: r34 },
   { name: "r13", data: r13 },
   { name: "r14", data: r14 },
   { name: "r24", data: r24 },
   { name: "r123", data: r123 },
   { name: "r234", data: r234 },
   { name: "r134", data: r134 },
   { name: "r124", data: r124 },
   { name: "r12r34", data: r12r34 },
   { name: "r14r23", data: r14r23 },
   { name: "r13r24", data: r13r24 },
];
console.log("");
patterns.forEach((pattern) => {
   console.log(
      `Repeating Pattern ${pattern.name} :` + pattern.data.length,
      "| Probability :" +
         ((pattern.data.length / totalRepeatingBids) * 100).toFixed(2) +
         "%"
   );
});

// console.log("Total Slots :" + result.length);
// console.log(
//    "Number of cards to draw :" +
//       Math.floor(result.length / 6) +
//       " sets and " +
//       (result.length % 6) +
//       " slots"
// );
// console.log(array1, array2, array3, array4);

fs.writeFileSync("results.json", JSON.stringify(result), (err: string) => {
   if (err) {
      console.error(err);
   }
});
