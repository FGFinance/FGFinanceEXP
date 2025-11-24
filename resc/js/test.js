const yearlyrate = 14.9
const months = 12
const monthlyrate = (1+yearlyrate)/12-1
const inv = 5
let final = 0
const finrate = monthlyrate*months
let TAXES = 0.96
for(let i = 0; i < 29; i+=months/30){
  if(i >= 30) return
  TAXES-=0.03 
}
if(TAXES < 0) TAXES = 0
final = (inv*(finrate/100))
console.log(inv+final)
console.log(final)
console.log(TAXES)