import { useFonts } from '@expo-google-fonts/geist/useFonts';
import { Geist_100Thin } from '@expo-google-fonts/geist/100Thin';
import { Geist_200ExtraLight } from '@expo-google-fonts/geist/200ExtraLight';
import { Geist_300Light } from '@expo-google-fonts/geist/300Light';
import { Geist_400Regular } from '@expo-google-fonts/geist/400Regular';
import { Geist_500Medium } from '@expo-google-fonts/geist/500Medium';
import { Geist_600SemiBold } from '@expo-google-fonts/geist/600SemiBold';
import { Geist_700Bold } from '@expo-google-fonts/geist/700Bold';
import { Geist_800ExtraBold } from '@expo-google-fonts/geist/800ExtraBold';
import { Geist_900Black } from '@expo-google-fonts/geist/900Black';

function useGeistFont() {
  return useFonts({
    Geist_100Thin,
    Geist_200ExtraLight,
    Geist_300Light,
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_700Bold,
    Geist_800ExtraBold,
    Geist_900Black,
  });
}

export { useGeistFont };
