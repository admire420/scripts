const pluralize = require("pluralize");

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

const convertToSmallCamel = (data: string[]): string[] => {
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

convertToSmallCamel(data).forEach((item, index, arr) => {
   console.log(item);
});

// -- MANUFACTURING

// apparel-manufacturing
// beverage-and-tobacco-product-manufacturing
// chemical-manufacturing
// computer-and-electronic-product-manufacturing
// electrical-equipment,-appliance,-and-component-manufacturing
// fabricated-metal-product-manufacturing
// food-manufacturing
// furniture-and-related-product-manufacturing
// leather-and-allied-product-manufacturing
// machinery-manufacturing
// miscellaneous-manufacturing
// nonmetallic-mineral-product-manufacturing
// paper-manufacturing
// petroleum-and-coal-product-manufacturing
// plastic-and-rubber-product-manufacturing
// primary-metal-manufacturing
// printing-and-related-support-activity
// textile-mill
// textile-product-mill
// transportation-equipment-manufacturing
// wood-product-manufacturing
