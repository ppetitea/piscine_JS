import {
  get_training_cookie,
  initialize_view,
  show_flashcard_form_view,
  get_form_answer_result,
  update_flashcard_remaining_days,
  show_flashcard_valid_answer,
  update_step_view
} from "./../modules/training_view.mjs";

let training = get_training_cookie();

initialize_view(training.current_id);

$(".step").on("click", function() {
  training.current_id = $(this)
    .attr("id")
    .substr("step".length);
  show_flashcard_form_view(training.current_id);
});

$(".check_button").on("click", function() {
  let flashcards = JSON.parse(localStorage.getItem("training_cards"));
  let result = get_form_answer_result(flashcards[training.current_id]);

  update_flashcard_remaining_days(flashcards[training.current_id], result);
  update_step_view(training.current_id, result);
  if (result) {
    training.current_id++;
    if (training.current_id < Object.entries(flashcards).length)
      show_flashcard_form_view(training.current_id);
    else window.location = "../index.html";
  } else show_flashcard_valid_answer(flashcards[training.current_id]);
});

$(".out_button").on("click", function() {
  window.location = "../index.html";
});
