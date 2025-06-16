function switchMode(){
  const cmode = document.body.className
  const nmode = cmode == "light-mode" ? "dark-mode" : "light-mode"
  setCookie("lmode", nmode)
  document.body.className = nmode
  document.getElementById("modeswitchb").innerHTML = nmode == "dark-mode" ? "☀️" : "🌙"
}

function startup(){
  const darkval = getCookie("lmode")
  if(darkval != ""){
    document.body.className = darkval
    document.getElementById("modeswitchb").innerHTML = darkval == "dark-mode" ? "☀️" : "🌙"
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
  document.cookie = name + "=" + value + ";" + ("expires="+d.toUTCString()) + ";path=/";
}

startup()