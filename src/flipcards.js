

export default class CardEvents {
  constructor(cards){
    this.cards = cards;
  }

  mouseEnter(){
    this.cards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        card.classList.add("is-flipped")
      })
    });
  };
  
  mouseLeave(){
    this.cards.forEach(card => {
      card.addEventListener("mouseleave", () => {
        card.classList = "card";
      })
    });
  };
}