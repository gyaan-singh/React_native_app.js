import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const { width } = Dimensions.get("window");

// Static JSON Data
const programs = [
  {
    id: 1,
    university: "University of Toronto",
    country: "Canada",
    description:
      "Top ranked university offering multiple international programs.",
    details:
      "The University of Toronto is one of Canada's leading institutions, known for research excellence, innovation, and diverse international student opportunities.",
  },
  {
    id: 2,
    university: "University of Melbourne",
    country: "Australia",
    description:
      "Popular destination for international students.",
    details:
      "The University of Melbourne is a globally recognized university offering world-class education and vibrant campus life.",
  },
  {
    id: 3,
    university: "University of Oxford",
    country: "United Kingdom",
    description:
      "One of the world's oldest and most prestigious universities.",
    details:
      "Oxford offers exceptional academic programs, research opportunities, and a rich educational heritage.",
  },
  {
    id: 4,
    university: "National University of Singapore",
    country: "Singapore",
    description:
      "Leading university in Asia with strong global rankings.",
    details:
      "NUS provides innovative programs and strong industry collaborations for international students.",
  },
];

// Reusable Card Component
const ProgramCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.university}>{item.university}</Text>

      <Text style={styles.country}>
        📍 {item.country}
      </Text>

      <Text style={styles.description}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );
};

// Home Screen
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Study Abroad Programs
      </Text>

      <FlatList
        data={programs}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProgramCard
            item={item}
            onPress={() =>
              navigation.navigate("Details", {
                program: item,
              })
            }
          />
        )}
      />
    </View>
  );
}

// Details Screen
function DetailsScreen({ route }) {
  const { program } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>
        {program.university}
      </Text>

      <Text style={styles.detailsCountry}>
        Country: {program.country}
      </Text>

      <Text style={styles.detailsDescription}>
        {program.description}
      </Text>

      <Text style={styles.detailsInfo}>
        {program.details}
      </Text>
    </ScrollView>
  );
}

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Universities",
          }}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: "Program Details",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: width * 0.04,
  },

  heading: {
    fontSize: width * 0.065,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1e293b",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  university: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#0f172a",
  },

  country: {
    marginTop: 5,
    color: "#475569",
    fontSize: width * 0.04,
  },

  description: {
    marginTop: 8,
    color: "#64748b",
    lineHeight: 20,
  },

  detailsContainer: {
    padding: width * 0.05,
  },

  detailsTitle: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
  },

  detailsCountry: {
    fontSize: width * 0.045,
    color: "#2563eb",
    marginBottom: 12,
  },

  detailsDescription: {
    fontSize: width * 0.045,
    marginBottom: 15,
    color: "#334155",
  },

  detailsInfo: {
    fontSize: width * 0.043,
    lineHeight: 26,
    color: "#475569",
  },
});
