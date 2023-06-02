const fs = require("fs");
import numberDigitCount from "./numberDigitCount";
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
                        // (item1 % 2 == 0 &&
                        //    item2 % 2 == 0 &&
                        //    item3 % 2 == 0 &&
                        //    item4 % 2 == 0) ||
                        // avoid if all the numbers are odd
                        (item1 % 2 != 0 &&
                           item2 % 2 != 0 &&
                           item3 % 2 != 0 &&
                           item4 % 2 != 0) ||
                        // avoid if any 3 or more digits are consecutively incresing in order 3451, 2123, 3456
                        (item1 + 1 == item2 && item2 + 1 == item3) ||
                        (item2 + 1 == item3 && item3 + 1 == item4) ||
                        (item1 + 1 == item2 &&
                           item2 + 1 == item3 &&
                           item3 + 1 == item4) ||
                        // avoid same number repeating in the last two digit 1233
                        item4 == item3 ||
                        // avoid same number repeating in the first two digit 1145
                        item1 == item2 ||
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
                        (item2 % 2 == 1 && item3 % 2 == 1 && item4 % 2 == 1) ||
                        // avoid if first 3 digits are odd
                        (item1 % 2 == 1 && item2 % 2 == 1 && item3 % 2 == 1) ||
                        // avoid if all the numbers are unique
                        // new Set([item1, item2, item3, item4]).size != 4 ||
                        // avoid if sum of middle numbers is <= 5
                        item2 + item3 <= 5 ||
                        //avoid if sum of end number is <=3
                        item1 + item4 <= 2
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

let array1 = [2];
let array2 = [0, 1, 2, 3, 4, 5, 6, 7];
let array3 = [0, 2, 5, 6, 8];
let array4 = [0, 2, 3, 4, 5, 6, 8];

array2.splice(array2.indexOf(Number(LATEST_WIN.toString()[1])), 1);
array3.splice(array3.indexOf(Number(LATEST_WIN.toString()[2])), 1);
array4.splice(array4.indexOf(Number(LATEST_WIN.toString()[3])), 1);

console.log(array1, array2, array3, array4);
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

// chatGPT:

// number of participants,number of bids,number of unique bids,winning bid
// ,385.1,72.9,4574
// ,292.3,65.3,3735
// ,451.9,79.7,5586
// ,384,72.3,2668
// ,563.5,88.6,5685
// ,530.8,88.6,5355
// ,588.4,89.8,6152
// 39.3,546.4,86.8,2320
// 39.8,533.8,86.6,1656
// 23.1,309,63.8,2067
// ,,,
// 33.2,455.5,79.1,3708
// 39.8,532.2,86.6,5254
// 27.2,418,75.1,2615
// 44.6,601.7,90.6,3968
// 32.3,458,80.3,4046
// 38.3,506.2,86.4,5122
// 20.8,288.7,61.7,1559
// 25.2,309.1,65.3,3024
// 18,223,52.8,1686
// 21.7,302.9,63.1,3660
// 20.7,284.4,61.5,3203
// ,,,
// 18.7,271.8,59.8,4068
// 25.2,354.5,70.1,4465
// 29.1,398.7,74.4,2440
// 22.8,318.2,64.8,4306
// 22.5,332.3,67.1,4704
// 34.5,456.6,80.7,1828
// 32.7,516.3,84.2,5453
// 15.2,226.9,52.9,1613
// 25.2,349.9,68.8,3967
// 21.3,275.4,60.9,2062
// 27.3,365.4,71.5,3708
// 26.5,337.5,68.7,1526
// 22.9,318,65.3,4171
// 22.4,321.9,66.1,2620
// 35,530.6,85.1,4684
// 16.6,248.6,56.4,3356

// consider the above data outputted as .csv file. Giving importance for all the parameters, give me list of 200 unique possible winning bids I should place my bets on for "May 21, 2023" across all ranges. Here do give importance for every digit of winning bid.

// To generate a list of 200 unique possible winning bids for "May 21, 2023" across all ranges, considering the importance of every digit of the winning bid, we'll analyze the provided dataset. Please note that this analysis is based solely on the given data and does not guarantee specific outcomes. Here's the list of unique winning bids:
