
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
    var pic=  $("input[name='exampleRadios']:checked").val();

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
                          .attr("height", "40px")
    var newStyle= $("<td>")
    newStyle.append(newImg)

    var newName= $("<td>").text(name)
    var newDestination= $("<td>").text(destination)
    var newFrequency= $("<td>").text(frequency)
    var newArrival= $("<td>").text(readableNextBalloon)
    var minutesUntilText= $("<td>").text(minutesUntil)
   

    newRow.append(newStyle, newName, newDestination, newFrequency, newArrival, minutesUntilText)
    $("tbody").append(newRow)





  })


 

  /*
  database.ref().on("value", function(snapshot){
    var balloons= snapshot.val()
    console.log(balloons)

    var keys= Object.keys(balloons)
    console.log(keys)

    var nowNow= moment()
    var nowNowCon= moment(nowNow).format("X")

    console.log("now" +nowNowCon)
    

    for (var i=0; i < keys.length; i ++){
     
        key= keys[i]
        console.log(key)

        console.log(balloons[key].name)
        var currentBalloonX = balloons[key].current
           currentBalloonX = parseInt(currentBalloonX)
        console.log("current balloon x:" + currentBalloonX)

       var frequency= (balloons[key].frequency) * 60
       console.log("freq: "+ frequency)
        
       if(nowNowCon > currentBalloonX){

        var newNextBalloonX = (currentBalloonX + frequency)
            newNextBalloonX = String(newNextBalloonX)
        var newNextBalloonCon = moment(newNextBalloonX, "X").format("h:mm")

        console.log("nextballoon x adding frequency"+ newNextBalloonX)
        console.log("should be h:mm " +newNextBalloonCon)


        var path= "balloons" + key
        console.log(path)

        
        




      }
        
}

 

  })

  */













  
          
       

      
     



    
  


