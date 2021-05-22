/* global data */
/* exported data */

const $title = document.querySelector('#title');
const $chPhotoURL = document.querySelector('#photoURL');
const $notes = document.querySelector('#notes');
const $imgSrc = document.querySelector('.image-entry');

$chPhotoURL.addEventListener('input', function (e) {
  $imgSrc.setAttribute('src', $chPhotoURL.value);
});

const $saveJournal = document.querySelector('#Form');
$saveJournal.addEventListener('submit', function (e) {
  e.preventDefault();
  const formObject = {};
  formObject.title = $title.value;
  formObject.PhotoURL = $chPhotoURL.value;
  formObject.notes = $notes.value;
  formObject.EntryId = data.nextEntryId;
  data.nextEntryId = data.nextEntryId + 1;
  data.entries.unshift(formObject);
  $saveJournal.reset();
  $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
});
