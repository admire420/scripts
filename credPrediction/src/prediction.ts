const fs = require("fs");
import { WINNING_BIDS } from "./constants";
import { findRepeatingBids } from "./calc";
import { TOTAL_PREDICTIONS, array1, array2, array3, array4 } from "./constants";

const REPEATING_BIDS = findRepeatingBids(WINNING_BIDS);
const lastBidNumbers = WINNING_BIDS[0]
   .toString()
   .split("")
   .map((num) => Number(num));
const secondLastBidNumbers = WINNING_BIDS[1]
   .toString()
   .split("")
   .map((num) => Number(num));

//find the unique set of last two digit
const previousUniqueSetOn2 = [
   ...new Set([...lastBidNumbers, ...secondLastBidNumbers]),
];

const predictionCondition2 = (
   d1: number,
   d2: number,
   d3: number,
   d4: number
) => {
   const cr234cr1234in2 = [d2, d3, d4].some((num) =>
      previousUniqueSetOn2.includes(num)
   );

   const repeating = new Set([d1, d2, d3, d4]).size != 4;
   const r12 = d1 == d2;
   const r23 = d2 == d3;
   const r34 = d3 == d4;
   const r1 = d1 == d2 || d1 == d3 || d1 == d4;
   const r2 = (d2 == d3 || d2 == d4) && !r1;
   const r123 = d1 == d2 && d2 == d3; //*
   const r234 = d2 == d3 && d3 == d4; //*
   const r124 = d1 == d2 && d2 == d4; //*
   const r14r23 = d1 == d4 && d2 == d3; //*
   const r12r34 = d1 == d2 && d3 == d4; //*
   const r13r24 = d1 == d3 && d2 == d4; //*

   const e1234exe0 =
      d1 % 2 == 0 &&
      d2 % 2 == 0 &&
      d3 % 2 == 0 &&
      d4 % 2 == 0 &&
      d1 != 0 &&
      d2 != 0 &&
      d3 != 0 &&
      d4 != 0;
   const o1234 = d1 % 2 != 0 && d2 % 2 != 0 && d3 % 2 != 0 && d4 % 2 != 0;
   const e234exe0 =
      d2 % 2 == 0 &&
      d3 % 2 == 0 &&
      d4 % 2 == 0 &&
      d2 != 0 &&
      d3 != 0 &&
      d4 != 0;

   const sum12 = d1 + d2; //*
   const sum13 = d1 + d3; //*
   const sum14 = d1 + d4; //*
   const sum24 = d2 + d4; //*
   const sum23 = d2 + d3; //*
   const sum34 = d3 + d4; //*
   const sum123 = d1 + d2 + d3; //*
   const sum234 = d2 + d3 + d4; //*
   const sum124 = d1 + d2 + d4; //*
   const sum134 = d1 + d3 + d4; //*
   const sum1234 = d1 + d2 + d3 + d4; //*

   let d1Repeating = false;
   let d2Repeating = false;

   if (
      repeating &&
      r1 &&
      sum12 <= 11 &&
      sum13 <= 13 &&
      sum14 <= 12 &&
      sum24 <= 14 &&
      sum23 <= 14 &&
      sum34 <= 14 &&
      sum123 <= 19 &&
      sum234 <= 19 &&
      sum124 <= 17 &&
      sum134 <= 19 &&
      sum1234 <= 24 &&
      sum12 >= 2 &&
      sum13 >= 2 &&
      sum14 >= 2 &&
      sum24 >= 2 &&
      sum23 >= 2 &&
      sum34 >= 2 &&
      sum123 >= 5 &&
      sum234 >= 5 &&
      sum124 >= 4 &&
      sum134 >= 4 &&
      sum1234 >= 7
   ) {
      d1Repeating = true;
   } else if ((d1 <= 3 && d2 > 3) || (d1 > 3 && d2 < 3)) {
      d2Repeating = true;
   }

   let yes =
      // Only accept repeating numbers*
      repeating && (d1Repeating || d2Repeating) && cr234cr1234in2;
   let no =
      // Avoid Certain Repeating Patterns
      r123 ||
      r234 ||
      r124 ||
      r14r23 ||
      r12r34 ||
      r13r24 ||
      //Trade Offs
      r12 ||
      r34 ||
      r23 ||
      // avoid if 3200, 1003*
      (d3 == 0 && d4 == 0) ||
      (d2 == 0 && d3 == 0) ||
      // Odd/Even Pattern Predictions
      // e1234exe0 ||
      // o1234 ||
      // e234exe0

      // avoid if any 3 or more digits are consecutively incresing in order 3451, 2123, 3456*
      (d1 + 1 == d2 && d2 + 1 == d3) ||
      (d2 + 1 == d3 && d3 + 1 == d4);
   //  // Average Repeating Pattern
   //  // a23
   // a23 <= 3 ||
   //  //  // a14
   // a14 <= 2;
   //  //avoid if the sum of last 3 numbers is <=
   // sum234 <= 10;

   return yes && !no;
};

const predictionCondition = (
   d1: number,
   d2: number,
   d3: number,
   d4: number
) => {
   const repeating = new Set([d1, d2, d3, d4]).size != 4;
   const r12 = d1 == d2;
   const r23 = d2 == d3;
   const r34 = d3 == d4;
   const r123 = d1 == d2 && d2 == d3; //*
   const r234 = d2 == d3 && d3 == d4; //*
   const r124 = d1 == d2 && d2 == d4; //*
   const r14r23 = d1 == d4 && d2 == d3; //*
   const r12r34 = d1 == d2 && d3 == d4; //*
   const r13r24 = d1 == d3 && d2 == d4; //*

   const e1234exe0 =
      d1 % 2 == 0 &&
      d2 % 2 == 0 &&
      d3 % 2 == 0 &&
      d4 % 2 == 0 &&
      d1 != 0 &&
      d2 != 0 &&
      d3 != 0 &&
      d4 != 0;
   const o1234 = d1 % 2 != 0 && d2 % 2 != 0 && d3 % 2 != 0 && d4 % 2 != 0;
   const e234exe0 =
      d2 % 2 == 0 &&
      d3 % 2 == 0 &&
      d4 % 2 == 0 &&
      d2 != 0 &&
      d3 != 0 &&
      d4 != 0;

   let yes =
      // Only accept repeating numbers*
      repeating;
   let no =
      // Avoid Certain Repeating Patterns
      r123 ||
      r234 ||
      r124 ||
      r14r23 ||
      r12r34 ||
      r13r24 ||
      // avoid if 3200, 1003*
      (d3 == 0 && d4 == 0) ||
      (d2 == 0 && d3 == 0) ||
      // Odd/Even Pattern Predictions
      // e1234exe0 ||
      // o1234 ||
      // e234exe0 ||

      // avoid if any 3 or more digits are consecutively incresing in order 3451, 2123, 3456*
      // (d1 + 1 == d2 && d2 + 1 == d3) ||
      // (d2 + 1 == d3 && d3 + 1 == d4) ||
      //  // Average Repeating Pattern
      //  // a23
      // d2 + d3 <= 3 ||
      //  //  // a14
      // d1 + d4 <= 2 ||
      //  //avoid if the sum of last 3 numbers is <=
      d2 + d3 + d4 <= 10;

   return yes && !no;
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
                  if (predictionCondition2(item1, item2, item3, item4)) {
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

      if (predictionCondition2(d1, d2, d3, d4)) {
         count++;
      }
   });
   return ((count / bids.length) * 100).toFixed(2);
};

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
   "Prediction on Total Winning Bids :",
   Number(testPredictions(WINNING_BIDS)),
   "%"
);
console.log(
   "Prediction on Repeating Winning Bids :",
   Number(testPredictions(REPEATING_BIDS)),
   "%"
);
console.log("Total Slots Possible :", TOTAL_PREDICTIONS);
console.log("Total Slots Required :", result.length);
console.log(
   "Percentage Elimination :",
   Number((100 - (result.length / TOTAL_PREDICTIONS) * 100).toFixed(2)),
   "% of the total"
);
console.log(
   "Number of cards to draw :",
   Math.floor(result.length / 6),
   "sets and",
   result.length % 6,
   "slots"
);
console.log("Minimum Number of Players :", Math.ceil(result.length / (6 * 5)));
// print to file
outputPredictions(result);

export default result;
export { outputPredictions, testPredictions };
