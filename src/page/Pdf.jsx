import jigawa_logo from "../../src/assets/jigawa_logo.png";
import { Document,Image, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { v4 as uuid4 } from "uuid";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});
const Pdf = ({state}) => {
  console.log(state)
  return (
    <Document style={tw("w-full")}>
      <Page size="A4" style={tw("flex flex-col w-[100%]")}>
        <View style={tw("p-20 bg-green-500 w-[100%]")}>
          <Image src={jigawa_logo} style={tw('w-[20%')}></Image>
          <Text style={tw("flex")}>
          </Text>
          <Text>Hello</Text>
        </View>
        <View style={tw("flex p-20 w-[100%]")}>
          
        </View>
      </Page>
    </Document>
  );
};

export default Pdf;
