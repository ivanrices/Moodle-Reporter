import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';

import moment from 'moment';
import 'moment/locale/es';
//styles de pdf
import styles from './../styles';
//report images pdf
import concentrado_profesores from './../../../../assets/images/pdf/concentrado_tutores.jpg';
import vasijas_final from './../../../../assets/images/pdf/vasijas_final.jpg';

class ListConcentradoUsuarios extends React.Component {     
    render() {
        const { data, type } = this.props;
        return (
          <PDFViewer className={"docu"}><Document >

          <Page size="A4"  style={styles.body}  >
          <Image style={styles.image} src={concentrado_profesores}  />
          <View style={styles.contentData}>
            <View style={[{fontSize: 7,width: 38,}]} >
             <Text style={styles.text}>No.</Text>
            </View>
            <View style={[{fontSize: 7,width: 108,}]} >
             <Text style={styles.text}>NOMBRE</Text>
            </View>
            <View style={[{fontSize: 7,width: 178,}]} >
             <Text style={styles.text}>APELLIDO</Text>
            </View>
            <View style={[{fontSize: 7,width: 98,}]} >
             <Text style={styles.text}>PRIMER INGRESO</Text>
            </View>
            <View style={[{fontSize: 7,width: 98, }]} >
             <Text style={styles.text}>ÚLTIMO INGRESO</Text>
            </View>
          </View>
          <View style={styles.content}>
              
              {
                
                data[0].map(
                (usuario,index) => {
                  // console.log("showCourses")
                  //console.log(this.showCourses(student.enrolledcourses, student.fullname, "curso"))
                  // let heig = 25 * student.enrolledcourses[0].length;
                  let heig = 76.5/2;
                  let size = 8;                                  
                  return (<View style={ index%2 == 0 ?  [styles.dataBlock,{height: heig}]  :  [styles.dataBlockback,{height: heig}]      } >
                      <View style={[styles.textData,{fontSize: 7,width: 38}]} >
                      <Text style={styles.text}>{index+1}</Text>
                      </View>
                      <View style={[styles.textData,{width: 108,textAlign: "left !important"}]} >
                      <Text style={[styles.text,{fontSize: 8 }]}>{usuario.firstname}</Text>
                      </View>
                      <View style={[styles.textData,{fontSize: 7,width: 178,paddingLeft: 7, paddingRight:7}]} >
                      <Text style={styles.text}>{usuario.lastname}</Text>
                      </View>
                      <View style={[styles.textData,{fontSize: 7,width: 98}]} >
                      <Text style={styles.text}>{usuario.firstaccess != 0 ?
                      moment.unix(usuario.firstaccess).format("LL")+"\n":
                      "sin ingreso\n" }</Text>
                      </View>
                      <View style={[styles.textData,{fontSize: 7,width: 135,paddingRight:30}]} >
                      <Text style={styles.text}>{usuario.lastaccess != 0 ?
                      moment.unix(usuario.lastaccess).format("LL")+"\n":
                      "sin ingreso\n" }</Text>
                      </View>                 
                    </View>)
                  })
              }
              </View>
              <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                          `${pageNumber} / ${totalPages}`
                        )} fixed />

          </Page>
        </Document></PDFViewer>
        )
    }
}




export default ListConcentradoUsuarios;
