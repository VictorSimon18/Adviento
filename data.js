// Contenido editable de cada día. "foto" = ruta de la imagen; "lista" = elementos (puede ir vacía).
// Opcional: "texto" = mensaje.
const DIAS = {
  3: {
    foto: "img/dia-01.jpg",
    texto: "Este es un regalo que veo necesario para nuestro coche. Esto lo estoy preparando con tiempo, así que espero que tengamos ya la manta, porque este regalo combina muy bien con ella. A ver si te gusta, por lo menos no se te romperá el cuello cuando te duermas.",
    lista: []
  },
  2: {
    foto: "img/dia-02.jpg",
    cubrir: true,
    vale: { ruta: "img/vale-cena.svg", archivo: "vale-cena.png", alt: "Vale por una cena o comida guarra, igual más adelante hay alguna cena mejor... se puede canjear cuando la jefa quiera" },
    texto: [
      "Dentro de este calendario va a haber cosas que te dé en mano y otras virtuales, porque si me tienes que ver 24 días seguidos acabarías hasta la polla de mí.",
      "Pulsa el botón para ver el regalo de hoy."
    ],
    lista: []
  },
  7: {
    foto: "img/dia-03.jpg",
    texto: "Este regalo no sabía bien cómo hacerlo. Primero compré una cosa, luego vi otra y cambié, pero manteniendo la esencia. Creo que puede molar y lo podemos hacer juntos si me dejas.",
    lista: []
  },
  5: {
    foto: "img/dia-04.jpg",
    texto: "Más vale, de verdad, más vale que tengas la boca ya bien como para disfrutar este regalo. Somos unos gordos, así que no va a ser el único regalo relacionado con la comida. Espero que compartas.",
    lista: []
  },
  20: {
    foto: "img/dia-05.jpg",
    vale: { ruta: "img/vale.svg", archivo: "vale-cervezas.png", alt: "Vale por varias cervezas o tintos (un solo uso, bueno, o varios)" },
    texto: [
      "Hoy es domingo y coincide con que hacemos 9 putos meses, así que ¿qué mejor regalo que irnos a echar unas cervezas o unos tintos para celebrarlo?",
      "Pulsa el botón para descargarte el vale."
    ],
    lista: []
  },
  6: {
    foto: "img/dia-06.jpg",
    texto: "Hacer 24 regalos no es fácil, y más a ti que nunca quieres nada, así que he tenido que pensar muchas chorradas y creo que esta te va a molar.",
    lista: []
  },
  1: {
    foto: "img/dia-07.jpg",
    texto: [
      "Empezamos el calendario con… este regalo creo que me va a gustar más a mí que a ti.",
      "Sé que es una frikada, pero hacer 24 regalos sin gastarme 2000 euros no es fácil, y para algo me tiene que servir saber programar.",
      "Así que ahora me dejas el móvil y 5 minutos y te enseño tu séptimo regalo."
    ],
    lista: []
  },
  8: {
    foto: "img/dia-08.jpg",
    texto: "Seguimos con los regalos de comida. Hace poco me hiciste una tú y la quiero intentar mejorar, a ver si adivinas el sabor.",
    lista: []
  },
  9: { foto: "img/dia-09.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  10: {
    foto: "img/dia-10.jpg",
    vale: { ruta: "img/vale-peli.svg", archivo: "vale-peli.png", alt: "Vale por una peli, para cuando salga una peli guapa en el cine" },
    texto: "Hoy no creo que nos veamos, así que el regalo es más chill. Guárdatelo para cuando salga una peli guapa en el cine.",
    lista: []
  },
  11: {
    foto: "img/dia-11.jpg",
    texto: "Creo que este te va a molar. De algo sirve entrar a la tienda Lego siempre que pasamos por delante.",
    lista: []
  },
  12: {
    foto: "img/dia-12.jpg",
    texto: "Según tú yo no quería jugar a esto, pero me parece guay, la pena es que soy más listo que tú y te aburrirías.",
    lista: []
  },
  13: { foto: "img/dia-13.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  14: {
    foto: "img/dia-14.jpg",
    texto: "En algún momento te tendrás que acabar la colección, y como con el bono cultural no te lo compraste, te lo regalo yo.",
    lista: []
  },
  15: {
    foto: "img/dia-15.jpg",
    texto: "Como el último que te compré fue un poco pocho, este es mejor. Espero que te entre bien en el dedo.",
    lista: []
  },
  16: { foto: "img/dia-16.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  17: { foto: "img/dia-17.jpg", lista: ["Elemento 1", "Elemento 2", "Elemento 3"] },
  18: {
    foto: "img/dia-18.jpg",
    texto: "Este regalo lo vamos a guardar hasta que tengamos nuestra casa, va a ser nuestro primer adorno navideño.",
    lista: []
  },
  19: {
    foto: "img/dia-19.jpg",
    texto: [
      "Ya te regalé una de estas para tu cumple. Esta vez viene sin mensaje ñoño por detrás para que no te dé lache, ponerla en tu habitación.",
      "Es una de mis fotos favoritas contigo."
    ],
    lista: []
  },
  4: {
    foto: "img/dia-20.jpg",
    texto: [
      "Cuando empecé a salir contigo dejé la ludopatía, pero este regalo tiene que ver con ella (en mayor o menor medida).",
      "Sé que igual no hace mucha gracia acabar la colección así, pero tenía que hacerlo."
    ],
    lista: []
  },
  21: {
    foto: "img/dia-21.jpg",
    texto: "Como sigo sin ser un experto en maquillaje, aunque cada vez sé más, prefiero regalarte esto, ya iremos un día a gastarla.",
    lista: []
  },
  22: {
    foto: "img/dia-22.jpg",
    texto: [
      "El regalo de hoy es algo que se me hace difícil regalarte porque me da mucha vergüenza. Espero que nos podamos ver esta tarde y te lo pueda dar, si no otro día.",
      "Cuando estés en el coche abre el maletero y lo tendrás."
    ],
    lista: []
  },
  23: {
    foto: "img/dia-23.jpg",
    vale: { ruta: "img/vale-sushi.svg", archivo: "vale-sushi.png", alt: "Vale por sushi, a ver si consigues que me guste y no me ponga malo otra vez" },
    texto: [
      "Igual este es uno de los regalos que más ilusión te hace, pero yo tengo poca gana, pero por ti lo que sea.",
      "Úsalo y un día vamos al Carrefour, al Costco o a algún buffet y a ver si consigues que me guste y no me ponga malo otra vez."
    ],
    lista: []
  },
  24: {
    foto: "img/dia-24.jpg",
    texto: [
      "Último regalo del año, quería que fuera algo especial que te recordase a mí, espero poder verte hoy y dártelo.",
      "Te amo."
    ],
    lista: []
  }
};
