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
   const totalBids = bids.length;

   bids.forEach((bid) => {
      let d1 = Number(bid.toString()[0]);
      let d2 = Number(bid.toString()[1]);
      let d3 = Number(bid.toString()[2]);
      let d4 = Number(bid.toString()[3]);

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
   };
};

export default evenOdd;
export {
   findRepeatingBids,
   findUniqueBids,
   findRepeatingPattern,
   findStartsWith,
   findAllStartsWith,
   findAvg,
};
