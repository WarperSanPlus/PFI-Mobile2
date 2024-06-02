import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteParamsContext } from "../ProductDetails";
import { UserContext } from "../../../../App";

const ProductDescription = () => {
    const { description } = useContext(RouteParamsContext);
    const { userCredentials } = useContext(UserContext);

    return (
        <View style={styles.descriptionContainer}>
            <View style={[styles.sectionContainer, { width: '90%' }]}>
                <Text style={[styles.description, { fontSize: 20, textAlign: 'center' }]}>{userCredentials.i18n.t("label_description")}</Text>
            </View>
            <View style={[styles.sectionContainer, { width: '90%' }]}>
                <Text style={[styles.description, { padding: 5 }]}>{description}</Text>
            </View>
        </View>
    );
};

export { ProductDescription };

const styles = StyleSheet.create({
    descriptionContainer: {
      alignItems: 'center',
      marginTop: 5
    },
    description: {
      fontFamily: 'SourceSansPro-Regular',
      fontSize: 14,
      textAlign: 'justify'
    },
    sectionContainer: {
      borderTopWidth: 0.5,
      borderColor: 'lightgrey',
      paddingTop: 15,
      paddingBottom: 15,
    },
});