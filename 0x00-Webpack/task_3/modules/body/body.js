import $ from "jquery";
import _ from "lodash";
import "./body.css";

let count = 0;

const $button = $("<button>Click here to get started</button>").on(
  "click",
  _.debounce( updateCounter, 500, { leading: true, trailing: false })
);

$('body').append("<p>Dashboard data for the students</p>");
$('body').append($button);
$('body').append("<p id='count'></p>");

function updateCounter() {
  count++;
  $('#count').html(`${count} clicks on the button`);
}
