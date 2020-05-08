const express = require('express')
const router = express.Router()
const dummyData = require('../database/db')
const LCS = require('../logics/logic')

router.get('/api/dummy', (req, res) => {
    res.send({"data": dummyData})
})

router.get('/api/dummy/:id', (req, res) => {
    let data = dummyData.find(x => x._id == req.params.id)
    if(data != undefined)
        res.send(data)
    else 
        res.send({"message": "Something went wrong"})
})

router.post('/api/love', (req, res) => {
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

router.post('/api/luck', (req, res) => {
    const { name, day } = req.body

    if(!name || !day) {
        return res.status(422).send({message: "Enter all details"})
    }

    if(typeof(name) !== "string" || typeof(day) !== "string") {
        return res.status(422).send({message: "Enter proper details"})
    }

    n = name.toLowerCase()
    d = day.toLowerCase()

    let count = 0

    for(let i = 0; i < n.length; i++) {
        for(let j = 0; j < d.length; j++) {
            if(n[i] === d[j]) count++;
        }
    }

    let size = Math.min(n.length, d.length)
    let percent = Math.round((count/size)*100)

    const result = {
        "Percentage": percent
    }

    res.send(result)
})

router.post('/api/string', (req, res) => {
    const { str } = req.body

    if(!str) {
        return res.status(422).send({message: "Enter a string"})
    }

    if(typeof(str) !== "string") {
        return res.status(422).send({message: "Enter proper string"})
    }
    
    var vowelsCount = 0, consonants = 0;
    var string = str.toString();

    for(var i = 0; i <= string.length - 1; i++) {
        if((string.charAt(i).match(/[aeiou]/))){       
            vowelsCount++;
        } else if((string.charAt(i).match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/))){
            consonants++;
        }
    }

    const result = {
        "lower": str.toLowerCase(),
        "upper": str.toUpperCase(),
        "character": str.length,
        "vowels": vowelsCount,
        "consonants": consonants,
        "space": Math.abs(str.length-consonants-vowelsCount)
    }

    res.send(result)
})

module.exports = router;