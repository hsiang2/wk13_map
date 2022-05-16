import React from 'react';
import { Pressable, Box, Text, Center } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { VictoryPie } from 'victory-native';

const ActionScreen = ({ onClose, site }) => {
    const {
        sna,
        sbi,
        sarea,
        mday,
        lat,
        lng,
        ar,
        bemp,
    } = site;

    return(
        <Box h="50%" w="100%" bgColor="#FFFCF4" borderRadius={30}>
            <Box w={"15%"} h={1} borderRadius={30} bg="#696F8066" mt={4} alignSelf="center"></Box>
            <Pressable onPress={onClose} position='absolute' top={6} right={6} zIndex={99}>
                <Ionicons name='close-circle-outline' color="#696F80" size={30}/>
            </Pressable>
            <Center pt={5}>
                <Text mt={1} fontSize="lg" color="#556DAB" fontWeight={'bold'}>{sna.slice(11)}站</Text>
                <Text mt={6} color='#222D49'><Text fontWeight={'bold'}>地址：</Text>{sarea}{" "}{ar}</Text>
                <Text mt={2} color='#222D49'><Text fontWeight={'bold'}>經緯度：</Text>{lng}{", "}{lat}</Text>
                <Text mt={2} mb={6} color='#222D49'><Text fontWeight={'bold'}>更新時間：</Text>{mday}</Text>
               <VictoryPie
                    width={150}
                    height={150}
                    colorScale={["#D9AE17", "#556DAB"]}
                    data={[
                        { x: 1, y: Number(sbi), label: `可借\n  ${sbi}` },
                        { x: 2, y: Number(bemp), label: `可還\n${bemp}  ` },
                    ]}
                    style={{
                        labels: {
                            fontSize: 12, fill: "#fff",
                            padding: 4,
                        }
                    }}
                    padAngle={({ datum }) => datum.y-20}
                    innerRadius={70}
               />
            </Center>
        </Box>
    );
};

export default ActionScreen;