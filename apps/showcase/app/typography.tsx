import { ScrollView, View } from 'react-native';
import { Ui } from '@rnr/reusables';

export default function TypographyScreen() {
  return (
    <ScrollView contentContainerClassName='p-6 items-center' showsVerticalScrollIndicator={false}>
      <View className='max-w-lg'>
        <Ui.H1>The Rainbow Forest Adventure</Ui.H1>
        <View className='p-1.5' />
        <Ui.P>
          Once upon a time, in a magical forest, there lived a curious rabbit named Whiskers.
          Whiskers loved exploring and discovering new things every day.
        </Ui.P>
        <View className='p-3' />
        <Ui.H2>Whiskers' Discovery</Ui.H2>
        <Ui.P>
          One day, while hopping through the forest, Whiskers stumbled upon{' '}
          <Ui.P className='font-medium'>a mysterious rainbow-colored flower</Ui.P>. The flower had
          the power to make the forest come alive with vibrant colors and happy creatures.
        </Ui.P>
        <Ui.BlockQuote>
          "Oh, what a wonderful discovery!" exclaimed Whiskers. "I must share this magic with all my
          forest friends!"
        </Ui.BlockQuote>
        <View className='p-4' />
        <Ui.H3>The Colorful Transformation</Ui.H3>
        <View className='p-0.5' />
        <Ui.P>
          Whiskers excitedly gathered all the animals in the forest and showed them the magical
          rainbow flower. The animals were amazed and decided to plant more of these flowers to make
          their home even more magical.
        </Ui.P>
        <View className='p-1.5' />
        <Ui.P>
          As the rainbow flowers bloomed, the entire forest transformed into a kaleidoscope of
          colors. Birds chirped in harmony, butterflies danced in the air, and even the trees swayed
          to the rhythm of the wind.
        </Ui.P>
        <View className='p-3' />
        <Ui.H3>The Enchanted Celebration</Ui.H3>
        <View className='p-0.5' />
        <Ui.P>
          The animals decided to celebrate their enchanted forest with a grand feast. They gathered
          nuts, berries, and fruits from the colorful trees and shared stories of their adventures.
          The joyous laughter echoed through the Rainbow Forest.
        </Ui.P>
        <View className='p-1.5' />
        <Ui.Lead>
          And so, the Rainbow Forest became a place of wonder and happiness, where Whiskers and all
          the animals lived together in harmony.
        </Ui.Lead>
        <View className='p-3' />
        <Ui.H3>The Never-ending Magic</Ui.H3>
        <View className='p-0.5' />
        <Ui.P>
          The magic of the rainbow flowers continued to spread, reaching other parts of the world.
          Soon, forests everywhere became vibrant and alive, thanks to the discovery of Whiskers and
          the enchanted Rainbow Forest.
        </Ui.P>
        <View className='p-1.5' />
        <Ui.Large>
          The moral of the story is: embrace the magic of discovery, share joy with others, and
          watch as the world transforms into a colorful and beautiful place.
        </Ui.Large>
        <View className='p-3' />
      </View>
    </ScrollView>
  );
}
