function random(){
//     return Math.floor(Math.random() * 10);
// }

// async function startGame(defcount , syncount , score){

//     const words= await guessWord();
//     const wordName=words.word;

//     console.log("Game Started \nGuess the word\n")
//     console.log(wordName);

//     const deff=await definition(wordName);
    
//     if(random()%2==0){
//         console.log("DEFINITION "+(defcount+1)+":-");
//         console.log(deff[defcount++].text+"\n");
//     }else{
//         const deff=await relatedWords(wordName);
//             if(deff[0].relationshipType == "synonym"){
//                     console.log("synonym "+(syncount+1)+":- ");
//                     console.log(deff[0].words[syncount++]+"\n");
              
//             }else if(deff[0].relationshipType == "antonym"){
//                 console.log("antonym "+(syncount+1)+":- ");
//                 console.log(deff[0].words[syncount++]+"\n");
//             }
//     }

//     const input=prompt("Enter your Guess\n");
//     if(input==wordName){
//         score+=10;
//         console.log("CORRECT ANSWER\n");
//         console.log("score:-"+score);


//     }else{



//     }

    


    





// }