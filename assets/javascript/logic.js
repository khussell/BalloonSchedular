
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
    var newFirstArrival= $("<td>").text(snapshot.val().nextBalloon)
    var newMinutesAway= $("<td>").text(snapshot.val().minutesAway)
   

    newRow.append(newStyle, newName, newDestination, newFrequency, newFirstArrival, newMinutesAway)
    $("tbody").append(newRow)





  })


  $("#submit").on("click", function(){
      event.preventDefault()

      name= $("#nameInput").val().trim()
      destination= $("#destinationInput").val().trim()
      departs= $("#departInput").val().trim()
      frequency= $("#frequencyInput").val().trim()
      pic=  $("input[name='exampleRadios']:checked").val();

      var now= moment()
      var nowConverted= moment(now).format("X")
      console.log(nowConverted)
    

      //on click I will find the frequency, first departure time converted to moment object, the difference
      //between current time moment() and first departure converted time

      var firstDeparture= departs
      var firstDepartureCon= moment(firstDeparture, "HH:mm").subtract(1, "years");
      var firstDepartCon= moment(firstDeparture, "HH:mm").subtract(1, "years").format("h:mm")
      var firstDepartureXCon= moment(firstDeparture, "HH:mm").format("X")
      var difference=  now.diff(moment(firstDepartureCon),"minutes")
      console.log(firstDepartureCon)
      console.log(firstDeparture);
      console.log("difference: " + difference)

        
    var remainder = difference % frequency;
    console.log("remainder: "+ remainder);


    var tMinutesTillBalloon = frequency - remainder;
    console.log("MINUTES TILL balloon: " + tMinutesTillBalloon);

    

    var nextBalloon= now.add(tMinutesTillBalloon, "minutes").format("HH:mm");

    console.log("nextBalloon: " + nextBalloon)

    var nextBalloonConverted= moment(nextBalloon, "HH:mm").format("h:mm")
    var nextBalloonConvertedX= moment(nextBalloon, "HH:mm").format("X")
    console.log("nextBalloonConverted" +nextBalloonConverted)




      console.log(pic)

      database.ref().push({
          
          name: name,
          destination: destination,
          firstDepart: firstDepartCon,
          nextBalloon: nextBalloonConverted,
          frequency: frequency,
          pic: pic,
          minutesAway: tMinutesTillBalloon,
          moment: nowConverted,
          current: nextBalloonConvertedX
      })

      $("#nameInput").val("")
      $("#destinationInput").val("")
      $("#departInput").val("")
      $("#frequencyInput").val(0)
  })


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
        var currentBalloonX = parseInt(currentBalloonX)
        console.log("current balloon x:" + currentBalloonX)

       var frequency= (balloons[key].frequency) * 60
       console.log("freq: "+ frequency)
        
       if(nowNowCon > currentBalloonX){

        var newNextBalloonX = (currentBalloonX + frequency)
        var newNextBalloonCon = moment(newNextBalloonX, "X").format("h:mm")

        console.log("nextballoon x adding frequency"+ newNextBalloonX)
        console.log("should be h:mm " +newNextBalloonCon)
        var path= "balloons" + key
        console.log(path)

        
         




      }
        
}

 

  })













  
          
       

      
     



    
  


