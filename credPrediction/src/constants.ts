import csvData from "./readCSV";
import { getWinningBids } from "./util";

const WINNING_BIDS = getWinningBids(csvData);

const LATEST_WIN = WINNING_BIDS.at(-1) as number;

let array1 = [3];
let array2 = [0, 1, 2, 3, 4, 5, 6, 7];
let array3 = [0, 2, 5, 6, 8];
let array4 = [0, 2, 3, 4, 5, 6, 8];

array2 = array2.concat([8]);
array3 = array3.concat([1, 3, 4, 7]);
array4 = array4.concat([1, 7]);

const TOTAL_PREDICTIONS =
   array1.length * array2.length * array3.length * array4.length;

const COIN = [100, 500, 1000, 1500, 2000];

export {
   WINNING_BIDS,
   TOTAL_PREDICTIONS,
   LATEST_WIN,
   array1,
   array2,
   array3,
   array4,
};
