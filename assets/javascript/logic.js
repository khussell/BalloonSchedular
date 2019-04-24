
var balloons= ["balloon1.jpg","balloon2.jpg","balloon3.jpg","balloon5.jpg","balloon5.png","balloon6.jpg","balloon7.jpg","balloon8.jpeg","balloon9.jpg","balloon10.jpg","balloon11.jpg","balloon12.jpg","balloon13.jpg","balloon14.jpg","balloon15.jpeg","balloon16.jpg","balloon17.jpg","balloon18.jpg","balloon19.jpg","balloon20.jpg","balloon21.jpg","balloon22.jpg","balloon23.jpg","balloon24.jpg","balloon25.jpg"]

function renderBalloons() {
    
     for (var i=0; i< balloons.length; i ++){
        var newDiv= $("<div>").addClass("form-check")
                              .addClass("form-check-inline")

        var newInput= $("<input>").addClass("form-check-input")
                                  .attr("type", "radio")
                                  .attr("name", "balloonRadios")
                                  .attr("id", "balloonRadio" + (i))
                                  .attr("value","assets/images/" +balloons[i])

        var newLabel= $("<label>").addClass("form-check-label")
                                  .attr("for", "balloonRadio" + (i))

        var newImage= $("<img>").attr("src", "assets/images/" +balloons[i])
                                .attr("height", "100px")
                                

         

        
      
        newLabel.append(newImage)
        newDiv.append(newInput, newLabel)


        
        $("#radioPics").append(newDiv)
       

     }
     }

     renderBalloons()


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


 
  

      




  $("#submit").on("click", function(){
    event.preventDefault()

    var name= $("#nameInput").val().trim()
    var destination= $("#destinationInput").val().trim()
    var firstDeparts= moment($("#departInput").val().trim(), "HH:mm").format("X")
    var frequency= $("#frequencyInput").val().trim()
    var pic=  $("input[name='balloonRadios']:checked").val();

    console.log("PIC: " + pic)

    var newBalloon = {
      name: name,
      destination: destination,
      firstDeparts: firstDeparts,
      frequency: frequency,
      pic: pic
    }

    database.ref().push(newBalloon)


    console.log(newBalloon.name)
    console.log(newBalloon.destination)
    console.log(newBalloon.firstDeparts)
    console.log(newBalloon.frequency)
    console.log(newBalloon.pic)



    $("#nameInput").val("")
    $("#destinationInput").val("")
    $("#departInput").val("")
    $("#frequencyInput").val("")
    $("input[name='balloonRadios']:checked").prop('checked', false); 
    
   
   

})



















  database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot)

    var name= childSnapshot.val().name
    var destination= childSnapshot.val().destination
    var firstDeparts= childSnapshot.val().firstDeparts
    var frequency= childSnapshot.val().frequency

    var current= moment().format("X")
    
    console.log(firstDeparts)

    var firstDepartsSubtract= moment(firstDeparts, "X").subtract(1, "years")
    var readableFirstDeparts= moment(firstDepartsSubtract).format("h:mm")
    console.log("first depart: " + readableFirstDeparts)

    var timeDiff= moment().diff(moment(firstDepartsSubtract,"X"),"minutes")
    console.log("timeDiff: " + timeDiff)

    var remainder= Math.abs(timeDiff % frequency)
    console.log("remainder: " + remainder)

    var minutesUntil= frequency - remainder
    console.log("minutes until: " + minutesUntil)

    var nextBalloon= moment().add(minutesUntil, "minutes")
    console.log("next: " + nextBalloon)
     
    var readableNextBalloon= moment(nextBalloon, "minutes").format("h:mm")
    console.log("readableNext: " + readableNextBalloon)



    var newRow= $("<tr>").attr("id", "row" )

    var newImg= $("<img>").attr("src", childSnapshot.val().pic)
                          .attr("height", "50px")
                          .addClass("imgStyle")
    var newStyle= $("<td>")
    newStyle.append(newImg)

    var newName= $("<td>").text(name).addClass("align-middle")
    var newDestination= $("<td>").text(destination).addClass("align-middle")
    var newFrequency= $("<td>").text(frequency).addClass("align-middle")
    var newArrival= $("<td>").text(readableNextBalloon).addClass("align-middle")
    var minutesUntilText= $("<td>").text(minutesUntil).addClass("align-middle")
   

    newRow.append(newStyle, newName, newDestination, newFrequency, newArrival, minutesUntilText)
    $("tbody").append(newRow)





  })

  



 











        




  
          
       

      
     



    
  


