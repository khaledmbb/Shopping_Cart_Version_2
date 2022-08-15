const priceCont = document.querySelector('.will-click'),
  popup = document.querySelector('.popup'),
  categories = document.querySelectorAll(".category ul li"),
  boxes = document.querySelectorAll('.boxes .box'),
  popB = document.querySelector('.popup .body'),
  lengthOfItems = document.querySelector('.num-of-items p'),
  total = document.querySelector('.total'),
  length = document.querySelector('.length'),
  lengthTax = document.querySelector('.length-tax'),
  checkBtn = document.querySelector('.price-is button'),
  cont1 = document.querySelectorAll('.cont-1'),
  cont2 = document.querySelector('.cont-2'),
  items = document.querySelector('.pay .items'),
  productError = document.querySelector('.pay .pro_error'),
  totalEnd = document.querySelector('.end p'),
  continueShopping = document.querySelector('.pay .con')

let arr = [];

if (localStorage.getItem('items')) {
  document.querySelectorAll('.body .pp').forEach(el => {
    el.remove()
  })
  arr = JSON.parse(localStorage.getItem('items'))
  lengthOfItems.innerHTML = arr.length
  setItems(arr)
}

priceCont.addEventListener('click', () => {
  priceCont.classList.toggle('show-pop')
  if (priceCont.classList.contains('show-pop')) {
    popup.style.display = 'block'
  } else {
    popup.style.display = 'none'
  }
})

categories.forEach(el => {
  el.addEventListener('click', () => {
    categories.forEach(ele => {
      ele.classList.remove('active')
    })
    el.classList.add('active')
    boxes.forEach(ele => {
      ele.classList.contains(el.dataset.type) ? ele.style.display = 'block' :
        ele.style.display = 'none'
    })
  })
})

class Items {
  constructor(imgSrc, brandName, price, id) {
    this.img = imgSrc
    this.bName = brandName
    this.price = price
    this.id = id
  }
}

boxes.forEach(el => {
  const cartBtn = el.querySelector('.cart')
  const price = el.querySelector('.price p span').innerHTML
  const bName = el.querySelector('.price').dataset.name
  const img = el.querySelector('img').src
  const before = el.querySelector('.before p')
  const popupBody = popup.querySelector('.body')

  cartBtn.addEventListener('click', (e) => {
    const id = Date.now()
    let item = new Items(img, bName, price, id)
    arr.push(item)
    e.target.innerHTML = '&#x2714; Cart'
    before.innerHTML++
    popupBody.innerHTML = ''
    lengthOfItems.innerHTML = arr.length
    setItems(arr)
    setItemsInStorage(arr)
  })
})

function setItemsInStorage(arr) {
  window.localStorage.setItem('items', JSON.stringify(arr))
}

function setItems(arr) {
  arr.forEach(ele => {
    let child = document.createElement('div')
    child.className = 'child'
    child.id = ele.id
    child.innerHTML = `<img src="${ele.img}"><div class="flex"><p>${ele.bName}</p><p>&#x20AC; ${ele.price}</p></div><div class="delete"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="4" y1="7" x2="20" y2="7"></line>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
    </svg></div>`
    popB.appendChild(child)
    let deleted = document.querySelectorAll('.delete')

    calcTotal(arr)

    deleted.forEach(el => {
      el.addEventListener('click', () => {
        removeFromArr(el.parentElement.id)
        el.parentElement.remove()
      })
    })
  })
}

function removeFromArr(id) {
  arr = arr.filter(el => el.id != id)
  lengthOfItems.innerHTML = arr.length
  setItemsInStorage(arr)
  calcTotal(arr)
  if (arr.length == 0) {
    popB.innerHTML = `<p class="pp">YOUR SHOPPING BAG IS EMPTY.</p><p class="pp">START SHOPPING!</p>`
    productError.style.display = 'block'
  }
}

function calcTotal(arr) {
  let num = 0;
  arr.forEach(el => {
    num += +el.price;
  })
  total.innerHTML = num.toFixed(2)
  length.innerHTML = arr.length
  lengthTax.innerHTML = arr.length * 0.44

}

checkBtn.addEventListener('click', () => {
  cont1.forEach(el => {
    el.classList.add('remove')
  })
  cont2.style.display = 'block'
  setItemsInCheck()
})

function setItemsInCheck() {

  productError.style.display = 'none'
  arr.forEach((ele) => {
    let child = document.createElement('div')
    child.className = 'item'
    child.id = ele.id
    child.innerHTML = `<div class="image">
            <img src="${ele.img}" alt="">
          </div>
          <div class="name">
            <p>${ele.bName}</p>
          </div>
          <div class="price">
            <p>&#x20AC;${ele.price}</p>
          </div>
          <div class="quantity">
            <p><span class="quantity-num">1</span></p>
          </div>
          <div class="trash"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"
              width="24" height="24" viewBox="0 0 24 24" stroke-width="1.3" stroke="currentColor" fill="none"
              stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="4" y1="7" x2="20" y2="7"></line>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
            </svg>
          </div>`
    items.appendChild(child)

    let trash = document.querySelectorAll('.pay .trash')
    trash.forEach(el => {
      el.addEventListener('click', () => {
        removeFromArr(el.parentElement.id)
        el.parentElement.remove()
      })
    })
    totalEnd.innerHTML = `TOTAL : ${arr.length} X &#x20AC;${total.innerHTML}`
  })
}

continueShopping.addEventListener('click', () => {
  cont1.forEach(el => {
    el.classList.remove('remove')
  })
  cont2.style.display = 'none'
  setItems(arr)
})