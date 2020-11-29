let home = true;
let related = true;
let comments = true;

chrome.tabs.onUpdated.addListener((tabId, { status }) => {
    if (status === 'complete') sendMessage(tabId);
});

chrome.runtime.onInstalled.addListener(() => {
    ['home', 'related', 'comments'].forEach((context) => {
        chrome.contextMenus.create({
            id: context,
            title: context,
            type: 'checkbox',
            checked: true,
            contexts: ['page_action'],
        });
    });

    chrome.contextMenus.onClicked.addListener(({ menuItemId, checked }, tab) => {
        switch (menuItemId) {
            case 'home':
                home = checked;
                break;
            case 'related':
                related = checked;
                break;
            case 'comments':
                comments = checked;
                break;
            default:
                break;
        }
        sendMessage(tab.id);
    });
});

const sendMessage = (id) => {
    chrome.tabs.sendMessage(id, { home, related, comments });
};
