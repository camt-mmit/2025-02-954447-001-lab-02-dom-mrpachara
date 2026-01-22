import createInputListComponent from './input-list-component.js';

/**
 * Create section-list component.
 *
 * @param {HTMLElement} componentElem
 *
 * @returns {HTMLElement}
 */
export default function (componentElem) {
  const templateElem = componentElem.querySelector(
    'template.app-tmp-section-component',
  );

  const listContainer = templateElem.parentElement;

  const regenerateTitleNumbersAndStatus = () => {
    [...listContainer.querySelectorAll('.app-cmp-section')].forEach(
      (container, index, items) => {
        [...container.querySelectorAll('.app-section-number')].forEach(
          (elem) => (elem.textContent = `${index + 1}`),
        );

        [
          ...container.querySelectorAll('button.app-cmd-remove-section'),
        ].forEach((elem) => (elem.disabled = items.length === 1));
      },
    );
  };

  const createContainer = () => {
    const container = templateElem.content.cloneNode(true).firstElementChild;

    container.addEventListener('click', (ev) => {
      if (ev.target?.matches('.app-cmd-remove-section') ?? false) {
        container.remove();

        regenerateTitleNumbersAndStatus();
      }
    });

    listContainer.append(container);

    createInputListComponent(container);

    regenerateTitleNumbersAndStatus();
  };

  componentElem.addEventListener('click', (ev) => {
    if (ev.target?.matches('.app-cmd-add-section')) {
      createContainer();
    }
  });

  createContainer();

  return componentElem;
}
