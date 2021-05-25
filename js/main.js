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
  renderEntriesPage();
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

document.addEventListener('DOMContentLoaded', function () {
  $entriesDisplay.className = 'entries';
  $entriesAdd.className = 'create-entry hidden';
  $unorderEntry.innerHTML = ' ';
  if (data.nextEntryId > 1) {
    for (let i = 0; i < data.entries.length; i++) {
      buildEntriesDomObject(data.entries[i]);
    }
  }
});

function renderEntriesPage() {
  $entriesDisplay.className = 'entries';
  $entriesAdd.className = 'create-entry hidden';
  $unorderEntry.innerHTML = ' ';
  if (data.nextEntryId > 1) {
    for (let i = 0; i < data.entries.length; i++) {
      buildEntriesDomObject(data.entries[i]);
    }
  }
}

function renderNewEntryPage() {
  $entriesDisplay.className = 'entries hidden';
  $entriesAdd.className = 'create-entry';
  $unorderEntry.innerHTML = ' ';
}

function buildEntriesDomObject(entryObject) {
  const listItem = document.createElement('li');
  $unorderEntry.appendChild(listItem);

  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  $unorderEntry.appendChild(row);

  let colHalf = document.createElement('div');
  colHalf.setAttribute('class', 'column-half');

  const image = document.createElement('img');
  image.setAttribute('src', entryObject.PhotoURL);
  image.setAttribute('class', 'image');
  colHalf.appendChild(image);
  row.appendChild(colHalf);

  colHalf = document.createElement('div');
  colHalf.setAttribute('class', 'column-half');

  let rowalignHoriz = document.createElement('div');
  rowalignHoriz.setAttribute('class', 'row-align-horiz');
  const h3 = document.createElement('h3');
  h3.textContent = entryObject.title;
  rowalignHoriz.appendChild(h3);
  colHalf.appendChild(rowalignHoriz);

  rowalignHoriz = document.createElement('div');
  rowalignHoriz.setAttribute('class', 'row-align-horiz');
  const p = document.createElement('p');
  p.textContent = entryObject.notes;
  rowalignHoriz.appendChild(p);
  colHalf.appendChild(rowalignHoriz);

  row.appendChild(colHalf);
}
