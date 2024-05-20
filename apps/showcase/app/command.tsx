import { DeprecatedUi } from '@rnr/reusables';
import * as React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Activity } from '~/lib/icons/Activity';
import { Airplay } from '~/lib/icons/Airplay';
import { AlarmClockIcon } from '~/lib/icons/AlarmClockIcon';
import { AlertCircle } from '~/lib/icons/AlertCircle';
import { AlignRight } from '~/lib/icons/AlignRight';
import { Baby } from '~/lib/icons/Baby';
import { BadgeAlert } from '~/lib/icons/BadgeAlert';
import { Calendar } from '~/lib/icons/Calendar';
import { Database } from '~/lib/icons/Database';
import { Ear } from '~/lib/icons/Ear';
import { Fan } from '~/lib/icons/Fan';
import { GalleryHorizontal } from '~/lib/icons/GalleryHorizontal';
import { Lamp } from '~/lib/icons/Lamp';
import { Table } from '~/lib/icons/Table';
import { cn } from '~/lib/utils';

const {
  buttonTextVariants,
  buttonVariants,
  Command,
  CommandContent,
  CommandInput,
  CommandList,
  CommandListHeader,
  CommandListItem,
  CommandTrigger,
} = DeprecatedUi;

export default function CommandScreen() {
  const renderSectionHeader = React.useCallback((props: DeprecatedUi.CommandListHeaderProps) => {
    return <CommandListHeader>{props.item}</CommandListHeader>;
  }, []);
  const renderItem = React.useCallback(
    ({ index, item }: DeprecatedUi.CommandListItemProps<(typeof data)[number]>) => {
      if (typeof item === 'string') return null;
      return (
        <CommandListItem index={index}>
          {({ pressed }) => {
            const Icon = item.icon;
            return (
              <>
                <Icon className={cn(pressed && 'opacity-70', 'text-foreground')} size={21} />
                <Text
                  className={cn(pressed && 'opacity-70', 'text-foreground font-semibold text-lg')}
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
          return item.title.toLowerCase().includes(search.toLowerCase());
        }}
        onItemSelected={(item) => {
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
              Open Command
            </Text>
          )}
        </CommandTrigger>
        <CommandContent>
          <CommandInput />
          <CommandList
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            ListEmptyComponent={() => {
              return (
                <Pressable className='bg-background items-center p-6 rounded-b-2xl'>
                  <Text className='text-foreground text-lg font-semibold'>No Results...</Text>
                </Pressable>
              );
            }}
          />
        </CommandContent>
      </Command>
    </View>
  );
}

const data = [
  'HTML Basics',
  { title: 'Introduction to HTML', id: 'htmlIntro', icon: Calendar },
  { title: 'HTML Tags and Elements', id: 'htmlTags', icon: GalleryHorizontal },
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
