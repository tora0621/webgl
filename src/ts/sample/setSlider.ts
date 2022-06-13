require('slick-carousel');
require('slick-carousel/slick/slick.scss');
require('slick-carousel/slick/slick-theme.scss');

/**
 * @description スライダー設定
 */
export function setSlider(): void {
  setSliderBasic();
}

/**
 * 通常のスライダー設定
 */
function setSliderBasic(): void {
  $('.js-slider').each((i, el) => {
    const slider = $(el);
    if (slider.hasClass('slick-slider')) {
      return;
    }
    const slick = slider.slick({
      lazyLoad: 'ondemand',
      slidesToShow: 4,
      slidesToScroll: 1,
      waitForAnimate: false,
      arrows: true,
      speed: 1500,
      autoplay: false,
      dots: true,
      centerMode: false,
      pauseOnHover: false,
      pauseOnFocus: false,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 560,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '40px',
            arrows: false,
          },
        },
      ],
    });
    // slickの戻値を対象要素に格納する（後からsetPositionに利用）
    slider.data('slick', slick);
  });
}
