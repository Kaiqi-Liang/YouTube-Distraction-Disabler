// hide the whole page and show a spinner before the page is fully loaded
const app: HTMLElement = document.querySelector('ytd-app');
app.style.display = 'none';

const cover = document.createElement('div');
cover.id = 'cover';

const spinner = document.createElement('img');
const light = getComputedStyle(document.querySelector('ytd-app')).getPropertyValue('background-color') === 'rgb(249, 249, 249)';
spinner.src = chrome.extension.getURL(`assets/spinner_${light ? 'light' : 'dark'}.svg`);

cover.appendChild(spinner);
document.body.appendChild(cover);

const onLoad = () => {
    app.style.display = 'block';
    document.body.removeChild(cover);
};
setTimeout(onLoad, 3000);

chrome.runtime.onMessage.addListener(({ home, related, comments, notifications }: Options) => {
    app.style.display = 'block';

    // remove home feed
    document.querySelectorAll('ytd-browse').forEach((section: HTMLElement) => {
        if (section.getAttribute('page-subtype') === 'home') section.style.display = home ? 'none' : 'block';
    });

    // remove related videos and comments in watch page
    document.getElementById('related').style.display = related ? 'none' : 'block';
    document.getElementById('comments').style.display = comments ? 'none' : 'block';

    // remove notifications
    (document.querySelector('ytd-notification-topbar-button-renderer') as HTMLElement).style.display = notifications ? 'none' : 'block';
    document.title = `YouTube ${home && related ? 'Productive' : 'Procrastinative'} Mode`;
});
