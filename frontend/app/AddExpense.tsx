import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal
} from "react-native";
import { useGlobalSearchParams } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import { useSQLiteContext } from "expo-sqlite";
import RoundBtn from "@/components/Roundbtn";
import { router } from 'expo-router';

export default function ExpenseForm() {
  const { merchant, date, amount, category, note } = useGlobalSearchParams(); // Retrieve inference result from image
  //console.log('mer, am, da, ca , no', merchant, date, amount, category, note)
  const [merchantState, setMerchant] = useState<string>("");
  const [dateState, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amountState, setAmount] = useState<string>("");
  const [categoryState, setCategory] = useState<string>("");
  const [noteState, setNote] = useState<string>("");

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  
  const db = useSQLiteContext();
  
  useEffect(() => {
    // Update state with local parameters only if they are not undefined
    if (merchant !== undefined) {
      setMerchant(merchant);
    }
    if (date !== undefined) {
      setDate(new Date(date));
    }
    if (amount !== undefined) {
      setAmount(amount);
    }
    if (category !== undefined) {
      setCategory(category);
    }
    if (note !== undefined) {
      setNote(note);
    }
  }, [merchant, date, amount, category, note]);

  // console.log('state to add', merchantState, dateState.toISOString().split("T")[0], amountState, categoryState, noteState)

  const handleAddTransaction = async () => {
    // Check if all required fields are filled
    if (!merchantState || !dateState || !amountState || !categoryState) {
      setModalMessage("Please fill in all the fields.");
      setIsModalVisible(true);
      return; // Exit function early to prevent database insertion
    }

    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `
            INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (?, ?, ?, ?, ?, ?);
          `,
          [
            1,
            merchantState,
            dateState.toISOString().split("T")[0],
            amountState,
            categoryState,
            noteState,
          ]
        );
        Alert.alert("Transaction added successfully");
        setMerchant("");
        setDate(new Date());
        setAmount("");
        setCategory("");
        setNote("");
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
      setModalMessage("An error occurred while adding the transaction. Please try again.");
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalMessage("");
  };

  const onScanReceipt = () => {
    router.push({pathname: "/ScanReceipt"})
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Incomplete record infomation</Text>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Merchant Field */}
        <View style={styles.field}>
          <Text style={styles.label}>Merchant</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Merchant"
            value={merchantState}
            onChangeText={setMerchant}
          />
        </View>

        {/* Date Field */}
        <View style={styles.field}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{dateState.toISOString().split("T")[0]}</Text>
          </TouchableOpacity>
            <DateTimePickerModal
              isVisible={showDatePicker}
              mode="date"
              onConfirm={(selectedDate) => {
                setDate(selectedDate);
                setShowDatePicker(false);
              }}
              onCancel={() => setShowDatePicker(false)}
            />
        </View>

        {/* Amount Field */}
        <View style={styles.field}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            value={amountState}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {/* Category Field */}
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={categoryState}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Food" value="Food" />
              <Picker.Item label="Transportation" value="Transportation" />
              <Picker.Item label="Entertainment" value="Entertainment" />
              <Picker.Item label="Shopping" value="Shopping" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>

        {/* Note Field */}
        <View style={styles.field}>
          <Text style={styles.label}>Note</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Note"
            value={noteState}
            onChangeText={setNote}
          />
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.button} onPress={handleAddTransaction}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.actionRow}>
        <RoundBtn icon={'camera-outline'} text={'Scan Receipt'} onPress={onScanReceipt} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'light-grey',
    padding: 20,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    flex: 2,
    fontSize: 16,
    color: "light-grey",
  },
  input: {
    flex: 5,
    backgroundColor: "#c9d4dc",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#d4e3d3",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#d4e3d3',
    width: '50%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#d4e3d3',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  actionRow: {
    paddingLeft: 250,
    padding: 20,
  },
});
