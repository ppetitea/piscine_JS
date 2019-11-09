class Flashcard {

    constructor(category, question, type, answer)
    {
        let date = new Date;

        this.category = category;
        this.question = question;
        this.type = type;
        this.answer = answer;
        this.creation_date = date.getTime();
        this.next_memorization = date.getTime() + (1000 * 60 * 60 * 24);
        this.repetition_delay = {'day': true, 'week': false, 'month': false, '6months': false} ;
    }

}

export default Flashcard;