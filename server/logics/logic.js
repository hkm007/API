module.exports = function LCS(S1, m, S2, n) {
    var finalResult;
    
    if(m === 0 || n === 0) {
        finalResult = 0;
    } else if(S1[m - 1] === S2[n - 1]) { 
        finalResult = 1 + LCS(S1, m - 1, S2, n - 1);
    } else {
        var excludeLastOfS1 = LCS(S1, m - 1, S2, n),
            excludeLastOfS2 = LCS(S1, m, S2, n - 1);

        finalResult = Math.max(excludeLastOfS1, excludeLastOfS2);
    }
    return finalResult;
}