const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const configuration = new Configuration({
    organization: "org-pQpQI1nXyJCIlTGysI6Vz6EA",
    apiKey: "",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();



//create a simple express api which calls the gptCall function
//add body parser and cors to express
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.listen(port);

app.post('/', async (req, res) => {
    const {message} = req.body;
    console.log(message);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
    console.log(response.data);
    res.json({
        message: response.data.choices[0].text,
    });
});
