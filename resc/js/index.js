let btnText = ""

function switchMode(){
  const cmode = document.body.className
  const nmode = cmode == "light-mode" ? "dark-mode" : "light-mode"
  setCookie("lmode", nmode)
  document.body.className = nmode
  document.getElementById("modeswitchb").innerHTML = (nmode == "dark-mode" ? "☀️" : "🌙") + btnText
}

function detectMobile(){
  if(window.matchMedia('screen and (max-width: 767.98px)').matches){
    btnText = ""
    document.getElementById('thename').childNodes[0].innerHTML = 'FG'
  }else{
    btnText = "Alterar Modo"
    document.getElementById('thename').childNodes[0].innerHTML = 'FG Finanças'
  }
}

function startup(){
  const darkval = getCookie("lmode")
  if(darkval != ""){
    document.body.className = darkval
    document.getElementById("modeswitchb").innerHTML = (darkval == "dark-mode" ? "☀️" : "🌙") + btnText
  }else{ setCookie("lmode", "light-mode") }
}

function getCookie(name) {
  let dname = name + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) { let c = ca[i];
    while (c.charAt(0) == ' ') { c = c.substring(1) }
    if (c.indexOf(dname) == 0) { return c.substring(dname.length, c.length) }
  }
  return "";
}

function setCookie(name, value) {
  const d = new Date();
  d.setTime(d.getTime() + (60 * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + value + ";" + ("expires="+d.toUTCString()) + ";path=/;SameSite=Strict;";
}

function summonDrop(ename){
  document.getElementById(ename).classList.toggle('dropshow')
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropcon");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('dropshow')) {
        openDropdown.classList.remove('dropshow');
      }
    }
  }
} 

window.onresize = detectMobile;

detectMobile()
startup()
