var form_data = new Array(); //  array of data on persons objects
var bodyTypesGender = {
    female: ["apple", "pear", "pencil", "hourglass", "round"],
    male: ["oval", " triangle", "rectangle", "rhomboid", "inverted triangle"],

}

/**
 * this method is used to change the dropdownlist values of the valid  body type depending on the gender that was selected
 * @param {any} value  value pass onChange event
 */
function changeBodyTypeData(value) {
    if (value.length == 0)
        document.getElementById("BODY_TYPE").innerHTML = "<option></option>";
    else {
        var bType_Options = "";
        for (bodTypeId in bodyTypesGender[value]) {
            bType_Options += "<option>" + bodyTypesGender[value][bodTypeId] + "</option>";
        }
        document.getElementById("BODY_TYPE").innerHTML = bType_Options;
    }
}

class Person {
    constructor() {
        this.firstName = document.getElementById("FIRST_NAME").value;
        this.lastName = document.getElementById("LAST_NAME").value;
        this.Dob = document.getElementById("DOB").value;
        this.gender = document.getElementById("GENDER").value;
        this.age = document.getElementById("AGE").value;
        debugger;
        this.bodyType = document.getElementById("BODY_TYPE").value;
        this.height = document.getElementById("HEIGHT").value;

    }

}

function calculateAge(dateOfBirth, dateToCalculate) {
    var calculateYear = dateToCalculate.getFullYear();
    debugger;
    var calculateMonth = dateToCalculate.getMonth();
    var calculateDay = dateToCalculate.getDate();
    debugger;
    var birthYear = dateOfBirth.getFullYear();
    var birthMonth = dateOfBirth.getMonth();
    var birthDay = dateOfBirth.getDate();

    var age = calculateYear - birthYear;
    var ageMonth = calculateMonth - birthMonth;
    var ageDay = calculateDay - birthDay;

    if (ageMonth < 0 || (ageMonth == 0 && ageDay < 0)) {
        age = parseInt(age) - 1;
    }
    return age;
}

function clearShowallTextArea() {
    document.getElementById("showallpersons").value = ''; //clear show all textarea;
}
function clearMatchesTextArea() {
    document.getElementById("showMatches").value = ''; //clear show all textarea;
}
function showall() {
    clearShowallTextArea();
    var personData = "";
    //for each person in persons do this anonymous function on each iteration
    form_data.forEach(function (person) {

        personData += " " + person.firstName + "," + person.lastName
            + "," + person.Dob + "," + person.gender
            + "," + person.age + "," + person.bodyType + ","
            + person.height + "\n";

        debugger;

    });
    console.log(personData);
    document.getElementById("showallpersons").value = personData;


    debugger;
}
function checkAge(age) {
    isAgeAcceptable = true;
    const ageMax = 70;
    const ageMin = 18;
    if (age > ageMax || age < ageMin)
        isAgeAcceptable = false;

    return isAgeAcceptable;

}
function addnew() {
    var isValid = true;  //by defualt the page is valid
    debugger;
    // create a new person object on object creation get the form data in constructor with document getelementbyid
    var person = new Person();
    if (person.firstName == "") {
        debugger;
        alert("First name must be filled out");
        isValid = false;
        debugger;
    }

    if (person.firstName.length < 3) {
        alert("first Name Must be greater than 3");
        isValid = false;

    }
    if (person.lastName.length < 3) {
        alert("last Name Must be greater than 3");
        isValid = false;

    }

    if (person.LastName == "") {
        alert("last name must be filled out");
        isValid = false;

    }
    if (person.Dob == "") {
        alert("dob must be filled out");
        isValid = false;
    }

    if (person.Dob != "") {

        debugger;
        person.age = calculateAge(new Date(person.Dob), new Date()); // set age from calculate age function

        if (checkAge(person.age)) {
            document.getElementById("AGE").value = person.age;
        }
        else {
            isValid = false;
            alert("Age must be between 18-70");

        }

    }

    if (person.gender == "") {
        alert("gender must be filled out");
        isValid = false;

    }

    if (person.age == "") {
        alert("age must be filled out");
        isValid = false;

    }

    if (person.bodyType == "") {
        alert("body type must be filled out");
        isValid = false;

    }

    if (person.height == "") {
        alert("height must be filled out");
        isValid = false;

    }
    if (person.height < 70 || person.height > 200) {
        alert("height must be between the range of 70 to 200");
        isValid = false;

    }

    if (isValid) {
        form_data.push(person); // if data is valid push a new person object to the global array
        debugger;
    }
    alert("Data was submitted");
    showall();

}
function getRandomInt(min, max) {
    r = Math.floor(Math.random() * (max - min + 1)) + min;
    debugger;
    return r;
}
//task8
/**
 * findMatches() algorithm is used to find matches base on the criterias in the algorithm
   age and height where used to make a desision
 */
function findMatches() {
    const MAX_TRIES = 10;
    var criteria_val = 10;
    clearMatchesTextArea();        //clear showMatches text area
    var counter = 0;
    var randPos = 0;
    min = 0;                     // the minimum range for a random number to generate from
    max = form_data.length - 1; // the maximum range for a random number to generate from

    // perform a foreach loop excecuting the anonymous function call on each iteration
    form_data.forEach(function (person_position) {

        // while counter is less than MAX_TRIES do this code block
        // if match was found displat and break from the while loop
        while (counter < MAX_TRIES) {
            debugger;
            randPos = getRandomInt(min, max); //get a random number from lower bound 0 to uppbound array.length
            var t = form_data[randPos]['age'];
            debugger;
            //use absolute value Math.abs(differenceOfAges) &&  Math.abs(differenceOfHeights) to check if it is <= plus or minus 10
            if (person_position.gender != form_data[randPos]['gender'] &&
                ((Math.abs(person_position.age - form_data[randPos]['age'])) <= criteria_val) && ((Math.abs(person_position.height - form_data[randPos]['height'])) <= criteria_val)) {
                debugger;
                //person_position.firstName + "  matched To" + form_data[randPos]['firstName'];
                document.getElementById("showMatches").value += person_position.firstName + "  matched to " + form_data[randPos]['firstName'] + "\n";
                debugger;
                break;  // if match found break out of the for loop
            }

            ++counter;
        }
    });

}
