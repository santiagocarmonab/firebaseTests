// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyACGSDzK7tlRdUeidDAScJdU5P6UBF6XSc',
    authDomain: 'firstdatabase-43ac3.firebaseapp.com',
    projectId: 'firstdatabase-43ac3'
  });
  
var db = firebase.firestore();
  
$(document).ready(function(){
   
    counter=1;
    $('#newElement').click(function(){
        var element = $("<li></li>").text("You added item: " + counter);
        element.addClass("display-4");
        $('#myList').append(element);
        counter ++;
    })
// send input data to data base
    $('#changeText').click(function(){
        var inputData = $('#changed').val();
        $('#firstText').html(inputData);
        db.collection("test1").add({
            data : inputData
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            $('#changed').val("");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    });
    
    $('#changeColor').click(function(){
        
        $('#title1').addClass("text-danger");
        $('#title2').addClass("text-success");
    });
});

//Show old data saved on data base
var table =$('#myTable');
db.collection("test1").get().then((querySnapshot) => {
    table.val("");
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().data}`);
        var toAdd = $("<tr></tr>").text(`${doc.data().data}`);
        $('#myTable').append(toAdd);
    });
});