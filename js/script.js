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
let elementLimit = 3;

// создаем событие отправки
$searchFormElement.on('submit', function(event){
    event.preventDefault();

    let value =  $('[name = "searchValue"]', this).val();    
    value = value.trim();
    if (!value) return;

    var request = $.ajax(`${server}/search?entity=musicVideo&term=${value}&limit=${elementLimit}`);
    
    request.done(response => {
        let responseObj = JSON.parse(response);
        let $artistInfo = $('.artist-info');
        let $p = $('<p>');
        let $a = $('<a>');
        let $carouselIndicators = $('.carousel-indicators');
        
        videoList = responseObj.results;
        console.log(videoList);
        //videoList.length = elementCount;

        // удалить предыдущие видео и данные
        if ($('.carousel-inner').find('div.item')) {
            $('.carousel-inner').find('div.item').remove();
            $artistInfo.empty();
            $carouselIndicators.empty();
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
        videoList.forEach((video, index) => {
            console.log(video);

            // клавный div для карусели
            let $divItem = $('<div>');
            let $divContainer = $('<div>');
            let $divCaption = $('<div>');

            // создание точек-переключателей
            $('<li>')
                .attr({
                    'data-target': '#myCarousel',
                    'data-slide-to': index
                })
                .appendTo($carouselIndicators);

            $carouselIndicators
                .find('div:first-child')
                .addClass('active'); 

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
            
            $('.carousel-inner')
                .find('div:first-child')
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

