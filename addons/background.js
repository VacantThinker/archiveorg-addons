// console.log('new Date=', new Date());

async function sendMessageToTab(tab, message) {
  let tabId = tab.id;
  await browser.tabs.sendMessage(tabId, message);
}

browser.pageAction.onClicked.addListener(async (tab) => {
  // console.log(`meslog tab=\n`, tab);
  let endsTXT = '.txt';
  let filename = tab.url
    .replace('https://', '')
    .concat(endsTXT);

  let message = {
    filename,
  };
  await sendMessageToTab(tab, message);

});