import { StatusBar} from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import axios from 'axios';


export default function App() {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try{
        const data = await get_blogs()
        setBlogs(data)
      } catch {
        console.log('error in fetchBlogs', error)
      }
    }
  },[])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>All blogasds!</Text>
    </View>
  );
}

const get_blogs = async () => {
  try{
    const response = await axios.get('http://localhost:4000/')
    return response
  } catch(error) {
    console.log('Error get_blogs', error)
    throw error
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#eeeeee',
    width: '50%',
    height: 70, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  txt: {
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  txtInput: {
    borderWidth: 1, 
    borderColor: 'black',
    borderRadius: 10,
    width: '50%',
    height: 60,
    padding: 10,
    margin: 20,
    fontSize: 18
  }
});
