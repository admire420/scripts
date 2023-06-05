const evenOdd = (bids: number[]) => {
   let e1234: number[] = [];
   let e1234exe0: number[] = [];
   let o1234: number[] = [];
   let e123: number[] = [];
   let o123: number[] = [];
   let e234: number[] = [];
   let o234: number[] = [];

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
   });

   return {
      e1234,
      e1234exe0,
      o1234,
      e123,
      o123,
      e234,
      o234,
   };
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

export default evenOdd;
export { findRepeatingBids, findUniqueBids, findRepeatingPattern };
