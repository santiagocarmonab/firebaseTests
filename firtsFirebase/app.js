// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyACGSDzK7tlRdUeidDAScJdU5P6UBF6XSc',
    authDomain: 'firstdatabase-43ac3.firebaseapp.com',
    projectId: 'firstdatabase-43ac3'
  });
  
var db = firebase.firestore();
  
$(document).ready(async function(){

    counter=1;
    try{
        const ultimo = await db.collection("test2").orderBy("createdAt", "desc").limit(1).get();
        console.log(ultimo)
        ultimo.forEach((doc) => {   
            console.log(`${doc.data().text}`);
            $('#firstText').html(`${doc.data().text}`);
        })
    }
    catch(error){
        console.log("paila")
    }
    
    $('#newElement').click(function(){
        var element = $("<li></li>").text("You added item: " + counter);
        element.addClass("display-4");
        $('#myList').append(element);
        counter ++;
    })
// send input data to data base
    $('#changeText').click(async function(){ 
        try{
            var inputData = $('#changed').val();
            $('#firstText').html(inputData);
            const docRef= await db.collection("test2").add({
                text : inputData,
                createdAt : new Date().getTime()
            })
            
            console.log("Document written with ID: ", docRef.id);
            $('#changed').val("");
        }
        catch(error){
            console.error("Error adding document: ", error);
        }
    });
    
    $('#changeColor').click(function(){
        
        $('#title1').addClass("text-danger");
        $('#title2').addClass("text-success");
    });
});
