// Contenido editable de cada día. "foto" = ruta de la imagen; "lista" = elementos (puede ir vacía).
// Opcional: "texto" = mensaje.
const DIAS = {
  1: {
    foto: "img/dia-01.jpg",
    texto: "Empezamos este calendario con un regalo que veo necesario para nuestro coche. Esto lo estoy preparando con tiempo, así que espero que tengamos ya la manta, porque este regalo combina muy bien con ella. A ver si te gusta, por lo menos no se te romperá el cuello cuando te duermas.",
    lista: []
  },
  2: {
    foto: "img/dia-02.jpg",
    vale: { ruta: "img/vale-cena.svg", archivo: "vale-cena.png", alt: "Vale por una cena o comida guarra, igual más adelante hay alguna cena mejor... se puede canjear cuando la jefa quiera" },
    texto: [
      "Dentro de este calendario va a haber cosas que te dé en mano y otras virtuales, porque si me tienes que ver 24 días seguidos acabarías hasta la polla de mí.",
      "Pulsa el botón para ver el regalo de hoy."
    ],
    lista: []
  },
  3: { foto: "img/dia-03.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  5: {
    foto: "img/dia-04.jpg",
    texto: "Más vale, de verdad, más vale que tengas la boca ya bien como para disfrutar este regalo. Somos unos gordos, así que no va a ser el único regalo relacionado con la comida. Espero que compartas.",
    lista: []
  },
  20: {
    foto: "img/dia-05.jpg",
    vale: { ruta: "img/vale.svg", archivo: "vale-cervezas.png", alt: "Vale por varias cervezas o tintos (un solo uso, bueno, o varios)" },
    texto: [
      "Hoy es domingo y coincide con que hacemos 10 putos meses, así que ¿qué mejor regalo que irnos a echar unas cervezas o unos tintos para celebrarlo?",
      "Pulsa el botón para descargarte el vale."
    ],
    lista: []
  },
  6: { foto: "img/dia-06.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  7: {
    foto: "img/dia-07.jpg",
    texto: [
      "Este regalo creo que me va a gustar más a mí que a ti.",
      "Sé que es una frikada, pero hacer 24 regalos sin gastarme 2000 euros no es fácil, y para algo me tiene que servir saber programar.",
      "Así que ahora me dejas el móvil y 5 minutos y te enseño tu séptimo regalo."
    ],
    lista: []
  },
  8: { foto: "img/dia-08.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  9: { foto: "img/dia-09.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  10: { foto: "img/dia-10.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  11: { foto: "img/dia-11.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  12: { foto: "img/dia-12.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  13: { foto: "img/dia-13.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  14: { foto: "img/dia-14.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  15: { foto: "img/dia-15.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  16: { foto: "img/dia-16.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  17: { foto: "img/dia-17.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  18: { foto: "img/dia-18.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  19: { foto: "img/dia-19.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  4: {
    foto: "img/dia-20.jpg",
    texto: [
      "Cuando empecé a salir contigo dejé la ludopatía, pero este regalo tiene que ver con ella (en mayor o menor medida).",
      "Sé que igual no hace mucha gracia acabar la colección así, pero tenía que hacerlo."
    ],
    lista: []
  },
  21: { foto: "img/dia-21.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  22: {
    foto: "img/dia-22.jpg",
    texto: [
      "El regalo de hoy es algo que se me hace difícil regalarte porque me da mucha vergüenza. Espero que nos podamos ver esta tarde y te lo pueda dar, si no otro día.",
      "Cuando estés en el coche abre el maletero y lo tendrás."
    ],
    lista: []
  },
  23: { foto: "img/dia-23.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  24: { foto: "img/dia-24.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] }
};
