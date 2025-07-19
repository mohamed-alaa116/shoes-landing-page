let cart = []; // مصفوفة لتخزين المنتجات

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  updateCart();        // تعرض محتوى السلة
  updateCartCount();   // تعرض العدد
}


let productSlides = document.querySelectorAll("#carouselWomen .carousel-item")


productSlides.forEach((slide , index)=>{
    let img=slide.querySelector("img")
    let price = slide.querySelector("span")
})



function addToCartFromCarousel(carouselId) {
  let activeSlide = document.querySelector(`#${carouselId} .carousel-item.active`);

  if (activeSlide) {
    let img = activeSlide.querySelector("img").src;
    let price = activeSlide.querySelector("span").textContent;

    let productIndex=cart.findIndex(item=>item.img===img)
    if(productIndex !== -1){
      cart[productIndex].quantity++
    }else{

    let product = {
      img: img,
      price: price,
      quantity:1,
    };

    cart.push(product);
  }}


    let modal = document.querySelector(`#${carouselId}`).closest('.modal');
    let addButton = modal.querySelector('button.btn.btn-primary');
    if (addButton) {
      addButton.textContent = 'Added ✅';
      addButton.disabled = true;
    }

  updateCart();
  updateCartCount();
  localStorage.setItem("cart", JSON.stringify(cart));

}




// للكاروسيل بتاع الرجال
let menCarousel = document.querySelector('#carouselMen');
menCarousel.addEventListener('slide.bs.carousel', function () {
  let modal = menCarousel.closest('.modal');
  let addButton = modal.querySelector('button.btn.btn-primary');
  if (addButton) {
    addButton.textContent = 'Add to cart';
    addButton.disabled = false;
  }
});

// وللنساء نفس الفكرة
let womenCarousel = document.querySelector('#carouselWomen');
womenCarousel.addEventListener('slide.bs.carousel', function () {
  let modal = womenCarousel.closest('.modal');
  let addButton = modal.querySelector('button.btn.btn-primary');
  if (addButton) {
    addButton.textContent = 'Add to cart';
    addButton.disabled = false;
  }
});



function updateCart(){
    let cartContainer = document.querySelector("#offcanvasDark .offcanvas-body");

    cartContainer.innerHTML="";

    if(cart.length==0){
        cartContainer.innerHTML = "<p>No Items Yet.</p>";

        return;
    }

    AllItemHTML = "";
    

    cart.forEach((item,index)=>{
        let cleanPrice = parseFloat(item.price.replace(/[^\d.]/g, ""));
        let itemHTML=`
        <div class="w-100 ">
        <div class="d-flex justify-content-between align-items-center position-relative mb-2">
        <img src=${item.img} class="img-fluid w-25">
        <p class="p-2">quantity :${item.quantity}</p>
        <p class="p-2">price :${cleanPrice*item.quantity}</p>
        
        <button onclick="removeFromCart(${index})"
          style="background: none; border: none; font-size: 20px; color: red; cursor: pointer;position:absolute; top:-10px; right:-10px;">❌</button></div>

          <div class=" mx-auto w-50 d-flex justify-content-center">
            <button class="btn btn-primary" onclick="increase(${index})">+</button>
            <p class="fs-5 m-2">${item.quantity} units</p>
            <button class="btn btn-primary"  onclick="decrease(${index})">-</button>
          </div>

            <div class="w-100">
                <hr class="text-primary mt-3 mb-1">
            </div>
        </div>
        `
    AllItemHTML += itemHTML;
  });

  // ✅ أضف التوتال برايس بعد اللوب
  AllItemHTML += `
    <div class="total-price mt-3 p-3 border-top text-end">
      <h5>Total Price: <span class="text-danger">${calculateTotalPrice().toFixed(2)}</span></h5>
    </div>
  `;

  cartContainer.innerHTML = AllItemHTML;
  updateCartCount();
}



function removeFromCart(index) {
  cart.splice(index, 1); // احذف المنتج من المصفوفة
  updateCart();          // حدّث السلة بعد الحذف
  updateCartCount()
  localStorage.setItem("cart", JSON.stringify(cart));

}

function updateCartCount() {
  let cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    // اجمع الكمية الكلية لكل المنتجات
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerHTML = totalCount;
  }
  calculateTotalPrice()
}

function calculateTotalPrice() {
  return cart.reduce((total, item) => {
    let price = parseFloat(item.price.replace(/[^\d.]/g, ""));
    return total + price * item.quantity;
  }, 0);
}


function increase(index){
    cart[index].quantity++
    updateCart()
    updateCartCount()
    localStorage.setItem("cart", JSON.stringify(cart));

}

function decrease(index){
    if(cart[index].quantity>1){
        cart[index].quantity--
    }else{
        cart.splice(index, 1);
    }
    updateCart()
    updateCartCount()
    localStorage.setItem("cart", JSON.stringify(cart));


}




window.addEventListener('load', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.width = '100%';
  }
});
