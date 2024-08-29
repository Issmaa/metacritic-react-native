import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import { getLatestGames } from "../lib/metacritic.js";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard, GameCard } from "./GameCard.jsx";
import { Logo } from "./Logo.jsx";
export function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <Logo style={{ paddingBottom: 10, color: "#fff" }} />
      </View>
      <StatusBar style="light" />
      {games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={games}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
          keyExtractor={(game) => game.slug}
        ></FlatList>
      )}
    </View>
  );
}
