// se crea un a variable en localStorage para contar el numero de veces que se ha ejecutado la animaci
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
    var contador = parseInt(localStorage.getItem("contador"));
    var maximo =  parseInt(localStorage.getItem("maximo"));
    if (contador < maximo) {
        velocidad = parseInt(localStorage.getItem("velocidad"));
    }
    cbj_spinner(cb_subContainer, '#a5a5a5');
    cbj_spinner(cb_container, '#ffa202', '50px');
} else {
    // Sorry! No Web Storage support..
    console.log("Sorry! No Web Storage support..");
}

/*
Función para crear el spinner
*/
function cbj_spinner(cont, c, ts){
  var bar = new ProgressBar.Circle(cont, {
    color: c,
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: velocidad,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#a5a5a5', width: 1 },
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
  bar.text.style.fontSize = (ts?ts:'2rem');

  bar.animate(1.0);  // lanzar animacion
  cbj_progress('#fitness', 80);
  cbj_progress('#biometrics', 60);
  cbj_progress('#mobility', 40);
  cbj_progress('#lifestyle', 20);

}

function cbj_progress(contex, p){
    var c = document.querySelector(contex);
    var barra = c.querySelector('.cb_pg');
    console.log(velocidad);
    var v = (velocidad > 1 ? 10:parseInt(localStorage.getItem("velocidad")))/100;
    var pg = Math.round((barra.offsetWidth * 100) / c.offsetWidth);

    var b = (pg > p && pg != p?true:false);
    var r = c.offsetHeight * 0.035714;
    var d = setInterval(function () {
        if(b){
            if (pg > p) {
                pg--;
                if(pg <= 14){
                    barra.style.height = Math.round(barra.offsetHeight - r)+'px';
                }

                barra.style.width = pg+'%';
            }else{
                clearInterval(d)
            }
        }else{
            if (pg < p){
                pg++;
                if(pg <= 14){
                    console.log(pg, r);
                    barra.style.height = Math.round(barra.offsetHeight + r)+'px';
                }
                barra.style.width = pg+'%'
            }else{
                clearInterval(d);
            }
        }
    }, v);


}
