document.getElementById('home').onclick = () => {
    chrome.storage.sync.set({ home: false }, () => console.log(chrome.storage));
}
/*
toggle.innerText = 'ON';
toggle.onclick = () => {
    document.getElementById('switch').innerText = 'OFF';
    chrome.browserAction.setBadgeText({text: 'OFF'});
}
*/