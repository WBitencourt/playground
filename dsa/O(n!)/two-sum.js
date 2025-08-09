function resolve(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i]; //7

      if(map.has(complement)) {
          return [map.get(complement), i]
      }

      map.set(nums[i], i)

      console.log('map', map)
  }

  
}

var twoSum = function(nums, target) {
  const result = resolve(nums, target)
  console.log('result', result)
  return result;
};

twoSum([1,3,4,5,2,7,11,15], 9)