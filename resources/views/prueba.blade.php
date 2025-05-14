<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Prueba</title>
</head>
<body>
<h2>¿Quién paga esta noche?</h2>
<p>Gira la ruleta y deja que el destino decida quién pagará la cuenta esta noche.</p>
<input type="button" value="Girar Ruleta" style="float:left;" id='spin' />
<canvas id="canvas" width="500" height="500"></canvas>

<script>
let options = []; // Inicialmente vacío, se llenará con los usuarios del grupo
let startAngle = 0;
let arc;
let spinTimeout = null;

let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

let ctx;

// Función para obtener los usuarios del grupo desde la API
async function fetchGroupUsers(groupId) {
    try {
        const response = await fetch('/api/getUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: groupId }) // Cambiado a "id"
        });

        if (!response.ok) {
            throw new Error('Error al obtener los usuarios del grupo');
        }

        const data = await response.json();
        options = data.map(user => user.name); // Actualizar el array de opciones con los nombres de los usuarios
        arc = Math.PI / (options.length / 2); // Recalcular el ángulo por segmento
        drawRouletteWheel(); // Redibujar la ruleta con los nuevos datos
    } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los usuarios del grupo.');
    }
}

// Función para convertir valores RGB a color hexadecimal
function byte2Hex(n) {
    const nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}

function RGB2Color(r, g, b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
    const phase = 0;
    const center = 128;
    const width = 127;
    const frequency = Math.PI * 2 / maxitem;

    const red = Math.sin(frequency * item + 2 + phase) * width + center;
    const green = Math.sin(frequency * item + 0 + phase) * width + center;
    const blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return RGB2Color(red, green, blue);
}

function drawRouletteWheel() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const outsideRadius = 200;
        const textRadius = 160;
        const insideRadius = 125;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.font = 'bold 12px Helvetica, Arial';

        for (let i = 0; i < options.length; i++) {
            const angle = startAngle + i * arc;
            ctx.fillStyle = getColor(i, options.length);

            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            ctx.save();
            ctx.fillStyle = "black";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                          250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            const text = options[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }

        // Flecha
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
    }
}

function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px Helvetica, Arial';
    const text = options[index];
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

// Llamar a la función para obtener los usuarios del grupo (reemplaza "groupId" con el ID real del grupo)
fetchGroupUsers("1");

// Agregar evento al botón de girar
document.getElementById('spin').addEventListener('click', spin);

</script>
</body>
</html>