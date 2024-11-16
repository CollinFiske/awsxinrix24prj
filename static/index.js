// link js variables to index.html input fields
const submitButton = document.getElementById('submitButton');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const largeInput = document.getElementById('largeInput');

let value1, value2, largeValue;

// when submit button clicked, save input to js variables accordingly
submitButton.addEventListener('click', () => {
    // save values to individual variables
    const value1 = input1.value;
    const value2 = input2.value;
    const largeValue = largeInput.value;

    // print input to check that it saved
    console.log("Value 1 --> " + value1);
    console.log("Value 2 --> " + value2);
    console.log("LargeValue --> " + largeValue);
    console.log(" ");
});