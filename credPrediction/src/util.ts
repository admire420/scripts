import { csvDataType } from "./type";

const getWinningBids = (data: csvDataType) =>
   data.map((record) => record.winning_bid);

export { getWinningBids };
