let home = true;
let related = true;
let comments = true;
let notifications = true;

chrome.tabs.onUpdated.addListener((tabId, { status }) => {
    if (status === 'complete') sendMessage(tabId);
});

chrome.runtime.onInstalled.addListener(() => {
    ['Home', 'Related', 'Comments', 'Notifications'].forEach((context) => {
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
            case 'Home':
                home = checked;
                break;
            case 'Related':
                related = checked;
                break;
            case 'Comments':
                comments = checked;
                break;
            case 'Notifications':
                notifications = checked;
                break;
            default:
                break;
        }
        sendMessage(tab.id);
    });
});

const sendMessage = (id) => {
    chrome.tabs.sendMessage(id, { home, related, comments, notifications });
};
