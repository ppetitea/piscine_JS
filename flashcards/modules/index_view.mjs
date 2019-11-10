import {get_categories_stats} from './flashcards.mjs'

export function    update_view(current_selection)
{
    console.log(current_selection);
    empty_main_card_content_view();
    if (current_selection.view == 'menu')
        show_menu_view();
    else if (current_selection.view == 'category_form')
        show_category_form_view();
    else if (current_selection.view == 'category_infos')
        show_category_infos_view(current_selection.category);
    else if (current_selection.view == 'card_form')
        show_card_form_view();
    else if (current_selection.view == 'card_infos')
        show_card_infos_view();
}

export function    empty_main_card_content_view()
{
    $('.tool_card').children().css('display', 'none');
    $('.controls').css('display', 'flex');
    $('.controls').children().css('display', 'none');
    $('.form_content').val('');
    $('.controls').children('.check_button').removeClass("create_card create_category update_category update_card");
}

export function    show_menu_view()
{
    let stats = get_categories_stats();
    $('.menu').css('display', 'grid');
    $('.menu').children('.categories_amount').html(Object.keys(stats).length - 1 + ' categories..');
    $('.menu').children('.cards_amount').html(stats.all.cards + ' cards..');
    $('.menu').children('.cards_ready_amount').html(stats.all.cards_ready + ' cards ready..');
    if (stats.all.cards_ready > 0)
        $('.menu').children('.cards_ready_amount').addClass('button-active');
    else
        $('.menu').children('.cards_ready_amount').removeClass('button-active');
    update_simple_cards_view(get_categories_view());
}

export function    show_category_form_view()
{
    $('.category_form').css('display', 'grid');
    $('.controls').children('.check_button').addClass("create_category");
    $('.controls').children('.check_button, .out_button').css('display', 'flex');
}

export function    show_category_infos_view(category)
{
    let stats = get_categories_stats();

    $('.category_infos').css('display', 'grid');
    $('.controls').children('.check_button').addClass("update_category");
    $('.category_infos').children('.form_content').val(category.name);
    $('.controls').children('.out_button').css('display', 'flex');
    $('.category_infos').children('.cards_ready_amount').html(stats.all.cards_ready + ' cards ready..');
    $('.category_infos').children('.cards_amount').html(stats.all.cards + ' cards..');
    if (stats.all.cards_ready > 0)
        $('.category_infos').children('.cards_ready_amount').addClass('button-active');
    else
        $('.category_infos').children('.cards_ready_amount').removeClass('button-active');
    if (category.name != 'all')
    {
        $('.controls').children('.trash_button, .check_button').css('display', 'flex');
        $('.category_infos').children('.cards_ready_amount').html(stats[category.name].cards_ready + ' cards ready..');
        $('.category_infos').children('.cards_amount').html(stats[category.name].cards + ' cards..');
        if (stats[category.name].cards_ready > 0)
            $('.category_infos').children('.cards_ready_amount').addClass('button-active');
        else
            $('.category_infos').children('.cards_ready_amount').removeClass('button-active');
    }
    update_simple_cards_view(get_flashcards_view(category));
}

export function    show_card_form_view()
{
    $('.card_form').css('display', 'grid');
    $('.controls').children('.check_button').addClass("create_card");
    $('.controls').children('.check_button, .out_button').css('display', 'flex');
    $('.option_input').removeClass('option_checked');
    $('.string').addClass('option_checked');
}

export function    show_card_infos_view()
{
    $('.card_infos').css('display', 'grid');
    $('.controls').children('.check_button').addClass("update_card");
    $('.controls').children('.trash_button, .check_button, .out_button').css('display', 'flex');
}

export function    update_simple_cards_view(view)
{
    $('.card').remove();
    if (view === false)
        return false;
    for (const card_view of view)
    {
        let view_content = '';
        for (const card_item of card_view.content)
            view_content = view_content + "<"+card_item.tag+" class=\""+ card_item.class.join(' ')+"\">"+card_item.text+"</"+card_item.tag+">";
        let view_wrapper = "<div id='"+card_view.id+"' class='card "+card_view.class.join(' ')+"'>"+view_content+"</div>";
        $(".view").append(view_wrapper);
    }
    return true;
}

export function get_categories_view()
{
    let card_all = {'class': ['category'], 'content': [{'tag': 'h4', 'class': ['card_title', 'text', 'medium_text', 'center', 'shadow_hover'], 'text': 'all'}]};
    let card_add = {'class': ['show_category_form'], 'content': [{'tag': 'h4', 'class': ['card_title', 'text', 'huge_text', 'center', 'shadow_hover'], 'text': '+'}]};
    let categories = JSON.parse(localStorage.getItem('categories'));
    let view = [card_all];
    
    if (categories === null)
        return [card_add];
    for (const [id, category] of categories.entries())
    {
        let view_content = [{'tag': 'h4', 'class': ['card_title', 'text', 'medium_text', 'center', 'shadow_hover'], 'text': category}];
        view.push({'id': id, 'class': ['category'], 'content': view_content})
    }
    view.push(card_add);
    return view;
}

export function get_flashcards_view(category)
{
    let card_add = {'class': ['show_card_form'], 'content': [{'tag': 'h4', 'class': ['card_title', 'text', 'huge_text', 'center', 'shadow_hover'], 'text': '+'}]};
    let flashcards = JSON.parse(localStorage.getItem('flashcards'));
    let view = [];
    
    if (flashcards === null)
        return category.name == 'all' ? [] : [card_add];
    for (const [id, card] of flashcards.entries())
    {
        let view_content = [{'tag': 'h4', 'class': ['card_title', 'text', 'medium_text', 'center', 'shadow_hover'], 'text': card.question}];
        if (category.name == 'all' || category.name == card.category)
            view.push({'id': id, 'class': ['flashcard'], 'content': view_content})
    }
    if (category.name != 'all')
        view.push(card_add);
    return view;
}