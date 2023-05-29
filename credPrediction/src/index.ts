const fs = require("fs");
import numberDigitCount from "./numberDigitCount";
import { LATEST_WIN } from "./constants";

type count = {
   [key: number]: number;
};

const allCombinations = (
   array1: number[],
   array2: number[],
   array3: number[],
   array4: number[]
) => {
   const hold: number[][] = [];
   array1.forEach((item1) => {
      array2.forEach((item2) => {
         array3.forEach((item3) => {
            if (!(item3 == item1 && item3 == item2)) {
               array4.forEach((item4) => {
                  // avoid 1333, 3133, 3313, 1133, 1331

                  if (
                     !(
                        (item4 == item3 && item4 == item2) ||
                        (item4 == item3 && item4 == item1) ||
                        (item1 == item2 && item4 == item1) ||
                        (item1 == item2 && item3 == item4) ||
                        (item1 == item4 && item3 == item2) ||
                        // avoid if 3300, 3003
                        (item3 == 0 && item4 == 0) ||
                        (item2 == 0 && item3 == 0) ||
                        // avoid if all the numbers are even
                        (item1 % 2 == 0 &&
                           item2 % 2 == 0 &&
                           item3 % 2 == 0 &&
                           item4 % 2 == 0) ||
                        // avoid if all the numbers are odd
                        (item1 % 2 != 0 &&
                           item2 % 2 != 0 &&
                           item3 % 2 != 0 &&
                           item4 % 2 != 0) ||
                        // avoid if any 3 or more digits are consecutively incresing in order 3451, 2123, 3456
                        (item1 + 1 == item2 && item2 + 1 == item3) ||
                        (item2 + 1 == item3 && item3 + 1 == item4) ||
                        (item1 + 1 == item2 &&
                           item2 + 1 == item3 &&
                           item3 + 1 == item4) ||
                        // avoid same number repeating in the last two digit 1233
                        item4 == item3 ||
                        // avoid same number repeating in the first two digit 1145
                        item1 == item2 ||
                        // avoid if last 3 digits are even excluding 0
                        (item2 % 2 == 0 &&
                           item3 % 2 == 0 &&
                           item4 % 2 == 0 &&
                           item2 != 0 &&
                           item3 != 0 &&
                           item4 != 0) ||
                        // avoid if last 3 digits are odd
                        (item2 % 2 == 1 && item3 % 2 == 1 && item4 % 2 == 1) ||
                        // avoid if first 3 digits are odd
                        (item1 % 2 == 1 && item2 % 2 == 1 && item3 % 2 == 1) ||
                        // avoid if all the numbers are unique
                        // new Set([item1, item2, item3, item4]).size != 4
                        // avoid if sum of middle numbers is >= 5
                        item2 + item3 <= 5
                     )
                  ) {
                     hold.push([item1, item2, item3, item4]);
                  }
               });
            }
         });
      });
   });
   return hold;
};

let array1 = [1];
let array2 = [0, 1, 3, 4, 5, 6, 7];
let array3 = [0, 1, 2, 5, 6, 8];
let array4 = [0, 2, 3, 4, 5, 6, 7, 8];

array2.splice(array2.indexOf(Number(LATEST_WIN.toString()[1])), 1);
array3.splice(array3.indexOf(Number(LATEST_WIN.toString()[2])), 1);
array4.splice(array4.indexOf(Number(LATEST_WIN.toString()[3])), 1);

console.log(array1, array2, array3, array4);
const result = allCombinations(array1, array2, array3, array4);
console.log(result.length);
console.log("number of cards to draw :" + result.length / 6);
fs.writeFileSync("results.json", JSON.stringify(result), (err: string) => {
   if (err) {
      console.error(err);
   }
});

// chatGPT:

// date of bid,number of bids,number of unique bids,winning bid
// "Apr 21, 2023",385.1,72.9,4574
// "Apr 22, 2023",292.3,65.3,3735
// "Apr 23, 2023",451.9,79.7,5586
// "Apr 24, 2023",384,72.3,2668
// "Apr 25, 2023",563.5,88.6,5685
// "Apr 26, 2023",530.8,88.6,5355
// "Apr 27, 2023",588.4,89.8,6152
// "Apr 28, 2023",546.4,86.8,2320
// "Apr 29, 2023",533.8,86.6,1656
// "Apr 30, 2023",309,63.8,2067
// "May 1, 2023",,,
// "May 2, 2023",455.5,79.1,3708
// "May 3, 2023",532.2,86.6,5254
// "May 4, 2023",418,75.1,2615
// "May 5, 2023",601.7,90.6,3968
// "May 6, 2023",458,80.3,4046
// "May 7, 2023",506.2,86.4,5122
// "May 8, 2023",288.7,61.7,1559
// "May 9, 2023",309.1,65.3,3024
// "May 10, 2023",223,52.8,1686
// "May 11, 2023",302.9,63.1,3660
// "May 12, 2023",284.4,61.5,3203
// "May 13, 2023",,,
// "May 14, 2023",271.8,59.8,4068
// "May 15, 2023",354.5,70.1,4465
// "May 16, 2023",398.7,74.4,2440
// "May 17, 2023",318.2,64.8,4306
// "May 18, 2023",332.3,67.1,4704
// "May 19, 2023",456.6,80.7,1828

// consider the above data outputted as .csv file. Giving importance for all the parameters, give me list of 200 unique possible winning bids I should place my bets on for "May 21, 2023" across all ranges. Here do give importance for every digit of winning bid.

// To generate a list of 200 unique possible winning bids for "May 21, 2023" across all ranges, considering the importance of every digit of the winning bid, we'll analyze the provided dataset. Please note that this analysis is based solely on the given data and does not guarantee specific outcomes. Here's the list of unique winning bids:

// 3710
// 3620
// 4632
// 5268
// 2415
// 3695
// 5146
// 4085
// 4987
// 3176
// 4678
// 5578
// 2936
// 4087
// 3684
// 4690
// 5519
// 4953
// 4573
// 4193
// 5261
// 3925
// 3215
// 3479
// 3074
// 4251
// 4841
// 3592
// 4058
// 4391
// 4337
// 5017
// 4083
// 5783
// 4263
// 4427
// 4098
// 5397
// 5169
// 5417
// 5082
// 3507
// 3061
// 5598
// 4079
// 3716
// 4893
// 5714
// 5781
// 4982
// 3812
// 5087
// 4097
// 4297
// 3874
// 4674
// 3996
// 3750
// 5302
// 4352
// 5912
// 5706
// 5789
// 4809
// 5634
// 5780
// 3847
// 3456
// 5143
// 4029
// 3458
// 5046
// 3741
// 5094
// 3769
// 5648
// 3094
// 3975
// 5763
// 5301
// 5849
// 4975
// 4362
// 3054
// 5319
// 5749
// 4532
// 3125
// 5482
// 5972
// 3526
// 4869
// 4519
// 5742
// 4826
// 4531
// 5249
// 5743
// 5193
// 3287
// 4396
// 4697
// 5437
// 4137
// 5937
// 3951
// 4823
// 5423
// 5729
// 3297
// 4523
// 5947
// 5754
// 4931
// 5073
// 4329
// 4291
// 4609
// 5814
// 5827
// 5923
// 5032
// 5316
// 4142
// 5682
// 5531
// 4721
// 3659
// 3527
// 4421
// 5621
// 3851
// 3935
// 4151
// 5991
// 5126
// 5461
// 5892
// 5631
// 4156
// 4829
// 5713
// 4438
// 3715
// 3928
// 5281
// 5592
// 4135
// 5448
// 5509
// 3957
// 5016
// 5712
// 5149
// 5372
// 4045
// 4370
// 5240
// 5806
// 4072
// 4645
// 5297
// 4049
// 4417
// 3678
// 5456
// 5173
// 5541
// 3669
// 5951
// 5807
// 4081
// 4257
// 4796
// 4374
// 5013
// 3768
// 5994
// 4868
// 4194
// 3349
// 5894
// 3892
// 4132
// 4616
// 5012
// 3374
// 4850
// 5879
// 5956
// 3175
// 4051
// 5831
// 4450
// 3945
// 4140
// 5563
// 4597
// 5147
// 5882

// console.log(numberDigitCount);
