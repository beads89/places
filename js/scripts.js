// Business for TravelLog

function TravelLog() {
  this.location = {};
  this.currentId = 0;
}


TravelLog.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

TravelLog.prototype.addDestination = function(destination) {
  destination.id = this.assignId();
  this.location[destination.id] = destination;
};


TravelLog.prototype.deleteDestination = function(id) {
  if (this.location[id] === undefined) {
    return false
  }
  delete this.location[id];
  return true;
};

TravelLog.prototype.findDestination = function(id) {
  if (this.location[id] != undefined) {
    return this.location[id];
  }
  return false;
}

// Business for Destination

function Destination(location, landmark, timeOfYear, notes) {
  this.location = location;
  this.landmark = [landmark];
  // this.landmark.push(landmark);
  this.timeOfYear = [timeOfYear];
  // this.timeOfYear.push(timeOfYear);
  this.notes = [notes];
  // this.notes.push(notes);
  this.timesVisited = 1;
}


Destination.prototype.updateVisit = function(newLandmark, newTimeOfYear, newNotes) {
  this.landmark.push(newLandmark);
  this.timeOfYear.push(newTimeOfYear);
  this.notes.push(newNotes);
  this.timesVisited += 1;
};

// User Logic

let travelLog = new TravelLog();

function displayDestination(travelLogToDisplay) {
  let destinationName = $("ul#destinations");
  let htmlDestinationInfo = "";
  Object.keys(travelLogToDisplay.location).forEach(function(key) {
    const destinationDisplay = travelLogToDisplay.findDestination(key);
    htmlDestinationInfo += "<li class='click' id=" + location.id + ">" + destinationDisplay.location + "</li> <ul class='destinationInfo'> <li>" + destinationDisplay.landmark + "</li> <li>" + destinationDisplay.timeOfYear + "</li> <li>" + destinationDisplay.notes + "</li> </ul>";
  });
  destinationName.html(htmlDestinationInfo);
}


$(document).ready(function() {
  $("form#addDestination").submit(function(event) {
    event.preventDefault();
    let inputLocation = $("#location").val();
    let inputLandmark = $("#landmark").val();
    let inputTimeOfYear = $("#timeOfYear").val();
    let inputNotes = $("#notes").val();
    let newDestination = new Destination(inputLocation, inputLandmark, inputTimeOfYear, inputNotes);
    travelLog.addDestination(newDestination);
    displayDestination(travelLog);
    console.log(travelLog);
  });

  $(".click").click(function() {
    $(".destinationInfo").show();
  });
});

// let newYork = new Destination("New York", "Times Square", "Summer", "Crowded and expensive");
// let sanFran = new Destination("San Francisco", "Golden Gate Bridge", "Winter", "Alcatraz is there, don't end up there");
// let azkaban = new Destination("Azkaban", "Dementors", "Winter", "Depressing, 1 star on Yelp");

// travelLog.addDestination(newYork);
