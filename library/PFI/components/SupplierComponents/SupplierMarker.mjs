import React from 'react';
import { Marker, Circle } from 'react-native-maps';

const SupplierMarker = ({ data: data }) => {
    const name = data.name;

    return <React.Fragment key={name}>
        <Marker
            title={name}
            coordinate={data.coord}
        />
        <Circle
            center={data.coord}
            radius={5000}
            strokeWidth={3}
            strokeColor={"red"}
        />

    </React.Fragment>;
};

export { SupplierMarker };