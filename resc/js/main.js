let valuesl = {
  "income": [],
  "casa": [],
  "alimentacao": [],
  "saude": [],
  "transporte": [],
}
let totals = {}
let finalvalue = 0
let incomium = 0
let set = 0
document.querySelectorAll('.cat-input').forEach(i => {
  const siblings = Array.from(i.parentNode.querySelectorAll('.cat-input'));
  const index = siblings.indexOf(i);
  valuesl[i.parentElement.getAttribute('id')].push(0)
  i.setAttribute('identifier', index)
  i.childNodes[1].addEventListener('input', updateVals)
})
function updateVals(val) {
  let value = val.currentTarget.value
  value = value.replace(",", "")
  if (Number.isNaN(value) || value == "") {
    console.log("Not a Number, swapping to zilch.")
    valuesl[val.currentTarget.parentElement.parentElement.getAttribute("id")][val.currentTarget.parentElement.getAttribute('identifier')] = 0
  }
  else {
    valuesl[val.currentTarget.parentElement.parentElement.getAttribute("id")][val.currentTarget.parentElement.getAttribute('identifier')] = parseFloat(value)
  }

  finalvalue = 0
  incomium = 0

  for (i in valuesl) {
    let total = 0
    for (let x = 0; x < valuesl[i].length; x++) {
      total += valuesl[i][x]
      console.log(total)
    }
    totals[i] = total;
    if (i != "income") { finalvalue += total } else { incomium = total }
  }
  
  for (i in valuesl) {
    let total = totals[i];
    let percent = (i !== "income" && finalvalue !== 0) ? (total / finalvalue * 100).toFixed(1) : '';
    let extra = percent ? ` - ${percent}%` : '';
    console.log(total)
    document.getElementById(i).querySelectorAll('.cat-end')[0].innerHTML = `Total: R$${total.toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${extra}`;
  }
  
  document.getElementById('incomef').innerHTML = incomium.toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  document.getElementById('spendingst').innerHTML = finalvalue.toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  document.getElementById('finals').innerHTML = (incomium - finalvalue).toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  if (parseFloat(document.getElementById('finals').innerHTML) < 0) {
    document.getElementById('finals').style.color = 'rgb(255,0,0)'
  }
  else {
    document.getElementById('finals').style.color = 'aliceblue'
  }
}