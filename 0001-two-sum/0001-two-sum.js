/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let idx = new Map()
    for(let i=0;i<nums.length;i++){
        const need = target - nums[i];
        if(idx.has(need)){
            return [idx.get(need),i];
        }
        idx.set(nums[i],i);
    }
};