const yearlyrate = 14.9
const months = 12
const monthlyrate = yearlyrate/12
const inv = 12
const adder = 0
let buildup = inv
let buildup2 = 0
const finrate = monthlyrate*months
if(months >= 24){
  TAXES = 0.15
}else if(months >= 12){
  TAXES = 0.175
}else if(months >= 6){
  TAXES = 0.2
}else{
  TAXES = 0.225
}

for(let i = 0; i < months; i++){
  buildup2 += (buildup*(monthlyrate/100))
  buildup += adder
}

console.log(Math.floor((buildup+buildup2)*100)/100)