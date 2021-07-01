const prompt = require('prompt-sync')();

const api_url="http://fourtytwowords.herokuapp.com/"

const api_keys  ="fb8007781a73a8884e3821dc8f330cf2949b422d2a4be2bac9f1d5def50213d48f04cf2869255230d8e5adc4bee08ed27035a7a65745b5184b37848e93a691c099b93b1b072f24ad7908352ed10947e3"

async function randomWord(){
    api_url+="words/randomWord?api_key="+api_keys;
    const response = await fetch(api_url);
    const word = await response.json();

    console.log(data.word);
    console.log(data.id);
}

randomWord();


