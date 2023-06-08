import { useNavigation } from "@react-navigation/native";
import { VStack, Text, Image, ScrollView, HStack, Pressable, } from "native-base";
import { Ionicons, AntDesign } from "react-native-vector-icons";

export const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <VStack space={4} backgroundColor={"gray.100"}>
      <Image
        marginTop={10}
        source={require("../assets/images/rice-hero.jpg")}
        alt={"Home Image"}
        width={"full"}
        height={"200"}
      />
      <VStack p={4} space={4}>
        <Text marginTop={-5} fontSize="xl" fontWeight={"bold"} color={"gray.900"}>
          HỆ THỐNG GIÁM SÁT AGRO ROBOT
        </Text>
        <Text fontSize="lg">
          “AGRO ROBOT" có chức năng di chuyển trên đồng ruộng,
          quay video, chụp ảnh cây lúa, hiển thị nồng độ dinh dưỡng,
          phân tích dữ liệu NPK có trong đất và lưu lại các chỉ số theo thời gian thực.
        </Text>
        <ScrollView>
          <VStack alignItems={"stretch"} space={4}>
            <MenuItem
              icon={
                <Ionicons name="images-outline" size={50} color={"#e11d48"} />
              }
              title={"Ảnh chụp cây lúa"}
              description={
                "Quan sát, theo dõi cây lúa qua camera."
              }
              onPress={() => navigation.navigate("Images")}
            />
            <MenuItem
              icon={<AntDesign name="linechart" size={50} color={"#059669"} />}
              title={"Hàm lượng của NPK"}
              description={
                "Hiển thị nồng độ dinh dưỡng NPK trong đất."
              }
              onPress={() => navigation.navigate("Chart")}
            />
            <MenuItem
              icon={
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={50}
                  color={"#0284c7"}
                />
              }
              title={"Kết nối và chia sẻ"}
              description={
                "Hỏi đáp thắc mắc với chuyên gia."
              }
              onPress={() => navigation.navigate("Group")}
            />
          </VStack>
        </ScrollView>
      </VStack>
    </VStack>
  );
};

const MenuItem = ({ title, description, icon, onPress }) => (
  <Pressable
    backgroundColor={"white"}
    _pressed={{
      backgroundColor: "gray.200",
    }}
    rounded={10}
    onPress={onPress}
  >
    <HStack p={4} space={4} alignItems={"center"}>
      {icon}

      <VStack flexGrow={1} width={"1"}>
        <Text fontSize="lg" fontWeight={"medium"}>
          {title}
        </Text>
        <Text fontSize="md">{description}</Text>
      </VStack>
    </HStack>
  </Pressable>
);
