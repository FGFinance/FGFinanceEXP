let valtable = { //Each table item.
  "income": [],
  "casa": [],
  "alimentacao": [],
  "saude": [],
  "transporte": [],
  "lazer": []
}

let format = { //How each table item should display formally.
  "income": "Renda",
  "casa": "Casa",
  "alimentacao": "Alimentação",
  "saude": "Saúde",
  "transporte": "Transorte",
  "lazer": "Lazer"
}

let tabWarn = { //How many % you can spend in each. 
  "casa": 35,
  "alimentacao": 25,
  "saude": 15,
  "transporte": 15,
  "lazer": 10
}

let listOfSwears = { //String that should be displayed when tabWarn treshold is met.
  "casa": "<br>Enquanto os gastos em casa são importantes, precisa garantir que não está gastando muito. Tente gastar menos em áreas como Internet ou Telefone.",
  "alimentacao": "<br>",
  "saude": "<br>Saúde é importante, porém os gastos nesse setor estão anormais. Considere verificar aonde seu dinheiro esta indo.",
  "transporte": "<br>",
  "lazer": "<br>",
}

let totals = {} //Total of each category, used for parsing percentages
let finalvalue = 0 //Final value, duh.
let incomium = 0 //The total income amount
let totfinal = 0 //The total final amount.

document.querySelectorAll('.cat-input').forEach(i => { //For each input section present in the page...
  const siblings = Array.from(i.parentNode.querySelectorAll('.cat-input'));
  const index = siblings.indexOf(i);
  valtable[i.parentElement.getAttribute('id')].push(0)
  i.setAttribute('identifier', index)
  i.childNodes[1].addEventListener('input', updateVals)
  i.childNodes[1].setAttribute('value', 0.00)
})

function updateVals(val){
  let value = (val.currentTarget.value).replace(",", "") //Replace the , with  .
  const valtargetcat = val.currentTarget.parentElement.parentElement.getAttribute('id')
  const valtargetident = val.currentTarget.parentElement.getAttribute('identifier')
  const isdeduct = val.currentTarget.parentElement.getAttribute('deduct')

  valtable[valtargetcat][valtargetident] = Number.isNaN(val) || value == "" ? 0 : (isdeduct ? -parseFloat(value) : parseFloat(value))
  //God i love ternaries.
  updatePage()
}

function updatePage() {
  let text = ''
  finalvalue = 0
  incomium = 0

  for (i in valtable) {
    let total = 0
    for (let x = 0; x < valtable[i].length; x++) {
      total += valtable[i][x]
    }
    totals[i] = total;
    if (i != "income") { finalvalue += total } else { incomium = total }
  }
  totfinal = (incomium - finalvalue)
  
  for (i in valtable) {
    let total = totals[i];
    let percent = (i !== "income" && finalvalue !== 0) ? (total / finalvalue * 100).toFixed(1) : '';
    let extra = percent ? ` - ${percent}%` : '';
    if(i!='income'){text = text + `${i == 'casa' ? "" : "<br>"}` + `${format[i]}: R$${total.toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${extra}`}
    document.getElementById('catover').innerHTML = text
    document.getElementById(i).querySelectorAll('.cat-end')[0].innerHTML = `Total: R$${total.toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${extra}`;
  }
  
  document.getElementById('incomef').innerHTML = incomium.toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  document.getElementById('spendingst').innerHTML = finalvalue.toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  
  document.getElementById('finals').innerHTML = totfinal.toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  if (parseFloat(document.getElementById('finals').innerHTML) < 0) {
    document.getElementById('finals').style.color = 'rgb(255,0,0)'
  }
  else {
    document.getElementById('finals').style.color = 'var(--universalfont)'
  }
  handleWarning()
}

function switchMode(){
  const cmode = document.body.className
  const nmode = cmode == "light-mode" ? "dark-mode" : "light-mode"
  setCookie("lmode", nmode)
  document.body.className = nmode
  document.getElementById("modeswitchb").innerHTML = nmode == "dark-mode" ? "☀️" : "🌙"
}

function handleWarning(){
  for (i in valtable) {
    let total = totals[i];
    let percent = (i !== "income" && finalvalue !== 0) ? (total / finalvalue * 100).toFixed(1) : 0;
    if(i !== 'income' && percent >= tabWarn[i] && (totfinal < (incomium * 0.15))){
      document.getElementById(i).querySelectorAll('.cat-end')[0].style.color = 'rgb(208, 0, 0)'
      document.getElementById(i).querySelectorAll('.cat-end')[0].innerHTML += ` <i class="smalluseless">${listOfSwears[i]}</i>`
    }else{
      document.getElementById(i).querySelectorAll('.cat-end')[0].style.color = 'var(--universalfont)'
    }
  }
}

function startup(){
  const darkval = getCookie("lmode")
    if(darkval != ""){
        const nmode = darkval == "light-mode" ? "dark-mode" : "light-mode"
        document.body.className = nmode
        document.getElementById("modeswitchb").innerHTML = nmode == "dark-mode" ? "☀️" : "🌙"
    }else{
        setCookie("lmode", "light-mode")
    }
}

function getCookie(name) {
  let dname = name + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) { let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(dname) == 0) {
      return c.substring(dname.length, c.length)
    }
  }
  return "";
}

function setCookie(name, value) {
  const d = new Date();
  d.setTime(d.getTime() + (60 * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

updatePage()
startup()