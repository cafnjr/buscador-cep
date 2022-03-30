import react, {useState, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import api from './src/services/api';

export default function App() {

  const [cep,setCep] = useState('');
  const [cepUser,setCepUser] = useState(null);
  const inputRef = useRef(null);


  function limpar(){
    setCep('');
    inputRef.current.focus();
    setCepUser(null)
  };

  async function buscar(){
    if(cep === ''){
      alert('Digite um cep validoo!')
      return;

    }
    try{
      const resonse = await api.get(`/${cep}/json`)
      Keyboard.dismiss();
      setCepUser(resonse.data)
  
    }catch(error){
      console.log('ERRO: ' + error)
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.areaTop}>
      <Text style={styles.titulo}>Buscador de Cep</Text>
      <TextInput
      placeholder='Ex. 46430000'
      keyboardType='numeric'
      style={styles.TextInput}
      value={cep}
      onChangeText={(texto) => setCep(texto)}
      ref={inputRef}
      />
      </View>
      <View style={styles.areabtn}> 

      <TouchableOpacity style={styles.buscar}
      onPress={buscar}
      >
        
        <Text style={styles.txtBtn}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.limpar}
      onPress={limpar}
      >
        
        <Text style={styles.txtBtn}>Limpar</Text>
      </TouchableOpacity>

      </View>


      {cepUser && 
      <View style={styles.areaResult}>
      <Text style={styles.txtResult}>CEP: {cepUser.cep}</Text>
      <Text style={styles.txtResult}>LOGRADOURO: {cepUser.logradouro}</Text>
      <Text style={styles.txtResult}>BAIRRO: {cepUser.bairro}</Text>
      <Text style={styles.txtResult}>CIDADE: {cepUser.localidade}</Text>
      <Text style={styles.txtResult}>ESTADO: {cepUser.uf}</Text>
    </View>
      }
      
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create ({

  container: {
    flex:1
  },

  areaTop: {
    alignItems:'center'
  },

  titulo: {
    textAlign: 'center',
    marginTop:20,
    fontSize:30,
    marginBottom:15,
    fontWeight:'bold'


  },

  TextInput: {
    padding:10,
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor:'#fff',
    borderColor:'#000',
    fontSize:18

  },

  areabtn: {
    flexDirection:'row',
    
    justifyContent:'center',
    marginTop:20
  },

  buscar: {
    width:120,
    backgroundColor:'green',
    padding:10,
    borderRadius:5,
    marginRight:50
  },

  limpar: {
    width:100,
    backgroundColor:'red',
    padding:10,
    borderRadius:5, 
  },

  txtBtn: {
    fontSize:18,
    color:'#fff',
    textAlign:'center',
    
  },

  areaResult: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },

  txtResult: {
    fontSize:20
  }
})
