// const prompt = require('prompt-sync')();
//const fetch = require("node-fetch");
// const axios=require('axios');
// const { resolve } = require("path/posix");
const api_url="http://fourtytwowords.herokuapp.com/"
const api_keys  ="fb8007781a73a8884e3821dc8f330cf2949b422d2a4be2bac9f1d5def50213d48f04cf2869255230d8e5adc4bee08ed27035a7a65745b5184b37848e93a691c099b93b1b072f24ad7908352ed10947e3"


const guessWord = () =>{
    return new Promise((resolve,reject) => {
       
            fetch(api_url+"words/randomWord?api_key="+api_keys).then((res)=>res.json()).then((data)=>{
                    // console.log(data);
                     resolve(data);
                 })
            
       
    });
};
    
 
    
    const definition = (wordName) =>{
        return new Promise((resolve,reject) => {
           
            fetch(api_url+"word/"+wordName+"/definitions?api_key="+api_keys).then((res)=>res.json())
            .then((data)=>{
                        // console.log(data);
                         resolve(data);
                     })
                
           
        });
    };
 


async function play(){

    console.log("GAME STARTED")
    console.log("GUESS THE WORD USING THE DEFINITION GIVEN BELOW")

    const words= await guessWord() ;
    const wordName=words.word;
     console.log(wordName);
    
    const deff=await definition(wordName);
      // const def=deff[0].text;
      console.log(deff[0].text); 
     const userword=prompt("GUESS THE WORD");
     if(userword==wordName){
         console.log("YOUR GUESS IS CORRECT\nSTART AGAIN");
         play();
     }else{
        console.log("YOUR GUESS IS INCORRECT");
        console.log("choose any one");
        console.log("1-Try Again");
        console.log("2-Hint");
        console.log("3-Skip"); 

        const option=prompt("enter option");
        if(option==1){
           play();
        }else if(option==2){
            
        }else if(option==3){

        }else{
            console.log("please enter correct input"); 
            play();
        }

     }

}
play();

 




