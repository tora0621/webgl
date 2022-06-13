interface JQuery {
  /**
   * Initialize plugin.
   * @param options Custom settings.
   */
  venobox(options?: venoboxOptions): JQuery;
}

/**
 * VenoBox Options.
 */
interface venoboxOptions {
  /**
   * Gallery navigation arrows color.
   * @default '#B6B6B6'
   */
  arrowsColor?: string;
  /**
   * Automatic play for videos.
   * @default false
   */
  autoplay?: boolean;
  /**
   * Background color of the item (also affects border color, if has a border).
   * @default '#ffffff'
   */
  bgcolor?: string;
  /**
   * Border thickness of the modal window.
   * @default '0px'
   */
  border?: string;
  /**
   * Close button background color.
   * @default 'transparent'
   */
  closeBackground?: string;
  /**
   * Close button text color.
   * @default '#d2d2d2'
   */
  closeColor?: string;
  /**
   * You can set a static window width, otherwise the plugin will keep the responsive size settings of .venoframe class.
   * @default ''
   */
  framewidth?: string;
  /**
   * You can set a static window height, otherwise the plugin will keep the responsive size settings of .venoframe class.
   * @default ''
   */
  frameheight?: string;
  /**
   * Infinite gallery, jumps from last to first item and vice versa.
   * @default false
   */
  infinigall?: boolean;
  /**
   * Show navigation number and total items in current gallery.
   * @default false
   */
  numeratio?: boolean;
  /**
   * Gallery numeration background color.
   * @default 'transparent'
   */
  numerationBackground?: string;
  /**
   * Gallery numeration text color.
   * @default '#d2d2d2'
   */
  numerationColor?: string;
  /**
   * Gallery numeration position, available: 'top' or 'bottom'.
   * @default 'top'
   */
  numerationPosition?: string;
  /**
   * Set false to disable the overlay click-close and keep enabled only the [×] close button.
   * @default true
   */
  overlayClose?: boolean;
  /**
   * Overlay background color.
   * @default 'rgba(255,255,255,0.85)'
   */
  overlayColor?: string;
  /**
   * Specific attribute to display a title (e.g. 'data-title').
   * @default 'title'
   */
  titleattr?: string;
  /**
   * Title background color.
   * @default '#161617'
   */
  titleBackground?: string;
  /**
   * Title text color.
   * @default '#d2d2d2'
   */
  titleColor?: string;
  /**
   * Title position, available: 'top' or 'bottom'.
   * @default 'top'
   */
  titlePosition?: string;
  /**
   * Preloader color.
   * @default '#d2d2d2'
   */
  spinColor?: string;
  /**
   * Preloader type.
   * @default 'double-bounce'
   */
  spinner?: string;
  /**
   * Sharing buttons for images and videos..
   * @default []
   */
  share?: [];
}
