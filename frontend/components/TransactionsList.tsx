import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Transaction } from "../types"; // Ensure the correct path to the types file
import TransactionListItem from "./TransactionsListItem"; // Ensure the correct path to the TransactionsListItem file

export default function TransactionList({
  transactions,
  deleteTransaction,
}: {
  transactions: Transaction[];
  deleteTransaction: (id: number) => Promise<void>;
}) {
  return (
    <View style={{ gap: 15 }}>
      {transactions.map((transaction) => {
        return (
          <TouchableOpacity
            key={transaction.id}
            activeOpacity={0.7}
            onLongPress={() => deleteTransaction(transaction.id)}
          >
            <TransactionListItem transaction={transaction} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
