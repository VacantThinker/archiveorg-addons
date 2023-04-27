/**
 * save text to file use element a download and href
 * @param text txt of the file
 * @param filename file name
 */
function saveTextToFile(text, filename) {
  let eleA = document.createElement('a');
  eleA.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
  eleA.download = `${filename}`;
  eleA.click();
}

browser.runtime.onMessage.addListener((message) => {
  console.log(`meslog message=\n`, message);
  let {filename} = message;

  let selectorTbody = '.directory-listing-table > tbody:nth-child(2)';
  let eleTbody = document.querySelector(selectorTbody);
  let eleTr = eleTbody.querySelectorAll('tr');

  let reduce = Array.from(eleTr)
    .filter((value) => {
      let tdItemSize = value.querySelector('td:nth-child(3)');
      let textContentSize = tdItemSize.textContent;
      let lengthSize = textContentSize.length;
      if (lengthSize > 0 && !textContentSize.endsWith('-')) {
        return true;
      }
    })
    .map((value) => {
      return value.querySelector('td:nth-child(1) > a');
    })
    .reduce((previousValue, currentValue, currentIndex, array) => {
      let href = currentValue['href'];
      return String(previousValue).concat(href, '\n');
    }, ``);

  saveTextToFile(reduce, filename);

  // let endsMP4 = '.mp4';
  // let endsAVI = '.avi';
  // const arrFilter = [
  //   // endsMP4,
  //   endsAVI,
  // ];

});