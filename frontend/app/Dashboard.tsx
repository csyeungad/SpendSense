import React, { useState, useEffect } from 'react';
import { useSQLiteContext } from "expo-sqlite";
import { ScrollView, StyleSheet, View, Button, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { PieChart, LineChart} from "react-native-gifted-charts";
import { Transaction } from "../types";
import { categoryColors } from '@/constants/Category';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [date, setDate] = useState(new Date()); // Default date is today
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [viewMode, setViewMode] = useState<'daily' | 'monthly' | 'yearly'>('daily');
  const db = useSQLiteContext();

  useEffect(() => {
    fetchTransactions();
  }, [viewMode, date]);

  const fetchTransactions = async () => {
    if (viewMode === 'daily') {
      await getDayData();
    } else if (viewMode === 'monthly') {
      await getMonthData();
    } else if (viewMode === 'yearly') {
      await getYearData();
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

  const getYearData = async () => {
    const year = date.getFullYear();
    const result = await db.getAllAsync<Transaction>(
      `SELECT * FROM Transactions WHERE date LIKE ? ORDER BY date DESC;`,
      [`${year}-%`]
    );
    setTransactions(result);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (viewMode === 'daily') {
      return `${year}-${month}-${day}`;
    } else if (viewMode === 'monthly') {
      return `${year}-${month}`;
    } else if (viewMode === 'yearly') {
      return `${year}`;
    }
  };

  const changeViewMode = (mode) => {
    setViewMode(mode);
  };

  const changeDate = (newDate) => {
    setDate(newDate);
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const getCategoryDistribution = () => {
    //Compute the category distribution based on the monthly tranactions
    const categoryMap = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);
  
    const totalAmount = Object.values(categoryMap).reduce((acc, amount) => acc + amount, 0);
  
    const distribution = Object.keys(categoryMap).map(category => ({
      text: ((categoryMap[category] / totalAmount) * 100).toFixed(1) + '%',
      value: categoryMap[category],
      color: categoryColors[category] || '#CCCCCC', // Default color if category not found
      percentage: ((categoryMap[category] / totalAmount) * 100).toFixed(1) + '%',
      category: category, 
    }));
  
    // Log the distribution data
    // console.log(distribution);
  
    return distribution;
  };

  const categoryDistribution = getCategoryDistribution();

  interface DailyCategoryData {
    value: number;
    label: string;
  }
  
  const categoryList = (): string[] => {
    // Use a Set to collect unique categories
    const uniqueCategories = new Set<string>();
  
    transactions.forEach(transaction => {
      uniqueCategories.add(transaction.category);
    });
  
    // Convert the Set back to an array and return
    return Array.from(uniqueCategories).sort();
  };
  const categories = categoryList();

  const customLabel = val => {
      return (
          <View style={{height: 20,  width: 20, marginLeft: 1}}>
              <Text style={{color: 'black'}}>{val}</Text>
          </View>
      );
  };

  const getCategoryLineChartData = (category: string): DailyCategoryData[] => {
    const dailyCategoryMap: { [key: string]: number } = {};
    
    transactions.forEach(transaction => {
        // Check if the transaction category matches the provided category
        if (transaction.category === category) {
            const date = transaction.date; // Format: YYYY-MM-DD
            if (!dailyCategoryMap[date]) {
                dailyCategoryMap[date] = 0;
            }
            dailyCategoryMap[date] += transaction.amount;
        }
    });
    // console.log(dailyCategoryMap);

    // Get the month and year from the first transaction date for reference
    const firstTransactionDate = transactions.length > 0 ? transactions[0].date : '';
    const [year, month] = firstTransactionDate.split('-').slice(0, 2);
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();

    const data: DailyCategoryData[] = Array.from({ length: daysInMonth }, (_, index) => {
        const day = (index + 1).toString().padStart(2, '0'); // Ensure two-digit day format
        const dateKey = `${year}-${month}-${day}`; // Full date key
        const dayData: { value: number; label?: string } = {
            value: dailyCategoryMap[dateKey] || 0, // Use accumulated value or 0 if no transactions
        };
        
        // Only add the label key if the day is in the specified list
        if (['01', '07', '14', '21', '28'].includes(day)) {
            dayData.label = day;
            // dayData.labelTextStyle = styles.lineXAxisText;
            dayData.labelComponent = () => customLabel(day);
        }
        
        return dayData;
    });
    // console.log(data);
    return data;
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
      <Button title={formatDate(date)} onPress={() => setShowDatePicker(true)} />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(selectedDate) => {
          setDate(selectedDate);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
      />
      <ScrollView contentContainerStyle={styles.screen}>
        {categoryDistribution.length > 0 ? (
          <>
            <Text style={styles.title}>Category Distribution</Text>
  
            {/* Pie Chart Container */}
            <View style={styles.pieChartContainer}>
              <PieChart
                data={categoryDistribution}
                donut
                innerRadius={60}
                radius={120}
                labelsPosition='outward'
                centerLabelComponent={() => (
                  <View>
                    <Text style={styles.centerLabelTitle}>Total:</Text>
                    <Text style={styles.centerLabelAmount}>
                      ${categoryDistribution.reduce((acc, item) => acc + item.value, 0).toFixed(2)}
                    </Text>
                  </View>
                )}
                textColor="black"
                textSize={12}
                showText={true}
                sectionAutoFocus
              />
              <View style={styles.legendContainer}>
                {categories.map((item, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: categoryColors[item] }]} />
                    <Text style={styles.legendText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
  
            {/* Line Charts Container */}
            { viewMode === 'monthly' && (
              <>
              <Text style={styles.title}>Spending over the month</Text>
              <View style={styles.lineChartsContainer}>
                {categories.map((category, index) => {
                  const lineChartData = getCategoryLineChartData(category);
                  return (
                    <View key={index} style={styles.lineChartWrapper}>
                      <Text style={styles.lineChartTitle}>{category}</Text>
                      <View style={styles.chartContainer}>
                        <LineChart 
                          data={lineChartData} 
                          color={categoryColors[category]}
                          spacing = {8}
                          hideDataPoints
                          hideRules
                          hideOrigin
                          isAnimated
                        />
                      </View>
                    </View>
                  );
                })}
            </View>
            </>
            )}
          </>
        ) : (
          <Text style={styles.noDataText}>No Expenses records at {formatDate(date)}</Text>
        )}
      </ScrollView>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'light-grey',
  },
  screen: {
    // justifyContent: "center",
    alignItems: "center",
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
  button: {
    marginBottom: 15,
  },
  datePicker: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: 'center',
  },
  pieChartContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 10,
  },
  centerLabelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerLabelAmount: {
    fontSize: 14,
  },
  legendContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  legendColor: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
    textAlign: 'center',
  },
  lineChartsContainer: {
    width: '100%', // Full width for line charts
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20
  },
  lineChartWrapper: {
    marginBottom: 10, // Spacing between line charts
  },
  chartContainer: {
    width: "100%", // Fixed width
    height: 240, // Fixed height
    marginVertical: 10, // Spacing around the chart
  },
  lineChartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
    marginVertical: 4,
  },
  lineXAxisText:{
    fontSize: 6
  }
});