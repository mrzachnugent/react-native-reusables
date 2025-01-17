import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

const MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const;

const COMMAND: Record<(typeof MANAGERS)[number], string[]> = {
  pnpm: ['pnpm', 'dlx'],
  npm: ['npx'],
  yarn: ['npx'],
  bun: ['bunx', '--bun'],
};

export function CommandTabs({ args }: { args: string[] }) {
  return (
    <div className='dark'>
      <Tabs items={MANAGERS as unknown as string[]} groupId='manager' persist>
        {MANAGERS.map((manager) => (
          <Tab key={manager} value={manager} className='dark:text-foreground *:dark'>
            <CodeBlock>
              <Pre>
                <code>{[...COMMAND[manager], '@react-native-reusables', ...args].join(' ')}</code>
              </Pre>
            </CodeBlock>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
