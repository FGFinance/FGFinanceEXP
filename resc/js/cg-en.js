let valtable = { //Each table item.
  "income": [],
  "home": [],
  "food": [],
  "health": [],
  "transport": [],
  "misc": []
}

let format = { //How each table item should display formally.
  "income": "Income",
  "home": "Housing",
  "food": "Food",
  "health": "Health",
  "transport": "Transort",
  "misc": "Miscellaneous"
}

let tabWarn = { //How many % you can spend in each. 
  "home": 35,
  "food": 25,
  "health": 15,
  "transport": 15,
  "misc": 10
}

let listOfWarns = { //String that should be displayed when tabWarn treshold is met.
  "home": "<br>Enquanto os gastos em casa são importantes, precisa garantir que não está gastando muito. Tente gastar menos em áreas como Internet ou Telefone.",
  "food": "<br>Tem certeza que esses gastos em alimentação são normais? Considere investigar se não está gastando muito em comida desnecessária.<br>(Caso você tenha uma família grande, esse aviso pode ser ignorado.)",
  "health": "<br>Saúde é importante, porém os gastos nesse setor estão anormais. Considere verificar aonde seu dinheiro esta indo.",
  "transport": "<br>Parece ter uma saída grande em transporte. Caso esteja gastando muito em manutenção, considere alternativas temporárias até que consiga melhorar seu estado financeiro. Caso esteja gastando com transporte público ou de aplicativo, considere métodos mais baratos.",
  "misc": "<br>Lazer é uma área não crucial, porém mostra uma saída fora de nossa recomendação.",
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

function updateVals(val) {
  let value = (val.currentTarget.value).replace(",", "") //Replace the , with  .
  const valtargetcat = val.currentTarget.parentElement.parentElement.getAttribute('id') //Get the id
  const valtargetident = val.currentTarget.parentElement.getAttribute('identifier') //Get the identifier (different from id)
  const isdeduct = val.currentTarget.parentElement.getAttribute('deduct') //Check if it's the specil deduct field.

  valtable[valtargetcat][valtargetident] = Number.isNaN(val) || value == "" || value < 0 ? 0 : (isdeduct ? -parseFloat(value) : parseFloat(value))
  //God i love ternaries.
  updatePage()
}

function updatePage() {
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
    const total = totals[i];
    let text = ''
    const percent = (i !== "income" && finalvalue !== 0) ? (total / finalvalue * 100).toFixed(1) : '';
    const extra = percent ? ` ${percent}%` : '';
    if (i != 'income') {
      text = `$${total.toLocaleString('us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} | ${extra == "" ? "0.0%" : extra}`
      document.getElementById(`side${i}`).querySelector('p').innerHTML = text
      document.getElementById(`side${i}`).querySelector('p').style.color = percent >= tabWarn[i] && (totfinal < (incomium * 0.15)) ? 'rgb(208, 0, 0)' : 'var(--universalfont)'
      document.getElementById(`side${i}`).querySelector('meter').setAttribute('value', percent)
    }
    document.getElementById(i).querySelectorAll('.cat-end')[0].innerHTML = `Total: $${total.toLocaleString('us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${extra}`;
  }

  document.getElementById('incomef').innerHTML = incomium.toLocaleString('us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  document.getElementById('spendingst').innerHTML = finalvalue.toLocaleString('us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  document.getElementById('finals').innerHTML = totfinal.toLocaleString('us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  if (parseFloat(document.getElementById('finals').innerHTML) < 0) {
    document.getElementById('finals').style.color = 'rgb(255,0,0)'
  }
  else {
    document.getElementById('finals').style.color = 'var(--universalfont)'
  }
  handleWarning()
}

function handleWarning() {
  for (i in valtable) {
    let total = totals[i];
    let percent = (i !== "income" && finalvalue !== 0) ? (total / finalvalue * 100).toFixed(1) : 0;
    if (i !== 'income' && percent >= tabWarn[i] && (totfinal < (incomium * 0.15))) {
      document.getElementById(i).querySelectorAll('.cat-end')[0].style.color = 'rgb(208, 0, 0)'
      document.getElementById(i).querySelectorAll('.cat-end')[0].innerHTML += ` <i class="smalluseless">${listOfWarns[i]}</i>`
    } else {
      document.getElementById(i).querySelectorAll('.cat-end')[0].style.color = 'var(--universalfont)' //didn't actually think this would work lmao
    }
  }
}

updatePage()
