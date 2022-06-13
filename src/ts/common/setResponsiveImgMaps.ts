/**
 * @description クリッカブルマップレスポンシブ設定
 */
export function setResponsiveImgMaps(): void {
  const responsiveImgMaps = (): void => {
    $('img[usemap]').each(function () {
      const self: JQuery = $(this);
      const img: HTMLImageElement = this as HTMLImageElement;
      const w: number = img.naturalWidth;
      const h: number = img.naturalHeight;
      const wPercent: number = (self.width() as number) / 100;
      const hPercent: number = (self.height() as number) / 100;
      const usemap: string | undefined = self.attr('usemap');

      if (usemap === undefined) return;
      $(`map[name=${usemap.replace('#', '')}] area`).each(function () {
        const self: JQuery = $(this);

        if (!self.data('coords')) self.data('coords', self.attr('coords') ?? '');

        self.attr(
          'coords',
          self
            .data('coords')
            .split(',')
            .map((v: string, i: number) => {
              const val: number = parseInt(v);
              if (i % 2 === 0) {
                return Math.floor((val / w) * 100 * wPercent);
              } else {
                return Math.floor((val / h) * 100 * hPercent);
              }
            })
            .toString()
        );
      });
    });
  };

  $(window).on('load resize', responsiveImgMaps);
}
