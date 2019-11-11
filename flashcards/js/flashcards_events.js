
let current_selection = {'view': 'menu', 'category': {'id': 0, 'name': 'all'}, 'card_id': 0}

update_view(current_selection);

let is_theme_dark = true;
$('.theme').on('click', function(){
    is_theme_dark = !is_theme_dark;
    if (is_theme_dark)
    {
        document.documentElement.setAttribute('data-theme', 'dark');
        $(this).html('dark');
    }
    else
    {
        document.documentElement.setAttribute('data-theme', 'light');
        $(this).html('light');
    }
})

$('.button-training').on('click', function(){
    if ($(this).hasClass('button-active'))
    {
        save_training_cards(current_selection.category.name);
        window.location = './html/training.html';
    }
})
$(document).on('click', '.trash_button', function(){
    if (current_selection.view == 'category_infos')
    {
        delete_category(current_selection.category);
        current_selection.view = 'menu';
}
    else if (current_selection.view == 'card_infos')
    {
        delete_flashcard(current_selection.card_id);
        current_selection.view = 'category_infos';
    }
    update_view(current_selection);
})

$(document).on('click', '.create_category', function(){
    save_category($('.new_category_title').children('.form_content').val());
    current_selection.view = 'menu';
    update_view(current_selection);
})

$(document).on('click', '.create_card', function(){
    current_selection.view = 'category_infos';
    let category = current_selection.category.name;
    let question = $('.new_card_question').children('.form_content').val();
    let type = $('.option_checked').html();
    let answer = $('.new_card_answer').children('.form_content').val();
    save_flashcard(category, question, type, answer);
    update_view(current_selection);
})

$(document).on('click', '.update_card', function(){
    current_selection.view = 'category_infos';
    // let category = current_selection.category.name;
    let question = $('.card_infos .card_question').find('.form_content').val();
    let type = $('.card_infos').find('.option_checked').html();
    let answer = $('.card_infos .card_answer').find('.form_content').val();
    let remaining_days = $('.card_infos .card_remaining_days').find('.form_content').val();
    let flashcard_id = current_selection.card_id;
    update_flashcard(flashcard_id, question, type, answer, remaining_days);
    update_view(current_selection);
})

$(document).on('click', '.update_category', function(){
    current_selection.category.name = $('.category_infos').children('.form_content').val();
    update_category(current_selection.category.id, current_selection.category.name);
    update_view(current_selection);
})

$(document).on('click', '.out_button', function(){
    if (current_selection.view == 'category_form' || current_selection.view == 'category_infos')
        current_selection.view = 'menu';
    if (current_selection.view == 'card_form' || current_selection.view == 'card_infos')
        current_selection.view = 'category_infos';
    update_view(current_selection);
})

// ************ SHOW FORMS BUTTONS ************ //

$(document).on('click', '.show_category_form', function(){
    current_selection.view = 'category_form';
    update_view(current_selection);
})
$(document).on('click', '.show_card_form', function(){
    current_selection.view = 'card_form';
    update_view(current_selection);
})

// ************ SHOW INFOS BUTTONS ************ //

$(document).on('click', '.category', function(){
    let categories = JSON.parse(localStorage.getItem('categories'));
    current_selection.view = 'category_infos';
    current_selection.category.id = $(this).prop('id');
    if ($(this).children('.card_title').html() == 'all')
        current_selection.category.name = 'all';
    else
        current_selection.category.name = categories[current_selection.category.id];
    update_view(current_selection);
})
$(document).on('click', '.flashcard', function(){
    current_selection.view = 'card_infos';
    current_selection.card_id = $(this).prop('id');
    let flashcards = JSON.parse(localStorage.getItem('flashcards'));
    update_view(current_selection);
    $('.card_question').children('.form_content').val(flashcards[current_selection.card_id].question);
    $('.option_input').removeClass('option_checked');
    $('.'+flashcards[current_selection.card_id].type).addClass('option_checked');
    $('.card_answer').children('.form_content').val(flashcards[current_selection.card_id].answer);
    let date = new Date;
    let remaining_days = parseInt((flashcards[current_selection.card_id].next_memorization - date.getTime())/ (24 * 60 * 60 * 1000))
    $('.card_remaining_days').children('.form_content').val(remaining_days);
})

// ************ TOOGLE FORM OPTIONS ************ //
$(document).on('click', '.option_input', function(){
    $('.option_input').removeClass('option_checked');
    $(this).addClass('option_checked');
    if ($(this).hasClass('string'))
        $(".new_card_answer").children('.form_content').attr("placeholder", "write your text here");
    if ($(this).hasClass('word'))
        $(".new_card_answer").children('.form_content').attr("placeholder", "simple word");
    if ($(this).hasClass('code'))
        $(".new_card_answer").children('.form_content').attr("placeholder", "write your code here");
    if ($(this).hasClass('bool'))
        $(".new_card_answer").children('.form_content').attr("placeholder", "true or false");
    if ($(this).hasClass('list'))
        $(".new_card_answer").children('.form_content').attr("placeholder", "one, two, three, four, five, ...");
    if ($(this).hasClass('options'))
        $(".new_card_answer").children('.form_content').attr("placeholder", "option1, option2, option3, option4, ...");
})