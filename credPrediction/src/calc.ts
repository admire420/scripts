import { WINNING_BIDS } from "./constants";

const totalBids = WINNING_BIDS.length;

const evenOdd = (bids: number[]) => {
   let e1234: number[] = [];
   let e1234exe0: number[] = [];
   let o1234: number[] = [];
   let e123: number[] = [];
   let o123: number[] = [];
   let e234: number[] = [];
   let o234: number[] = [];
   let e234exe0: number[] = [];
   let e123exe0: number[] = [];

   bids.forEach((bid) => {
      let d1 = Number(bid.toString()[0]);
      let d2 = Number(bid.toString()[1]);
      let d3 = Number(bid.toString()[2]);
      let d4 = Number(bid.toString()[3]);

      let d1even = Number(bid.toString()[0]) % 2 == 0;
      let d2even = Number(bid.toString()[1]) % 2 == 0;
      let d3even = Number(bid.toString()[2]) % 2 == 0;
      let d4even = Number(bid.toString()[3]) % 2 == 0;

      if (d1even && d2even && d3even && d4even) {
         e1234.push(bid);
      }

      if (
         d1even &&
         d2even &&
         d3even &&
         d4even &&
         d1 != 0 &&
         d2 != 0 &&
         d3 != 0 &&
         d4 != 0
      ) {
         e1234exe0.push(bid);
      }

      if (!d1even && !d2even && !d3even && !d4even) {
         o1234.push(bid);
      }
      if (d1even && d2even && d3even) {
         e123.push(bid);
      }
      if (!d1even && !d2even && !d3even) {
         o123.push(bid);
      }
      if (d2even && d3even && d4even) {
         e234.push(bid);
      }
      if (!d2even && !d3even && !d4even) {
         o234.push(bid);
      }
      if (d2even && d3even && d4even && d2 != 0 && d3 != 0 && d4 != 0) {
         e234exe0.push(bid);
      }
      if (d1even && d2even && d3even && d1 != 0 && d2 != 0 && d3 != 0) {
         e123exe0.push(bid);
      }
   });

   return {
      e1234,
      e1234exe0,
      o1234,
      e123,
      o123,
      e234,
      o234,
      e123exe0,
      e234exe0,
   };
};

const findStartsWith = (start: number, digit: number, bids: number[]) => {
   //here digit counts from 1-len(num)
   const startsWith: number[] = [];
   bids.forEach((bid) => {
      const num = Number(bid.toString()[digit - 1]);
      if (start === num) {
         startsWith.push(bid);
      }
   });

   return startsWith;
};

const findAllStartsWith = (
   startArray: number[],
   digit: number,
   bids: number[]
) => {
   const result: { [key: number]: number[] } = {};
   startArray.forEach((start) => {
      if (!result[start]) {
         result[start] = [];
      }
      result[start] = findStartsWith(start, digit, bids);
   });
   return result;
};

const findRepeatingBids = (bids: number[]) => {
   const repeatingBids: number[] = [];
   bids.forEach((bid) => {
      let d1 = Number(bid.toString()[0]);
      let d2 = Number(bid.toString()[1]);
      let d3 = Number(bid.toString()[2]);
      let d4 = Number(bid.toString()[3]);

      if (new Set([d1, d2, d3, d4]).size != 4) {
         if (!repeatingBids.includes(bid)) {
            repeatingBids.push(bid);
         }
      }
   });
   return repeatingBids;
};

const findUniqueBids = (bids: number[]) => {
   const uniqueBids: number[] = [];
   bids.forEach((bid) => {
      let d1 = Number(bid.toString()[0]);
      let d2 = Number(bid.toString()[1]);
      let d3 = Number(bid.toString()[2]);
      let d4 = Number(bid.toString()[3]);

      if (new Set([d1, d2, d3, d4]).size == 4) {
         uniqueBids.push(bid);
      }
   });
   return uniqueBids;
};

const findRepeatingPattern = (bids: number[]) => {
   const r14: number[] = []; // 1251
   const r34: number[] = []; // 3211
   const r24: number[] = []; // 3121
   const r12: number[] = []; // 1134
   const r23: number[] = []; // 2113
   const r13: number[] = []; // 1412

   const r124: number[] = []; // 1121
   const r134: number[] = []; // 1211
   const r123: number[] = []; // 1112
   const r234: number[] = []; // 2111

   const r12r34: number[] = []; // 1122
   const r13r24: number[] = []; // 1212
   const r14r23: number[] = []; // 1221

   const rd1: number[] = []; // 3253
   const rd2: number[] = []; // 3262

   bids.forEach((bid) => {
      let d1 = Number(bid.toString()[0]);
      let d2 = Number(bid.toString()[1]);
      let d3 = Number(bid.toString()[2]);
      let d4 = Number(bid.toString()[3]);

      if (d1 == d2 && d2 == d4) {
         r124.push(bid);
      } else if (d1 == d3 && d3 == d4) {
         r134.push(bid);
      } else if (d1 == d2 && d2 == d3) {
         r123.push(bid);
      } else if (d2 == d3 && d3 == d4) {
         r234.push(bid);
      } else if (d1 == d2 && d3 == d4) {
         r12r34.push(bid);
      } else if (d1 == d3 && d2 == d4) {
         r13r24.push(bid);
      } else if (d1 == d4 && d2 == d3) {
         r14r23.push(bid);
      } else if (d1 == d2) {
         r12.push(bid);
      } else if (d2 == d3) {
         r23.push(bid);
      } else if (d3 == d4) {
         r34.push(bid);
      } else if (d1 == d3) {
         r13.push(bid);
      } else if (d2 == d4) {
         r24.push(bid);
      } else if (d1 == d4) {
         r14.push(bid);
      }
   });
   return {
      r12,
      r23,
      r34,
      r13,
      r24,
      r14,
      r124,
      r134,
      r123,
      r234,
      r12r34,
      r13r24,
      r14r23,
   };
};

const findAvg = (bids: number[]) => {
   let a12 = 0;
   let a13 = 0;
   let a14 = 0;
   let a24 = 0;
   let a23 = 0;
   let a34 = 0;
   let a123 = 0;
   let a234 = 0;
   let a124 = 0;
   let a134 = 0;
   let a1234 = 0;

   let r1a12 = 0;
   let r1a13 = 0;
   let r1a14 = 0;
   let r1a24 = 0;
   let r1a23 = 0;
   let r1a34 = 0;
   let r1a123 = 0;
   let r1a234 = 0;
   let r1a124 = 0;
   let r1a134 = 0;
   let r1a1234 = 0;

   let r2a12 = 0;
   let r2a13 = 0;
   let r2a14 = 0;
   let r2a24 = 0;
   let r2a23 = 0;
   let r2a34 = 0;
   let r2a123 = 0;
   let r2a234 = 0;
   let r2a124 = 0;
   let r2a134 = 0;
   let r2a1234 = 0;

   const totalBids = bids.length;

   bids.forEach((bid) => {
      let d1 = Number(bid.toString()[0]);
      let d2 = Number(bid.toString()[1]);
      let d3 = Number(bid.toString()[2]);
      let d4 = Number(bid.toString()[3]);

      const r1 = d1 == d2 || d1 == d3 || d1 == d4;
      const r2 = d2 == d3 || d2 == d4;

      if (r1) {
         r1a12 = r1a12 + (d1 + d2) / totalBids;
         r1a13 = r1a13 + (d1 + d3) / totalBids;
         r1a14 = r1a14 + (d1 + d4) / totalBids;
         r1a24 = r1a24 + (d2 + d4) / totalBids;
         r1a23 = r1a23 + (d2 + d3) / totalBids;
         r1a34 = r1a34 + (d3 + d4) / totalBids;

         r1a123 = r1a123 + (d1 + d2 + d3) / totalBids;
         r1a234 = r1a234 + (d2 + d3 + d4) / totalBids;
         r1a124 = r1a124 + (d1 + d2 + d4) / totalBids;
         r1a134 = r1a134 + (d1 + d3 + d4) / totalBids;

         r1a1234 = r1a1234 + (d1 + d2 + d3 + d4) / totalBids;
      }

      if (r2) {
         r2a12 = r2a12 + (d1 + d2) / totalBids;
         r2a13 = r2a13 + (d1 + d3) / totalBids;
         r2a14 = r2a14 + (d1 + d4) / totalBids;
         r2a24 = r2a24 + (d2 + d4) / totalBids;
         r2a23 = r2a23 + (d2 + d3) / totalBids;
         r2a34 = r2a34 + (d3 + d4) / totalBids;

         r2a123 = r2a123 + (d1 + d2 + d3) / totalBids;
         r2a234 = r2a234 + (d2 + d3 + d4) / totalBids;
         r2a124 = r2a124 + (d1 + d2 + d4) / totalBids;
         r2a134 = r2a134 + (d1 + d3 + d4) / totalBids;

         r2a1234 = r2a1234 + (d1 + d2 + d3 + d4) / totalBids;
      }

      a12 = a12 + (d1 + d2) / totalBids;
      a13 = a13 + (d1 + d3) / totalBids;
      a14 = a14 + (d1 + d4) / totalBids;
      a24 = a24 + (d2 + d4) / totalBids;
      a23 = a23 + (d2 + d3) / totalBids;
      a34 = a34 + (d3 + d4) / totalBids;

      a123 = a123 + (d1 + d2 + d3) / totalBids;
      a234 = a234 + (d2 + d3 + d4) / totalBids;
      a124 = a124 + (d1 + d2 + d4) / totalBids;
      a134 = a134 + (d1 + d3 + d4) / totalBids;

      a1234 = a1234 + (d1 + d2 + d3 + d4) / totalBids;
   });

   return {
      a12: Number(a12.toFixed(2)),
      a13: Number(a13.toFixed(2)),
      a14: Number(a14.toFixed(2)),
      a24: Number(a24.toFixed(2)),
      a23: Number(a23.toFixed(2)),
      a34: Number(a34.toFixed(2)),
      a123: Number(a123.toFixed(2)),
      a234: Number(a234.toFixed(2)),
      a124: Number(a124.toFixed(2)),
      a134: Number(a134.toFixed(2)),
      a1234: Number(a1234.toFixed(2)),

      r1a12: Number(r1a12.toFixed(2)),
      r1a13: Number(r1a13.toFixed(2)),
      r1a14: Number(r1a14.toFixed(2)),
      r1a24: Number(r1a24.toFixed(2)),
      r1a23: Number(r1a23.toFixed(2)),
      r1a34: Number(r1a34.toFixed(2)),
      r1a123: Number(r1a123.toFixed(2)),
      r1a234: Number(r1a234.toFixed(2)),
      r1a124: Number(r1a124.toFixed(2)),
      r1a134: Number(r1a134.toFixed(2)),
      r1a1234: Number(r1a1234.toFixed(2)),

      r2a12: Number(r2a12.toFixed(2)),
      r2a13: Number(r2a13.toFixed(2)),
      r2a14: Number(r2a14.toFixed(2)),
      r2a24: Number(r2a24.toFixed(2)),
      r2a23: Number(r2a23.toFixed(2)),
      r2a34: Number(r2a34.toFixed(2)),
      r2a123: Number(r2a123.toFixed(2)),
      r2a234: Number(r2a234.toFixed(2)),
      r2a124: Number(r2a124.toFixed(2)),
      r2a134: Number(r2a134.toFixed(2)),
      r2a1234: Number(r2a1234.toFixed(2)),
   };
};

const findMax = (bids: number[]) => {
   let max12 = 0;
   let max13 = 0;
   let max14 = 0;
   let max24 = 0;
   let max23 = 0;
   let max34 = 0;
   let max123 = 0;
   let max234 = 0;
   let max124 = 0;
   let max134 = 0;
   let max1234 = 0;

   let r1max12 = 0;
   let r1max13 = 0;
   let r1max14 = 0;
   let r1max24 = 0;
   let r1max23 = 0;
   let r1max34 = 0;
   let r1max123 = 0;
   let r1max234 = 0;
   let r1max124 = 0;
   let r1max134 = 0;
   let r1max1234 = 0;

   let r2max12 = 0;
   let r2max13 = 0;
   let r2max14 = 0;
   let r2max24 = 0;
   let r2max23 = 0;
   let r2max34 = 0;
   let r2max123 = 0;
   let r2max234 = 0;
   let r2max124 = 0;
   let r2max134 = 0;
   let r2max1234 = 0;

   bids.forEach((bid) => {
      let d1 = Number(bid.toString()[0]);
      let d2 = Number(bid.toString()[1]);
      let d3 = Number(bid.toString()[2]);
      let d4 = Number(bid.toString()[3]);

      const r1 = d1 == d2 || d1 == d3 || d1 == d4;
      const r2 = d2 == d3 || d2 == d4;

      if (r1) {
         r1max12 = Math.max(r1max12, d1 + d2);
         r1max13 = Math.max(r1max13, d1 + d3);
         r1max14 = Math.max(r1max14, d1 + d4);
         r1max24 = Math.max(r1max24, d2 + d4);
         r1max23 = Math.max(r1max23, d2 + d3);
         r1max34 = Math.max(r1max34, d3 + d4);

         r1max123 = Math.max(r1max123, d1 + d2 + d3);
         r1max234 = Math.max(r1max234, d2 + d3 + d4);
         r1max124 = Math.max(r1max124, d1 + d2 + d4);
         r1max134 = Math.max(r1max134, d1 + d3 + d4);

         r1max1234 = Math.max(r1max1234, d1 + d2 + d3 + d4);
      }

      if (r2) {
         r2max12 = Math.max(r2max12, d1 + d2);
         r2max13 = Math.max(r2max13, d1 + d3);
         r2max14 = Math.max(r2max14, d1 + d4);
         r2max24 = Math.max(r2max24, d2 + d4);
         r2max23 = Math.max(r2max23, d2 + d3);
         r2max34 = Math.max(r2max34, d3 + d4);

         r2max123 = Math.max(r2max123, d1 + d2 + d3);
         r2max234 = Math.max(r2max234, d2 + d3 + d4);
         r2max124 = Math.max(r2max124, d1 + d2 + d4);
         r2max134 = Math.max(r2max134, d1 + d3 + d4);

         r2max1234 = Math.max(r2max1234, d1 + d2 + d3 + d4);
      }

      max12 = Math.max(max12, d1 + d2);
      max13 = Math.max(max13, d1 + d3);
      max14 = Math.max(max14, d1 + d4);
      max24 = Math.max(max24, d2 + d4);
      max23 = Math.max(max23, d2 + d3);
      max34 = Math.max(max34, d3 + d4);

      max123 = Math.max(max123, d1 + d2 + d3);
      max234 = Math.max(max234, d2 + d3 + d4);
      max124 = Math.max(max124, d1 + d2 + d4);
      max134 = Math.max(max134, d1 + d3 + d4);

      max1234 = Math.max(max1234, d1 + d2 + d3 + d4);
   });

   return {
      max12: Number(max12.toFixed(2)),
      max13: Number(max13.toFixed(2)),
      max14: Number(max14.toFixed(2)),
      max24: Number(max24.toFixed(2)),
      max23: Number(max23.toFixed(2)),
      max34: Number(max34.toFixed(2)),
      max123: Number(max123.toFixed(2)),
      max234: Number(max234.toFixed(2)),
      max124: Number(max124.toFixed(2)),
      max134: Number(max134.toFixed(2)),
      max1234: Number(max1234.toFixed(2)),

      r1max12: Number(r1max12.toFixed(2)),
      r1max13: Number(r1max13.toFixed(2)),
      r1max14: Number(r1max14.toFixed(2)),
      r1max24: Number(r1max24.toFixed(2)),
      r1max23: Number(r1max23.toFixed(2)),
      r1max34: Number(r1max34.toFixed(2)),
      r1max123: Number(r1max123.toFixed(2)),
      r1max234: Number(r1max234.toFixed(2)),
      r1max124: Number(r1max124.toFixed(2)),
      r1max134: Number(r1max134.toFixed(2)),
      r1max1234: Number(r1max1234.toFixed(2)),

      r2max12: Number(r2max12.toFixed(2)),
      r2max13: Number(r2max13.toFixed(2)),
      r2max14: Number(r2max14.toFixed(2)),
      r2max24: Number(r2max24.toFixed(2)),
      r2max23: Number(r2max23.toFixed(2)),
      r2max34: Number(r2max34.toFixed(2)),
      r2max123: Number(r2max123.toFixed(2)),
      r2max234: Number(r2max234.toFixed(2)),
      r2max124: Number(r2max124.toFixed(2)),
      r2max134: Number(r2max134.toFixed(2)),
      r2max1234: Number(r2max1234.toFixed(2)),
   };
};

const findMin = (bids: number[]) => {
   let min12 = Infinity;
   let min13 = Infinity;
   let min14 = Infinity;
   let min24 = Infinity;
   let min23 = Infinity;
   let min34 = Infinity;
   let min123 = Infinity;
   let min234 = Infinity;
   let min124 = Infinity;
   let min134 = Infinity;
   let min1234 = Infinity;

   let r1min12 = Infinity;
   let r1min13 = Infinity;
   let r1min14 = Infinity;
   let r1min24 = Infinity;
   let r1min23 = Infinity;
   let r1min34 = Infinity;
   let r1min123 = Infinity;
   let r1min234 = Infinity;
   let r1min124 = Infinity;
   let r1min134 = Infinity;
   let r1min1234 = Infinity;

   let r2min12 = Infinity;
   let r2min13 = Infinity;
   let r2min14 = Infinity;
   let r2min24 = Infinity;
   let r2min23 = Infinity;
   let r2min34 = Infinity;
   let r2min123 = Infinity;
   let r2min234 = Infinity;
   let r2min124 = Infinity;
   let r2min134 = Infinity;
   let r2min1234 = Infinity;

   bids.forEach((bid) => {
      let d1 = Number(bid.toString()[0]);
      let d2 = Number(bid.toString()[1]);
      let d3 = Number(bid.toString()[2]);
      let d4 = Number(bid.toString()[3]);

      const r1 = d1 == d2 || d1 == d3 || d1 == d4;
      const r2 = d2 == d3 || d2 == d4;

      if (r1) {
         r1min12 = Math.min(r1min12, d1 + d2);
         r1min13 = Math.min(r1min13, d1 + d3);
         r1min14 = Math.min(r1min14, d1 + d4);
         r1min24 = Math.min(r1min24, d2 + d4);
         r1min23 = Math.min(r1min23, d2 + d3);
         r1min34 = Math.min(r1min34, d3 + d4);

         r1min123 = Math.min(r1min123, d1 + d2 + d3);
         r1min234 = Math.min(r1min234, d2 + d3 + d4);
         r1min124 = Math.min(r1min124, d1 + d2 + d4);
         r1min134 = Math.min(r1min134, d1 + d3 + d4);

         r1min1234 = Math.min(r1min1234, d1 + d2 + d3 + d4);
      }

      if (r2) {
         r2min12 = Math.min(r2min12, d1 + d2);
         r2min13 = Math.min(r2min13, d1 + d3);
         r2min14 = Math.min(r2min14, d1 + d4);
         r2min24 = Math.min(r2min24, d2 + d4);
         r2min23 = Math.min(r2min23, d2 + d3);
         r2min34 = Math.min(r2min34, d3 + d4);

         r2min123 = Math.min(r2min123, d1 + d2 + d3);
         r2min234 = Math.min(r2min234, d2 + d3 + d4);
         r2min124 = Math.min(r2min124, d1 + d2 + d4);
         r2min134 = Math.min(r2min134, d1 + d3 + d4);

         r2min1234 = Math.min(r2min1234, d1 + d2 + d3 + d4);
      }

      min12 = Math.min(min12, d1 + d2);
      min13 = Math.min(min13, d1 + d3);
      min14 = Math.min(min14, d1 + d4);
      min24 = Math.min(min24, d2 + d4);
      min23 = Math.min(min23, d2 + d3);
      min34 = Math.min(min34, d3 + d4);

      min123 = Math.min(min123, d1 + d2 + d3);
      min234 = Math.min(min234, d2 + d3 + d4);
      min124 = Math.min(min124, d1 + d2 + d4);
      min134 = Math.min(min134, d1 + d3 + d4);

      min1234 = Math.min(min1234, d1 + d2 + d3 + d4);
   });

   return {
      min12: Number(min12.toFixed(2)),
      min13: Number(min13.toFixed(2)),
      min14: Number(min14.toFixed(2)),
      min24: Number(min24.toFixed(2)),
      min23: Number(min23.toFixed(2)),
      min34: Number(min34.toFixed(2)),
      min123: Number(min123.toFixed(2)),
      min234: Number(min234.toFixed(2)),
      min124: Number(min124.toFixed(2)),
      min134: Number(min134.toFixed(2)),
      min1234: Number(min1234.toFixed(2)),

      r1min12: Number(r1min12.toFixed(2)),
      r1min13: Number(r1min13.toFixed(2)),
      r1min14: Number(r1min14.toFixed(2)),
      r1min24: Number(r1min24.toFixed(2)),
      r1min23: Number(r1min23.toFixed(2)),
      r1min34: Number(r1min34.toFixed(2)),
      r1min123: Number(r1min123.toFixed(2)),
      r1min234: Number(r1min234.toFixed(2)),
      r1min124: Number(r1min124.toFixed(2)),
      r1min134: Number(r1min134.toFixed(2)),
      r1min1234: Number(r1min1234.toFixed(2)),

      r2min12: Number(r2min12.toFixed(2)),
      r2min13: Number(r2min13.toFixed(2)),
      r2min14: Number(r2min14.toFixed(2)),
      r2min24: Number(r2min24.toFixed(2)),
      r2min23: Number(r2min23.toFixed(2)),
      r2min34: Number(r2min34.toFixed(2)),
      r2min123: Number(r2min123.toFixed(2)),
      r2min234: Number(r2min234.toFixed(2)),
      r2min124: Number(r2min124.toFixed(2)),
      r2min134: Number(r2min134.toFixed(2)),
      r2min1234: Number(r2min1234.toFixed(2)),
   };
};

const findConsicutiveRepeatingDigits = (bids: number[]) => {
   let crd1: number[][] = [];
   let crd2: number[][] = [];
   let crd3: number[][] = [];
   let crd4: number[][] = [];
   let crd12: number[][] = [];
   let crd13: number[][] = [];
   let crd14: number[][] = [];
   let crd24: number[][] = [];
   let crd23: number[][] = [];
   let crd34: number[][] = [];
   let crd123: number[][] = [];
   let crd234: number[][] = [];
   let crd124: number[][] = [];
   let crd134: number[][] = [];
   let crd1234: number[][] = [];

   for (let i = 0; i < bids.length - 1; i++) {
      let bidA = bids[i];
      let bidB = bids[i + 1];
      let ad1 = Number(bidA.toString()[0]);
      let ad2 = Number(bidA.toString()[1]);
      let ad3 = Number(bidA.toString()[2]);
      let ad4 = Number(bidA.toString()[3]);
      let bd1 = Number(bidB.toString()[0]);
      let bd2 = Number(bidB.toString()[1]);
      let bd3 = Number(bidB.toString()[2]);
      let bd4 = Number(bidB.toString()[3]);

      //pattern is said to repeating if any digit of the pattern is repeating
      if (ad1 == bd1) {
         crd1.push([bidA, bidB]);
      }
      if (ad2 == bd2) {
         crd2.push([bidA, bidB]);
      }
      if (ad3 == bd3) {
         crd3.push([bidA, bidB]);
      }
      if (ad4 == bd4) {
         crd4.push([bidA, bidB]);
      }
      if (ad1 == bd1 || ad2 == bd2) {
         crd12.push([bidA, bidB]);
      }
      if (ad1 == bd1 || ad3 == bd3) {
         crd13.push([bidA, bidB]);
      }
      if (ad1 == bd1 || ad4 == bd4) {
         crd14.push([bidA, bidB]);
      }
      if (ad2 == bd2 || ad4 == bd4) {
         crd24.push([bidA, bidB]);
      }
      if (ad2 == bd2 || ad3 == bd3) {
         crd23.push([bidA, bidB]);
      }
      if (ad3 == bd3 || ad4 == bd4) {
         crd34.push([bidA, bidB]);
      }
      if (ad1 == bd1 || ad2 == bd2 || ad3 == bd3) {
         crd123.push([bidA, bidB]);
      }
      if (ad1 == bd1 || ad2 == bd2 || ad4 == bd4) {
         crd124.push([bidA, bidB]);
      }
      if (ad1 == bd1 || ad3 == bd3 || ad4 == bd4) {
         crd134.push([bidA, bidB]);
      }
      if (ad2 == bd2 || ad3 == bd3 || ad4 == bd4) {
         crd234.push([bidA, bidB]);
      }
      if (ad1 == bd1 || ad2 == bd2 || ad3 == bd3 || ad4 == bd4) {
         crd1234.push([bidA, bidB]);
      }
   }
   return {
      crd1,
      crd2,
      crd3,
      crd4,
      crd12,
      crd13,
      crd14,
      crd24,
      crd23,
      crd34,
      crd123,
      crd234,
      crd124,
      crd134,
      crd1234,
   };
};

// generate array from start->end with interval or a array from start with count with intervals
const generateDynamicArray = ({
   interval = 1,
   start = 1,
   end,
   count,
}: {
   interval?: number;
   start?: number;
   end?: number;
   count?: number;
}) => {
   const arr: number[] = new Array();
   if (count && !end) {
      for (let i = start; i < start + interval * count; i = i + interval) {
         arr.push(i);
      }
   }
   if (end && !count) {
      for (let i = start; i <= end; i = i + interval) {
         arr.push(i);
      }
   }
   return arr;
};

const findConsicutiveRepeating = (bids: number[], shift = 1) => {
   const getAllCombinations = (arr: number[], N: number) => {
      const selections: number[] = [];

      function backtrack(currSelection: number[], start: number): void {
         if (currSelection.length === N) {
            selections.push(Number([...currSelection].join(""))); // Make a copy of the selection
            return;
         }

         for (let i = start; i < arr.length; i++) {
            currSelection.push(arr[i]);
            backtrack(currSelection, i + 1);
            currSelection.pop();
         }
      }

      backtrack([], 0);

      return selections;
   };

   let data: {
      [key: string]: { val: number[][]; count: number };
   } = {};
   //

   //bid length range - set
   for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 4; j++) {
         // for all the values of i,j find the nCi * nCj
         const left = getAllCombinations([1, 2, 3, 4], i);
         const right = getAllCombinations([1, 2, 3, 4], j);
         for (let k = 0; k < left.length; k++) {
            for (let m = 0; m < right.length; m++) {
               data[`cr${left[k]}cr${right[m]}`] = { count: 0, val: [] };
            }
         }
      }
   }

   for (let i = 0; i < bids.length - shift; i++) {
      let bidA = bids[i];
      let bidB = bids[i + shift];

      Object.keys(data).forEach((key) => {
         const conditions = key.split("cr").filter((key) => !!key);
         const condition1 = conditions[0];
         const condition2 = conditions[1];

         const getConditionArray = (num: string) => {
            const output = [];
            for (let i = 0; i < num.length; i++) {
               output.push(Number(num[i]));
            }
            return output;
         };

         const condition1Array: number[] = getConditionArray(condition1);
         const condition2Array: number[] = getConditionArray(condition2);
         const selctedCondition1: number[] = [];
         const selctedCondition2: number[] = [];

         condition1Array.forEach((num) => {
            selctedCondition1.push(Number(bidA.toString()[num - 1]));
         });
         condition2Array.forEach((num) => {
            selctedCondition2.push(Number(bidB.toString()[num - 1]));
         });

         if (
            selctedCondition1.some((item) => selctedCondition2.includes(item))
         ) {
            data[key].count++;
            data[key].val.push([bidA, bidB]);
         }
      });
   }

   const filteredData = Object.keys(data)
      .sort((a, b) => {
         return data[b].count - data[a].count;
      })
      .filter((_, i) => i < 20);

   return { data, filteredData };
};

export default evenOdd;
export {
   findRepeatingBids,
   findUniqueBids,
   findRepeatingPattern,
   findStartsWith,
   findAllStartsWith,
   findConsicutiveRepeatingDigits,
   findConsicutiveRepeating,
   findAvg,
   findMax,
   findMin,
};
