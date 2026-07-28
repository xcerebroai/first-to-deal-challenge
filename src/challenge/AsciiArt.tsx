/**
 * AsciiArt — "Heximage", a looping animated-ASCII video baked from the 21st.dev
 * ASCII editor. Used in the hero as the "moving code" layer over the backdrop
 * image.
 *
 * Self-hosted: the video + poster live in src/assets and are inlined into the
 * build (the mp4 is ~488 KB, under the inline limit), so the hero animates with
 * no dependency on any external host. Remix the source recipe:
 * https://21st.dev/community/ascii/editor?from=0bfb4fe9-7583-459d-8192-1f7971e3c037
 */
import videoSrc from '../assets/ascii-code.mp4'
import posterSrc from '../assets/ascii-code-poster.webp'

export function AsciiArt({ className }: { className?: string }) {
  return (
    <video
      className={className}
      src={videoSrc}
      poster={posterSrc}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden
      style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
    />
  )
}

export default AsciiArt
