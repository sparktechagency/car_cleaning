import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import tw from '@/lib/tailwind'
import { router } from 'expo-router'

const welcome = () => {

  useEffect( () => {
  setTimeout(() => {
    router.replace("/login")
  }, 2000)
  },[])

  
  return (
    <View style={tw`flex-1 justify-center items-center`}>
     <Image source={require('../assets/images/logo.png')} />
    </View>
  )
}

export default welcome