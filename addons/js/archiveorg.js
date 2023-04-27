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

  let mapHref = Array.from(eleTr)
    .filter((value) => {
      let tdItemSize = value.querySelector('td:nth-child(3)');
      let textContentSize = tdItemSize.textContent;
      let lengthSize = textContentSize.length;
      if (lengthSize > 0 && !textContentSize.endsWith('-')) {
        return true;
      }
    })
    .map((value) => {
      let elementA = value.querySelector('td:nth-child(1) > a');
      let href = elementA['href'];
      return String(href);
    });

  let reduceEnds = mapHref.reduce((previousValue, currentValue) => {
    let lastIndexOf = currentValue.lastIndexOf('.');
    let ends = currentValue.substring(lastIndexOf);
    previousValue[ends] = ends;
    return previousValue;
  }, {});

  let reduce = Object.keys(reduceEnds).reduce(
    (previousValue, ends) => {

      let cnt = 0;
      let reduceItem = mapHref.reduce(
        (previousValue, currentValue,
         currentIndex, array) => {

          if (currentValue.endsWith(ends)) { // eg: .jpg
            cnt = cnt + 1;
            return (cnt % 30 === 0)
              ? previousValue.concat(currentValue, '\n\n')
              : previousValue.concat(currentValue, '\n');
          }
          else {
            return previousValue;
          }
        }, ``);

      return previousValue.concat(reduceItem, '\n\n\n\n');
    }, ``);

  saveTextToFile(reduce, filename);

});