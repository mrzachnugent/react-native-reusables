import { Button } from '@/registry/new-york/components/ui/button';
import { Text } from '@/registry/new-york/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york/components/ui/tooltip';

export function TooltipPreview() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='outline'>
          <Text>Hover</Text>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <Text>Add to library</Text>
      </TooltipContent>
    </Tooltip>
  );
}
