import { View, Text, ScrollView, StyleSheet } from "react-native";
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

  return (
    <ScreenWrapper Style={{ position: "relative" }}>
      <GoBackBtn />
      {/* {name&&<CustomText text={name}/>} */}
      <LinearGradient
        style={styles.gradient1}
        start={{ x: -10, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[
          theme.primary.deepblue,
          theme.primary.purple,
          theme.primary.darker,
        ]}
      ></LinearGradient>
      <LinearGradient
        style={{
          width: vw(100),
          height: vh(100),
          justifyContent: "flex-end",
          paddingTop: vh(20),
        }}
        start={{ y: -20, x: 0 }}
        colors={[
          "transparent",
          theme.primary.darker,
          theme.primary.darker,
          theme.primary.darker,
          theme.primary.darker,
          theme.primary.darker,
        ]}
      >
        {article ? (
          <ScrollView
            style={{ backgroundColor: theme.primary.darker }}
            contentContainerStyle={styles.container}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomText style={{width: vw(60)}} size={vh(2.7)} isheader>
                {article.name}
              </CustomText>
              <Ratings rating={article.rating} />
            </View>

            <View>
              <FlatList
                horizontal
                data={article.relatedTopics}
                contentContainerStyle={{ gap: 5 }}
                renderItem={({ item }) => (
                  <CustomText style={styles.cate} size={vh(1.4)} text={item} />
                )}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <CustomText size={vh(1.7)}>{article.article
              }</CustomText>
            </View>
            <View>
              <CustomText isSupporting>Importance:</CustomText>
              {article.importance.map((item: string, index: number) => (
                <View style={styles.flex}>
                  <CustomText style={styles.bullet} size={vh(1.6)}>-</CustomText>
                  <CustomText size={vh(1.6)}>{item}</CustomText>
                </View>
              ))}
            </View>

            <View>
              <CustomText isSupporting>Key Points:</CustomText>
              {article.keyPoints.map((item: string, index: number) => (
                <View style={styles.flex}>
                  <CustomText style={styles.bullet} isheader size={vh(1.7)}>-</CustomText>
                  <CustomText size={vh(1.6)}>{item}</CustomText>
                </View>
              ))}
            </View>

            <View>
              <CustomText isSupporting>Tips:</CustomText>
              {article.actionableTips.map((item: string, index: number) => (
                <View style={styles.flex}>
                  <CustomText style={styles.bullet} isheader size={vh(1.7)}>-</CustomText>
                  <CustomText size={vh(1.6)}>{item}</CustomText>
                </View>
              ))}
            </View>

            <View style={{ height: vh(20) }}></View>
          </ScrollView>
        ) : (
          <View></View>
        )}
      </LinearGradient>
    </ScreenWrapper>
  );
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

  gradient1: {
    position: "absolute",
    width: vw(100),
    height: vh(100),
    top: 0,
    left: 0,
    zIndex: -99,
  },
  flex: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  cate: {
    backgroundColor: theme.primary.dark,
    padding: 6,
    borderRadius: theme.curves.sm,
    color: theme.gray.gray2,
  },
  bullet:{
    backgroundColor: theme.primary.deepblue,
    height: vh(2),
    width: vh(2),
    justifyContent:'center',
    textAlign:'center',
    borderRadius:theme.curves.full
  }
});
