chrome.runtime.onMessage.addListener(({ home, related, comments, notifications }) => {
    document.querySelector('ytd-app').style.display = 'block';

    // remove home feed
    document.querySelectorAll('ytd-browse').forEach((section) => {
        if (section.getAttribute('page-subtype') === 'home') section.style.display = home ? 'none' : 'block';
    });

    // remove related videos and comments in watch page
    document.getElementById('related').style.display = related ? 'none' : 'block';
    document.getElementById('comments').style.display = comments ? 'none' : 'block';

    // remove notifications
    document.querySelector('ytd-notification-topbar-button-renderer').style.display = notifications ? 'none' : 'block';
    document.title = `YouTube ${home && related ? 'Productive' : 'Procrastinative'} Mode`;
});

// hide the whole page and show a spinner before the page is fully loaded
document.querySelector('ytd-app').style.display = 'none';

const cover = document.createElement('div');
cover.id = 'cover';
cover.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const spinner = document.createElement('img');
spinner.src = chrome.extension.getURL(`assets/spinner_${window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}.svg`);

cover.appendChild(spinner);
document.body.appendChild(cover);
