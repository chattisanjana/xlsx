let S = (n) => (a=Math.floor(n/26)) >= 0 ? S(a-1) + String.fromCharCode(65+(n%26)) : '';
// test Cases
console.log("1",S(1-1))
console.log("26",S(26-1))
console.log("27",S(27-1))
console.log("16384",S(16384-1))
let col = 3
let row = 3
let leftarray = []
let buttomArr = []
for(i=0;i<row-1;i++){
    leftarray.push(`${S(row-1)}${i+1}`)
}
for(i=0;i<col-1;i++){
    buttomArr.push(`${S(i)}${row}`)
}
let corner = `"${S(col-1)+row}"`
console.log(leftarray)
console.log(buttomArr)
console.log(corner)
