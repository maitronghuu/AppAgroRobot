import { format } from "date-fns";
import { onValue, ref, update } from "firebase/database";
import { Button, Image, Center, ScrollView, Text, VStack, Skeleton, HStack, } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import RNSpeedometer from "react-native-speedometer";
import { fDatabase } from "../firebase";

export const ChartScreen = () => {
  const [labels, setLabels] = useState([]);
  const [nValues, setNValues] = useState([]);
  const [pValues, setPValues] = useState([]);
  const [kValues, setKValues] = useState([]);
  const addData = () => {
    const key = Math.floor(Date.now() / 1000);
    const dataRef = ref(fDatabase, `data/${key}`);
    update(dataRef, {
      n: Math.random() * 100,
      p: Math.random() * 100,
      k: Math.random() * 100,
    });
  };
  useEffect(() => {
    const dataRef = ref(fDatabase, `data`);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const keys = Object.keys(data);
      setLabels([]);
      setNValues([]);
      setPValues([]);
      setKValues([]);
      keys.slice(keys.length - 6, keys.length).forEach((key) => {
        const value = data[key];
        setLabels((labels) => [
          ...labels,
          format(new Date(key * 1000), "hh:mm:ss"),
        ]);
        setNValues((nValues) => [...nValues, value.n]);
        setPValues((pValues) => [...pValues, value.p]);
        setKValues((kValues) => [...kValues, value.k]);
      });
    });
  }, []);

  return (
    <VStack space={4} backgroundColor={"gray.100"} safeArea>
      <ScrollView>
        <VStack space={2}>
          {labels.length &&
            nValues.length &&
            pValues.length &&
            kValues.length ? (
            <>
              <VStack backgroundColor={"white"}>
                <LineChart
                  data={{
                    labels: labels,
                    legend: ["N", "P", "K"],
                    datasets: [
                      {
                        data: nValues,
                        color: (opacity = 1) => `rgba(5, 150, 105, ${opacity})`,
                      },
                      {
                        data: pValues,
                        color: (opacity = 1) => `rgba(234, 179, 8, ${opacity})`,
                      },
                      {
                        data: kValues,
                        color: (opacity = 1) => `rgba(220, 38, 38, ${opacity})`,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width} // from react-native
                  height={220}
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: "white",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    useShadowColorFromDataset: true,
                    style: {
                      borderRadius: 0,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                    },
                  }}
                  bezier
                  fromZero
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              </VStack>

              <HStack space={3} justifyContent="center">
                <Center backgroundColor={"white"} height={160}>
                  <Text fontSize={"3xl"} marginTop={-12}>
                    N
                  </Text>
                  <RNSpeedometer
                    value={nValues[nValues.length - 1]}
                    size={110}
                    allowedDecimals={2}
                    labels={[
                      {
                        name: "mg/kg",
                        labelColor: "#059669",
                        activeBarColor: "#059669",
                      },
                    ]}
                  />
                </Center>
                <Center backgroundColor={"white"} height={160}>
                  <Text fontSize={"3xl"} marginTop={-12}>
                    P
                  </Text>
                  <RNSpeedometer
                    value={pValues[pValues.length - 1]}
                    size={110}
                    allowedDecimals={2}
                    labels={[
                      {
                        name: "mg/kg",
                        labelColor: "#eab308",
                        activeBarColor: "#eab308",
                      },
                    ]}
                  />
                </Center>
                <Center backgroundColor={"white"} height={160}>
                  <Text fontSize={"3xl"} marginTop={-12}>
                    K
                  </Text>
                  <RNSpeedometer
                    value={kValues[kValues.length - 1]}
                    size={110}
                    allowedDecimals={2}
                    labels={[
                      {
                        name: "mg/kg",
                        labelColor: "#dc2626",
                        activeBarColor: "#dc2626",
                      },
                    ]}
                  />
                </Center>
              </HStack>

              <VStack>
                <Center>
                  <Text padding={4} fontSize="sm" textAlign="center" fontWeight={"bold"} color={"#0000FF"}>
                    Bảng khuyến cáo hàm lượng N,P,K trên đất trồng lúa
                  </Text>
                  <Image
                    source={require("../assets/images/bangnpk.png")}
                    alt={"Home Image"}
                    width={"100%"}
                    height={"200"}
                  />
                  <Text italic fontSize="xs" textAlign="center" fontWeight={"bold"} color={"gray.900"}>
                    (Trích nguồn từ tạp chí khoa học trường Đại học Cần Thơ-tập 56 số chuyên đề khoa học Trái Đất (2020): “Sử dụng NPK cho cây lúa trên các biểu loại đất chính ở đồng bằng sông Cửu Long”. )
                  </Text>
                </Center>
              </VStack>

            </>
          ) : (
            <Skeleton h="40" />
          )}
          <Button onPress={addData} variant={"outline"}>
            Add data
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  );
};
