const pluralize = require("pluralize");
import { titleCase } from "title-case";

import industries from "./industry";

const data = [
   "Food Manufacturing",
   "Beverage and Tobacco Product Manufacturing",
   "Textile Mills",
   "Textile Product Mills",
   "Apparel Manufacturing",
   "Leather and Allied Product Manufacturing",
   "Wood Product Manufacturing",
   "Paper Manufacturing",
   "Printing and Related Support Activities",
   "Petroleum and Coal Products Manufacturing",
   "Chemical Manufacturing",
   "Plastics and Rubber Products Manufacturing",
   "Nonmetallic Mineral Product Manufacturing",
   "Primary Metal Manufacturing",
   "Fabricated Metal Product Manufacturing",
   "Machinery Manufacturing",
   "Computer and Electronic Product Manufacturing",
   "Electrical Equipment, Appliance, and Component Manufacturing",
   "Transportation Equipment Manufacturing",
   "Furniture and Related Product Manufacturing",
   "Miscellaneous Manufacturing",
];

const convertToLowerCase = (data: string[]): string[] => {
   const convertedArray: string[] = [];

   for (let i = 0; i <= data.length - 1; i++) {
      // convert data to correct format
      let convertedData: string = data[i]
         .replace(/&/g, "and")
         .replace(/\//g, "or")
         .toLowerCase()
         .trim()
         .split(/\s+/g)
         .map((item) => {
            // convert data to singular
            return pluralize.singular(item);
         })
         .join("-");

      convertedArray.push(convertedData);
   }

   return convertedArray.sort();
};

const convertToUpperCase = (data: string[]): string[] => {
   const convertedArray: string[] = [];

   for (let i = 0; i <= data.length - 1; i++) {
      // convert data to correct format
      let convertedData: string = data[i]
         .replace(/&/g, "and")
         .replace(/\//g, "or")
         .toUpperCase()
         .trim()
         .split(/\s+/g)
         .map((item) => {
            // convert data to singular
            return pluralize.singular(item);
         })
         .join("-");

      convertedArray.push(convertedData);
   }

   return convertedArray.sort();
};

const toSingularTitleCase = (data: string[]): string[] => {
   const convertedArray: string[] = [];

   for (let i = 0; i <= data.length - 1; i++) {
      // convert data to correct format
      let convertedData: string = data[i]
         .replace(/&/g, "and")
         .replace(/\//g, "or")
         .replace(/,/g, "")
         .trim()
         .split(/\s+/g)
         .map((item, index, arr) => {
            let newWord = item;
            if (/-/g.test(item)) {
               newWord = item
                  .split("-")
                  .map((item) => {
                     // convert data to singular
                     newWord = pluralize.singular(item);
                     return newWord;
                  })
                  .join("-");
            } else {
               // convert data to singular
               newWord = pluralize.singular(item);
            }

            return newWord;
         })
         .join(" ");

      convertedData = titleCase(convertedData);
      convertedArray.push(convertedData);
   }

   return convertedArray.sort();
};

// convertToUpperCase(industries).forEach((item, index, arr) => {
//    console.log(item);
// });

console.log(toSingularTitleCase(industries));
