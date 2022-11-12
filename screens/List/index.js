import React, { useContext } from "react";
import { SectionList, Text, View } from "react-native";
import { styles } from "./styles";
import ListItem from "../../components/ListItem";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../../config/ThemeContext";

const List = ({ data, allCountries, filter }) => {
  let filterCountries = false;
  let empty = false;

  let filterArray = [];

  filterCountries = allCountries;

  const navigation = useNavigation();
  const theme = useContext(ThemeContext);

  if (filterCountries != undefined && typeof filterCountries === "object") {
    filterCountries.map((country) => {
      if (
        filter.continents != "" &&
        !country.continents.includes(filter.continents)
      ) {
        return;
      }

      filterArray.push(country);
    });
    if (filterArray.length > 0) {
      filterCountries = filterArray;
    }
  } else {
    filterCountries = false;
    empty = true;
  }

  const renderItem = ({ item }) => {
    const onCountryPress = () => {
      navigation.navigate("CountryDetails", { country: item });
    };
    return <ListItem onPress={onCountryPress} {...item} />;
  };

  // <ScrollView>
  //   {filterCountries?.map((result) => (
  //     <InfoCard result={result} />
  //   ))}
  //   {empty && <Text>No Fruits were fetched</Text>}
  // </ScrollView>;

  const getData = () => {
    let countriesArr = [];
    let aCode = "A".charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      let currChar = String.fromCharCode(aCode + i);
      let obj = {
        title: currChar,
      };

      let currCountries = data.filter((item) => {
        return item?.name?.common[0].toUpperCase() === currChar;
      });
      if (currCountries.length > 0) {
        currCountries.sort((a, b) =>
          a?.name?.common?.localeCompare(b.name.common)
        );
        obj.data = currCountries;
        countriesArr.push(obj);
      }
    }
    return countriesArr;
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={getData()}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <View
            style={[
              styles.sectionHeader,
              { backgroundColor: theme.background },
            ]}
          >
            <Text style={{ color: theme.section }}>{section.title}</Text>
          </View>
        )}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
};

export default List;
