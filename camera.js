let usingFront = true;
let video = null, canvas = null, ctx = null;
let currentStream = null;

function initCamera(facingMode) {
    const constraints = {
        video: {
            facingMode: facingMode,
            width: 300,
            height: 300
        },
        audio: false
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            // Para o stream anterior se existir
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
            }

            currentStream = stream;
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error("Erro ao acessar a câmera:", err);
        });
}

function switchCamera() {
    usingFront = !usingFront;
    const newFacingMode = usingFront ? "user" : { exact: "environment" };
    initCamera(newFacingMode);
}

function clickPhoto() {
    if (ctx && video) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
}

// Inicializa tudo ao carregar a página
window.onload = function () {
    video = document.querySelector('video');
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');

    initCamera("user"); // inicia com a câmera frontal
};
