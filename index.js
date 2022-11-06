import express, { json } from "express";
import cors from "cors"
import users from "./users.js";
import tweets from "./tweets.js";

const app = express() //crição da api

//configurações
app.use(cors())//evita um erro de segurança
app.use(express.json())//permite o recebimento de dados do body como json

//criacao de rotas

//listagens dos tweets
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

//criacao de usuario
app.post("/sign-up", (req, res) => {
    const user = req.body
    if((!user.username) || (!user.avatar)){
        res.status(400).send({messenger : "Insira todos os campos"})
        return
    }

    const newuser = {
        username: user.username,
        avatar: user.avatar
    }

    users.push(newuser)

    res.status(201).send("OK-USUÁRIO CADASTRADO")
})

//criacao de tweet
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

//selecionando a porta
app.listen('5000', () => console.log('Server is running in port: 5000'))