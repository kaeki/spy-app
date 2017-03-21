'use strict';

const htmlTemplate = {
    card: function(item) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        const img = document.createElement('img');
        img.setAttribute('class', 'card-img-top');
        img.setAttribute('src', item.thumbnail);
        card.appendChild(img);

        const cardBlock = document.createElement('div');
        cardBlock.setAttribute('class', 'card-block');
        const title = document.createElement('h4');
        title.setAttribute('class', 'card-title');
        title.textContent = item.title;
        cardBlock.appendChild(title);
        const subtitle = document.createElement('h6');
        subtitle.setAttribute('class', 'card-subtitle mb-2 text-muted');
        subtitle.textContent = item.time + ' - ' + item.category;
        cardBlock.appendChild(subtitle);
        const details = document.createElement('p');
        details.setAttribute('class', 'card-text');
        details.textContent = detailsThumb;
        cardBlock.appendChild(details);

        const footer = document.createElement('div');
        footer.setAttribute('class', 'card-footer');
        const button = document.createElement('button');
        button.setAttribute('class', 'btn btn-primary');
        button.addEventListener('click', (evt)=> {
            console.log(item.title);
        });
        footer.appendChild(button);
        card.appendChild(footer);

        return card;
    },
};
