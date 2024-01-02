# React Native Primitives

Style agnostic accessible for iOS and Android components

## Unstyled Nature

React Native Primitives provides unstyled components, offering a high degree of customization freedom. By default, the components come without any predefined styles, allowing developers to seamlessly match their app's aesthetics.

### Accessibility

Accessibility is a significant focus within React Native Primitives. We are dedicated to ensuring our components align with accessibility standards. Our ongoing efforts involve designing and testing components with appropriate labels, roles, and behaviors, aiming to provide an inclusive user experience.

### Internal vs. External State Control

The components in React Native Primitives offer distinct approaches in managing state:

- **Internal State Control:** Some components maintain their internal state, allowing you to monitor externally while offering seamless functionality.
  <br>
  TODO: Explain why and which type of components.

  - Show example of providing a value, and an onChange to keep track of internal state.
  - Show example of using `useRef` to trigger a state change
  - Mobile (all controlled) VS Web (controlled vs non-controlled) form fields

- **External State Control:** These components are designed with zero internal state, relying entirely on externally provided state.
