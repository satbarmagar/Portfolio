 /* Typewriter Effect */
 function typeWriter($element, texts, index, isDeleting, delay) {
    let text = texts[index];
    let i = isDeleting ? text.length : 0;

    function updateText() {
      const currentText = $element.text();
      const newText = isDeleting
        ? currentText.slice(0, -1)
        : text.slice(0, i + 1);

      $element.text(newText);

      if (!isDeleting && newText === text) {
        isDeleting = true;
        delay = 200; // Pause before starting to delete
      } else if (isDeleting && newText === '') {
        isDeleting = false;
        index = (index + 1) % texts.length;
        text = texts[index];
        i = 0; // Reset the counter for the new line
        delay = 250; // Pause before starting to write again
      }

      i += isDeleting ? 0 : 1;
      setTimeout(updateText, isDeleting ? delay / 2 : delay);
    }

    updateText();
  }

  $(document).ready(function () {
    const $typewriter = $('#typewriter-container .typewriter');
    const texts = JSON.parse($typewriter.attr('data-texts'));
    typeWriter($typewriter, texts, 0, false, 100); // Adjusted initial write delay
  });
