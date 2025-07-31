import { SocialConnections } from '@/registry/blocks/social-connections';
import { Button } from '@/registry/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/ui/card';
import { Input } from '@/registry/ui/input';
import { Label } from '@/registry/ui/label';
import { Separator } from '@/registry/ui/separator';
import { Text } from '@/registry/ui/text';
import * as React from 'react';
import { Pressable, TextInput, View } from 'react-native';

export function SignUpForm() {
  const passwordInputRef = React.useRef<TextInput>(null);

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Create your account</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
              </View>
              <Input ref={passwordInputRef} id="password" secureTextEntry returnKeyType="send" />
            </View>
            <View className="gap-3">
              <Button className="w-full">
                <Text>Continue</Text>
              </Button>
            </View>
          </View>
          <Text className="text-center text-sm">
            Already have an account?{' '}
            <Pressable>
              <Text className="text-sm underline underline-offset-4">Sign in</Text>
            </Pressable>
          </Text>
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="text-muted-foreground px-4 text-sm">or</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
