window.onscroll = function allScrollFunction(){
    moveCoffeeBean ();
    handleRotate ();
    groundCoffee();
    filterPosition();
    coffeeInFilter ();
    moveCoffeeFilter ();
    coffeeInPot();
    rotatePot();
    coffeeTrail();
    moveCup ();
    viewWave ();
    resizeHideText ();
};
window.onresize= function (){
    moveCoffeeBean ();
    handleRotate ();
    groundCoffee();
    filterPosition();
    coffeeInFilter ();
    moveCoffeeFilter ();
    resizeHideText ();
};


// рух зернята
function moveCoffeeBean (){
    var items = document.getElementById("items"); // потим винести в окрему ф-ю
    var coffeeBean = items.querySelector('.coffee-bean');
    var scroll = window.pageYOffset;


    if (scroll>=300 && scroll<906) {
        coffeeBean.style.position = 'fixed';
        coffeeBean.style.top = 250 +'px';
        coffeeBean.style.left = (items.offsetWidth/2 - (coffeeBean.offsetWidth/2)) + 'px';
    }else if (scroll<=300){
        coffeeBean.style.position = 'relative';
        coffeeBean.style.top = 530 +'px';
        coffeeBean.style.left = 0+ 'px';
    }
    else if (scroll >= 906 && scroll <= 1050) {
            coffeeBean.style.position = 'relative';
            coffeeBean.style.top = 1150 + 'px';
            coffeeBean.style.left = 0+ 'px';

} else if (scroll> 1050 && scroll<1700){
        coffeeBean.style.position = 'fixed';
        coffeeBean.style.top = 90 +'px';
        coffeeBean.style.left = (items.offsetWidth/2 - (coffeeBean.offsetWidth/2)) + 'px';
   }
    else if (scroll> 1700){
        coffeeBean.style.position = 'relative';
        coffeeBean.style.top = 1700 + 'px';
        coffeeBean.style.left = 0 + 'px';
    }

}
//повоорот ручки
function handleRotate (){
    var items = document.getElementById("items");
    var handle = items.querySelector('.g-handle');
    var a;
    var scroll = window.pageYOffset;
    if (scroll> 1565 && scroll<1865){

        a = (scroll-1565)*1.2;
        handle.style.transform = 'rotate(' + a +'deg)';}
    else if (scroll>1865 || scroll<1565){
        handle.style.transform = 'rotate(' + 0 +'deg)';}


}
// падіння молотих зерен
function groundCoffee(){
    var items = document.getElementById("items");
    var coffeeGround = items.querySelector('.coffee-ground');

    var scroll = window.pageYOffset;
    coffeeGround.style.left = ((items.offsetWidth / 2) - (coffeeGround.offsetWidth / 2)) + 'px';

     if(scroll<1720){
        coffeeGround.style.opacity = 0;
        coffeeGround.style.zIndex = 9;
        coffeeGround.style.display = 'block';

    } else if (scroll>1720 && scroll<3250){
    coffeeGround.style.position = 'fixed';
    coffeeGround.style.zIndex = 10;
    coffeeGround.style.opacity = 1;
    coffeeGround.style.display = 'block';
    } else if(scroll>3250){
         coffeeGround.style.display = 'none';
     }
}

// позиція фільтра  і інших елементів по центру
function filterPosition() {
    var items = document.getElementById("items");
    var filter = items.querySelector('.filter');
    var filter2 = items.querySelector('.filter2');
    var cup = items.querySelector('.cup-container');
    var coffeeTrail = items.querySelector('.coffee-trail');
    filter.style.left = ((items.offsetWidth / 2) - (filter.offsetWidth / 2)) + 'px';
    filter2.style.left = ((items.offsetWidth / 2) - (filter2.offsetWidth / 2)) + 'px';
    cup.style.left = ((items.offsetWidth / 2) - (cup.offsetWidth / 2)) + 'px';
    var mainDripper = items.querySelector('.main-dripper');
    mainDripper.style.left = ((items.offsetWidth / 2) - (mainDripper.offsetWidth / 2)) + 'px';
    coffeeTrail.style.left = ((items.offsetWidth / 2) - (coffeeTrail.offsetWidth / 2)) + 'px';

}
// падіння зерен  і збір їх у фільтрі
function coffeeInFilter (){
    var items = document.getElementById('items');
    var coffeeOut = items.querySelectorAll('.coffee-ground .ground-coffee');
    var coffeeIn = items.querySelectorAll('.filter .ground-coffee');
    var scroll = window.pageYOffset;
    var vkl;
    var numbA = 0;
    // додатковий захист щоб зернята не змішувались через різну щвидкість
    if (scroll > 2680) {
        vkl = true;
    } else {
        vkl = false
    }

// перебір кожного зерна
  for (var i = 0; i<coffeeOut.length; i++ ){
      var a = coffeeOut[i].getBoundingClientRect();
      var outTop = a.top;
      var outBottom = a.bottom;

    for (var s = 0; s<coffeeIn.length; s++ ){
        var f = coffeeIn[i].getBoundingClientRect();
        var inTop = f.top;
        var inBottom = f.bottom;

    if (inTop <= outTop && inBottom <= outBottom || vkl){
        coffeeIn[i].classList.add('show1');
        coffeeOut[i].classList.add('hide1');
        numbA = numbA+1;

    }
    else if (inTop >= outTop && inBottom >= outBottom ){
            coffeeIn[i].classList.remove('show1');
            coffeeOut[i].classList.remove('hide1');
       }
  }
  }

}
// рух фільтра до чайника
function moveCoffeeFilter (){
    var items = document.getElementById('items');
    var filter = items.querySelector('.filter');
    var filter2 = items.querySelector('.filter2');
    var coffeeGround = items.querySelector('.coffee-ground');
    var filterInside = items.querySelector('.filter-inside');
    var scroll = window.pageYOffset;
    var scaleF;


    var numA = (scroll-2680)*2; // пришвидшення фільтра в 2 рази
    if (scroll>2680 && scroll<2980){
        scaleF = 1-(scroll-2680)*0.001;
        filter.style.top = 2700 + numA + 'px';
        filter.style.transform = "scale("+scaleF+" , "+scaleF+")";
        filter.style.zIndex = '10';
        filter.classList.remove('hide1');
        filter2.classList.add('hide2');
        filterInside.classList.remove('show1');

     } else if (scroll <2680){
        filter.style.top = 2700 + 'px';
        filter.style.zIndex = 'auto';
        filter.style.transform = "scale("+1+" , "+1+")";
        filter2.classList.remove('hide2');




    } else if (scroll>2980){
        filter.classList.add('hide1');
        filterInside.classList.add('show1');
    }
}
// наповнення кавою чайника
function coffeeInPot(){
    var scroll = window.pageYOffset;
    var potMaskRect = document.getElementById('pot-mask-rect');
    var atrb;
    if (scroll>3000 && scroll < 3140){
        atrb =140 - ( scroll-3000);

    }
    else if (scroll>3140){
        atrb = 0;
    }
    else {atrb = 140;}
    potMaskRect.setAttribute('y',atrb);
}
// поворот чайника
function rotatePot (){
    var degA;
    var scroll = window.pageYOffset;
    var items = document.getElementById('items');
    var mainDripper = items.querySelector('.main-dripper');

    if (scroll>3150 && scroll<3250){
       degA = 360 - (scroll - 3150)*0.6;
       mainDripper.style.transform = 'rotate(' + degA +'deg)' ;
    } else if(scroll <3150) {
        mainDripper.style.transform = 'rotate(' + 0 +'deg)';
    }else {mainDripper.style.transform = 'rotate(' + 300 +'deg)'
    ;}

}
// рух струи кави в чашку
function coffeeTrail(){
    var scroll = window.pageYOffset;
    var coffeeMaskRect = document.getElementById('coffee-mask-rect');
    var atrb;
    var heig1;
    if (scroll>3250 && scroll < 3925){

        heig1 = (scroll-3250)*1.2;
        if (heig1>270){
            atrb = (heig1-270)*1.2;
        }else {atrb = 0;}


    }
    else if (scroll>3925){
        atrb = 450;
        heig1 = 400;
    }else {atrb = 0;
    heig1 = 0;
    }
    coffeeMaskRect.setAttribute('y',atrb);
    coffeeMaskRect.setAttribute('height',heig1);
}
// рух чашки
function moveCup (){
    var cupTop;
    var scroll = window.pageYOffset;
    var items = document.getElementById('items');
    var cup = items.querySelector('.cup-container');
   if (scroll>3840 && scroll<4740){
       cupTop = 4243 + (scroll-3840);
       cup.style.top = cupTop + 'px';
   } else if(scroll<3840){
       cup.style.top = 4243 +'px';
   } else {
       cup.style.top = 5143 +'px';
   }
}
// показуємо пару
function viewWave (){
    var waveBot;
    var scroll = window.pageYOffset;
    var items = document.getElementById('items');
    var wave = items.querySelector('.wave');
    if (scroll>4460 && scroll< 4700){
        waveBot = 10+(scroll-4460)*0.541666;
        wave.style.bottom = waveBot + 'px';
    } else if (scroll<4460){
        wave.style.bottom= 10 + 'px';
    }else { wave.style.bottom= 140  + 'px';}
}

// Показуємо та ховаємо текст
function resizeHideText () {
    var wrapper1 = document.getElementById('wrapper');
    var hideText = wrapper1.querySelector('.hide-text');
var heightW = document.documentElement.clientHeight;
var widthW = document.documentElement.clientWidth;
    hideText.style.height = heightW + 'px';
    hideText.style.width = widthW + 'px';
}
// захований текст по ссилкам
function clickUncor (){
    var all = document.getElementById('all');
    var elements = all.querySelectorAll('a');

  for(var i =0; i<elements.length; i++) {

     elements[i].onclick = function(event){
         var idNumber =  event.currentTarget.getAttribute('href');

        var arr = idNumber.split('');
         var arrDel =  arr.shift();
         var arr2 = arr.join('');
         var id = document.getElementById(arr2);
        id.classList.add('in');

        }
     }

}

clickUncor();

function hideElem (event){
   event.currentTarget.parentElement.classList.remove('in');

}