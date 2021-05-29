/* global data */
/* exported data */

const $title = document.querySelector('#title');
const $chPhotoURL = document.querySelector('#photoURL');
const $notes = document.querySelector('#notes');
const $imgSrc = document.querySelector('.image-entry');
const $entriesDisplay = document.querySelector('[data-view="entries"]');
const $entriesAdd = document.querySelector('[data-view="entry-form"]');
const $unorderEntry = document.querySelector('.entry-Unordered-list');
const $titleh1 = document.querySelector('.NewEntry');
let editAddMode = '';
let editEntryvalue = 0;

$chPhotoURL.addEventListener('input', function (e) {
  $imgSrc.setAttribute('src', $chPhotoURL.value);
});

const $saveJournal = document.querySelector('#Form');
$saveJournal.addEventListener('submit', function (e) {
  e.preventDefault();
  if (editAddMode === 'Add-mode') {
    const formObject = {};
    formObject.title = $title.value;
    formObject.PhotoURL = $chPhotoURL.value;
    formObject.notes = $notes.value;
    formObject.EntryId = data.nextEntryId;
    data.nextEntryId = data.nextEntryId + 1;
    data.entries.unshift(formObject);
    $saveJournal.reset();
    $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else if (editAddMode === 'edit-mode') {
    data.entries[data.entries.length - editEntryvalue].title = $title.value;
    data.entries[data.entries.length - editEntryvalue].notes = $notes.value;
    data.entries[data.entries.length - editEntryvalue].PhotoURL = $chPhotoURL.value;
    $saveJournal.reset();
    $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
  renderEntriesPage();
});

const $entryPage = document.querySelector('.entry-page');
const $buttonNew = document.querySelector('.button-new');
const $deleteEntry = document.querySelector('.deleteEntry');
const $columnButton = document.querySelector('.column-button');
const $noButton = document.querySelector('.noButton');
const $yesButton = document.querySelector('.yesButton');
const $modalPage = document.querySelector('.modal');

document.addEventListener('click', function (e) {
  if (e.target === $entryPage) {
    editAddMode = ' ';
    renderEntriesPage();
  } else if (e.target === $buttonNew) {
    editAddMode = 'Add-mode';
    renderNewEntryPage();
  } else if (e.target.closest('.fa-pen') !== null) {
    editAddMode = 'edit-mode';
    editEntryvalue = e.target.getAttribute('data-entry-id');
    renderEditEntryPage(editEntryvalue);
  } else if (e.target === $deleteEntry) {
    renderModalPage();
  } else if (e.target === $noButton) {
    $modalPage.style.display = 'none';
  } else if (e.target === $yesButton) {
    removeEntryFromStorage();
    renderEntriesPage();
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
  if (data.entries.length >= 1) {
    for (let i = 0; i < data.entries.length; i++) {
      buildEntriesDomObject(data.entries[i]);
    }
  }
}

function renderNewEntryPage() {
  $entriesDisplay.className = 'entries hidden';
  $entriesAdd.className = 'create-entry';
  $unorderEntry.innerHTML = ' ';
  $saveJournal.reset();
  $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  $titleh1.textContent = 'New Entry';
  $deleteEntry.setAttribute('class', 'deleteEntry hidden');
  $columnButton.style.justifyContent = 'flex-end';
}

function renderEditEntryPage(targetEditId) {
  $entriesDisplay.className = 'entries hidden';
  $entriesAdd.className = 'create-entry';
  $unorderEntry.innerHTML = ' ';
  $titleh1.textContent = 'Edit Entry';
  $title.value = data.entries[data.entries.length - targetEditId].title;
  $notes.value = data.entries[data.entries.length - targetEditId].notes;
  $chPhotoURL.value = data.entries[data.entries.length - targetEditId].PhotoURL;
  $imgSrc.setAttribute('src', data.entries[data.entries.length - targetEditId].PhotoURL);
  $deleteEntry.setAttribute('class', 'deleteEntry');
  $columnButton.style.justifyContent = 'space-between';
}

function renderModalPage() {
  $modalPage.style.display = 'block';
}

function removeEntryFromStorage() {
  $modalPage.style.display = 'none';
  for (let i = 0; i < data.entries.length; i++) {
    if (parseInt(editEntryvalue) === parseInt(data.entries[i].EntryId)) {
      data.entries.splice(i, 1);
      break;
    }
  }
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
  const icon = document.createElement('i');
  icon.setAttribute('class', 'fas fa-pen');
  icon.setAttribute('data-entry-id', entryObject.EntryId);
  rowalignHoriz.appendChild(icon);
  colHalf.appendChild(rowalignHoriz);

  rowalignHoriz = document.createElement('div');
  rowalignHoriz.setAttribute('class', 'row-align-horiz');
  const p = document.createElement('p');
  p.textContent = entryObject.notes;
  rowalignHoriz.appendChild(p);
  colHalf.appendChild(rowalignHoriz);

  row.appendChild(colHalf);
  listItem.appendChild(row);
}
