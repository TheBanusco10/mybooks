export default () => {
  const showButton = ref(true);
  const lastScrollTop = ref(0);
  const scrollThreshold = 10; // Minimum scroll amount to trigger hide/show

  const handleFloatButtonScroll = () => {
    // Don't apply scroll behavior on medium screens and up (where button is not fixed)
    if (window.innerWidth >= 768) {
      showButton.value = false;
      return;
    }

    const currentScrollTop =
      window.scrollY || document.documentElement.scrollTop;

    // Check if we've scrolled more than the threshold
    if (Math.abs(lastScrollTop.value - currentScrollTop) <= scrollThreshold)
      return;

    // Scrolling down
    if (currentScrollTop > lastScrollTop.value) {
      showButton.value = false;
    }
    // Scrolling up
    else {
      showButton.value = true;
    }

    lastScrollTop.value = currentScrollTop;
  };

  const addScrollListener = () => {
    window.addEventListener("scroll", handleFloatButtonScroll, { passive: true });
  }

  const removeScrollListener = () => {
    window.removeEventListener("scroll", handleFloatButtonScroll);
  }

  return {
    showButton,
    addScrollListener,
    removeScrollListener,
  };
};
