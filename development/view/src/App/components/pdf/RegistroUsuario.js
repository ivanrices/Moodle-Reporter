import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';

import moment from 'moment';
import 'moment/locale/es';
//styles de pdf
import styles from './styles';
//report images pdf
import concentrado_profesores from './../../../assets/images/pdf/concentrado_tutores.jpg';
import vasijas_final from './../../../assets/images/pdf/vasijas_final.jpg';

class RegistroUsuario extends React.Component {
         
    render() {
        const { logs } = this.props;        
        return (
          <PDFViewer className={"docu"}><Document >

            <Page size="A4"  style={styles.body} >
            <Image style={styles.image} src={concentrado_profesores}  />
            
            <Text style={styles.textTitle}>Tutor: {logs[logs.length-1].userName}</Text>
            <Text style={styles.textTitle}>Curso:  {logs[logs.length-1].courseName}</Text>
            <View style={styles.contentData}>
              <View style={[{fontSize: 12,width: 133}]} >
                <Text style={styles.text}>Fecha</Text>
              </View>
              <View style={[{fontSize: 12,width: 133}]} >
                <Text style={styles.text}>No. de accesos</Text>
              </View>
              <View style={[{fontSize: 12,width: 133}]} >
                <Text style={styles.text}>Fecha</Text>
              </View>
              <View style={[{fontSize: 12,width: 133}]} >
                <Text style={styles.text}>No. de accesos</Text>
              </View>

            </View>
            <View style={styles.content}>
                    {
                      logs.map(
                        (log,index) => {
                          if(index != logs.length-1 ){
                            return (                                                                                
                            <View style={[styles.dataBlock,{height: 30,}]} >

                              <View style={[styles.textData,{fontSize: 7,width: 133}]} >
                                <Text style={[styles.text]}>
                                {log.timecreated != null ? moment.unix(log.timecreated).format("LL") : "Sin Actividad" }</Text>
                              </View>

                              <View style={[styles.textData,{fontSize: 7,width: 133}]} >
                                <Text style={[styles.text]}>
                                {log.timecreated != null ? `${log.count} veces` : "0" } 
                                </Text>
                              </View>
                            </View>                                                                                        
                            );                          
                          }
                        })
                      }
            </View>

            </Page>
   </Document></PDFViewer>
        )
    }
}
export default RegistroUsuario;
