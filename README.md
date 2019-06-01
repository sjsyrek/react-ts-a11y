# Accessible React tabs component

Read the blog post about this repo [here]().

## Accessibility

Component is implemented according to [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html).

Keyboard Support:

- <kbd>Tab</kbd>
  - When focus moves into the tab list, places focus on the active tab element.
  - When the tab list contains the focus, moves focus to the next element in the tab sequence, which is the tabpanel element.
- <kbd>Right Arrow</kbd>
  - Moves focus to the next tab.
  - If focus is on the last tab, moves focus to the first tab.
  - Activates the newly focused tab.
- <kbd>Left Arrow</kbd>
  - Moves focus to the previous tab.
  - If focus is on the first tab, moves focus to the last tab.
  - Activates the newly focused tab.
- <kbd>Home</kbd>
  - Moves focus to the first tab and activates it.
- <kbd>End</kbd>
  - Moves focus to the last tab and activates it.
- <kbd>Delete</kbd>
  - When focus is on the tab, removes the tab from the tab list and places focus on the previous tab.

## Example of Usage

```js
```

## Development

```
yarn
# start dev server
yarn start
# (in other terminal) open cypress to debug
yarn cypress open
```

To run tests:

```
yarn test
```

## Improvements

- Add test suite for clicks
- Add test suite for insert functionality (<kbd>Enter</kbd>?)
- Add test suite for edge cases
