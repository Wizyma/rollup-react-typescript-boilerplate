import { configure, storiesOf, addParameters } from '@storybook/react';
import React from 'react';

addParameters({
  name: 'Rollup Boilerplate',
  addonPanelInRight: false,
});

const addStories = (story, componentName, stories) => {
  stories.forEach(mutation => {
    const mutationName = mutation.name;

    if (!mutationName) {
      console.warn(`Component ${componentName} has a non named mutation, it will not be rendered`);
      return;
    }

    story.add(mutationName, () => mutation.story, {
      info: { inline: false, header: false },
    });
  });
};

const loadStories = () => {
  const context = require.context('../packages', true, /__stories__\/index.tsx$/);

  context
    .keys()
    .filter(componentPath => !componentPath.includes('node_modules'))
    .forEach(componentPath => {
      const stories = context(componentPath).default;
      const componentName = stories.componentName || (stories.component && stories.component.name);
      if (!componentName) {
        return console.error(`Component located at ${componentPath} does not have a name.
Please add componentName property if it's a pure component`);
      }

      const story: any = storiesOf(componentName, module);

      if (!stories.stories) {
        console.warn(`Component ${componentName} have no stories, it will be rendered without props`);
        story.add('with no props', () => React.createElement(stories.component));
      } else {
        addStories(story, componentName, stories.stories);
      }
    });
};

configure(loadStories, module);
