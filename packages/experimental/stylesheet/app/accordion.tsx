import { View } from 'react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Text } from '~/components/ui/text';
import { createStyleSheet, useStyles } from '~/styles/stylesheet';

export default function AccordionScreen() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.root}>
      <Accordion type='multiple' collapsible defaultValue={['item-1']}>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <Text>Is it accessible?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>
            <Text>What are universal components?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>
              In the world of React Native, universal components are components that work on both
              web and native platforms.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>
            <Text>Is this component universal?</Text>
          </AccordionTrigger>
          <AccordionContent>
            <Text>Yes. Try it out on the web, iOS, and/or Android.</Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}

const stylesheet = createStyleSheet(({ utils }) => {
  return {
    root: {
      flex: 1,
      justifyContent: 'center',
      padding: utils.space(6),
    },
  };
});
