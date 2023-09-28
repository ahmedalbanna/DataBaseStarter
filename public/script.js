function submitMovieStar() {
  console.log("GO GO REVIEW");
  var starName = document.getElementById("starName").value;
  var starYear = document.getElementById("birthYear").value;
  document.getElementById("starName").value = "";
  document.getElementById("birthYear").value = "";
  console.log(starName + starYear);
  var starInfo = {
    name: starName,
    year: starYear
  };
  console.log(starInfo);
  $.post("/sendNewStar", starInfo, function(data) {
    console.log("SUCCESS");
  });
}

function getStarsInfo() {
  $.get("/getStarsInfo", function(data) {
    var str = "<ul>";
    for (var s of data) {
      str += "<li>" + s.name + ", " + s.birthyear + "</li>";
    }
    str += "</ul>";
    document.getElementById("starlist").innerHTML = str;
  });
}
