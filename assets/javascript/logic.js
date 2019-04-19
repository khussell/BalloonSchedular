
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAsJ4cQCryCVbGQGEiGh6zf-oM6WvnIcgE",
    authDomain: "balloonschedular.firebaseapp.com",
    databaseURL: "https://balloonschedular.firebaseio.com",
    projectId: "balloonschedular",
    storageBucket: "balloonschedular.appspot.com",
    messagingSenderId: "238006636434"
  };

  firebase.initializeApp(config);

  var database= firebase.database()



 var name= ""
 var destination=""
 var departs= ""
 var frequency= 0
 var pic= ""








 // var renderBalloons= function(){
  //    $("tbody").empty()

   // for (var i=0; i < balloons.length; i++){




        //var newRow= $("<tr>").attr("id", "row" + i)

       // var newImg= $("<img>").attr("src", balloons[i].pic)
                   //           .attr("height", "40px")
      //  var newStyle= $("<td>")
       // newStyle.append(newImg)

      //  var newName= $("<td>").text(balloons[i].name)
      //  var newDestination= $("<td>").text(balloons[i].destination)
      //  var newFrequency= $("<td>").text(balloons[i].frequency)
      //  var newFirstArrival= $("<td>").text(balloons[i].firstArrival)
       

      //  newRow.append(newStyle, newName, newDestination, newFrequency, newFirstArrival)
      //  $("tbody").append(newRow)


    //}


 // }

  //renderBalloons()

  database.ref().on("child_added", function(snapshot){


    var newRow= $("<tr>").attr("id", "row" )

    var newImg= $("<img>").attr("src", snapshot.val().pic)
                          .attr("height", "40px")
    var newStyle= $("<td>")
    newStyle.append(newImg)

    var newName= $("<td>").text(snapshot.val().name)
    var newDestination= $("<td>").text(snapshot.val().destination)
    var newFrequency= $("<td>").text(snapshot.val().frequency)
    var newFirstArrival= $("<td>").text(snapshot.val().firstArrival)
   

    newRow.append(newStyle, newName, newDestination, newFrequency, newFirstArrival)
    $("tbody").append(newRow)





  })


  $("#submit").on("click", function(){
      event.preventDefault()

      name= $("#nameInput").val().trim()
      destination= $("#destinationInput").val().trim()
      departs= $("#departInput").val().trim()
      frequency= $("#frequencyInput").val().trim()
      pic=  $("input[name='exampleRadios']:checked").val();

      console.log(pic)

      database.ref().push({
          name: name,
          destination: destination,
          firstArrival: departs,
          frequency: frequency,
          pic: pic
          
      })


  })



