

import { Stack } from 'expo-router';

const JobDetailsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[jobId]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default JobDetailsLayout;
