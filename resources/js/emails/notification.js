const frasesCuñao = [
    "Ya han pagado todos… menos tú. ¿Te crees el prota o qué?",
    "Eres ese amigo que siempre llega tarde… también al pagar.",
    "Haz el Bizum, que ya estás empezando a oler a moroso digital.",
    "¡Hazte un favor! Paga antes de que te etiqueten en un meme pasivo-agresivo.",
    "No es por el dinero. Es por dejar de mirarte raro en las cenas.",
    "Esto ya no es un recordatorio. Es una intervención.",
    "Tus amigos te quieren. Pero con la deuda pagada, te quieren más.",
    "Ni Hacienda manda tantos avisos. Haz el Bizum y sé libre.",
    "Estás a una deuda de ser eliminado del grupo. Con cariño, eso sí.",
    "Paga ya, o te cambiamos el nombre en el grupo a 'Morosín'.",
    "Pagar es de guapos. Qué casualidad que tú aún no hayas pagado.",
    "Tu deuda ya tiene nombre propio y grupo de WhatsApp. Dale fin.",
    "¿De cuánto es la dolorosa? Porque suena a tu nombre.",
    "No soy supersticioso, pero soy un poco moroso… hasta que pagas.",
    "Como decía Groucho: '¿Pagar la cuenta? ¡qué costumbre tan absurda!'",
    "No soy cuñao todavía… pero pagaría para no ser el primo pesado.",
    "Te van a servir una segunda ronda… de recordatorios.",
    "El Wi-Fi del bar te odia si no pagas.",
    "Si me debes, me debes mutis… y un Bizum.",
    "Te mandaron un audio: 'Paga ya'. Y no era tu madre.",
    "Estás en la lista negra… de los que 'ahora lo hago'.",
    "Aquí cobramos a la vista. Y la vista es tu Bizum."
  ];

  const fraseElegida = frasesCuñao[Math.floor(Math.random() * frasesCuñao.length)];
  document.getElementById("frase-cuñao").innerText = `"${fraseElegida}"`;