let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function () {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCart();
  updateCartCount();
 updateBuyNowButtonsState(); 
});


function updateBuyNowButtonsState() {
  let allSlides = document.querySelectorAll(".swiper-slide");

  allSlides.forEach(slide => {
    let img = slide.querySelector("img");
    let proName = slide.querySelector("p:nth-of-type(1)");
    let btn = slide.querySelector(".By-Now-Btn");

    if (img && proName && btn) {
      let isInCart = cart.some(item => item.img === img.src && item.proName === proName.textContent);
      if (isInCart) {
        btn.disabled = true;
        btn.innerHTML = "Added";
      } else {
        btn.disabled = false;
        btn.innerHTML = "Buy Now";
      }
    }
  });
}



document.addEventListener("click", function(e) {
  if(e.target.classList.contains("By-Now-Btn")){
    let card = e.target.closest(".swiper-slide")
    let img =card.querySelector("img").src
    let price= card.querySelector("p:nth-of-type(2)").textContent;
    let proName= card.querySelector("p:nth-of-type(1)").textContent
    e.target.disabled="true"
    e.target.innerHTML="Added"
    addToCart(img, price,proName)
    updateCart()
  }
  localStorage.setItem("cart", JSON.stringify(cart));
})




function addToCart(img , price,proName){
  
  let existingpro=cart.find(item=>item.img===img)
  if(existingpro){
    existingpro.quantity++
  }else{
    cart.push({
      img:img,
      price:price,
      quantity:1,
      proName:proName,
    })
  }

  updateCartCount()
   localStorage.setItem("cart", JSON.stringify(cart));
}

let container=document.querySelector(".offcanvas-body")

function updateCart(){
  if(cart.length==0){
    container.innerHTML=`You Have No Products`
  }else{
    let html=``;

    let totalPrice = cart.reduce((total, item) => {
  let price = parseFloat(item.price); // تأكد أن السعر رقم
  return total + (price * item.quantity);
}, 0);

    cart.forEach((item ,index)=>{ html+=
      `
      <div class=" m-2 p-2" style="border:2px #d35400 solid; border-radius:10px;position:relative">
        <div class="d-flex justify-content-between align-items-center">
        <div>
        <img src="${item.img}" class="w-50">
        <p>${item.proName}</p>
        </div>

        <div>
        <b style="color:#d35400">price :</b> <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
        <b style="color:#d35400">Quantity :</b> <span>${item.quantity} </span>       
        </div>
        </div>
        <button class="btn btn-danger" style=" font-size:10px; position:absolute; top:5px; right:5px;" onclick= removeCardFromTheCart(${index})> X</button>

        <div class="d-flex justify-content-center w-50 mx-auto">
          <button class="btn btn-primary" onclick=increaseCardQuantity(${index})>+</button>
          <b class="fs-5 m-2"> ${item.quantity}</b>
          <button class="btn btn-primary" onclick=decreaseCardQuantity(${index})>-</button>
        </div>

      </div>
    `
    })

        html += `
      <div class="text-center mt-4">
        <b class="fw-bold" style="color:#d35400">Total Price:</b> <span>${totalPrice.toFixed(2)}</span>
      </div>
    `;

    container.innerHTML=html;
  }
  updateCartCount()
   localStorage.setItem("cart", JSON.stringify(cart));
}




function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalItems;
   localStorage.setItem("cart", JSON.stringify(cart));
}


function removeCardFromTheCart(index) {
  // نحفظ المنتج اللي هيتم حذفه علشان نقدر نستخدم بياناته بعد الحذف
  let removedItem = cart[index];

  // نحذفه من السلة
  cart.splice(index, 1);

  // نحدث العرض والسلة
  updateCart();
  localStorage.setItem("cart", JSON.stringify(cart));

// إعادة تفعيل زر "Buy Now" في الكارت الأصلي
let allSlides = document.querySelectorAll(".swiper-slide");

allSlides.forEach(slide => {
  let img = slide.querySelector("img");
  let proName = slide.querySelector("p:nth-of-type(1)");

  if (img && proName && img.src === removedItem.img && proName.textContent === removedItem.proName) {
    let btn = slide.querySelector(".By-Now-Btn");
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = "Buy Now";
    }
  }
});


}


function increaseCardQuantity(index){
  cart[index].quantity++;
  updateCart()
   localStorage.setItem("cart", JSON.stringify(cart));
}

function decreaseCardQuantity(index){
  if(cart[index].quantity > 1){
    cart[index].quantity--;
    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    // قبل الحذف، احفظ العنصر علشان نرجعه في الكارت الأصلي
    let removedItem = cart[index];
    
    // احذف العنصر من السلة
    cart.splice(index, 1);
    
    // حدث العرض
    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));

    // إعادة تفعيل زر "Buy Now" في الكارت الأصلي
    let allSlides = document.querySelectorAll(".swiper-slide");

    allSlides.forEach(slide => {
      let img = slide.querySelector("img");
      let proName = slide.querySelector("p:nth-of-type(1)");

      if (img && proName && img.src === removedItem.img && proName.textContent === removedItem.proName) {
        let btn = slide.querySelector(".By-Now-Btn");
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = "Buy Now";
        }
      }
    });
  }
}






const swiper = new Swiper('.myProductsSwiper', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    550: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
    1400: { slidesPerView: 5 }
  },
  on: {
    init: function () {
      updateBulletsStyle();
    },
    breakpoint: function () {
      updateBulletsStyle();
    },
    slideChange: function () {
      updateBulletsStyle();
    }
  }
});

function updateBulletsStyle() {
  const bullets = document.querySelectorAll('.myProductsSwiper .swiper-pagination-bullet');
  bullets.forEach(bullet => {
    bullet.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    bullet.style.opacity = '1';
  });
}
