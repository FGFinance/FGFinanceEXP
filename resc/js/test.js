const yearlyrate = 14.9
const months = 24
const monthlyrate = yearlyrate/12
const inv = 12
const adder = 2
let final = 0
let TAXES = 0
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

final = (inv*(finrate/100))
let TAXED = final*TAXES
console.log((inv+final)-TAXED)
console.log(inv+final)
console.log(final)
console.log(TAXED)
console.log(buildup+buildup2)