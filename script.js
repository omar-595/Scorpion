const uploadInput = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const removeBgBtn = document.getElementById("removeBg");

let img = new Image();

// تحميل الصورة من المدخل
uploadInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function (event) {
        img.onload = function () {
            // ضبط حجم الكانفاس بناءً على حجم الصورة
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
});

// إزالة الخلفية بلون ثابت (أبيض في هذا المثال)
removeBgBtn.addEventListener("click", function () {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // لون الخلفية (أبيض في هذا المثال)
    const threshold = 240; // عتبة اللون الأبيض

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // إذا كان لون البكسل قريبًا من الأبيض، نجعل الألفا صفر (شفاف)
        if (r > threshold && g > threshold && b > threshold) {
            data[i + 3] = 0; // الشفافية
        }
    }

    ctx.putImageData(imageData, 0, 0);
});
