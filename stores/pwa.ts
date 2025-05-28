const PWA_MODAL_CONSENT_COOKIE_NAME = "pwaModalConsent";

export const usePWAStore = defineStore("pwa", () => {
  const canInstall = ref(false);
  const deferredPrompt = ref<any>(null);
  const modalConsent = ref(
    Boolean(
      useCookie(PWA_MODAL_CONSENT_COOKIE_NAME, { default: () => "true" }).value
    )
  );

  const hookIntoInstallPrompt = () => {
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log('here');
      e.preventDefault();
      deferredPrompt.value = e;
      canInstall.value = true;
    });
  };

  const installPWA = async () => {
    if (!deferredPrompt.value) return;

    deferredPrompt.value.prompt();

    deferredPrompt.value = null;
    canInstall.value = false;
  };

  const updateModalConsent = (consent: boolean) => {
    const modalConsentCookie = useCookie(PWA_MODAL_CONSENT_COOKIE_NAME);

    modalConsentCookie.value = new Boolean(consent).toString();

    modalConsent.value = consent;
  };

  const isPWAInstalled = () => {
    return window.matchMedia("(display-mode: standalone)").matches;
  };

  return {
    canInstall,
    hookIntoInstallPrompt,
    modalConsent,
    installPWA,
    updateModalConsent,
    isPWAInstalled,
  };
});
