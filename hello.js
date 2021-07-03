

const prompt = require('prompt-sync')();
const { Console } = require('console');
 const fetch = require("node-fetch");

const api_url="https://fourtytwowords.herokuapp.com/"
const api_keys  ="fb8007781a73a8884e3821dc8f330cf2949b422d2a4be2bac9f1d5def50213d48f04cf2869255230d8e5adc4bee08ed27035a7a65745b5184b37848e93a691c099b93b1b072f24ad7908352ed10947e3"

let fun=process.argv[2];
let wordName=process.argv[3];

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
                     //console.log(data);
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

async function displayFullDict(wordName){
      //definitions
      let deff=await definition(wordName);
      for(let i=0;i<deff.length;i++){
          console.log("DEFINITION "+(i+1)+":-");
          console.log(deff[i].text+"\n");
      }
      
      //synonyms
       deff=await relatedWords(wordName);
      if(deff[0].relationshipType == "synonym"){
          for(let i=0;i<deff[0].words.length;i++){
              console.log("synonym "+(i+1)+":- ");
              console.log(deff[0].words[i]+"\n");
          }
      }else{
          console.log("synonym not found");
      }

      //antonyms
       deff=await relatedWords(wordName);
      if(deff[0].relationshipType == "antonym"){
          for(let i=0;i<deff[0].words.length;i++){
              console.log("synonym "+(i+1)+":- ");
              console.log(deff[0].words[i]+"\n");
          }
      }else{
          console.log("antonym not found");
      }

      //examples
       deff=await examples(wordName);
      for(let i=0;i<deff.examples.length;i++){
          console.log("EXAMPLE "+i+1+":- ");
          console.log(deff.examples[i].text+"\n");
      }
  }





function random(){
    return Math.floor(Math.random() * 10);
}

async function initiateGame(defcount , syncount , score,wordName){

    if(random()%2==0){
        const deff=await definition(wordName);
        console.log("DEFINITION "+(defcount+1)+":-");
        console.log(deff[defcount++].text+"\n");
    }else{
        const deff=await relatedWords(wordName);
            if(deff[0].relationshipType == "synonym"){
                    console.log("synonym "+(syncount+1)+":- ");
                    console.log(deff[0].words[syncount++]+"\n");
              
            }else if(deff[0].relationshipType == "antonym"){
                console.log("antonym "+(syncount+1)+":- ");
                console.log(deff[0].words[syncount++]+"\n");
            }
    }

    const input=prompt("Enter your Guess\n");
    if(input==wordName){
        score+=10;
        console.log("CORRECT ANSWER\n");
        console.log("Total score:-"+score+"\n");

        console.log("play again");
        startGame(0,0,score);

    }else{
        score-=2;
        console.log("Total score:-"+score+"\n");

        console.log("SELECT ANY OPTION:-\n");
        console.log("1-TRY AGAIN");
        console.log("2-HINT");
        console.log("3-SKIP");

        let input=prompt("ENTER VALID OPTION:-\n");

        if(input=='1'){
            startGame(0,0,0);
        }else if(input=='2'){
            score-=3;
            console.log("Total score:-"+score+"\n");
        

            initiateGame(defcount , syncount , score,wordName);


        }else if(input=='3'){
            score-=4;
            console.log("Total score:- "+score);

            await displayFullDict(wordName);

            await startGame(0,0,score);
            
        }


    }

}

async function startGame(defcount , syncount , score){

    

    console.log("Game Started \nGuess the word\n")
    const words= await guessWord();
    const wordName=words.word;
    console.log("word name:-(demo) "+wordName+"\n");

   
    
   initiateGame(defcount , syncount , score,wordName);

   

 }

async function play(){ 
    if(fun=='def'){
        if(wordName==null){
            console.log("word not found !");
        }else{
            console.log(wordName);
            const deff=await definition(wordName);
            for(let i=0;i<deff.length;i++){
                console.log("DEFINITION "+(i+1)+":-");
                console.log(deff[i].text+"\n");
            }
        }
    }else if(fun =='syn'){
        if(wordName==null){
            console.log("word not found !");
        }else{
            
            const deff=await relatedWords(wordName);
           
            if(deff[0].relationshipType == "synonym"){
                
                for(let i=0;i<deff[0].words.length;i++){
                    console.log("synonym "+(i+1)+":- ");
                    console.log(deff[0].words[i]+"\n");
                }
            }else{
                console.log("synonym not found");
            }
        }
    }else if(fun =='ant'){
        if(wordName==null){
            console.log("word not found !");
        }else{
            const deff=await relatedWords(wordName);
            if(deff[0].relationshipType == "antonym"){
                for(let i=0;i<deff[0].words.length;i++){
                    console.log("synonym "+(i+1)+":- ");
                    console.log(deff[0].words[i]+"\n");
                }
            }else{
                console.log("antonym not found");
            }
        }
    }else if(fun =='ex'){
        if(wordName==null){
            console.log("word not found !");
        }else{
            const deff=await examples(wordName);
            for(let i=0;i<deff.examples.length;i++){
                console.log("EXAMPLE "+(i+1)+":- ");
                console.log(deff.examples[i].text+"\n");
            }
        }
    }else if(fun =='dict'){
        if(wordName==null){
            console.log("word not found !");
        }else{
            //definitions
            let deff=await definition(wordName);
            for(let i=0;i<deff.length;i++){
                console.log("DEFINITION "+(i+1)+":-");
                console.log(deff[i].text+"\n");
            }
            
            //synonyms
             deff=await relatedWords(wordName);
            
            if(deff[0].relationshipType == "synonym"){
                for(let i=0;i<deff[0].words.length;i++){
                    console.log("synonym "+(i+1)+":- ");
                    console.log(deff[0].words[i]+"\n");
                }
            }else{
                console.log("synonym not found\n");
            }

            //antonyms
             deff=await relatedWords(wordName);
            if(deff[0].relationshipType == "antonym"){
                for(let i=0;i<deff[0].words.length;i++){
                    console.log("synonym "+(i+1)+":- ");
                    console.log(deff[0].words[i]+"\n");
                }
            }else{
                console.log("antonym not found\n");
            }

            //examples
             deff=await examples(wordName);
            for(let i=0;i<deff.examples.length;i++){
                console.log("EXAMPLE "+i+1+":- ");
                console.log(deff.examples[i].text+"\n");
            }
        }
    }else if(fun =='play'){
        startGame(0,0,0);
    }else{
        //word of the day;
        const words= await guessWord();
        const wordName=words.word;

        console.log("WORD OF THE DAY :- "+wordName);
        
        //definitions
        let deff=await definition(wordName);
        for(let i=0;i<deff.length;i++){
            console.log("DEFINITION "+(i+1)+":-");
            console.log(deff[i].text+"\n");
        }
        
        //synonyms
         deff=await relatedWords(wordName);
        if(deff[0].relationshipType == "synonym"){
            for(let i=0;i<deff[0].words.length;i++){
                console.log("synonym "+(i+1)+":- ");
                console.log(deff[0].words[i]+"\n");
            }
        }else{
            console.log("synonym not found");
        }

        //antonyms
         deff=await relatedWords(wordName);
        if(deff[0].relationshipType == "antonym"){
            for(let i=0;i<deff[0].words.length;i++){
                console.log("synonym "+(i+1)+":- ");
                console.log(deff[0].words[i]+"\n");
            }
        }else{
            console.log("antonym not found");
        }

        //examples
         deff=await examples(wordName);
        for(let i=0;i<deff.examples.length;i++){
            console.log("EXAMPLE "+i+1+":- ");
            console.log(deff.examples[i].text+"\n");
        }

    }
}

play();




