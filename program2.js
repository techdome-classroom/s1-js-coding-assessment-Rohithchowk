const decodeTheRing = function (s, p) {
  // First we have to init the two pointers here
  let sIndex = 0, pIndex = 0;
  
  let starIndex = -1, matchIndex = -1;

  // we have to traverse the string
  while (sIndex < s.length) {
    // If characters match or the pattern character is '?', increment the two pointers
    if (pIndex < p.length && (p[pIndex] === s[sIndex] || p[pIndex] === '?')) {
      sIndex++;
      pIndex++;
    }
    // If the current pattern character is '*', track its position and the current string position and incremnt the pIndex
    else if (pIndex < p.length && p[pIndex] === '*') {
      starIndex = pIndex;
      matchIndex = sIndex;
      pIndex++;
    }
    // If a mismatch occurs and there was a previous '*', we have to adjust the pointers here try matching the star
    else if (starIndex !== -1) {
      pIndex = starIndex + 1;
      matchIndex++;
      sIndex = matchIndex;
    }
    // If there isno match and no previous '*', the pattern doesn't match the string
    else {
      return false;
    }
  }

  while (pIndex < p.length && p[pIndex] === '*') {
    pIndex++;
  }

  // Return true if we've matched the entire pattern, otherwise false
  return pIndex === p.length;
};

module.exports = decodeTheRing;


//I have also solved above in DP

// const decodeTheRing = function (s, p) {
//   const dp = Array(s.length + 1).fill(null).map(() => Array(p.length + 1).fill(false));

//   dp[0][0] = true;

//   for (let j = 1; j <= p.length; j++) {
//     if (p[j - 1] === '*') {
//       dp[0][j] = dp[0][j - 1];
//     }
//   }

//   for (let i = 1; i <= s.length; i++) {
//     for (let j = 1; j <= p.length; j++) {
//       if (p[j - 1] === s[i - 1] || p[j - 1] === '?') {
//         dp[i][j] = dp[i - 1][j - 1];
//       } else if (p[j - 1] === '*') {
//         dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
//       }
//     }
//   }

//   return dp[s.length][p.length];
// };

// module.exports = decodeTheRing;
