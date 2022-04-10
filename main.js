function myColor() {

    // Get the value return by color picker
    var color = document.getElementById('colorPicker').value;

    // Set the color as background
    document.body.style.backgroundColor = color;

    // Take the hex code
    document.getElementById('box').value = color;
}
// When user clicks over color picker,
// myColor() function is called
document.getElementById('colorPicker')
    .addEventListener('input', myColor);