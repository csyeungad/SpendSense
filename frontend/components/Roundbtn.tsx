import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type RoundBtnProps = {
  icon: typeof Ionicons.defaultProps;
  text: string;
  onPress?: () => void;
};

const RoundBtn = ({ icon, text, onPress }: RoundBtnProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={30}/>
      </View>
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9cabb5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
  },
});
export default RoundBtn;