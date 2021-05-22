/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const previouscodejournalJSON = localStorage.getItem('code-journal');

if (previouscodejournalJSON !== null) {
  data = JSON.parse(previouscodejournalJSON);
}

window.addEventListener('beforeunload', function (e) {
  const dataJSON = JSON.stringify(data);
  this.localStorage.setItem('code-journal', dataJSON);
});
