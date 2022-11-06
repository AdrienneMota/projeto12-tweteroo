import express, { json } from "express";
import cors from "cors"
import users from "./users.js";
import tweets from "./tweets.js";

const app = express() 


app.use(cors())
app.use(express.json())

app.get("/tweets", (req, res) => {
    const newtweets = []
    const lasttweets = []

    if(tweets.length>=10){
        for(let i = tweets.length - 1; i> tweets.length-11; i--){
            lasttweets.push(tweets[i])
        }
    }else{
        for(let i = tweets.length - 1; i>= 0; i--){
            lasttweets.push(tweets[i])
        }
    }
    
    for (const lasttweet of lasttweets) {
        const newtweet = {
        username: lasttweet.username,
        avatar: users.find((u) => u.username === lasttweet.username).avatar,
        tweet: lasttweet.tweet,
       }
       newtweets.push(newtweet)
    }

    res.send(newtweets)
})

app.post("/sign-up", (req, res) => {
    const candidateuser = req.body
    
    if((!candidateuser.username) || (!candidateuser.avatar)){
        res.status(400).send("Insira todos os campos")
        return
    }
    
    for (const user of users) { 
        if(user.username === candidateuser.username){
            res.status(409).send("Usuário já existente, porfavor, digite outro nome.")
            return
        }
    }

    const newuser = {
        username: candidateuser.username,
        avatar: candidateuser.avatar
    }

    users.push(newuser)

    res.status(201).send("OK-USUÁRIO CADASTRADO")
})

app.post("/tweets", (req, res) => {
    const tweet = req.body

    if((!tweet.username) || (!tweet.tweet)){
        res.status(400).send("Insira todos os campos")
        return
    }

    const newtweet = {
        username: tweet.username,
        tweet: tweet.tweet
    }

    tweets.push(newtweet)

    res.status(201).send("OK - TWEET CADASTRADO COM SUCESSO")
})

app.listen(5000, () => console.log(`Server is running in port: ${5000}`))
