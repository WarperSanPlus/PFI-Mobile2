import { FlatList } from "react-native";
import { PressableProduct } from "./PressableProduct.js";

const Products = ({ products, showSell = true }) => {
    return (
        <FlatList
            data={products}
            renderItem={({ item }) =>
                <PressableProduct
                    idItem={item.id}
                    productName={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    type={item.type}
                    showSell={showSell}
                />}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}


export { Products };