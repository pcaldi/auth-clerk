import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";

import { styles } from "./styles";


interface ButtonProps extends TouchableOpacityProps {
  title: string
  icon: keyof typeof Ionicons.glyphMap
  isLoading?: boolean
}

export default function Button({ title, icon, isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} disabled={isLoading} activeOpacity={0.8} {...rest}>
      {isLoading ? <ActivityIndicator color="white" /> :
        <>
          <Ionicons style={styles.icon} name={icon} />
          <Text style={styles.title}>{title}</Text>
        </>
      }
    </TouchableOpacity>
  )
}


