const prompt = require('prompt-sync')();
const fetch = require("node-fetch");

const api_url="http://fourtytwowords.herokuapp.com/"
const api_keys  ="fb8007781a73a8884e3821dc8f330cf2949b422d2a4be2bac9f1d5def50213d48f04cf2869255230d8e5adc4bee08ed27035a7a65745b5184b37848e93a691c099b93b1b072f24ad7908352ed10947e3"


const guessWord = () =>{
   return new Promise((resolve,reject) => {
      
           fetch(api_url+"words/randomWord?api_key="+api_keys).then((res)=>res.json()).then((data)=>{
                     console.log(data);
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

    const examples = (wordName) =>{
        return new Promise((resolve,reject) => {
           
            fetch(api_url+"word/"+wordName+"/examples?api_key="+api_keys).then((res)=>res.json())
            .then((data)=>{
                        // console.log(data);
                         resolve(data);
                     })
                
           
        });
    };
    const relatedWords = (wordName) =>{
        return new Promise((resolve,reject) => {
           
            fetch(api_url+"word/"+wordName+"/relatedWords?api_key="+api_keys).then((res)=>res.json())
            .then((data)=>{
                        // console.log(data);
                         resolve(data);
                     })
                
           
        });
    };

   async function guessHint(defcount,syncount,wordName){

        console.log("choose type of hint");
        console.log("1-Another definition");
        console.log("2-Synonyms/antonyms");

        const input=prompt("enter hint type");
        if(input==1){

            const deff=await definition(wordName);
            console.log(deff[defcount].text);
            defcount++; 

        }else if(input==2){
            const deff=await relatedWords(wordName);
           
            console.log(deff[0].relationshipType +" :- "+deff[0].words[syncount]);
            syncount++;
        }else{
            console.log("please select correct hint type!!");
            guessHint(defcount,syncount);
        }
    }

    async function enterWord(defcount,syncount,wordName){

        const userword=prompt("GUESS THE WORD\n");
        if(userword==wordName){
            console.log("YOUR GUESS IS CORRECT\nSTART AGAIN");
            score+=10;
            console.log("Total Score:- "+score);
            play(0,0);
        }else{
            console.log("YOUR GUESS IS INCORRECT");
            score-=2;
            console.log("Total Score:- "+score);
            console.log("choose any one");
            console.log("1-Try Again");
            console.log("2-Hint");
            console.log("3-Skip"); 

            const option=prompt("enter option");
            if(option==1){
                play(0,0);
            }else if(option==2){
                score-=3;
            console.log("Total Score:- "+score);
                //display hint
            await guessHint(defcount,syncount,wordName);
            
            await enterWord(defcount,syncount,wordName);


            }else if(option==3){
                console.log("Correct word is "+wordName);
                const ex = await examples(wordName);
                console.log("example- "+(ex.examples)[0].text);
                score-=3;
                console.log("Total Score:- "+score);
                console.log("THANK YOU");
            // play(0,0);
            }

        }
    }
 


async function play(defcount,syncount,score){

    
    console.log("GAME STARTED")
    console.log("GUESS THE WORD USING THE DEFINITION GIVEN BELOW\n")

    const words= await guessWord();
    const wordName=words.word;
     console.log(wordName);
    
    const deff=await definition(wordName);
      // const def=deff[0].text;

      console.log(deff[defcount].text); 
      defcount++;

      enterWord(defcount,syncount,wordName,score);
     

}
let score=0;
let defcount=0;
let syncount=0;

play(defcount,syncount,score);

 




