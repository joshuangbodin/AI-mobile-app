import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import GoBackBtn from "@/components/ui/GoBackBtn";
import CustomText from "@/components/typography/text";
import { vh, vw } from "@/helpers/responsivesizes";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import ArticleList from "@/components/functional/ArticleList";
import { financialArticles } from "@/constants/articles";

const articles = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    initialise();
    filterByPrompt();
  }, [searchPrompt]);

  const initialise = () => {
    setList(financialArticles);
  };
  const filterByPrompt = () => {
    const newList = financialArticles.filter((article) => {
      if (article.name.toLowerCase().includes(searchPrompt.toLowerCase())) {
        return article;
      }
    });

    setList(newList);
  };
  return (
    <ScreenWrapper Style={{ paddingHorizontal: 10 }} SafeArea>
      <View style={style.top}>
        <GoBackBtn />
        <CustomText size={vh(2.3)} isheader text="Articles" />
      </View>

      <View>
        {/* Search Bar */}
        <View style={style.searchBar}>
          <FontAwesome5 name="search" size={vh(2.4)} color={theme.gray.gray3} />
          <TextInput
            style={style.searchInput}
            placeholder="Search Article"
            placeholderTextColor={theme.gray.gray3}
            value={searchPrompt}
            onChangeText={setSearchPrompt}
          />
          {searchPrompt && (
            <Pressable
              style={{ width: vw(10) }}
              onPress={() => setSearchPrompt("")}
            >
              <Ionicons name="close" size={vh(2.4)} color={theme.gray.gray3} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Article List */}
      <View>
        <ArticleList data={list} />
      </View>
    </ScreenWrapper>
  );
};

export default articles;

const style = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  searchBar: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
    alignItems: "center",
    height: vh(6),
    backgroundColor: theme.primary.dark,
    padding: 10,
    borderRadius: theme.curves.full,
  },
  searchInput: {
    color: theme.gray.white,
    fontSize: vh(1.9),
    flex: 1,
    height: "100%",
  },
});
