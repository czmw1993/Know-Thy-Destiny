/**
 * Render function for each horoscope card
 * @param {*} zodiac 
 */

export const renderZodiac = function(zodiac) {
    return `<div class="column is-one-third fade">
                <div class="card" style="height: 100%;background-color: ${zodiac.backgroundColor};opacity:0.81">
                    <div class="card-image">
                    <br>
                    <br>
                        <figure class="image is-96x96" style="margin: 0 auto">
                            <img class="is-rounded" src="${zodiac.img}" alt="${zodiac.name}">
                        </figure>
                    </div>
                    <div class="card-content has-text-centered">
                        <p class="title is-5 has-text-weight-bold" style="font-family:"Lato">${zodiac.name}</p>
                        <p class="title is-5" style="font-family:"Open Sans">Date Range: ${zodiac.dateRange}</p>

                        <p class="subtitle is-6" style="color: ${zodiac.color}">Greatest Overall Compatibility: ${zodiac.compat}</p>
                        <p class="subtitle is-6" style="color: ${zodiac.color}">Lucky Numbers: ${zodiac.luckyNum}</p>
                        <p class="subtitle is-6" style="color: ${zodiac.color}">Element: ${zodiac.element}</p>
                        <div class="content" style="color: ${zodiac.color}; max-height: 200px; overflow-y: scroll">
                            <p style="font-family:"Open Sans">${zodiac.description}</p>
                        </div>
                       
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
    axios.get('http://localhost:3000/public/zodiacData', {

    }).then(response => {
        let zodiacData = response.data.result;
        console.log(zodiacData);
        loadCards(zodiacData);

    }).catch(error => console.log(error.response))

});