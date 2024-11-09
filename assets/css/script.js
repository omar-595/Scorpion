function convertToWebP() {
  const input = document.getElementById('imageInput').files[0];
  if (!input) return alert("Please select an image!");

  const img = new Image();
  img.src = URL.createObjectURL(input);

  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const webpURL = canvas.toDataURL('image/webp');
    displayConvertedImage(webpURL, 'image/webp');
  };
}

function convertToAVIF() {
  const input = document.getElementById('imageInput').files[0];
  if (!input) return alert("Please select an image!");

  const img = new Image();
  img.src = URL.createObjectURL(input);

  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const avifURL = canvas.toDataURL('image/avif');
    displayConvertedImage(avifURL, 'image/avif');
  };
}

function displayConvertedImage(dataURL, format) {
  const outputImage = document.getElementById('outputImage');
  const downloadLink = document.getElementById('downloadLink');

  outputImage.src = dataURL;
  outputImage.style.display = 'block';

  downloadLink.href = dataURL;
  downloadLink.download = `converted-image.${format.split('/')[1]}`;
  downloadLink.innerText = `Download ${format.split('/')[1].toUpperCase()}`;
  downloadLink.style.display = 'inline';
}

function compressVideo() {
  const input = document.getElementById('videoInput').files[0];
  if (!input) return alert("Please select a video!");

  const reader = new FileReader();
  reader.onload = function (event) {
    const videoData = new Uint8Array(event.target.result);

    const ffmpeg = FFmpeg.createFFmpeg({ log: true });

    ffmpeg.load().then(() => {
      ffmpeg.FS('writeFile', input.name, videoData);
      // يمكن تغيير الإعدادات هنا لتناسب احتياجاتك
      ffmpeg.run('-i', input.name, '-c:v', 'libx264', 'output.mp4').then(() => {
        const data = ffmpeg.FS('readFile', 'output.mp4');
        const outputVideo = document.getElementById('outputVideo');
        const outputBlob = new Blob([data.buffer], { type: 'video/mp4' });
        const outputURL = URL.createObjectURL(outputBlob);

        outputVideo.src = outputURL;
        outputVideo.style.display = 'block';

        const downloadLink = document.getElementById('videoDownloadLink');
        downloadLink.href = outputURL;
        downloadLink.download = 'compressed-video.mp4';
        downloadLink.innerText = 'Download Compressed Video';
        downloadLink.style.display = 'inline';
      });
    });
  };
  reader.readAsArrayBuffer(input);
}
