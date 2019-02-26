

export default class CardEvents {

  constructor(cards){
    this.cards = cards;
  }

  mouseClick(){
    this.cards.forEach(card => {
      card.addEventListener("click", () => {
        card.classList.toggle("is-flipped")
      })
    });
  };

}