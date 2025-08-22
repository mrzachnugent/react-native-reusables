import { COMPONENTS } from '@showcase/lib/constants';
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';

export default function Screen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();

  useFocusEffect(() => {
    try {
      const item = Array.isArray(slug) ? slug[0] : slug;

      if (getIsComponent(item)) {
        router.replace(`/components/${item}`);
        return;
      }
      // Fallback to home
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  });

  return <Stack.Screen options={{ headerShown: false }} />;
}

function getIsComponent(slug: string) {
  return COMPONENTS.some((component) => component.slug === slug);
}
