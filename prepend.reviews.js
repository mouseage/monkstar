$(document).ready(function() {   
    let timer = setInterval(function() {
        var cBlock = $('.shortcode-wcpr-grid');
        if(cBlock.length) {
            showReviews();
            clearInterval(timer);
        }
    }, 500);
});

function showReviews() {
    $.getJSON('https://cdn.jsdelivr.net/gh/mouseage/monkstars/reviews.json', function(reviews) {
        $.each(reviews, function(key, review) {
            if (review.rating > 3 && review.image && review.customer.name != 'Charles W.') {
                let html = `
                    <div id="shortcode-comment-`+ key +`" class="shortcode-wcpr-grid-item">
                        <div class="shortcode-wcpr-content">`;
                        if (review.image) {
                            html += `
                                <div class="shortcode-reviews-images-container">
                                    <div class="shortcode-reviews-images-wrap-left"></div>
                                    <div class="shortcode-reviews-images-wrap-right">
                                        <img 
                                            class="shortcode-reviews-images" 
                                            data-original_src="`+ review.image +`" 
                                            src="`+ review.image +`" 
                                            alt="`+ review.customer.name +` photo review" 
                                            title="Monkstars Review - Our happy customers 76" 
                                        />
                                    </div>
                                </div>
                            `;
                        }
        
                    html += `<div class="shortcode-review-content-container">
                                <div class="shortcode-review-content-container-top">
                                    <div class="shortcode-wcpr-comment-author">`+ review.customer.name +`</div>
                                    <div class="wcpr-review-rating">
                                        <div class="star-rating">
                                            <span style="width:`+ (review.rating * 20 ) +`%">Rated <strong class="rating">`+ review.rating +`</strong> out of 5</span>
                                        </div>
                                        <div class="wcpr-review-date">`+ review.date +`</div>
                                    </div>
                                </div>
                                <div class="shortcode-wcpr-review-content">`+ review.message +`</div>
                            </div>
                        </div>
                    </div>`;
        
                $('.shortcode-wcpr-grid').prepend(html);
            }
        });
    });
}
