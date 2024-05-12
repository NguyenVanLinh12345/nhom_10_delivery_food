import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";

const PreparingScreen = ({ navigation, route }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate({ name: "OrderDetail", params: { isConfirmMode: false, orderId: route.params.orderId } });
    }, 2000);
  }, [navigation]);

  return (
    <SafeAreaView className="bg-[#00ccbb] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("./assets/delivery-boy.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-md my-10 px-4 text-white font-bold text-center"
      >
        Đơn hàng đang được chuẩn bị
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingScreen;
