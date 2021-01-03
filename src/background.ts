chrome.tabs.onUpdated.addListener((tabId, { status }) => {
    if (status === 'complete') sendMessage(tabId);
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        home: true,
        related: true,
        comments: true,
        notifications: true,
    });
    ['All', 'Home', 'Related', 'Comments', 'Notifications'].forEach((context) => {
        chrome.contextMenus.create({
            id: context,
            title: context,
            type: 'checkbox',
            checked: true,
            contexts: ['page_action'],
        });
    });
});

chrome.contextMenus.onClicked.addListener(({ menuItemId, checked }, tab) => {
    switch (menuItemId) {
        case 'All':
            chrome.storage.sync.set({
                home: checked,
                related: checked,
                comments: checked,
                notifications: checked,
            });
            ['Home', 'Related', 'Comments', 'Notifications'].forEach((context) => {
                chrome.contextMenus.update(context, { checked });
            });
            break;
        case 'Home':
            chrome.storage.sync.set({ home: checked });
            break;
        case 'Related':
            chrome.storage.sync.set({ related: checked });
            break;
        case 'Comments':
            chrome.storage.sync.set({ comments: checked });
            break;
        case 'Notifications':
            chrome.storage.sync.set({ notifications: checked });
            break;
        default:
            break;
    }
    sendMessage(tab.id);
});

const sendMessage = (id: number) => {
    chrome.storage.sync.get(['home', 'related', 'comments', 'notifications'], (result: Options) => {
        chrome.tabs.sendMessage(id, result);
    });
};
