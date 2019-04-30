//array to store end of balloon image paths
var balloons= ["balloon1.jpg","balloon2.jpg","balloon3.jpg","balloon5.jpg","balloon5.png","balloon6.jpg","balloon7.jpg","balloon8.jpeg","balloon9.jpg","balloon10.jpg","balloon11.jpg","balloon12.jpg","balloon13.jpg","balloon14.jpg","balloon15.jpeg","balloon16.jpg","balloon17.jpg","balloon18.jpg","balloon19.jpg","balloon20.jpg","balloon21.jpg","balloon22.jpg","balloon23.jpg","balloon24.jpg","balloon25.jpg"]


//a function to display all the balloons each as a radio choice to the div for radios in the form
function renderBalloons() {
    
     //looping through balloons array
     for (var i=0; i< balloons.length; i ++){

        //new div created with bootstrap classes added for styling, this div will hold the radio
        var newDiv= $("<div>").addClass("form-check")
                              .addClass("form-check-inline")
        
        //input created with bootstrap classes for the radio, the radio's image is stored in the value attr.
        var newInput= $("<input>").addClass("form-check-input")
                                  .attr("type", "radio")
                                  .attr("name", "balloonRadios")
                                  //this radio will be binded w/ attr id and label's attr. for
                                  .attr("id", "balloonRadio" + (i))
                                  //radio image info stored in value
                                  .attr("value","assets/images/" +balloons[i])

        //the label for each radio will eventually have the image appended to it                         
        var newLabel= $("<label>").addClass("form-check-label")
                                  //attaches this label to the radio with same id
                                  .attr("for", "balloonRadio" + (i))

        //image for each radio and height specified                          
        var newImage= $("<img>").attr("src", "assets/images/" +balloons[i])
                                .attr("height", "100px")
                                       
        //appending image to label
        newLabel.append(newImage)
        //appending label and input to newDiv
        newDiv.append(newInput, newLabel)


        //appending new div that has a label and radio input for each postion in balloons array
        $("#radioPics").append(newDiv)
     }
     }


     //execute function to display balloons
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

  var ref= database.ref('balloons')

  console.log(ref)
  
  


 

// When submit button is clicked all values in the form will be taken and stored in variables
  $("#submit").on("click", function(){
    event.preventDefault()

    //variables to store form input values
    var name= $("#nameInput").val().trim()
    var destination= $("#destinationInput").val().trim()
    //formating first departs military time to unix
    var firstDeparts= moment($("#departInput").val().trim(), "HH:mm").format("X")
    var frequency= $("#frequencyInput").val().trim()
    //this will take any input that is checked that has an attr name equal to balloonRadios
    //the value of that input above we made equal to the certain balloons image path
    var pic=  $("input[name='balloonRadios']:checked").val();

    //making sure we grabbed the image path for pic
    console.log("PIC: " + pic)


    //making an object and storing all variables as values
    var newBalloon = {
      name: name,
      destination: destination,
      firstDeparts: firstDeparts,
      frequency: frequency,
      pic: pic
    }

    //putting the above object into the firebase database (using push to make a new branch)
    ref.push(newBalloon)

    //checking our object's properties and seeing if they all have values
    console.log(newBalloon.name)
    console.log(newBalloon.destination)
    console.log(newBalloon.firstDeparts)
    console.log(newBalloon.frequency)
    console.log(newBalloon.pic)


    //making all the inputs have nothing in them for better UI
    $("#nameInput").val("")
    $("#destinationInput").val("")
    $("#departInput").val("")
    $("#frequencyInput").val("")
    //whatever input that is checked and has attr. name equal to balloons the property of checked will be changed to false
    $("input[name='balloonRadios']:checked").prop('checked', false); 
    
})





//on child added to the database we will get a snapshot and console log it to make sure it works
  ref.on("child_added", function(childSnapshot){
    console.log(childSnapshot)

    //variables for storing snapshot values for each property needed to do math for new properties to be added
    var name= childSnapshot.val().name
    var destination= childSnapshot.val().destination
    var firstDeparts= childSnapshot.val().firstDeparts
    var frequency= childSnapshot.val().frequency
    

    console.log(firstDeparts)

    //taking first departs unix time and subtracting a year
    var firstDepartsSubtract= moment(firstDeparts, "X").subtract(1, "years")
    //taking first departs unix time that we subtracted a year from and formatting it to h:mm
    var readableFirstDeparts= moment(firstDepartsSubtract).format("h:mm")
    console.log("first depart: " + readableFirstDeparts)

    //calculating time difference between now and the first departs unix time with year subtracted, we got this 
    //calculation in minutes
    var timeDiff= moment().diff(moment(firstDepartsSubtract,"X"),"minutes")
    console.log("timeDiff: " + timeDiff)

    //finding remainder of the difference in time with frequency
    var remainder= Math.abs(timeDiff % frequency)
    console.log("remainder: " + remainder)

    //the minutes until the next balloon will be the frequency minus the remainder
    var minutesUntil= frequency - remainder
    console.log("minutes until: " + minutesUntil)

    //taking current time and adding minutes until(which is in minutes)
    var nextBalloon= moment().add(minutesUntil, "minutes")
    console.log("next: " + nextBalloon)
     
    //formatting next balloon which is in minutes to h:mm
    var readableNextBalloon= moment(nextBalloon, "minutes").format("h:mm")
    console.log("readableNext: " + readableNextBalloon)


    //making a newRow that will eventually be appended to our table
    var newRow= $("<tr>").attr("id", "row" )

    //new image will have src of balloon image in snapshot 
    //image height will be shortened but styled in css with class of imgStyle
    var newImg= $("<img>").attr("src", childSnapshot.val().pic)
                          .attr("height", "50px")
                          .addClass("imgStyle")
    //appending image to a variable of displayed table data
    var newStyle= $("<td>")
    newStyle.append(newImg)

    //variables to make table data, all will have text for firebase snapshot and classes added to align info in the table using bootstrap
    var newName= $("<td>").text(name).addClass("align-middle")
    var newDestination= $("<td>").text(destination).addClass("align-middle")
    var newFrequency= $("<td>").text(frequency).addClass("align-middle")
    var newArrival= $("<td>").text(readableNextBalloon).addClass("align-middle")
    var minutesUntilText= $("<td>").text(minutesUntil).addClass("align-middle")


    console.log(childSnapshot.key)

  newRow.attr("data-key", childSnapshot.key)

    var newRemoveButton= $("<button>").text("Remove")
                                      .attr("id", "remove")
                                      .attr("data-key", childSnapshot.key)
                                      .addClass("btn btn-info btn-sm align-middle")
   
    //appending all table data to newRow
    newRow.append(newStyle, newName, newDestination, newFrequency, newArrival, minutesUntilText, newRemoveButton)
    //appending row to table body
    $("tbody").append(newRow)


    $("tbody").on("click", "#remove", function(){
      console.log("button pressed")
      var key = ($(this).data("key"))
      ref.child(key).remove();
      $(this).parent().parent().remove()
      location.href = location.href

  })

  
})
  



 











        




  
          
       

      
     



    
  


