import React, { useState, useEffect } from 'react';
import { useSQLiteContext } from "expo-sqlite";
import { ScrollView, StyleSheet, View, Button , Text, Modal, TouchableOpacity} from "react-native";
import { Transaction } from "../types";
import TransactionsList from "@/components/TransactionsList";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const ExpenseRecords = () => {
  const db = useSQLiteContext();
  const [viewMode, setViewMode] = useState('daily');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionToDeleteId, setTransactionToDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, [viewMode, date]);

  const fetchTransactions = async () => {
    if (viewMode === 'daily') {
      await getDayData();
    } else {
      await getMonthData();
    }
  };

  const getDayData = async () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    // console.log(`Getting data for ${year}-${month}-${day}`);
    const result = await db.getAllAsync<Transaction>(
      `SELECT * FROM Transactions WHERE date = ? ORDER BY date DESC;`,
      [`${year}-${month}-${day}`]
    );
    setTransactions(result);
  };

  const getMonthData = async () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const result = await db.getAllAsync<Transaction>(
      `SELECT * FROM Transactions WHERE date LIKE ? ORDER BY date DESC;`,
      [`${year}-${month}-%`]
    );
    setTransactions(result);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return viewMode === 'daily' ? `${year}-${month}-${day}` : `${year}-${month}`;
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactionToDeleteId(id);
    setModalVisible(true);
  };

  const deleteTransaction = async () => {
    if (transactionToDeleteId !== null) {
      console.log(`Deleting transaction with ID: ${transactionToDeleteId}`);
      await db.withTransactionAsync(async () => {
        await db.runAsync(`DELETE FROM Transactions WHERE id = ?;`, [transactionToDeleteId]);
        await fetchTransactions();
      });
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Center the SegmentedControl */}
      <View style={styles.segmentedControlContainer}>
        <SegmentedControl
          values={['Daily', 'Monthly']}
          selectedIndex={viewMode === 'daily' ? 0 : 1}
          onChange={(event) => {
            const selectedIndex = event.nativeEvent.selectedSegmentIndex;
            setViewMode(selectedIndex === 0 ? 'daily' : 'monthly');
          }}
          style={styles.segmentedControl}
        />
      </View>
      
      {/* Button with padding */}
      <Button 
        title={formatDate(date)} 
        onPress={() => setShowDatePicker(true)}
        style={styles.button}
      />

      {/* DatePicker with padding below */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(selectedDate) => {
          setDate(selectedDate);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
      />

      {/* Modal for deleting transactions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Delete Confirmation</Text>
            <Text style={styles.modalText}>Confirm to delete this transaction?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={deleteTransaction}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Transactions List */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {transactions.length > 0 ? (
          <>
          <TransactionsList
            transactions={transactions}
            deleteTransaction={handleDeleteTransaction}
          />
        </>
      ) : (
        <Text style={styles.noDataText}>No Expenses records at {formatDate(date)}</Text>
      )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'light-grey',
  },
  segmentedControlContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  segmentedControl: {
    width: 300,
    backgroundColor: '#d4e3d3',
  },
  datePicker: {
    marginBottom: 15,
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '70%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#ccc",
  },
  buttonDelete: {
    backgroundColor: "#f44336",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  scrollView: {
    // flex: 1,
    paddingVertical: 15,
  },
});

export default ExpenseRecords;