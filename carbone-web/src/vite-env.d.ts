/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      src?: string
      poster?: string
      alt?: string
      'auto-rotate'?: boolean | string
      'camera-controls'?: boolean | string
      'shadow-intensity'?: string
      exposure?: string
      style?: React.CSSProperties
      class?: string
    }, HTMLElement>
  }
}