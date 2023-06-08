import { useNavigation } from "@react-navigation/native";
import { VStack, Text, Image, ScrollView, HStack, Box, Heading, Center, Link } from "native-base";
import { Ionicons, AntDesign } from "react-native-vector-icons";


export const GroupScreen = () => {
  return (
    <VStack marginTop={20} space={4} backgroundColor={"gray.100"}>

      <Image
        source={require("../assets/images/chiase.png")}
        alt={"Home Image"}
        width={"full"}
        height={"250"}
      />

      <Center>
        <Link href="https://zalo.me/g/govnim408">
          MỜI BẠN CLICK VÀO KẾT NỐI VÀ CHIA SẺ.
        </Link>

        <Image
        margin={10}
          source={require("../assets/images/maqr.png")}
          alt={"Home Image"}
          width={"200"}
          height={"200"}
        />
         <Link href="https://io.adafruit.com/maitronghuu/dashboards/he-thong-theo-di-npk-trong-dat-trong-lua">
          MỜI BẠN XEM HỆ THỐNG THEO DÕI NPK TRONG ĐẤT TRỒNG LÚA QUA WEBSITE.
        </Link>
      </Center>

    </VStack>
  )
};

