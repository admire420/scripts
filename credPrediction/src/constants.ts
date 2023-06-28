import csvData from "./readCSV";
import { getWinningBids } from "./util";

const WINNING_BIDS: number[] = getWinningBids(csvData);

const LATEST_WIN = WINNING_BIDS[0];

let array1 = [4];
let array2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let array3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let array4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// array2 = array2.concat([8, Number(LATEST_WIN.toString()[1])]);
// array3 = array3.concat([1, 3, 4, 7, 8, Number(LATEST_WIN.toString()[2])]);
// array4 = array4.concat([1, 7, 9, Number(LATEST_WIN.toString()[3])]);

array1 = [...new Set(array1)];
array2 = [...new Set(array2)];
array3 = [...new Set(array3)];
array4 = [...new Set(array4)];

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
