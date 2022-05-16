import React from 'react';
import { Center, Pressable, Actionsheet, useDisclose } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ActionScreen from '../screens/Actionscreen';

const ActionButton = (props) => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const { zoomRatio, site } = props;

    return (
        <>
            <Pressable onPress={onOpen}>
                <Center bg="#FFCD1D" borderRadius={50} p={zoomRatio} >
                    <Ionicons name="bicycle-outline" size={15 * zoomRatio} color="#556DAB" />
                </Center>
            </Pressable>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <ActionScreen onClose={onClose} site={site} />
            </Actionsheet>
        </>
    );
}

export default ActionButton;