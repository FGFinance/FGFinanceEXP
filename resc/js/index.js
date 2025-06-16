function switchMode(){
  const cmode = document.body.className
  const nmode = cmode == "light-mode" ? "dark-mode" : "light-mode"
  document.body.className = nmode
  document.getElementById("modeswitchb").innerHTML = nmode == "dark-mode" ? "☀️" : "🌙"
}