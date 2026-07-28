/**
 * AsciiArt — "Heximage", a looping animated-ASCII video baked from the 21st.dev
 * ASCII editor. Zero dependencies: one <video> that fills its parent. Used in
 * the hero as the "moving code" layer over the backdrop image.
 *
 * Note: the video streams from assets.21st.dev at runtime (not inlined), so the
 * hero needs a network connection to animate; the poster shows until it loads.
 * Remix the source recipe:
 * https://21st.dev/community/ascii/editor?from=0bfb4fe9-7583-459d-8192-1f7971e3c037
 */
export function AsciiArt({ className }: { className?: string }) {
  return (
    <video
      className={className}
      src="https://assets.21st.dev/ascii-recipes/videos/user_3GTmm8jNoQIxVVDZmyng4bN3uFj/38f24872-2e1b-4582-bcf0-375dceb1e481.mp4"
      poster="https://assets.21st.dev/ascii-recipes/thumbnails/user_3GTmm8jNoQIxVVDZmyng4bN3uFj/f1e9ca31-92ab-465d-a08f-41a0393623ce.webp"
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
