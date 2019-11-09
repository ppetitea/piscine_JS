import Flashcard from './../modules/flashcard.mjs'

export function update_category(category_id, category_to_update)
{
    let categories = JSON.parse(localStorage.getItem('categories'));

    categories[category_id] = category_to_update;
    localStorage.setItem('categories', JSON.stringify(categories));
}

export function update_flashcard(flashcard_id, question, type, answer, remaining_days)
{
    let flashcards = JSON.parse(localStorage.getItem('flashcards'));
    let date = new Date;

    flashcards[flashcard_id].question = question;
    flashcards[flashcard_id].type = type;
    flashcards[flashcard_id].answer = answer;
    flashcards[flashcard_id].next_memorization = date.getTime() + (remaining_days * (24 * 60 * 60 * 1000));
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
}
export function save_category(category)
{
    let categories = JSON.parse(localStorage.getItem('categories'));

    if (categories === null)
        categories = [category]
    else
        categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
}

export function save_flashcard(category, question, type, answer)
{
    let flashcard = new Flashcard(category, question, type, answer);
    let flashcards = JSON.parse(localStorage.getItem('flashcards'));

    if (flashcards == undefined)
        flashcards = [flashcard];
    else
        flashcards.push(flashcard);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

export function    delete_flashcard(card_id)
{
    let flashcards = JSON.parse(localStorage.getItem('flashcards'));
    
    flashcards.splice(card_id, 1);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

export function    delete_category(category)
{
    let categories = JSON.parse(localStorage.getItem('categories'));
    let flashcards = JSON.parse(localStorage.getItem('flashcards'));
    
    categories.splice(category.id, 1);
    localStorage.setItem('categories', JSON.stringify(categories));
    if (flashcards != undefined)
    {
        let new_flashcards = [];
        for (const [id, flashcard] of Object.entries(flashcards))
            if (flashcard.category != category.name)
                new_flashcards.push(flashcard);
        localStorage.setItem('flashcards', JSON.stringify(new_flashcards));
    }
}

export function save_training_cards(category)
{
    if (category == 'all')
        localStorage.setItem('training_cards', localStorage.getItem('flashcards'));
    else
    {
        let flashcards = JSON.parse(localStorage.getItem('flashcards'));
        let cards = [];

        for (const flashcard of flashcards)
            if (flashcard.category == category)
                cards.push(flashcard);
        localStorage.setItem('training_cards', JSON.stringify(cards));
    }
}

export function get_categories_stats()
{
    let stats = [];
    let date = new Date;
    let categories = JSON.parse(localStorage.getItem('categories'));
    let flashcards = JSON.parse(localStorage.getItem('flashcards'));
    let all = {'cards':0, 'cards_ready': 0};
    if (categories != undefined)
    {   
        for (const category of categories)
            stats[category] = {'cards':0, 'cards_ready': 0};
        if (flashcards != undefined)
        {   
            for (const card of flashcards)
            {
                stats[card.category].cards += 1;
                all.cards += 1;
                if (parseInt((card.next_memorization - date.getTime()) / (1000 * 60 * 60 * 24)) <= 0)
                {
                    stats[card.category].cards_ready += 1;
                    all.cards_ready += 1;
                }
            }
        }
        stats['all'] = all;
    }
    return stats;
}