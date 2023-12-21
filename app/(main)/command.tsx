import { ListRenderItemInfo } from '@shopify/flash-list';
import {
  Calendar,
  Accessibility,
  Activity,
  Airplay,
  AlarmClockIcon,
  AlertCircle,
  AlignRight,
  Baby,
  BadgeAlert,
  Database,
  Fan,
  Table,
  Lamp,
  Ear,
} from 'lucide-react-native';
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { buttonTextVariants, buttonVariants } from '~/components/ui/button';
import {
  Command,
  CommandContent,
  CommandInput,
  CommandList,
  CommandListHeader,
  CommandListItem,
  CommandTrigger,
} from '~/components/ui/command';
import { cn } from '~/lib/utils';

const data = [
  'HTML Basics',
  { title: 'Introduction to HTML', id: 'htmlIntro', icon: Calendar },
  { title: 'HTML Tags and Elements', id: 'htmlTags', icon: Accessibility },
  'CSS Fundamentals',
  { title: 'CSS Selectors', id: 'cssSelectors', icon: Activity },
  { title: 'Box Model', id: 'boxModel', icon: Airplay },
  'JavaScript Essentials',
  {
    title: 'Variables and Data Types',
    id: 'jsVariables',
    icon: AlarmClockIcon,
  },
  { title: 'Functions and Scope', id: 'jsFunctions', icon: AlertCircle },
  'React Framework',
  { title: 'React Components', id: 'reactComponents', icon: AlignRight },
  { title: 'State and Props', id: 'reactStateProps', icon: Baby },
  'Responsive Web Design',
  { title: 'Media Queries', id: 'mediaQueries', icon: BadgeAlert },
  { title: 'Flexbox and Grid', id: 'flexboxGrid', icon: Database },
  'Backend Development',
  { title: 'Node.js Basics', id: 'nodeBasics', icon: Fan },
  { title: 'RESTful APIs', id: 'restAPIs', icon: Table },
  'Version Control (Git)',
  { title: 'Git Workflow', id: 'gitWorkflow', icon: Lamp },
  { title: 'Branches and Merging', id: 'gitBranches', icon: Ear },
];

export default function CommandScreen() {
  const renderSectionHeader = React.useCallback(
    (props: ListRenderItemInfo<string>) => {
      return <CommandListHeader>{props.item}</CommandListHeader>;
    },
    []
  );
  const renderItem = React.useCallback(
    ({ index, item }: ListRenderItemInfo<(typeof data)[number]>) => {
      if (typeof item === 'string') return null;
      return (
        <CommandListItem index={index}>
          {({ pressed }) => {
            const Icon = item.icon;
            return (
              <>
                <Icon
                  className={cn(pressed && 'opacity-70', 'text-foreground')}
                  size={21}
                />
                <Text
                  className={cn(
                    pressed && 'opacity-70',
                    'text-foreground font-semibold text-lg'
                  )}
                >
                  {item.title}
                </Text>
              </>
            );
          }}
        </CommandListItem>
      );
    },
    []
  );
  return (
    <View className='flex-1 justify-center items-center'>
      <Command
        data={data}
        filterFn={(search, item) => {
          if (typeof item === 'string') return true;
          return item.title.toLowerCase().includes(search.toLowerCase());
        }}
        onItemSelected={(item) => {
          if (typeof item === 'string') return;
          Alert.alert(item.title);
        }}
      >
        <CommandTrigger className={buttonVariants()}>
          {({ pressed }) => (
            <Text
              className={buttonTextVariants({
                className: pressed ? 'opacity-70' : '',
              })}
            >
              Open Commannd
            </Text>
          )}
        </CommandTrigger>
        <CommandContent>
          <CommandInput />
          <CommandList
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
          />
        </CommandContent>
      </Command>
    </View>
  );
}
