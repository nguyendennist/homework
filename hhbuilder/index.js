var body = document.body;
var hhList = document.createElement('div');
hhList.className = 'hhList';
hhList.style.marginTop = '60px';
body.getElementsByClassName('builder')[0].appendChild(hhList);

// adds remove button next to the add button
var remove = document.createElement('button');
remove.className = 'remove';
remove.innerText = 'remove';
body.getElementsByClassName('add')[0].parentNode.appendChild(remove);

var addButton = body.getElementsByTagName('button')[0];
var removeButton = body.getElementsByClassName('remove')[0];
var submitButton = body.getElementsByTagName('button')[2];

addButton.onclick = function (e) {
  e.preventDefault();

  var ageElement = document.getElementsByName('age')[0];
  var relElement = document.getElementsByName('rel')[0];
  var smokerElement = document.getElementsByName('smoker')[0];
  var age;
  var rel = relElement.value;
  var smoker = smokerElement.checked;

  // checks to make sure age is an integer
  if (ageElement.value.length > 0 && !ageElement.value.match(/[^0-9]/g)) {
    age = JSON.parse(ageElement.value);
  }

  if ((typeof age === 'number' && age > 0) && rel !== "") {
    var classNames = ['age', 'relationship', 'smoker'];
    var props = [age, rel, smoker];

    if (ageElement.style.borderColor === "red" && relElement.style.borderColor === "red") {
      ageElement.style.borderColor = "";
      relElement.style.borderColor = "";
    }
    ageElement.value = "";
    relElement.value = "";
    smokerElement.checked = false;

    var people = document.createElement('div');
    people.className = 'people';
    people.style.marginBottom = '30px';

    props.forEach(function (value, index) {
      var element = document.createElement("p");
      var className = classNames[index];
      element.className = className;
      element.innerText = className + ': ' + value;
      people.appendChild(element);
    });

    hhList.insertBefore(people, hhList.childNodes[0]);
    console.log(hhList.childNodes);
    console.log(hhList.childNodes.length);
  } else {
    ageElement.style.borderColor = "red";
    relElement.style.borderColor = "red";
  }
};

// click handler for remove button
removeButton.onclick = function (e) {
  e.preventDefault();
  var first = document.getElementsByClassName('hhList')[0].childNodes[0];
  if (first) {
    first.remove();
  }
};

// click handler for submit button
submitButton.onclick = function(e) {
  e.preventDefault();

  var peopleElement = hhList.childNodes;
  var peopleData = [];
  for (var x = 0; x < peopleElement.length;) {
    var person = peopleElement[x].childNodes;
    peopleData.push({
      age: person[0],
      rel: person[1],
      smoker: person[2]
    });
    body.getElementsByClassName('remove')[0].click();
  }

  // make post request to fake server
  // fetch('http://127.0.0.1:8080/', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(peopleData)
  // });
};