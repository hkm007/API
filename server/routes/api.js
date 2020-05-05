const express = require('express')
const router = express.Router()

function LCS(S1, m, S2, n) {
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

router.get('/', (req, res) => {
    res.render("home")
})

router.post('/api', (req, res) => {
    const { person1, person2 } = req.body

    if(!person1 || !person2) {
        return res.status(422).send({message: "Enter all details"})
    }

    if(typeof(person1) !== "string" || typeof(person2) !== "string") {
        return res.status(422).send({message: "Enter proper names"})
    }

    p1 = person1.toLowerCase()
    p2 = person2.toLowerCase()

    let common = LCS(p1, p1.length, p2, p2.length)
    let size = Math.min(p1.length, p2.length)
    let percent = Math.round((common/size)*100)
    let msg = ""

    if(percent >= 35) msg = "Made for each other"
    else if(percent > 20 && percent < 35) msg = "Good choice"
    else if(percent >= 10 && percent <= 20) msg = "A better one"
    else msg = "You should go for another one"

    if(percent > 49) percent = percent
    else percent *= 2

    const result = {
        "Percentage": percent,
        "Message": msg
    }

    res.send(result)
})

module.exports = router;