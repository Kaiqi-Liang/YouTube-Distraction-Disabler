chrome.storage.sync.set({
    home: true,
    related: true,
    comments: true,
});

['home', 'related', 'comments'].forEach((context) => {
    chrome.contextMenus.create({
        id: context,
        title: context,
        type: 'checkbox',
        checked: true,
        contexts: ['page_action'], // click anywhere on the page including any YouTube videos and any tabs
    });
});

const sendMessage = (id) => {
    chrome.storage.sync.get(['home', 'related', 'comments'], ({ home, related, comments }) => {
        chrome.tabs.sendMessage(id, { home, related, comments });
    });
};

chrome.contextMenus.onClicked.addListener(({ menuItemId, checked }, tab) => {
    switch (menuItemId) {
        case 'home':
            chrome.storage.sync.set({ home: checked });
            break;
        case 'related':
            chrome.storage.sync.set({ related: checked });
            break;
        case 'comments':
            chrome.storage.sync.set({ comments: checked });
            break;
        default:
            break;
    }
    sendMessage(tab.id);
});

chrome.tabs.onUpdated.addListener((tabId, { status }) => {
    if (status === 'complete') sendMessage(tabId);
});
