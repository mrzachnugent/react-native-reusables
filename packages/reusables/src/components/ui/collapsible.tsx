import * as CollapsiblePrimitive from '@rn-primitives/collapsible/dist/collapsible';
import { addCn } from '../../lib/addCn';

addCn([CollapsiblePrimitive.Root, CollapsiblePrimitive.Trigger, CollapsiblePrimitive.Content]);

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

const CollapsibleContent = CollapsiblePrimitive.Content;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
