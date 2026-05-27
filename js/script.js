const cursor =
document.querySelector('.cursor');

window.addEventListener('mousemove',(e)=>{

  cursor.style.left =
  e.clientX + 'px';

  cursor.style.top =
  e.clientY + 'px';

});


window.addEventListener('scroll',()=>{

  const scrollTop =
  document.documentElement.scrollTop;

  const scrollHeight =
  document.documentElement.scrollHeight -
  document.documentElement.clientHeight;

  const progress =
  (scrollTop / scrollHeight) * 100;

  document.querySelector('.progress-bar')
  .style.width = progress + '%';

});

/* SEARCH POPUP */

const searchIcon =
document.querySelector('.search-icon');

const searchPopup =
document.querySelector('.search-popup');


searchIcon.addEventListener('click',()=>{

  searchPopup.classList.toggle('active');

});

/* =========================

   DYNAMIC CART SYSTEM

========================= */

const cartCount =
document.querySelector('.cart-count');

const cartSidebar =
document.querySelector('.cart-sidebar');

const cartIcon =
document.querySelector('.cart-icon');

const closeCart =
document.querySelector('.close-cart');

const cartItems =
document.querySelector('.cart-items');

const addCartButtons =
document.querySelectorAll('.add-cart');


/* LOCAL STORAGE */

let cart =
JSON.parse(localStorage.getItem('rsCart')) || [];


/* UPDATE CART UI */

function updateCart(){


  /* COUNT */

  cartCount.innerText = cart.length;


  /* CLEAR */

  cartItems.innerHTML = '';


  /* EMPTY CART */

  if(cart.length === 0){

    cartItems.innerHTML = `

      <p class="empty-cart">

        Cart is Empty

      </p>

    `;

  }


  /* CREATE ITEMS */

  cart.forEach((item,index)=>{

    const div =
    document.createElement('div');

    div.classList.add('cart-item');


    div.innerHTML = `

      <span>${item}</span>

      <button class="remove-item">

        ✕

      </button>

    `;


    cartItems.appendChild(div);

  });


  /* SAVE */

  localStorage.setItem(
    'rsCart',
    JSON.stringify(cart)
  );


  /* REMOVE ITEM */

  const removeButtons =
  document.querySelectorAll('.remove-item');


  removeButtons.forEach((btn,index)=>{

    btn.addEventListener('click',()=>{

      cart.splice(index,1);

      updateCart();

    });

  });

}


/* ADD TO CART */

addCartButtons.forEach((btn)=>{

  btn.addEventListener('click',()=>{


    const product =
    btn.parentElement
    .querySelector('h2')
    .innerText;


    cart.push(product);


    updateCart();


    /* BUTTON EFFECT */

    btn.innerText = "Added ✓";

    btn.style.background = "#22c55e";


    setTimeout(()=>{

      btn.innerText = "Add To Cart";

      btn.style.background = "#ff6b00";

    },1500);

  });

});


/* INITIAL LOAD */

updateCart();


/* OPEN CART */

cartIcon.addEventListener('click',()=>{

  cartSidebar.classList.add('active');

});


/* CLOSE CART */

closeCart.addEventListener('click',()=>{

  cartSidebar.classList.remove('active');

});