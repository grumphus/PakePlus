console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const { invoke } = window.__TAURI__.core;

if ('__TAURI__' in window) {
  const hookClick = (e) => {
    const origin = e.target.closest('a');
    if (!origin || !origin.href) return;

    const isBaseTargetBlank = document.querySelector('head base[target="_blank"]');

    if (origin.target === '_blank' || isBaseTargetBlank) {
      e.preventDefault(); // <-- THIS IS THE KEY

      // Check for Shift+Click and YouTube watch URL
      if (e.shiftKey) {
        try {
          const url = new URL(origin.href);
          if (url.hostname === 'www.youtube.com' && url.pathname === '/watch' && url.searchParams.has('v')) {
            const videoId = url.searchParams.get('v');
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            // Popup window parameters
            const width = 800;
            const height = 450;
            const left = window.screenX + (window.outerWidth - width) / 2;
            const top = window.screenY + (window.outerHeight - height) / 2;

            window.open(
              embedUrl,
              'youtube_embed_popup',
              `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=no`
            );

            return; // Exit early, do not invoke open_url
          }
        } catch {
          // Invalid URL, fallback to normal behavior below
        }
      }

      // Default behavior: open in default browser
      console.log('origin', origin, isBaseTargetBlank);
      invoke('open_url', { url: origin.href });
    }
  };

  document.addEventListener('click', hookClick, { capture: true });
}