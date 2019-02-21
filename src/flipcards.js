

export default class CardEvents {

  constructor(cards){
    this.cards = cards;
  }

  mouseOver(){
    this.cards.forEach(card => {
      card.addEventListener("mouseover", () => {
        card.classList.toggle("is-flipped", true)
      })
    });
  };
  
  mouseLeave(){
    this.cards.forEach(card => {
      const curCard = card;
      curCard.addEventListener("mouseleave", () => {
        // add a .5 second delay to prevent overlapping with mouseOver
        setTimeout(() => {
          curCard.classList.toggle("is-flipped")
        }, 500);
      });
    });
  };

}