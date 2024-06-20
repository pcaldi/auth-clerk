import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking"

import Button from "@/components/Button";
import { StyleSheet, Text, View } from "react-native";

import { useOAuth } from "@clerk/clerk-expo";





WebBrowser.maybeCompleteAuthSession()



export default function SignIn() {

  const [isLoading, setIsLoading] = useState(false)

  const googleOAuth = useOAuth({ strategy: "oauth_google" })

  async function onGoogleSingIn() {
    try {
      setIsLoading(true)

      const redirectUrl = Linking.createURL("/")

      const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl })

      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId })
        }
      } else {
        setIsLoading(false)
      }

    } catch (error) {
      console.log(error);
      setIsLoading(false)

    }
  }






  useEffect(() => {
    WebBrowser.warmUpAsync()

    return () => {
      WebBrowser.coolDownAsync()
    }
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Entrar</Text>
      <Button
        icon="logo-google"
        title="Entrar com Google"
        onPress={onGoogleSingIn}
        isLoading={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    gap: 12,
  },
  text: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
  },
})
