import { Button } from '@/registry/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/ui/card';
import { Input } from '@/registry/ui/input';
import { Label } from '@/registry/ui/label';
import { Text } from '@/registry/ui/text';
import { View } from 'react-native';

export function ForgotPasswordForm() {
  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Forgot password?</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Enter your email to reset your password
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
                returnKeyType="send"
              />
            </View>
            <View className="gap-3">
              <Button className="w-full">
                <Text>Reset your password</Text>
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
