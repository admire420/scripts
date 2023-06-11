import { WINNING_BIDS } from "./constants";
import evenOdd, {
   findRepeatingBids,
   findUniqueBids,
   findRepeatingPattern,
   findAllStartsWith,
   findAvg,
   findMax,
   findMin,
} from "./calc";
import result, { outputPredictions } from "./prediction";

const totalBids = WINNING_BIDS.length;
const REPEATING_BIDS = findRepeatingBids(WINNING_BIDS);
const totalRepeatingBids = REPEATING_BIDS.length;
const UNIQUE_BIDS = findUniqueBids(WINNING_BIDS);
const totalUniqueBids = UNIQUE_BIDS.length;

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

// Odd/Even Pattern Matching
{
   const {
      e1234,
      e1234exe0,
      o1234,
      e123,
      o123,
      e234,
      o234,
      e123exe0,
      e234exe0,
   } = evenOdd(WINNING_BIDS);
   let evenOddPatterns = [
      { name: "e1234", data: e1234 },
      { name: "e1234exe0", data: e1234exe0 },
      { name: "o1234", data: o1234 },
      { name: "e123", data: e123 },
      { name: "o123", data: o123 },
      { name: "e234", data: e234 },
      { name: "o234", data: o234 },
      { name: "e123exe0", data: e123exe0 },
      { name: "e234exe0", data: e234exe0 },
   ];
   console.log("");
   evenOddPatterns.forEach((pattern) => {
      console.log(
         `Odd/Even ${pattern.name} :` + pattern.data.length,
         "| Probability :" +
            ((pattern.data.length / totalRepeatingBids) * 100).toFixed(2) +
            "%"
      );
   });
}

// Starts with - swd1
{
   const swd1Array = [1, 2, 3, 4, 5, 6];
   const swd1 = findAllStartsWith(swd1Array, 1, WINNING_BIDS);
   console.log("");
   swd1Array.forEach((key) => {
      console.log(
         "Starts With - swd1 " + `${key}:`,
         swd1[key].length,
         "| Probability :" +
            ((swd1[key].length / totalBids) * 100).toFixed(2) +
            "%"
      );
   });
}

// Find Average Patterns
{
   const { a12, a13, a14, a24, a23, a34, a123, a234, a124, a134, a1234 } =
      findAvg(WINNING_BIDS);
   let avgPatterns = [
      { name: "a12", data: a12 },
      { name: "a13", data: a13 },
      { name: "a14", data: a14 },
      { name: "a24", data: a24 },
      { name: "a23", data: a23 },
      { name: "a34", data: a34 },
      { name: "a123", data: a123 },
      { name: "a234", data: a234 },
      { name: "a124", data: a124 },
      { name: "a134", data: a134 },
      { name: "a1234", data: a1234 },
   ];
   console.log("");
   avgPatterns.forEach((pattern) => {
      console.log(`Avg ${pattern.name} :` + pattern.data);
   });
}

// --- WHILE REPEATING ---
// Find Average patterns
const {
   a12,
   a13,
   a14,
   a24,
   a23,
   a34,
   a123,
   a234,
   a124,
   a134,
   a1234,

   r1a12,
   r1a13,
   r1a14,
   r1a24,
   r1a23,
   r1a34,
   r1a123,
   r1a234,
   r1a124,
   r1a134,
   r1a1234,

   r2a12,
   r2a13,
   r2a14,
   r2a24,
   r2a23,
   r2a34,
   r2a123,
   r2a234,
   r2a124,
   r2a134,
   r2a1234,
} = findAvg(REPEATING_BIDS);
let avgPatterns = [
   { name: "a12", data: a12 },
   { name: "a13", data: a13 },
   { name: "a14", data: a14 },
   { name: "a24", data: a24 },
   { name: "a23", data: a23 },
   { name: "a34", data: a34 },
   { name: "a123", data: a123 },
   { name: "a234", data: a234 },
   { name: "a124", data: a124 },
   { name: "a134", data: a134 },
   { name: "a1234", data: a1234 },

   { name: "r1a12", data: r1a12 },
   { name: "r1a13", data: r1a13 },
   { name: "r1a14", data: r1a14 },
   { name: "r1a24", data: r1a24 },
   { name: "r1a23", data: r1a23 },
   { name: "r1a34", data: r1a34 },
   { name: "r1a123", data: r1a123 },
   { name: "r1a234", data: r1a234 },
   { name: "r1a124", data: r1a124 },
   { name: "r1a134", data: r1a134 },
   { name: "r1a1234", data: r1a1234 },

   { name: "r2a12", data: r2a12 },
   { name: "r2a13", data: r2a13 },
   { name: "r2a14", data: r2a14 },
   { name: "r2a24", data: r2a24 },
   { name: "r2a23", data: r2a23 },
   { name: "r2a34", data: r2a34 },
   { name: "r2a123", data: r2a123 },
   { name: "r2a234", data: r2a234 },
   { name: "r2a124", data: r2a124 },
   { name: "r2a134", data: r2a134 },
   { name: "r2a1234", data: r2a1234 },
];
console.log("");
avgPatterns.forEach((pattern) => {
   console.log(`Repeating - Avg ${pattern.name} :` + pattern.data);
});

// Find Max patterns
const {
   max12,
   max13,
   max14,
   max24,
   max23,
   max34,
   max123,
   max234,
   max124,
   max134,
   max1234,

   r1max12,
   r1max13,
   r1max14,
   r1max24,
   r1max23,
   r1max34,
   r1max123,
   r1max234,
   r1max124,
   r1max134,
   r1max1234,

   r2max12,
   r2max13,
   r2max14,
   r2max24,
   r2max23,
   r2max34,
   r2max123,
   r2max234,
   r2max124,
   r2max134,
   r2max1234,
} = findMax(REPEATING_BIDS);
let maxPatterns = [
   { name: "max12", data: max12 },
   { name: "max13", data: max13 },
   { name: "max14", data: max14 },
   { name: "max24", data: max24 },
   { name: "max23", data: max23 },
   { name: "max34", data: max34 },
   { name: "max123", data: max123 },
   { name: "max234", data: max234 },
   { name: "max124", data: max124 },
   { name: "max134", data: max134 },
   { name: "max1234", data: max1234 },

   { name: "r1max12", data: r1max12 },
   { name: "r1max13", data: r1max13 },
   { name: "r1max14", data: r1max14 },
   { name: "r1max24", data: r1max24 },
   { name: "r1max23", data: r1max23 },
   { name: "r1max34", data: r1max34 },
   { name: "r1max123", data: r1max123 },
   { name: "r1max234", data: r1max234 },
   { name: "r1max124", data: r1max124 },
   { name: "r1max134", data: r1max134 },
   { name: "r1max1234", data: r1max1234 },

   { name: "r2max12", data: r2max12 },
   { name: "r2max13", data: r2max13 },
   { name: "r2max14", data: r2max14 },
   { name: "r2max24", data: r2max24 },
   { name: "r2max23", data: r2max23 },
   { name: "r2max34", data: r2max34 },
   { name: "r2max123", data: r2max123 },
   { name: "r2max234", data: r2max234 },
   { name: "r2max124", data: r2max124 },
   { name: "r2max134", data: r2max134 },
   { name: "r2max1234", data: r2max1234 },
];
console.log("");
maxPatterns.forEach((pattern) => {
   console.log(`Repeating - Max ${pattern.name} :` + pattern.data);
});

// Find Min patterns
const {
   min12,
   min13,
   min14,
   min24,
   min23,
   min34,
   min123,
   min234,
   min124,
   min134,
   min1234,

   r1min12,
   r1min13,
   r1min14,
   r1min24,
   r1min23,
   r1min34,
   r1min123,
   r1min234,
   r1min124,
   r1min134,
   r1min1234,

   r2min12,
   r2min13,
   r2min14,
   r2min24,
   r2min23,
   r2min34,
   r2min123,
   r2min234,
   r2min124,
   r2min134,
   r2min1234,
} = findMin(REPEATING_BIDS);
let minPatterns = [
   { name: "min12", data: min12 },
   { name: "min13", data: min13 },
   { name: "min14", data: min14 },
   { name: "min24", data: min24 },
   { name: "min23", data: min23 },
   { name: "min34", data: min34 },
   { name: "min123", data: min123 },
   { name: "min234", data: min234 },
   { name: "min124", data: min124 },
   { name: "min134", data: min134 },
   { name: "min1234", data: min1234 },

   { name: "r1min12", data: r1min12 },
   { name: "r1min13", data: r1min13 },
   { name: "r1min14", data: r1min14 },
   { name: "r1min24", data: r1min24 },
   { name: "r1min23", data: r1min23 },
   { name: "r1min34", data: r1min34 },
   { name: "r1min123", data: r1min123 },
   { name: "r1min234", data: r1min234 },
   { name: "r1min124", data: r1min124 },
   { name: "r1min134", data: r1min134 },
   { name: "r1min1234", data: r1min1234 },

   { name: "r2min12", data: r2min12 },
   { name: "r2min13", data: r2min13 },
   { name: "r2min14", data: r2min14 },
   { name: "r2min24", data: r2min24 },
   { name: "r2min23", data: r2min23 },
   { name: "r2min34", data: r2min34 },
   { name: "r2min123", data: r2min123 },
   { name: "r2min234", data: r2min234 },
   { name: "r2min124", data: r2min124 },
   { name: "r2min134", data: r2min134 },
   { name: "r2min1234", data: r2min1234 },
];
console.log("");
minPatterns.forEach((pattern) => {
   console.log(`Repeating - Min ${pattern.name} :` + pattern.data);
});

// Starts with - swd1
const swd1Array = [1, 2, 3, 4, 5, 6];
const swd1 = findAllStartsWith(swd1Array, 1, REPEATING_BIDS);
console.log("");
swd1Array.forEach((key) => {
   console.log(
      "Repeating - Starts With - swd1 " + `${key}:`,
      swd1[key].length,
      "| Repeating Probability :" +
         ((swd1[key].length / totalRepeatingBids) * 100).toFixed(2) +
         "%",
      "| Total Probability :" +
         ((swd1[key].length / totalBids) * 100).toFixed(2) +
         "%"
   );
});

// Odd/Even Pattern Matching
const { e1234, e1234exe0, o1234, e123, o123, e234, o234, e123exe0, e234exe0 } =
   evenOdd(REPEATING_BIDS);
let evenOddPatterns = [
   { name: "e1234", data: e1234 },
   { name: "e1234exe0", data: e1234exe0 },
   { name: "o1234", data: o1234 },
   { name: "e123", data: e123 },
   { name: "o123", data: o123 },
   { name: "e234", data: e234 },
   { name: "o234", data: o234 },
   { name: "e123exe0", data: e123exe0 },
   { name: "e234exe0", data: e234exe0 },
];
console.log("");
evenOddPatterns.forEach((pattern) => {
   console.log(
      `Repeating - Odd/Even ${pattern.name} :` + pattern.data.length,
      "| Repeating Probability :" +
         ((pattern.data.length / totalRepeatingBids) * 100).toFixed(2) +
         "%",
      "| Total Probability :" +
         ((pattern.data.length / totalBids) * 100).toFixed(2) +
         "%"
   );
});

// Repeating Pattern Matching
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
} = findRepeatingPattern(REPEATING_BIDS);
let repeatingPatterns = [
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
repeatingPatterns.forEach((pattern) => {
   console.log(
      `Repeating Pattern - ${pattern.name} :` + pattern.data.length,
      "| Probability Repeating :" +
         ((pattern.data.length / totalRepeatingBids) * 100).toFixed(2) +
         "%",
      "| Total Probability :" +
         ((pattern.data.length / totalBids) * 100).toFixed(2) +
         "%"
   );
});

outputPredictions(result);
