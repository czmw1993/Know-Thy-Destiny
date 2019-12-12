// const {publicStore} = require('backend/data/DataStore.js');
/**
 * Render function for each zodiac card
 * @param {*} ForYouData 
 */
export const renderZodiac = function(foryoudata) {
    let temp;
    if (foryoudata.name == "Today's Horoscope") {
        temp = "button has-background-danger is-light"
    }
    if (foryoudata.name == "Weekly Horoscope") {
        temp = "button  has-background-warning is-light"
    }
    if (foryoudata.name == "Monthly Horoscope") {
        temp = "button  has-background-primary is-light"
    }
    if (foryoudata.name == "Yearly Horoscope") {
        temp = "button  has-background-info is-light"
    }

    return `<div class="column is-3">
                <div class="card" style="height: 100%;background-color: ${foryoudata.backgroundColor}">
                    <br>
                    <div class="card-image">
                        <figure class="image is-128x128" style="margin: 0 auto">
                            <img class="is-rounded" src="${foryoudata.img}" alt="${foryoudata.name}">
                        </figure>
                    </div>
                    <div class="card-content has-text-centered">
                        <p class="title is-5 has-text-black has-text-weight-bold is-family-monospace" style="color: ${foryoudata.color}">${foryoudata.name}</p>
                        <div class="check">
                            <button class="${temp}" data="${foryoudata.id}">Click Me!</button>
                        </div>
                    </div>
                    
                </div>
            </div>
           `
};

export const loadCards = function(ForYouData) {
    $('body').addClass('has-background-dark');

    const $root = $('#root');
    let modalCards = $('<div id="ForYouData" class="columns is-centered is-mobile is-multiline" />');
    for (let i = 0; i < ForYouData.length; i++) {
        modalCards.append(renderZodiac(ForYouData[i]));
    }
    $root.addClass('container zodiac_modalCards').append(modalCards);

    $("#root").on("click", ".check", reHoro);

    // pops up a new page with zodiac details (or jumps to another page?)
    // $root.on('click', '.link_detail', ... );

};

$(function() {
    loadCards(ForYouData);


    $(".cd-main-nav__item--welcome").html("Hi,    <span class=curu></span>. &#10024   Welcome", )
    $(".curu").text(localStorage.currentusername).css('color', 'red')
});

async function todayHoro(horo) {
    let result = await axios({
        method: 'get',
        url: 'http://horoscope-api.herokuapp.com/horoscope/today/' + horo,
    });
    return result.data;
}

async function weekHoro(horo) {
    let result = await axios({
        method: 'get',
        url: 'http://horoscope-api.herokuapp.com/horoscope/week/' + horo,
    });
    return result.data;
}

async function monthHoro(horo) {
    let result = await axios({
        method: 'get',
        url: 'http://horoscope-api.herokuapp.com/horoscope/month/' + horo,
    });
    return result.data;
}

async function yearHoro(horo) {
    let result = await axios({
        method: 'get',
        url: 'http://horoscope-api.herokuapp.com/horoscope/year/' + horo,
    });
    return result.data;
}

async function getZod() {
    const result = await axios.get(`http://localhost:3000/user/record`, { headers: { "Authorization": "Bearer " + localStorage.getItem('currentuserjwt') } })
    console.log(result.data.result);
    return result.data;
} 
async function reHoro(event) {
    $("#newhoro").remove();
    let evid = $(event.target).attr("data");
    let evid1 = await getZod();
    console.log(evid1);
    let horo = evid1.result.zodiasign;
    console.log(horo);
    let horo1;
    switch (evid) {
        case "1":
            horo1 = await todayHoro(horo);
            break;
        case "2":
            horo1 = await weekHoro(horo);
            break;
        case "3":
            horo1 = await monthHoro(horo);
            break;
        case "4":
            horo1 = await yearHoro(horo);
            break;
    }


    let $newHoro = $(
        `<div id="newhoro" >
            <div class="column is-full ">
                <div class="box has-background-grey-lighter		" style="height: 100%>
                    <div class="media-content has-text-centered">
                    <blockquote class="blockquote">
                        <p class="title is-5 is-family-monospace">${horo1.horoscope}</p>
                        </blockquote>
                        </div>
                </div>
            </div>
        </div>`);
    $("#root").append($newHoro)
    $newHoro.show('slow');
}