// ==UserScript==
// @name         Nk's TwitchTools Button
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Add a Nk's TwitchTools button on a Twitch channel page
// @author       Nk (tr.ee/NkGaming)
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function addButton() {
        const username = window.location.pathname.split('/')[1];

        if (!username || username === 'directory' || !/^[a-zA-Z0-9_]+$/.test(username))
        return;

        if (document.querySelector('#btn-tt'))
        return;

        const container =
            document.querySelector('.metadata-layout__support') ||
            document.querySelector('[data-target="channel-header-right"]');

        if (!container)
        return;

        const targetDiv = container.children[1];
        if (!targetDiv || targetDiv.tagName.toLowerCase() !== 'div')
        return;

        const bouton = document.createElement('a');
        bouton.id = 'btn-tt';
        bouton.href = `https://nkgaming-twitch.github.io/twitchtools/?u=${username}`;
        bouton.target = '_blank';
        bouton.innerHTML = 'Nk\'s&nbsp;TwitchTools';

        bouton.style.marginLeft = '8px';
        bouton.style.padding = '6px 10px';
        bouton.style.backgroundColor = '#9146FF';
        bouton.style.color = '#FFFFFF';
        bouton.style.borderRadius = '30px';
        bouton.style.fontSize = '14px';
        bouton.style.fontWeight = '600';
        bouton.style.textDecoration = 'none';
        bouton.style.display = 'inline-block';

        targetDiv.appendChild(bouton);
    }

    const observer = new MutationObserver(() => {
        addButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
