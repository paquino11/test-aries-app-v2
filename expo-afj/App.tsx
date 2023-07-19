import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { agent, createNewInvitation, setupConnectionListener } from './agent';

export default function App() {
  const [invitationUrl, setInvitationUrl] = useState('');

  useEffect(() => {
    agent.initialize().then(() => {
      Alert.alert('Agent initialized');
      run();
    });

    
  }, []);

  const run = async () => {
    console.log('Creating the invitation as Acme...');
    const { invitationUrl, outOfBandRecord } = await createNewInvitation(agent);
    console.log(invitationUrl);
    setInvitationUrl(invitationUrl);
    console.log('Listening for connection changes...')
    setupConnectionListener(agent, outOfBandRecord, () =>
      console.log('We now have an active connection to use in the following tutorials')
    )
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{invitationUrl}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
