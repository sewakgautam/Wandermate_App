import React from 'react';
import {ImageBackground, Image, StyleSheet} from 'react-native';

export function Main() {
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1529733905113-027ed85d7e33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      }}
      style={{flex: 1}}>
      <Image
        source={require('../../assets/img/logo/Main_logo.png')}
        style={styles.logo}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 250,
    marginLeft: 120,
    marginTop: -200,
    resizeMode: 'contain',
  },
});
