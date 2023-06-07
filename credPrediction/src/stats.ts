import { WINNING_BIDS } from "./constants";
import evenOdd, {
   findRepeatingBids,
   findUniqueBids,
   findRepeatingPattern,
   findAllStartsWith,
   findAvg,
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
const { a12, a13, a14, a24, a23, a34, a123, a234, a124, a134, a1234 } =
   findAvg(REPEATING_BIDS);
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
   console.log(`Repeating - Avg ${pattern.name} :` + pattern.data);
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
