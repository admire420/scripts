const fs = require("fs");
import { WINNING_BIDS } from "./constants";
import { findRepeatingBids } from "./calc";
import { LATEST_WIN, array1, array2, array3, array4 } from "./constants";
type count = {
   [key: number]: number;
};

const REPEATING_BIDS = findRepeatingBids(WINNING_BIDS);

const predictionCondition = (
   d1: number,
   d2: number,
   d3: number,
   d4: number
) => {
   return (
      //  // Avoid Certain Repeating Patterns
      //  // r12
      //  d1 == d2 ||
      //  // r23
      //  d2 == d3 ||
      //  // r34
      //  d3 == d4 ||
      //  // r123*
      (d1 == d2 && d2 == d3) ||
      //  // r234*
      (d2 == d3 && d3 == d4) ||
      //  // r134
      //  (d1 == d3 && d3 == d4) ||
      //  // r124*
      (d1 == d2 && d2 == d4) ||
      //  // r14r23*
      (d1 == d4 && d2 == d3) ||
      //  // r12r34*
      (d1 == d2 && d3 == d4) ||
      //  // r13r24*
      (d1 == d3 && d2 == d4) ||
      //  // avoid if 3200, 1003*
      (d3 == 0 && d4 == 0) ||
      (d2 == 0 && d3 == 0) ||
      //  // Odd/Even Pattern Predictions
      //  // e1234exe0
      //  (d1 % 2 == 0 &&
      //     d2 % 2 == 0 &&
      //     d3 % 2 == 0 &&
      //     d4 % 2 == 0 &&
      //     d1 != 0 &&
      //     d2 != 0 &&
      //     d3 != 0 &&
      //     d4 != 0) ||
      //  // o1234
      //  (d1 % 2 != 0 && d2 % 2 != 0 && d3 % 2 != 0 && d4 % 2 != 0) ||
      //  // e234exe0
      //  (d2 % 2 == 0 &&
      //     d3 % 2 == 0 &&
      //     d4 % 2 == 0 &&
      //     d2 != 0 &&
      //     d3 != 0 &&
      //     d4 != 0) ||
      // avoid if any 3 or more digits are consecutively incresing in order 3451, 2123, 3456*
      (d1 + 1 == d2 && d2 + 1 == d3) ||
      (d2 + 1 == d3 && d3 + 1 == d4) ||
      //  // Average Repeating Pattern
      //  // a23
      //  d2 + d3 <= 3 ||
      //  //  // a14
      //  d1 + d4 <= 2 ||
      //  //avoid if the sum of last 3 numbers is <=
      //  d2 + d3 + d4 <= 7 ||
      // Only accept repeating numbers*
      new Set([d1, d2, d3, d4]).size == 4
   );
};

const getPredictions = (
   array1: number[],
   array2: number[],
   array3: number[],
   array4: number[]
) => {
   const result: number[][] = [];
   array1.forEach((item1) => {
      array2.forEach((item2) => {
         array3.forEach((item3) => {
            if (!(item3 == item1 && item3 == item2)) {
               array4.forEach((item4) => {
                  if (!predictionCondition(item1, item2, item3, item4)) {
                     result.push([item1, item2, item3, item4]);
                  }
               });
            }
         });
      });
   });
   return result;
};

const testPredictions = (bids: number[]) => {
   let count = 0;
   bids.forEach((bid) => {
      const d1 = Number(bid.toString()[0]);
      const d2 = Number(bid.toString()[1]);
      const d3 = Number(bid.toString()[2]);
      const d4 = Number(bid.toString()[3]);

      if (!predictionCondition(d1, d2, d3, d4)) {
         count++;
      }
   });
   return ((count / bids.length) * 100).toFixed(2);
};

let digit2 = Number(LATEST_WIN.toString()[1]);
let digit3 = Number(LATEST_WIN.toString()[2]);
let digit4 = Number(LATEST_WIN.toString()[3]);

// console.log(array2hasdigit2, array3hasdigit3, array4hasdigit4);

// remove repeating digits
array2.splice(array2.indexOf(digit2), 1);
array3.splice(array3.indexOf(digit3), 1);
array4.splice(array4.indexOf(digit4), 1);

const result = getPredictions(array1, array2, array3, array4);

// console.log(array1, array2, array3, array4);

const outputPredictions = (result: number[][]) => {
   fs.writeFileSync("results.json", JSON.stringify(result), (err: string) => {
      if (err) {
         console.error(err);
      }
   });
};

// Prediction Accuracy
console.log(
   "Prediction on Total Winning Bids :" + testPredictions(WINNING_BIDS) + "%"
);
console.log(
   "Prediction on Repeating Winning Bids :" +
      testPredictions(REPEATING_BIDS) +
      "%"
);
console.log("Total Slots :" + result.length);
console.log(
   "Number of cards to draw :" +
      Math.floor(result.length / 6) +
      " sets and " +
      (result.length % 6) +
      " slots"
);
console.log("Minimum Number Players :" + Math.ceil(result.length / (6 * 5)));
// print to file
outputPredictions(result);

export default result;
export { outputPredictions, testPredictions };
