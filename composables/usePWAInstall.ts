import { addYear } from "@formkit/tempo";

export default () => {
  const showInstallModalCookie = useCookie("show-pwa-install-modal", {
    default: () => true,
    expires: addYear(new Date()),
  });

  // Use the Nuxt PWA module
  const pwa = useNuxtApp().$pwa;

  // Computed property to determine if the modal should be shown
  const shouldShowModal = computed(
    () => showInstallModalCookie.value && !pwa?.isPWAInstalled
  );

  // Function to install the app
  const installApp = async () => {
    if (pwa?.isPWAInstalled || !showInstallModalCookie.value) return;

    console.log(pwa);

    try {
      const result = await pwa?.install();
      console.log(result);
    } catch (error) {
      console.error("Error installing PWA:", error);
    }
  };

  return {
    shouldShowModal,
    showInstallModalCookie,
    installApp,
  };
};
