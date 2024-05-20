import { COMPONENTS } from './components';

export type Component = (typeof COMPONENTS)[number] & { icons?: string[] };
type ComponentName = (typeof COMPONENTS)[number]['name'];

function getComponentDependencies(
  componentName: ComponentName,
  visited = new Set<ComponentName>()
) {
  const component = COMPONENTS.find((comp) => comp.name === componentName);
  if (!component) return [];

  visited.add(componentName);

  let dependencies: ComponentName[] = component.dependencies.slice();

  component.dependencies.forEach((dependency) => {
    if (!visited.has(dependency)) {
      const childDependencies = getComponentDependencies(dependency, visited);
      dependencies = dependencies.concat(childDependencies);
    }
  });

  return dependencies;
}

export const INVALID_COMPONENT_ERROR = 'invalid component';

export function getAllComponentsToWrite(componentNames: string[]): Component[] {
  const uniqueComponents = new Set<ComponentName>();

  if (
    componentNames.some((componentName) => !COMPONENTS.find((comp) => comp.name === componentName))
  ) {
    throw new Error(INVALID_COMPONENT_ERROR);
  }

  componentNames.forEach((componentName) => {
    const allDependencies = getComponentDependencies(componentName as ComponentName);
    allDependencies.unshift(componentName as never); // Add the component itself to the list
    allDependencies.forEach((dep) => {
      uniqueComponents.add(dep);
    });
  });

  return Array.from(uniqueComponents).map((dep) => {
    const comp = COMPONENTS.find((comp) => comp.name === dep);
    if (!comp) {
      throw new Error(INVALID_COMPONENT_ERROR);
    }
    return comp;
  });
}
