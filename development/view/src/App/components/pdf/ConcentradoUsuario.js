import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';

import moment from 'moment';
import 'moment/locale/es';
//styles de pdf
import styles from './styles';
//report images pdf
import concentrado_profesores from './../../../assets/images/pdf/concentrado_tutores.jpg';
import vasijas_final from './../../../assets/images/pdf/vasijas_final.jpg';

class ConcentradoUsuario extends React.Component {
    constructor(){
        super();
        this.state = {
            profesor: "",
        };
      }
      
      showCourses(profesorCourses, info){
        let totalIngresos = 0;
        return profesorCourses.courses.map(          
          (prof,index) => {

            prof.last != null ? totalIngresos = totalIngresos + prof.count : totalIngresos = totalIngresos + 0

            if(info == "nombre"){
              return <Text style={[styles.textData, {fontSize: 6,textAlign: "left", } ]}>
                      {index+1+") "+prof.fullname+ "\n" }
                    </Text>
            }else if(info == "first"){
              return <Text style={[styles.textData, {fontSize: 6,textAlign: "left", } ]}>
                      {prof.first != null ?
                      moment.unix(prof.first).format("LL")+"\n":
                      "sin ingreso\n" }
                      
                    </Text>
            }else if(info == "last"){
              return <Text style={[styles.textData, {fontSize: 6,textAlign: "left", } ]}>
                      {prof.last != null ?
                      moment.unix(prof.last).format("LL")+"\n":
                      "sin ingreso\n" }
                    </Text>
            }else if(info == "count"){
                                                    
              return <Text style={[styles.textData, {fontSize: 6,textAlign: "center",fontWwight: "bold" } ]}>
                      {prof.last != null ?
                        prof.count+"\n" :
                        "0\n" }
                        <Text style={[styles.textData, {fontSize: 6,textAlign: "center",fontWwight: "bold" } ]}>
                                    {index+1 == profesorCourses.courses.length ?
                                     `Total: ${totalIngresos}` : ""}
                        </Text>
                    </Text>                    
            }else if(info == "total"){
              return parseInt(totalIngresos)
            }    
             
          })        
      }
      

    render() {
        const { logs } = this.props;
        console.log("logs");
        console.log(logs);
        let total = 0;
        console.log(logs);
        return (
          <PDFViewer className={"docu"}><Document >

          <Page size="A4"  style={styles.body}  >
          <Image style={styles.image} src={concentrado_profesores}  />
          <View style={styles.contentData}>
            <View style={[{fontSize: 7,width: 40,}]} >
             <Text style={styles.text}>No.</Text>
            </View>
            <View style={[{fontSize: 7,width: 90,}]} >
             <Text style={styles.text}>NOMBRE DEL TUTOR</Text>
            </View>
            <View style={[{fontSize: 7,width: 160,}]} >
             <Text style={styles.text}>CURSO/MATERIA</Text>
            </View>
            <View style={[{fontSize: 7,width: 80,}]} >
             <Text style={styles.text}>PRIMER INGRESO</Text>
            </View>
            <View style={[{fontSize: 7,width: 90, }]} >
             <Text style={styles.text}>ÚLTIMO INGRESO</Text>
            </View>
            <View style={[{fontSize: 7,width: 90, }]} >
             <Text style={styles.text}>TOTAL ACCESOS</Text>
            </View>
          </View>
          <View style={styles.content}>
              
              {
                
                logs.map(
                (profesor,index) => {
                  // console.log("showCourses")
                  //console.log(this.showCourses(student.enrolledcourses, student.fullname, "curso"))
                  // let heig = 25 * student.enrolledcourses[0].length;
                  let heig = 76.5;
                  let size = 8;
                  let tot = this.showCourses(profesor,"total")
                  total = total + tot[profesor.courses.length-1];

                  
                  
                  return (<View style={ index%2 == 0 ?  [styles.dataBlock,{height: heig}]  :  [styles.dataBlockback,{height: heig}]      } >
                      <View style={[styles.textData,{fontSize: 7,width: 40}]} >
                      <Text style={styles.text}>{index+1}</Text>
                      </View>
                      <View style={[styles.textData,{width: 98,textAlign: "left !important"}]} >
                      <Text style={[styles.text,{fontSize: 8 }]}>{profesor.nombre}</Text>
                      </View>
                      <View style={[styles.textData,{fontSize: 7,width: 160,paddingLeft: 7, paddingRight:7}]} >
                      <Text style={styles.text}>{this.showCourses(profesor,"nombre")}</Text>
                      </View>
                      <View style={[styles.textData,{fontSize: 7,width: 80,paddingLeft:10}]} >
                      <Text style={styles.text}>{this.showCourses(profesor,"first")}</Text>
                      </View>
                      <View style={[styles.textData,{fontSize: 7,width: 90,paddingLeft:18}]} >
                      <Text style={styles.text}>{this.showCourses(profesor,"last")}</Text>
                      </View>
                      <View style={[styles.textData,{fontSize: 7,width: 88,}]} >
                        <Text style={styles.text}>{this.showCourses(profesor,"count")}                        
                        </Text>
                        <Text style={styles.text}>{index+1 == logs.length ? `Total: ${total}` : ""}</Text>  
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




export default ConcentradoUsuario;
