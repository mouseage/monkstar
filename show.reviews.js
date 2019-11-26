$(document).ready(async function() {   
    let timer = setInterval(function() {
        var cBlock = $('.shortcode-wcpr-grid');
        if(cBlock.length) {
            await showReviews();
            clearInterval(timer);
        }
    }, 1000);
});

function async showReviews() {
    let reviews = await $.ajax('https://cdn.jsdelivr.net/gh/mouseage/monkstars/reviews.json');
    $.each(reviews, function(key, review) {
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
    
        $('.shortcode-wcpr-grid').append(html);
    });
}
