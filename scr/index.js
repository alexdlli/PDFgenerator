const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const puppeteer = require('puppeteer')
const app = express()

const passengers = [
    {
        name: "Joyce",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Brock",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Eve",
        flightNumber: 7859,
        time: "18h00",
    },
]

app.get('/pdf', async(requeste, response) => {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/', {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'letter',
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        }
    })

    await browser.close()

    response.contentType("application/pdf")

    return response.send(pdf)
})

app.get('/', (requeste, response) => {

    const filePath = path.join(__dirname, "print.ejs")
    ejs.renderFile (filePath, { passengers }, (err, data) => {
        if(err) {
            return response.send('Erro na leitura do arquivo') 
        }
    
            return response.send(data)
        }
    )
        
})

app.listen(3000)