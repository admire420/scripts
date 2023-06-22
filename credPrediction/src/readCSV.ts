const fs = require("fs");
import { parse } from "csv/sync";

import { csvDataType } from "./type";

const csvFilePath = "./game_stats.csv";

// Read the CSV file synchronously
const csvData = fs.readFileSync(csvFilePath, "utf-8");

// Parse the CSV data synchronously
const parsedData = parse(csvData, {
   delimiter: ",",
   skip_empty_lines: true,
   skip_records_with_error: true,
   cast: function (val: any, ctx: any) {
      if (ctx.header) {
         return val;
      }

      if (!val.length) {
         return val;
      }

      switch (ctx.index) {
         case 0:
            return new Date(val);
         default:
            return Number(Number(val).toFixed(2));
      }
   },
   columns: true,
   trim: true,
});

// Filter out records with missing values
const filteredData = parsedData.filter((record: any) => {
   return Object.values(record).every((value) => !!value);
});

export default filteredData as csvDataType;
