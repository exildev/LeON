
var velocidad = 1;
if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    localStorage.setItem("velocidad", 1400);
    localStorage.setItem("maximo", 5);
    if (!localStorage.hasOwnProperty('contador')) {
      localStorage.setItem("contador", 0);
    }
    var con = parseInt(localStorage.getItem("contador")) + 1;
    localStorage.setItem("contador", con);
    if (localStorage.getItem("contador") < localStorage.getItem("maximo")) {
        velocidad = parseInt(localStorage.getItem("velocidad"));
    }
    spinner(subContainer);
    spinner(container);
} else {
    // Sorry! No Web Storage support..
    console.log("Sorry! No Web Storage support..");
}

/*
Función para crear el spinner
*/
function spinner(cont){
  var bar = new ProgressBar.Circle(cont, {
    color: '#aaa',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: velocidad,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#aaa', width: 1 },
    to: { color: '#ffa202', width: 4 },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 400);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(value);
      }

    }
  });
  bar.text.style.fontFamily = 'Montserrat, sans-serif';
  bar.text.style.fontWeight = 'bold';
  bar.text.style.fontSize = '2rem';

  bar.animate(1.0);  // Number from 0.0 to 1.0
}
