import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import GoBackBtn from "@/components/ui/GoBackBtn";
import CustomText from "@/components/typography/text";
import { vh } from "@/helpers/responsivesizes";
import Graph from "@/components/functional/graph";
import Grid from "@/components/functional/Grid";

const analytics = () => {
  return (
    <ScreenWrapper Style={style.container} SafeArea>
      {/* top */}
      <View style={style.top}>
        <GoBackBtn />
        <CustomText isheader size={vh(2.3)} text="Analytics" />
      </View>

      {/* DashBoard */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{gap:10}}>
        {/* Graph */}
        <View>
          
          <Graph />
        </View>

        {/* Grid */}
        <View>
            <Grid>
            </Grid>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    height:vh(7)
  },
});

export default analytics;
