
const createElement = (array) => {
    // console.log(array)
    const newElement = array.map((a) =>{
        if(a == 'good'){
         return `<div class="good">${a}</div>`
        }
        else{
          return `<div class="notgood">${a}</div>`
        }
    } )
    console.log(newElement)
}


const dataArry = ['good', 'best', 'better']
createElement(dataArry)