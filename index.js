import express, { json } from "express";
import cors from "cors"
import users from "./users.js";
import tweets from "./tweets.js";

const app = express()

//configurations
app.use(cors())//evita um erro de segurança
app.use(express.json())//permite o recebimento de dados do body como json

//criacao de rotas

//listagens dos tweets
app.get("/tweets", (req, res) => {
    const newtweets = []
    const lasttweets = []

    for(let i = tweets.length - 1; i> tweets.length-11; i--){
        lasttweets.push(tweets[i])
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

//criacao de usuario
app.post("/sign-up", (req, res) => {
    const user = req.body
    const newuser = {
        username: user.username,
        avatar: user.avatar
    }

    users.push(newuser)

    res.send("OK")
})

//criacao de tweet
app.post("/tweets", (req, res) => {
    const tweet = req.body
    const newtweet = {
        username: tweet.username,
        tweet: tweet.tweet
    }

    tweets.push(newtweet)

    res.send("OK - TWEET CADASTRADO COM SUCESSO")
})

//selecionando a porta
app.listen('5000', () => console.log('Server is running in port: 5000'))