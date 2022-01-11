const express = require('express');
const envelopes = require('./public/envelopes');
const { findById, getIndexById } = require('./helpers/helper');
const e = require('express');

const app = express()

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/envelopes', (req, res) => {
    res.send(envelopes)
    console.log(envelopes)
})

app.get('/envelopes/:name', (req, res) => {
    const name = req.params.name
    const index = envelopes.findIndex(env => env.name === name)
    if (index !== -1) {
        const envelope = envelopes[index]
        res.send(envelope)
    } else {
        res.status(404).send('envelope not found')
    }
})

app.post('/envelopes/transfer/:from/:to', (req, res) => {
    const { from, to } = req.params;
    console.log(typeof (from))
    const amount = Number(req.query.amount)
    const indexFrom = envelopes.findIndex(env => env.name === from)
    const indexTo = envelopes.findIndex(env => env.name === to)
    console.log(indexFrom)
    console.log(indexTo)
    if (indexFrom !== -1 && indexTo !== -1) {
        envelopes[indexFrom].budget -= amount
        envelopes[indexTo].budget += amount
        res.send(envelopes)
    } else {
        res.status(404).send('one or more envelopes do not exist')
    }
})

app.put('/envelopes/:id', (req, res) => {
    const index = envelopes.findIndex(env => env.id === req.params.id)
    console.log(index)
    if (index !== -1) {
        const envelope = envelopes.find(env => env.id === req.params.id)
        const id = req.params.id
        const { name, budget } = req.query
        envelope.id = id
        envelope.name = name
        envelope.budget -= budget
        res.send({ id, name, budget })
        console.log(envelopes)
    } else {
        res.status(404).send('The evelope requested not found.')
    }
    return envelopes
})

app.delete('/envelopes/:id', (req, res) => {
    const index = envelopes.findIndex(env => env.id === req.params.id)
    if (index !== -1) {
        envelopes.splice(index, 1)
        console.log(envelopes)
        res.status(204).send("Resource deleted!")
    } else {
        res.status(404).send('invalid id')
    }

})

app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})