const instagramShare = document.querySelector("[data-copy-link]");
const copyFeedback = document.querySelector(".copy-feedback");

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-999px";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
};

if (instagramShare) {
  instagramShare.addEventListener("click", async (event) => {
    event.preventDefault();

    const bookUrl = instagramShare.dataset.copyLink;
    const copied = await copyText(bookUrl);

    if (copyFeedback) {
      copyFeedback.textContent = copied
        ? "Book link copied. Paste it into your Instagram post, story, or bio."
        : "Copy this link: " + bookUrl;
    }
  });
}
