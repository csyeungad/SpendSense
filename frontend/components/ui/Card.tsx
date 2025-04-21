import { View, ViewStyle } from "react-native";

interface CardProps extends React.PropsWithChildren {
  style?: ViewStyle;
}

export default function Card({ children, style = {} }: CardProps) {
  return (
    <View
      style={{
        padding: 15,
        borderRadius: 15,
        backgroundColor: "white",
        elevation: 2,
        shadowColor: "#000",
        shadowRadius: 10,
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.05,
        ...style,
      }}
    >
      {children}
    </View>
  );
}
