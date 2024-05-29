const img1 = document.querySelector(".img1");
const img2 = document.querySelector(".img2");
const img3 = document.querySelector(".img3");

const img1Text = document.querySelector(".img1 h1");
const img2Text = document.querySelector(".img2 h1");
const img3Text = document.querySelector(".img3 h1");


document.onscroll = ()=>{
    const scrollVal = window.scrollY;



    if (scrollVal < (img1.clientHeight/2)-(img1Text.clientHeight/2)) {
        img1Text.style.transform =  `translate(0px, ${scrollVal}px)`;
    }

    if (scrollVal>img1.clientHeight && scrollVal < (img2.clientHeight/2)-(img2Text.clientHeight/2) + img1.clientHeight) {
        img2Text.style.transform =  `translate(0px, ${scrollVal-img1.clientHeight}px)`;
    }

    if (scrollVal>img1.clientHeight+img2.clientHeight && scrollVal < (img3.clientHeight/2)-(img2Text.clientHeight/2) + img2.clientHeight+ img1.clientHeight) {
        img3Text.style.transform =  `translate(0px, ${scrollVal-img2.clientHeight-img1.clientHeight}px)`;
    }

}