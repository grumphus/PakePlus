console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

import { open } from '@tauri-apps/api/shell';
import { appWindow } from '@tauri-apps/api/window';

const hookClick = (e) => {
  // Only handle left-clicks without modifier keys
  if (
    e.defaultPrevented ||
    e.button !== 0 || // 0 = left mouse button
    e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
  ) {
    return;
  }

  const anchor = e.target.closest('a');
  if (!anchor || !anchor.href) return;

  // Only handle links with target="_blank" or affected by <base target="_blank">
  const isTargetBlank = anchor.target === '_blank';
  const isBaseTargetBlank = !!document.querySelector('head base[target="_blank"]');

  if (isTargetBlank || isBaseTargetBlank) {
    e.preventDefault();
    // Set window title to link text or href
    appWindow.setTitle(anchor.textContent.trim() || anchor.href);
    open(anchor.href); // Open in system browser!
  }
};

document.addEventListener('click', hookClick, { capture: true });