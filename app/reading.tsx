import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import CustomText from "@/components/typography/text";
import GoBackBtn from "@/components/ui/GoBackBtn";
import { useLocalSearchParams } from "expo-router";
import { financialArticles } from "@/constants/articles";
import articles from "./articles";
import Ratings from "@/components/functional/Ratings";
import { vh, vw } from "@/helpers/responsivesizes";
import { theme } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native";
import Empty from "@/components/functional/Empty";
import { AntDesign, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

interface article {
  name: string;
  article: string;
  importance: string[];
  rating: number;
  keyPoints: string[];
  relatedTopics: string[];
  actionableTips: string[];
}

const reading = () => {
  const { name } = useLocalSearchParams();
  const [article, setArticle] = useState<article>();

  const getArticleByName = (name: string | string[]) => {
    const article = financialArticles.filter((article: article) => {
      if (article.name == name) {
        return article;
      }
    });

    return article;
  };

  useEffect(() => {
    initialiseArticle();
  });

  const initialiseArticle = () => {
    if (!name) {
      return;
    }
    const activeArt = getArticleByName(name);

    setArticle(activeArt[0]);
  };

  if (article) {
    return (
      <ScreenWrapper Style={{ position: "relative" }}>
        <View style={styles.top}>
          <GoBackBtn />
          <View style={styles.rating}>
            <Text
              style={{
                color: theme.gray.gray4,
                fontWeight: "800",
                fontSize: vh(2),
              }}
            >
              5
            </Text>
            <AntDesign name="star" color={theme.primary.purple} size={vh(2)} />
          </View>
        </View>
        <Image
          style={styles.imageBack}
          source={require("../assets/images/grad.jpg")}
        />

        <View style={styles.articleCont}>
          <ScrollView
            contentContainerStyle={styles.main}
            showsHorizontalScrollIndicator={false}
          >
            <CustomText isheader size={vh(2.7)} text={article.name} />
            <View>
              <FlatList horizontal data={article.relatedTopics} renderItem={({item})=>(
                <View></View>
              )}/>
            </View>
          </ScrollView>
        </View>
      </ScreenWrapper>
    );
  } else {
    return (
      <ScreenWrapper>
        <Empty />
      </ScreenWrapper>
    );
  }
};

export default reading;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 30,
    gap: 30,
    height: vh(20),
    paddingBottom: 50,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    width: vw(12),
    justifyContent: "center",
    gap: 6,
    height: vh(3.4),
    alignItems: "center",
    backgroundColor: theme.primary.darker,
    borderRadius: theme.curves.md,
  },
  imageBack: {
    flex: 1,
    width: vw(100),
    height: vh(30),
    position: "absolute",
    zIndex: -99,
    top: 0,
    left: 0,
  },
  articleCont: {
    width: vw(100),
    height: vh(70),
    backgroundColor: theme.primary.darker,
    position: "absolute",
    zIndex: 10,
    top: vh(20),
    borderRadius: theme.curves.xxl,
    padding: 15,
  },
  main: {
    flex: 1,
    paddingTop: 10,
  },
});
