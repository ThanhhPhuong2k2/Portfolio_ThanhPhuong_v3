import "react";

/** Allow the kit's CSS custom properties (--h, --hm, --p-h ...) in style props, typed. */
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
