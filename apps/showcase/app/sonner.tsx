import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Code } from '~/lib/icons/Code';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import * as Burnt from "burnt";

export default function SonnerScreen() {
	function showSuccessToast() {
		Burnt.toast({
			title: "Success!",
			message: "You have successfully completed the tutorial. You can now go touch some grass.",
			preset: "done",
		});
	}
	function showErrorToast() {
		Burnt.toast({
			title: "Danger!",
			message: "High voltage. Do not touch. Risk of electric shock. Keep away from children.",
			preset: "error",
		});
	}

	function showBaseToast() {
		Burnt.toast({
			title: "Heads up!",
			message: "You can use a terminal to run commands on your computer.",
			preset: "none",
		});
	}
	
	return (
		<>
		<View className='flex-1 justify-center items-center gap-5'>
		  <Button onPress={showSuccessToast}>
			<Text>Show success toast</Text>
		  </Button>
		  <Button variant='destructive' onPress={showErrorToast}>
			<Text>Show error toast</Text>
		  </Button>
		  <Button variant='secondary' onPress={showBaseToast}>
			<Text>Show base toast</Text>
		  </Button>
		</View>
		<View className='p-6 w-full'>
		  <Alert icon={Code} className='max-w-xl mx-auto'>
			<AlertTitle>FYI</AlertTitle>
			<AlertDescription>This reusable wraps SPIndicator and AlertKit on iOS, and React Native's ToastAndroid on Android.</AlertDescription>
		  </Alert>
		</View>
	  </>
	);
}
