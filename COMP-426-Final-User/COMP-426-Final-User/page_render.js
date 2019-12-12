// const {publicStore} = require('backend/data/DataStore.js');
/**
 * Render function for each zodiac card
 * @param {*} zodiac 
 */
export const renderZodiac = function(zodiac) {
    return `<div class="column is-one-third">
                <div class="card" style="height: 100%;background-color: ${zodiac.backgroundColor}">
                    <div class="card-image">
                        <figure class="image is-128x128" style="margin: 0 auto">
                            <img class="is-rounded" src="${zodiac.img}" alt="${zodiac.name}">
                        </figure>
                    </div>
                    <div class="card-content has-text-centered">
                        <p class="title is-5 has-text-black has-text-weight-bold is-family-monospace" style="color: ${zodiac.color}">${zodiac.name}</p>
                        <p class="title is-5" style="color: ${zodiac.color}">Date Range: ${zodiac.dateRange}</p>

                        <p class="subtitle is-6" style="color: ${zodiac.color}">Greatest Overall Compatibility: ${zodiac.compat}</p>
                        <p class="subtitle is-6" style="color: ${zodiac.color}">Lucky Numbers: ${zodiac.luckyNum}</p>
                        <p class="subtitle is-6" style="color: ${zodiac.color}">Element: ${zodiac.element}</p>
                        <div class="content is-size-8" style="color: ${zodiac.color}; max-height: 200px; overflow-y: scroll">
                            <p>${zodiac.description}</p>
                        </div>
                        <button class="button is-link is-small link" data-zodiac="${zodiac.id}">More</button>
                    </div>
                </div>
            </div>
           `
};

export const loadCards = function(zodiacData) {
    $('body').addClass('has-background-dark');

    const $root = $('#root');
    let modalCards = $('<div id="zodiacs" class="columns is-centered is-mobile is-multiline" />');
    for (let i = 0; i < zodiacData.length; i++) {
        modalCards.append(renderZodiac(zodiacData[i]));
    }
    $root.addClass('container zodiac_modalCards').append(modalCards);

    // pops up a new page with zodiac details (or jumps to another page?)
    // $root.on('click', '.link_detail', ... );

};

$(function() {
    loadCards(zodiacData);
});

