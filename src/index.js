import dotenv from 'dotenv'
import { Client } from 'discord.js'

dotenv.config()
const client = new Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  switch (msg.content) {
    case 'ping':
      msg.channel.send('pong')
      break

    case '!clear':
      console.log(msg.author.tag)
      msg.channel.send(
        `Você tem certeza de que quer deletar o histórico do chat, <@${msg.author.id}>?`
      )
        .then(responseMessage => {
          responseMessage.react('✅')
          responseMessage.react('❌')
        })
      break
  }
})

client.on('messageDelete', msg => {
  if (msg.author.id !== process.env.CLIENT_ID) {
    msg.channel.send('Deus ta vendo').then(responseMessage => {
      responseMessage.delete({ timeout: 250 })
    })
  }
})

client.login(`${process.env.TOKEN}`)
