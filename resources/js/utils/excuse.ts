export const generateRandomExcuse = async() => {
    const excuses = [
      "Me acabo de dar cuenta de que dejé mi cartera en casa.",
      "Mi cuenta bancaria ha sido hackeada esta mañana.",
      "Estoy ahorrando para comprar un unicornio.",
      "Mi gato necesita una operación muy cara.",
      "Acabo de donar todo mi dinero a una ONG de pingüinos.",
      "Mi horóscopo dice que hoy no debo gastar dinero.",
      "Estoy en una relación complicada con mi cuenta bancaria.",
      "Prometí a mi abuela que no gastaría dinero esta semana.",
      "Estoy practicando el minimalismo financiero.",
      "Mi app de banco dice que estoy en modo supervivencia.",
      "Estoy guardando para comprar Bitcoin cuando baje a 1€.",
      "Mi terapeuta me recomendó no pagar cuentas como ejercicio de autocontrol.",
      "Estoy en una huelga personal contra el capitalismo.",
      "Mi economista personal me prohibió gastar hasta el próximo mes.",
      "Acabo de recordar que tengo que pagar el alquiler... de los próximos 6 meses.",
      "Estoy canalizando mi dinero hacia dimensiones alternativas.",
      "Mi cuenta está en cuarentena por sospecha de gastos excesivos.",
      "Juré por Snoopy que no gastaría dinero hoy.",
      "Estoy participando en un experimento científico de abstinencia financiera.",
      "Mi aplicación de presupuesto me ha bloqueado por exceder el límite mensual.",
    ];

    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];

    return randomExcuse
};