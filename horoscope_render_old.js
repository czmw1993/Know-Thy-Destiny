// const {publicStore} = require('backend/data/DataStore.js');
/**
 * Render function for each zodiac card
 * @param {*} zodiac 
 */
export const renderZodiac = function(zodiac, thhoro) {
    return `<div class="column is-one-third">
                <div class="card fade" style="height: 100%;background-color: ${zodiac.backgroundColor}">
                    <div class="card-image">
                        <br>
                        
                        <figure class="image is-96x96" style="margin: 0 auto">
                            <img class="is-rounded" src="${zodiac.img}" alt="${zodiac.name}">
                        </figure>
                    </div>
                    <div class="card-content has-text-centered">
                        <p class="title is-5 has-text-black has-text-weight-bold is-family-monospace" style="color: ${zodiac.color}">${zodiac.name}</p>
                        <p class="title is-6" style="color: ${zodiac.color}">Date Range: ${zodiac.dateRange}</p>
                        <div class="content is-size-8" style="color: ${zodiac.color}; max-height: 200px; overflow-y: scroll">
                            <p>${thhoro.horoscope}</p>
                        </div>
                    </div>
                </div>
            </div>
           `
};

async function loadCards(zodiacData) {
    $('body').addClass('has-background-dark');

    const $root = $('#root');
    let modalCards = $('<div id="zodiacs" class="columns is-centered is-mobile is-multiline" />');
    for (let i = 0; i < zodiacData.length; i++) {
        let horo = zodiacData[i].name.toLowerCase();
        let thhoro = await getHoro(horo);
        modalCards.append(renderZodiac(zodiacData[i], thhoro));
    }
    $root.addClass('container zodiac_modalCards').append(modalCards);
    $root.append(`<div id="allcomments"></div>`);

    let users = await getuser();
    for (let i = 0; i < users.result.length; i++) {
        let user = users.result[i];
        let body1 = await getbody(user);
        let body2 = body1.result;
        let index = body2.length - 1;
        let zod = body2[index].toLowerCase();
        let img = whichzodiac(zod);
        for (let j = 0; j < body2.length; j = j + 2) {
            let $comment2 = renderComment(user, body2[j], j, img);
            $("#allcomments").append($comment2);
        }
    }
    $root.append(`<br>`);
    $root.append(`<br>`);
    creatComment();
    $root.append(`<br>`);

    $("#root").on("click", ".newsubmit", submitComment);
    $("#root").on("click", "#delete", deleteco);

    // pops up a new page with zodiac details (or jumps to another page?)
    // $root.on('click', '.link_detail', ... );

};

$(function() {
    loadCards(zodiacData);


    $(".cd-main-nav__item--welcome").html("Hi,    <span class=curu></span>. &#10024   Welcome", )
    $(".curu").text(localStorage.currentusername).css('color', 'red')


});


async function getHoro(horo) {
    let result = await axios({
        method: 'get',
        url: 'http://horoscope-api.herokuapp.com/horoscope/today/' + horo,
    });
    return result.data;
}

const creatComment = function() {
    let $newTweet = $(`
        <div class="box">
            <form>
                <div class="field">
                <label class="label">New Comment</label>
                <div class="control">
                    <textarea id="text1" class="textarea" placeholder="What you want to say..."></textarea>
                </div>
                </div>
            
                <div class="field is-grouped">
                <div class="newsubmit">
                    <button class="button is-link">Submit</button>
                </div>
                <div class="newcancel">
                    <button class="button is-link is-light">Cancel</button>
                </div>
                </div>
            </form>
        </div>`);
    $("#root").append($newTweet);
}

/*async function newComment() {
    console.log(localStorage.getItem('currentuserjwt'));
    let result = await axios({
        method: 'post',
        url: 'http://localhost:3000/private/comment',
        data: {
          comment: $("#text1").val()
        },
        headers: { "Authorization": "Bearer " + localStorage.getItem('currentuserjwt') },
    });
    
    return result.data;
}*/

/*const zodiacid = function(zodiac) {
    let img;
    switch(zodiac){
        case "aquarius": img=1;
        break;
        case "pisces": img=2;
        break;
        case "aries": img=3;
        break;
        case "taurus": img=4;
        break;
        case "gemini": img=5;
        break;
        case "cancer": img=6;
        break;
        case "leo": img=7;
        break;
        case "virgo": img=8;
        break;
        case "libra": img=9;
        break;
        case "scorpio": img=10;
        break;
        case "sagittarius": img=11;
        break;
        case "capricorn": img=12;
        break;
    }
    return img;
}*/

async function postprivate() {
    let zod = localStorage.currentzodiac;
    const result = await axios.post(`http://localhost:3000/private/` + localStorage.currentusername, { data: [$("#text1").val(), zod], type: "merge" }, { headers: { "Authorization": "Bearer " + localStorage.getItem('currentuserjwt') } })
    return result.data
}

async function submitComment(event) {
    event.preventDefault();
    let $comment = await postprivate();
    let user = localStorage.currentusername;
    let body1 = await getbody(user);
    let body2 = body1.result;
    let index1 = body2.length - 2;
    let body3 = body2[index1];
    let index2 = body2.length - 1;
    let zod = body2[index2].toLowerCase();
    let img = whichzodiac(zod);
    let $newcomment = renderComment(user, body3, index, img);
    $("#allcomments").append($newcomment);
    $("#text1").val("");
}


const renderComment = function(user, body2, id, img) {
    let $comment1 = $(` <div class="box">
                            <article class="media">
                                <div class="media-left">
                                    <figure class="image is-64x64">
                                        <img src=${img} alt="Image">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <span class="has-text-weight-bold", style="font-size: 20px;" >${user}</span>
                                            <br>
                                            <br>
                                            <br>
                                            <span class="has-text-dark", style="font-size: 18px;">${body2}</span>
                                        </p>
                                    </div>
                                    <div class="level-right">
                                        <button id="delete" class="button is-link level-item" data="${user}" index="${id}">Delete</button>
                                    </div>
                                </div>
                            </article>
                        </div>`);
    return $comment1;
};

async function deletecomments(user) {
    //let zod=localStorage.currentzodiac;
    const result = await axios.delete(`http://localhost:3000/private/` + user, { headers: { "Authorization": "Bearer " + localStorage.getItem('currentuserjwt') } })
    return result.data;
}
async function deleteco(event) {
    let evid2 = $(event.target).attr("data");
    let cid = $(event.target).attr("index");
    if (evid2 != localStorage.currentusername) {
        alert("You can only destroy comments that you created!")
    } else {
        let body1 = await getbody(evid2);
        let body2 = body1.result;
        body2.splice(cid, 2);
        let $tweet2 = await deletecomments(evid2);
        let $comment2 = await postdelete(body2);
        $(event.target).parent().parent().parent().parent().remove();
    }
}

async function postdelete(body2) {
    //let zod=localStorage.currentzodiac;
    const result = await axios.post(`http://localhost:3000/private/` + localStorage.currentusername, { data: body2, type: "merge" }, { headers: { "Authorization": "Bearer " + localStorage.getItem('currentuserjwt') } })
    return result.data
}

/*async function getComments() {
    let result = await axios({
        method: 'get',
        url: 'http://localhost:3000/private',
        params: { limit: 10 },
        headers: { "Authorization": "Bearer " + localStorage.getItem('currentuserjwt') },
    });
    return result.data;
}*/

async function getuser() {
    const result = await axios.get(`http://localhost:3000/private/`, { headers: { "Authorization": "Bearer " + localStorage.getItem('currentuserjwt') } })
    return result.data;

}
async function getbody(user) {
    //let zod=localStorage.currentzodiac;
    const result = await axios.get(`http://localhost:3000/private/` + user, { headers: { "Authorization": "Bearer " + localStorage.getItem('currentuserjwt') } })
    return result.data;
}
/*async function getimg() {
    const result = await axios.get(`http://localhost:3000/user/1`, { headers: { "Authorization": "Bearer " + localStorage.getItem('currentuserjwt') } })
    return result.data;
}
getimg();*/

const whichzodiac = function(zodiac) {
    let img;
    switch (zodiac) {
        case "aquarius":
            img = "zodiac_icons/png/aquarius-astrological-sign-symbol.png";
            break;
        case "pisces":
            img = "zodiac_icons/png/pisces-astrological-sign.png";
            break;
        case "aries":
            img = "zodiac_icons/png/aries-sign.png";
            break;
        case "taurus":
            img = "zodiac_icons/png/taurus-astrological-sign-symbol-1.png";
            break;
        case "gemini":
            img = "zodiac_icons/png/gemini-zodiac-sign-symbol.png";
            break;
        case "cancer":
            img = "zodiac_icons/png/cancer-zodiac-sign-symbol.png";
            break;
        case "leo":
            img = "zodiac_icons/png/leo-sign.png";
            break;
        case "virgo":
            img = "zodiac_icons/png/virgo-astrological-symbol-sign-1.png";
            break;
        case "libra":
            img = "zodiac_icons/png/libra-sign.png";
            break;
        case "scorpio":
            img = "zodiac_icons/png/scorpion-astrological-sign.png";
            break;
        case "sagittarius":
            img = "zodiac_icons/png/sagittarius-zodiac-symbol.png";
            break;
        case "capricorn":
            img = "zodiac_icons/png/capricorn-sign.png";
            break;
    }
    return img;
}
console.log(localStorage);