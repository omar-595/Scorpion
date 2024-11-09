const boxes = document.querySelectorAll('.box'); // اختيار جميع الديفات
let currentIndex = 0; // الفهرس الحالي للديف المرئي

// دالة لتحديث عرض الديفات
function updateDisplay() {
  boxes.forEach((box, index) => {
    if (index === currentIndex) {
      box.classList.add('active');
      box.classList.remove('left', 'right');
    } else if (index < currentIndex) {
      box.classList.add('left');
      box.classList.remove('active', 'right');
    } else {
      box.classList.add('right');
      box.classList.remove('active', 'left');
    }
  });
}

// عند الضغط على زر "اليمين"
document.getElementById('rightButton').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % boxes.length; // الانتقال إلى الديف التالي
  updateDisplay();
});

// عند الضغط على زر "الشمال"
document.getElementById('leftButton').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + boxes.length) % boxes.length; // الانتقال إلى الديف السابق
  updateDisplay();
});
// function autoSlide() {
//   currentIndex = (currentIndex + 1) % boxes.length;
//   updateDisplay();
// }
// setInterval(autoSlide, 3000);

window.addEventListener('scroll', reveal);

function reveal() {
  let reveals = document.querySelectorAll('.reveal');

  for (let i = 0; i < reveals.length; i++) {
    let windowheight = window.innerHeight;
    let revealtop = reveals[i].getBoundingClientRect().top;
    let revealpoint = 200;

    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add('active');
    }
    else {
      reveals[i].classList.remove('active');
    }
  }
}