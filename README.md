# Team Builder Front-End

## Contribution Guide

Nothing stated here is neccessarily correct, but as the code is potentially
going to be used by future build week students there should be a definitive
guide to code organization. Feel free to change anything --- just document it.

### Style
- 2 Spaces for indentation for JS, JSX and CSS-in-JS.
- Avoid letting lines grow longer than 80 to 90 characters. Avoid wrapping completely.
- Components files and variables names should be PascalCase.
- Write functional components by default. If state or lifecycle methods are
  needed use hook if you are comfortable, otherwise use a class component.
- Use `children` where it reduces the number of unnecessary props to pass down.

## Directory Structure

Follow the guide [here](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)
and seen below with slight modification.

```
/src
  /components 
    /Button 
    /Notifications
      /components
        /ButtonDismiss
          /images
          /locales
          /specs 
          /index.js
      /index.js

  /scenes
    /Home 
      /components 
        /ButtonLike
      /services
        /processData
      /index.js

    /Sign 
      /components 
        /FormField
      /scenes
        /Login
        /Register 
          /locales
          /specs
          /index.js

  /services
    /api
      index.js
    /geolocation
    /session
      /actions.js
      /reducer.js
    /users
      /actions.js
      /reducer.js
  /styles
    index.js
    theme.js
    StyledButtons.js

  App.js
  index.js 
  store.js
```

Scenes may define components, services and other scenes. The items it defines
may only be used inside of it. If a component, service or scene needs to be
shared between scenes, it is defined in its respective root directory.

Components are exported with a default export from their respective `index.js`.
They may define sub components.

Styles are defined in file with `styled-components`, or in a `styles.js` file.
Shared styled components that do not require any functionality are defined in
the root `/styles` directory and exported by `/styles/index.js`. Common style
variables, like color themes and fonts are defined in `/styles/theme.js`.

Services are all logic not directly belonging to a component. This includes
Redux actions and Reducers, which should be defined in the root `/services` in a
logically named directory. A small number of functions may be defined in
component files, but if logic is shared or becomes larger it should be moved
into a `services` sub-directory.

All api requests are localized in `/services/api/index.js`. The are imported and
used by the actions instead of having actions make the api calls directly.
