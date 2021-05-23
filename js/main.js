/* global data */
/* exported data */

const $title = document.querySelector('#title');
const $chPhotoURL = document.querySelector('#photoURL');
const $notes = document.querySelector('#notes');
const $imgSrc = document.querySelector('.image-entry');
const $entriesDisplay = document.querySelector('[data-view="entries"]');
const $entriesAdd = document.querySelector('[data-view="entry-form"]');
const $unorderEntry = document.querySelector('.entry-Unordered-list');

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

const $entryPage = document.querySelector('.entry-page');
const $buttonNew = document.querySelector('.button-new');
document.addEventListener('click', function (e) {
  if (e.target === $entryPage) {
    renderEntriesPage();
  } else if (e.target === $buttonNew) {
    renderNewEntryPage();
  }
});

function renderEntriesPage() {
  $entriesDisplay.className = 'entries';
  $entriesAdd.className = 'create-entry hidden';
  if (data.nextEntryId > 1) {
    for (let i = 0; i < data.length; i++) {
      buildEntriesDomObject(data[i]);
    }
  }
}

function renderNewEntryPage() {
  $entriesDisplay.className = 'entries hidden';
  $entriesAdd.className = 'create-entry';
}

function buildEntriesDomObject(entryObject) {
  const listItem = document.createElement('li');
  $unorderEntry.appendChild(listItem);

  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  $unorderEntry.appendChild(row);

  const colHalf = document.createElement('div');
  colHalf.setAttribute('class', 'column-half');
  row.appendChild(colHalf);

  const image = document.createElement('img');
  image.setAttribute('src', entryObject.PhotoURL);
  image.setAttribute('class', 'image');
  colHalf.appendChild(image);

}
