const copyButtons = document.querySelectorAll("[data-copy-link]");

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
};

copyButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const bookUrl = button.dataset.copyLink;
    const feedback = button.dataset.feedbackTarget
      ? document.querySelector(button.dataset.feedbackTarget)
      : button.closest("section")?.querySelector(".copy-feedback");
    const copied = await copyText(bookUrl);

    if (feedback) {
      feedback.textContent = copied
        ? button.dataset.copyMessage || "Book link copied."
        : "Copy this link: " + bookUrl;
    }
  });
});

const rotator = document.querySelector("[data-comments-rotator]");

if (rotator) {
  const comments = Array.from(rotator.querySelectorAll(".comment-card"));
  const dots = document.querySelector(".comments-dots");
  let activeComment = 0;

  comments.forEach((comment, index) => {
    comment.classList.toggle("is-active", index === activeComment);

    if (dots) {
      const dot = document.createElement("span");
      dot.classList.toggle("is-active", index === activeComment);
      dots.appendChild(dot);
    }
  });

  const dotItems = dots ? Array.from(dots.children) : [];

  const showComment = (index) => {
    comments[activeComment].classList.remove("is-active");
    dotItems[activeComment]?.classList.remove("is-active");
    activeComment = index;
    comments[activeComment].classList.add("is-active");
    dotItems[activeComment]?.classList.add("is-active");
  };

  if (comments.length > 1) {
    setInterval(() => {
      showComment((activeComment + 1) % comments.length);
    }, 4200);
  }
}
