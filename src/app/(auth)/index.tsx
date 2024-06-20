import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";

import Button from "@/components/Button";

export default function Home() {
  const { user } = useUser()
  const { signOut } = useAuth()


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: user?.imageUrl }} />
      <Text style={styles.text}>Olá, {user?.fullName}</Text>
      <Button icon="log-out-outline" title="Sair" onPress={() => signOut()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  text: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  image: {
    width: 92,
    height: 92,
    borderRadius: 15,
  },
})
