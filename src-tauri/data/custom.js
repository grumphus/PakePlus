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

    const isBaseTargetBlank = !!document.querySelector('head base[target="_blank"]');
    const linkUrl = new URL(origin.href);
    const appHostname = window.location.hostname;

    const isExternal = linkUrl.hostname !== appHostname;

    // Only handle external links with target="_blank" or base[target="_blank"]
    if ((origin.target === '_blank' || isBaseTargetBlank) && isExternal) {
      // Check if Shift key is pressed
      if (e.shiftKey) {
        e.preventDefault();

        // Check if it's a YouTube watch URL
        const ytMatch = linkUrl.pathname === '/watch' && linkUrl.searchParams.has('v')
          ? linkUrl.searchParams.get('v')
          : null;

        if (ytMatch) {
          // Construct embed URL
          const embedUrl = `https://www.youtube.com/embed/${ytMatch}`;

          // Open centered popup window with embed URL
          const width = 800;
          const height = 450;
          const left = window.screenX + (window.outerWidth - width) / 2;
          const top = window.screenY + (window.outerHeight - height) / 2;

          window.open(
            embedUrl,
            'youtube_embed_popup',
            `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=no`
          );
          return;
        }
      }

      // If not Shift+Click or not YouTube, open normally in default browser
      e.preventDefault();
      invoke('open_url', { url: origin.href });
    }
  };

  document.addEventListener('click', hookClick, { capture: true });
}