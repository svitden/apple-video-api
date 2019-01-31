/*
HMLHttpRequest
*/
'use strict';

var server = 'https://itunes.apple.com';
/*
ET - 8 часов,  AT - 4 часа 
*/

let videoList = []; // массив с данными
let $searchFormElement = $('#search-form');
let elementCount = 3;

// создаем событие отправки
$searchFormElement.on('submit', function(event){
    event.preventDefault();

    let value =  $('[name = "searchValue"]', this).val();    
    value = value.trim();
    if (!value) return;

    var request = $.ajax(`${server}/search?entity=musicVideo&term=${value}`);
    
    request.done(response => {
        let responseObj = JSON.parse(response);
        let $artistInfo = $('.artist-info');
        let $p = $('<p>');
        let $a = $('<a>');
        
        videoList = responseObj.results;
        videoList.length = elementCount;

        // удалить предыдущие видео и данные
        if ($('.carousel-inner').find('div.item')) {
            $('.carousel-inner').find('div.item').remove();
            $artistInfo.empty();
        }

        $artistInfo.css({
            'margin-bottom': '50px'
        })

        $('<h2>')
            .text(videoList[0].artistName)            
            .appendTo($artistInfo);

        $p.appendTo($artistInfo);

        $a.appendTo($p)
            .attr('href', videoList[0].trackViewUrl)
            .attr('target', '_blank')
            .text('Read more...')            
            .appendTo($artistInfo);


        // для каждого элемента из списка
        videoList.forEach(video => {
            //console.log(video);

            // клавный div для карусели
            let $divItem = $('<div>');
            let $divContainer = $('<div>');
            let $divCaption = $('<div>');

            $divItem
                .addClass('item')
                .appendTo('.carousel-inner');

            // контейнер для видео            
            $divContainer
                .addClass('container-video')
                .appendTo($divItem)
                ;

            $('<video>')                
                .attr({
                    'height': '100%',
                    'width': '70%',                   
                    'controls': 'controls',
                    'src': video.previewUrl
                })                
                .appendTo($divContainer);
            
            $('.carousel-inner').find('div.item').eq(0)
                .addClass('active');            
            
            $divCaption
                .addClass('carousel-caption')
                .appendTo($divItem);

            $('<h3>')
                .text(video.artistName)
                .appendTo($divCaption);

            $('<p>')
                .text(video.trackName)
                .appendTo($divCaption);

        });
        
    });

});


//console.log($booksList.length);
/*
function sendRequest(queryString) {
    var request = $.ajax(`${server}/search?entity=musicVideo&term=${queryString}&maxResults=3`);

    request.done(response => {
        //console.log('response', response);
        booksList = response.items;
        $booksListElement.empty();

        booksList.forEach(book => {
            //console.log(book);
            $('<a>')
                .attr('href', '')
                .addClass('list-group-item')
                .attr('data-id', book.id)
                .text(book.volumeInfo.title)
                .appendTo($booksListElement);
        });

    }).fail(error => {
        console.error('error', error); // место где можно перехватить ошибку
        alert(error.responseJSON.error.message);
    });
}
*/

/*
$('body').on('click', '[data-id]', function(event) {
    event.preventDefault();

    let id = $(this).data('id');
    // метод из ES6 find
    let bookData = booksList.find(element => element.id === id);
    console.log(bookData);

    let $p = $('<p>').text(bookData.volumeInfo.description),
        $a = $('<a>').attr('href', bookData.volumeInfo.previewLink).text('Read more ...').attr('target', 'blank');

    $bookInfoElement
        .hide()
        .fadeIn(700)
        .find('.book-heading')
            .text(`${bookData.volumeInfo.title} | ${bookData.volumeInfo.authors.join(', ')} ( ${bookData.volumeInfo.publishedDate} )` )
            .end() // конец и возврат на уровень выше
        .find('.book-body')
            .empty()
            .append('<img class="pull-left" src="' + bookData.volumeInfo.imageLinks.smallThumbnail + '">')
            .append($p)
            .append($a); //ссылка на картинку
    
});
*/
