import Cookie from './../modules/cookies.mjs'
import {is_array_contain_same_values} from './../modules/utils.mjs'

export function     initialize_view(flashcard_id)
{
    show_flashcard_form_view(flashcard_id);
    show_steps_view();
}

export function     show_flashcard_form_view(flashcard_id)
{
    let flashcards = JSON.parse(localStorage.getItem('training_cards'));

    update_card_view(get_flashcard_form_view(flashcards[flashcard_id]));
}

export function     show_steps_view()
{
    let flashcards = JSON.parse(localStorage.getItem('training_cards'));

    for (const [id, flashcard] of Object.entries(flashcards))
        $('.steps_view').append("<div class='step_wrapper'><div id='step"+id+"' class='step'></div></div>");
}

function     update_card_view(html_insertion)
{
    $('.card_view').children('.question').remove();
    $('.card_view').children('.answer').remove();
    $('.card_view').prepend(html_insertion);
}

export function     get_flashcard_form_view(flashcard)
{
    let html_question = "<h4 class='question'>"+flashcard.question+" </h4>";
    let html_form = '';
    if (flashcard.type == 'string')
        html_form = "<textarea class='answer string' placeholder='string expected' spellcheck=false></textarea>";
    if (flashcard.type == 'word')
        html_form = "<textarea class='answer word' placeholder='word expected' maxlength='26' spellcheck=false></textarea>";
    if (flashcard.type == 'code')
        html_form = "<textarea class='answer code' placeholder='code expected' spellcheck=false></textarea>";
    if (flashcard.type == 'bool')
        html_form = "<button class='answer true'></button><button class='answer false'></button>";
    if (flashcard.type == 'list')
        html_form = get_list_form_view(flashcard.answer.split(',').keys());
    return html_question + html_form;
}

function     get_list_form_view(answers_id)
{
    let html_form = '';

    for (const id of answers_id)
        html_form += "<input id='answer"+id+"' class='answer list' type='text' placeholder='item"+id+"' spellcheck=false>";
    return "<div class='answer list_wrapper'>"+html_form+"</div>";
}

export function     get_form_answer_result(flashcard)
{
    if (flashcard.type == 'string' || flashcard.type == 'word' || flashcard.type == 'code')
        return get_result(flashcard, $('.answer').val());
    if (flashcard.type == 'bool')
        return get_result(flashcard, ($('.true').hasClass('checked') ? 'true' : 'false'));
    if (flashcard.type == 'list')
        return get_result(flashcard, get_list_form_answer(flashcard.answer.split(',').keys()));
}

export function     update_flashcard_remaining_days(flashcard, result)
{
    let flashcards = JSON.parse(localStorage.getItem('flashcards'));
    let date = new Date;

    if (result == false)
    {
        flashcard.next_memorization = date.getTime() + (1000 * 60 * 60 * 24 * 2);
        flashcard.repetition_delay = 'day';
    }
    else
    {
        if (flashcard.repetition_delay == 'month')
        {
            flashcard.repetition_delay = '6month';
            flashcard.next_memorization = date.getTime() + (1000 * 60 * 60 * 24 * 30 * 6);
        }
        if (flashcard.repetition_delay == 'week')
        {
            flashcard.repetition_delay = 'month';
            flashcard.next_memorization = date.getTime() + (1000 * 60 * 60 * 24 * 30);
        }
        if (flashcard.repetition_delay == 'day')
        {
            flashcard.repetition_delay = 'week';
            flashcard.next_memorization = date.getTime() + (1000 * 60 * 60 * 24 * 7);
        }
    }
    for (const [index, card] of Object.entries(flashcards))
        if (flashcards[index].id == flashcard.id)
            flashcards[index] = flashcard
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

export function     show_flashcard_valid_answer(flashcard)
{
    $('.card_view').append("<p class='answer valid_answer'>"+flashcard.answer+"</p>");
}

export function update_step_view(index, result)
{
    $('#step'+index).removeClass('success fail');
    if (result)
        $('#step'+index).addClass('success');
    else
        $('#step'+index).addClass('fail');
        console.log(index);
    console.log($('step#'+index));
}

function            get_list_form_answer(answers_id)
{
    let answers = [];
    for (const answer_id of answers_id)
        answers.push($('#answer'+answer_id).val());
    return answers;
}

export function     get_result(flashcard, answer)
{
    if (flashcard.type == 'string' || flashcard.type == 'word' || flashcard.type == 'code' || flashcard.type == 'bool')
        return flashcard.answer == answer ? true : false;
    if (flashcard.type == 'list')
        return is_array_contain_same_values(flashcard.answer.split(', '), answer);
}

export function      get_training_cookie()
{
    let cookie = new Cookie();
    let tmp;

    if (!(tmp = cookie.getValue('training')))
    {
        cookie.set('training', JSON.stringify({'current_id': 0}), 1);
        return {'current_id': 0};
    }
    return (JSON.parse(tmp));
}
