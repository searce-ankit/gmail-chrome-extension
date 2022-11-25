(async () => {
    const src = chrome.runtime.getURL('js/app.js');
    const contentScript = await import(src);
    await contentScript.app();
  })();