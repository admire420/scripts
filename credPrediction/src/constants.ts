const WINNING_BIDS = [
   4574, 3735, 5586, 2668, 5685, 5355, 6152, 2320, 1656, 2067, 3708, 5254, 2615,
   3968, 4046, 5122, 1559, 3024, 1686, 3660, 3203, 4068, 4465, 2440, 4306, 4704,
   1828, 5453, 1613, 3967, 2062, 3708, 1526, 4171, 2620, 4684, 3356, 1293, 3523,
   4396, 3836, 1595, 2263, 4346, 4604, 5057, 6356,
];
const LATEST_WIN = WINNING_BIDS.at(-1) as number;

let array1 = [1];
let array2 = [0, 1, 2, 3, 4, 5, 6, 7];
let array3 = [0, 2, 5, 6, 8];
let array4 = [0, 2, 3, 4, 5, 6, 8];

array2 = array2.concat([8]);
array3 = array3.concat([1, 3, 4, 7]);
array4 = array4.concat([1, 7]);

const COIN = [100, 500, 1000, 1500, 2000];

export { WINNING_BIDS, LATEST_WIN, array1, array2, array3, array4 };
