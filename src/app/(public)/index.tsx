import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking"
import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/Button";

import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession()


export default function SignIn() {

  const [isLoading, setIsLoading] = useState(false)

  const gitHubOAuth = useOAuth({ strategy: "oauth_github" })
  const appleOAuth = useOAuth({ strategy: "oauth_apple" })
  const googleOAuth = useOAuth({ strategy: "oauth_google" })

  async function onGitHubSingIn() {
    try {
      setIsLoading(true)

      const redirectUrl = Linking.createURL("/")

      const oAuthFlow = await gitHubOAuth.startOAuthFlow({ redirectUrl })

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

  async function onAppleSingIn() {
    try {
      setIsLoading(true)

      const redirectUrl = Linking.createURL("/")

      const oAuthFlow = await appleOAuth.startOAuthFlow({ redirectUrl })

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
        icon="logo-github"
        title="Entrar com Github"
        onPress={onGitHubSingIn}
        isLoading={isLoading}
      />


      <Button
        icon="logo-google"
        title="Entrar com Google"
        onPress={onGoogleSingIn}
        isLoading={isLoading}
      />

      <Button
        icon="logo-apple"
        title="Entrar com Apple"
        onPress={onAppleSingIn}
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
    backgroundColor: "#010409"
  },
  text: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: "bold",
  },
})
