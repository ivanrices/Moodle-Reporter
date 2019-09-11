import { StyleSheet } from '@react-pdf/renderer';

 const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 40.9,      
      paddingHorizontal: 19,

    },

    content: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    contentData: {
      flexDirection: 'row',
      backgroundColor: "#ebe8e1",
      flexWrap: 'wrap',
      border: '1 solid #3f4d67',
      paddingBottom:5,
    },
    block: {
      height: 30,
      width: 94,
    },
    text: {
      marginTop: 5,
      textAlign: "center",
      fontSize: 8,
    },
    textData: {
      verticalAlign: "baseline",
      marginTop:5,
      borderBottom: '1px solid blue !important',
      borderBottomWidth: "5px",
      borderBottomStyle: "solid",
    },
    dataBlock: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      textAlign: "center",
    },
    dataBlockback: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      textAlign: "center",
      backgroundColor:"#d1cec6",
    },
    image: {
        width: '100%',
        backgroundColor: 'white',
        height:56.5,
    },

    pageNumber: {
      position: 'absolute',
      fontSize: 6,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },


  textTitle:{
    fontSize: 10
  },

  });

  export default styles;