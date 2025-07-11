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

    // Only handle links with target="_blank" or base[target="_blank"]
    if (origin.target === '_blank' || isBaseTargetBlank) {
      e.preventDefault(); // <-- THIS IS THE KEY

      console.log('origin', origin, isBaseTargetBlank);
      invoke('open_url', { url: origin.href });
    }
  };

  document.addEventListener('click', hookClick, { capture: true });
}