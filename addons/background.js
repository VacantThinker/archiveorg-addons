console.log('new Date=', new Date());

browser.pageAction.onClicked.addListener(async (tab) => {
  // console.log(`meslog tab=\n`, tab);
  let lastIndexOf = tab.url.lastIndexOf('/');
  let itemName = tab.url.substring(lastIndexOf + 1);
  let endsTXT = '.txt';
  const arrText = [`archive.org`, `download`, itemName, endsTXT];
  let filename = arrText.reduce(
    (result, value, currentIndex,array) => {
      if (currentIndex === 0 || currentIndex === array.length - 1) {
        return result.concat(value);
      }
      else {
        return result.concat('-', value);
      }
    }, '');
  let tabId = tab.id;
  await browser.tabs.sendMessage(tabId, {
    filename,
  });

});