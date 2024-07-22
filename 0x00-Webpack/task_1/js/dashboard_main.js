import $ from "jquery"


const count = 0;
const $button = $("<button>Click here to get started</button>").on(
  "click",
  _.debounce( updateCounter, 600, { leading: true, trailing: false })
);

$('body').append("<p>Holberton Dashboard</p>");
$('body').append("<p>Dashboard data for the students</p>");
$('body').append($button);
$('body').append("<p id='count'></p>");
$('body').append("<p>Copyright - Holberton School</p>");

function updateCounter() {
  count++;
  $('#count').text(`${count} clicks on the button`);
}
