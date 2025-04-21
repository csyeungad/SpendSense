import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Transaction } from "../types";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { categoryColors, categoryEmojies } from "../constants/Category";
import Card from "@/components/ui/Card";

interface TransactionListItemProps {
  transaction: Transaction;
}

export default function TransactionListItem({
  transaction,
}: TransactionListItemProps) {
  const categoryColor = categoryColors[transaction.category ?? "Default"];
  const emoji = categoryEmojies[transaction.category ?? "Default"];
  return (
    <Card>
      <View style={styles.row}>
        <View style={{ width: "40%", gap: 5 }}>
          <Amount
            amount={transaction.amount}
            color="red"
            iconName="minuscircle"
          />
          <CategoryItem
            categoryColor={categoryColor}
            categoryInfo={transaction.category}
            emoji={emoji}
          />
        </View>
        <TransactionInfo
          date={transaction.date}
          description={transaction.description}
          merchant={transaction.merchant}
        />
      </View>
    </Card>
  );
}

function TransactionInfo({
  merchant,
  date,
  description,
}: {
  merchant: string;
  date: string;
  description: string;
}) {
  return (
    <View style={{flexGrow: 1, gap: 6, flexShrink: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold"}}>{date}</Text>
      <Text style={{ fontSize: 16}}>{merchant}</Text>
      <Text style={{ fontSize: 14, color: 'grey' }}>{description}</Text>
      
    </View>
  );
}

function CategoryItem({
  categoryColor,
  categoryInfo,
  emoji,
}: {
  categoryColor: string;
  categoryInfo: string;
  emoji: string;
}) {
  return (
    <View
      style={[
        styles.categoryContainer,
        { backgroundColor: categoryColor + "40" },
      ]}
    >
      <Text style={styles.categoryText}>
        {emoji} {categoryInfo}
      </Text>
    </View>
  );
}

function Amount({
  iconName,
  color,
  amount,
}: {
  iconName: "minuscircle";
  color: string;
  amount: number;
}) {
  return (
    <View style={styles.row}>
      <AntDesign name={iconName} size={16} color={color} />
      <AutoSizeText
        fontSize={28}
        mode={ResizeTextMode.max_lines}
        numberOfLines={1}
        style={[styles.amount, { maxWidth: "80%" }]}
      >
        ${amount}
      </AutoSizeText>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    fontSize: 24,
    fontWeight: "400",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryContainer: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
  },
});
