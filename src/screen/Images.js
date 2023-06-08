import { Text, VStack, ScrollView, Image, AspectRatio } from "native-base";
import { fStorage } from "../firebase/index";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export const ImagesScreen = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const listRef = ref(fStorage);
    listAll(listRef)

      .then((res) => {
        res.items
          // .reverse()
          .slice(0, 5)
          .map((itemRef) => {
            // All the items under listRef.
            getDownloadURL(itemRef).then((url) => {
              getMetadata(itemRef).then((metadata) => {
                setImages((images) => [
                  ...images,
                  {
                    url,
                    createdAt: metadata.timeCreated,
                  },
                ]);
              });
            });
          });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, []);

  return (
    <VStack space={4} backgroundColor={"gray.100"} safeArea>
      <ScrollView>
        <VStack p={4} space={4}>
          {images.map((image, index) => (
            <VStack key={index} backgroundColor={"blue"} rounded={10}>
              <AspectRatio ratio={1}>
                <Image
                  source={{
                    uri: image.url,
                  }}
                  alt="Alternate Text"
                  resizeMode="cover"
                  roundedTop={10}
                />
              </AspectRatio>
              <VStack p={4}>
                <Text fontSize="md" color={"gray.900"}>
                  {`Ngày chụp: ${format(
                    new Date(image.createdAt),
                    "H:mm:ss dd/MM/yyyy"
                  )}`}
                </Text>
              </VStack>
            </VStack>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
};
