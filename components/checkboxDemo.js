import React, { PropTypes} from 'react';
import {Component, Image, StyleSheet, Text , TouchableHighlight, TouchableWithoutFeedback , TouchableOpacity, Button , View, AlertIOS, ScrollView , Navigator , ListView } from "react-native";
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
import Modal from 'react-native-root-modal';
import Toast from 'react-native-easy-toast'
import CheckBox from 'react-native-check-box'
import BeijingDistrict from './BeijingDistrict.json'
import AlabamaDistrict from './AlabamaDistrict.json'
import EnglandDistrict from './EnglandDistrict.json'
import world from './world.json'
import ChinaCity from './ChinaCity.json'
import USACity from './USACity.json'
import EnglandCity from './EnglandCity.json'

const styles = StyleSheet.create({

  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
  },
  button2: {
      backgroundColor: '#FFA500',
      borderRadius: 5,
      padding: 10*width/414
  },
  close: {
      position: 'absolute',
      right: 20*width/414,
      top: 80*height/736,
      backgroundColor: '#FFA500'
  },
  modalContainer: {
      height: height,
      width: 380*width/414,
      marginLeft:40*width/414,
      justifyContent: 'center',
      backgroundColor: 'white'
  },
  container3: {
      flex: 1,
      backgroundColor: '#f3f2f2',
      height:1000*height/736,
  },
  line: {
      flex: 1,
      height: 0.3*height/736,
      backgroundColor: 'darkgray',
  },
});

export default class checkbox extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      visible: false,
      sex_selection:[ '地区：' ],
      dataArray1: [] , 
      dataArray2: [] , 
      dataArray3: [] , 
      keylevel: 0 ,
      };
    }

  showModal = () => {
        this.setState({
            keylevel: 3,
            visible: true
        });
    }

  hideModal = () => {
        this.setState({
            visible: false
        });
    }

  componentDidMount() {
        this.loadData();
    }

  loadData() {
        this.setState({
          dataArray1: [],
          dataArray2: [],
          dataArray3: world,
           })
    } 
        
  loadDataAgain(country) {
        switch (country) 
        {
        case '中国':
        { this.setState({ dataArray2: ChinaCity}) } 
        break;
        case '美国':
        { this.setState({ dataArray2: USACity}) } 
        break;
        case '英国':
        { this.setState({ dataArray2: EnglandCity}) } 
        break;
        case '北京':
        { this.setState({ dataArray1: BeijingDistrict}) } 
        break;
        case '阿拉巴马州':
        { this.setState({ dataArray1: AlabamaDistrict}) } 
        break;
        case '英格兰':
        { this.setState({ dataArray1: EnglandDistrict}) } 
        break;
        }
     }
    
  renderView() {
      if (this.state.keylevel == 1)
        {
          var datademo = eval('this.state.dataArray' + this.state.keylevel)
          if (!datademo || datademo.length === 0)return;
        var len = datademo.length;
        var views = [];
        for (var i = 0, l = len ; i < l; i += 1) {
            views.push(
                <View key={i}>
                    <View >
                        {this.renderCheckBoxFinal(datademo[i])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        return views;
        } 
      else 
        {
          var datademo = eval('this.state.dataArray' + this.state.keylevel)
          if (!datademo || datademo.length === 0)return;
          var len = datademo.length;
          var views = [];
          for (var i = 0, l = len ; i < l; i += 1) {
            views.push(
                <View key={i}>
                    <View >
                        {this.renderCheckBox(datademo[i])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        return views;
        } 
    }

    renderCheckBoxFinal(data) {
        var leftText = data.name;
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>this.onClickFinal(data) }
                isChecked={data.checked}
                leftText={leftText}/>);
    }
    renderCheckBox(data) {
        var leftText = data.name;
        return (
            <Text style={{flex: 1, padding: 10}}
                onPress={()=>this.onClick(data) }
            >{leftText}</Text>);
    }
    onClickFinal(data) {
        data.checked = !data.checked;
        let msg=data.checked? '选择 ':'取消 '
        this.toast.show(msg+data.name);
        if (this.state.sex_selection.indexOf( data.name ) != -1)
        {
          this.state.sex_selection.splice( this.state.sex_selection.indexOf( data.name ) , 1 );
        } 
        else
        {
          this.state.sex_selection.push( data.name );
        }
    }
    onClick(data) {
      this.setState({ keylevel : this.state.keylevel - 1 });
        data.checked = !data.checked;
        let msg=data.checked? '选择 ':'取消 '
        this.toast.show(msg+data.name);
        this.loadDataAgain(data.path);
    }

    clearOut() {
        this.setState({ sex_selection: ['地区：'] })
        var clearArray = this.state.dataArray1;
        for (var i = clearArray.length - 1; i >= 0; i--) {
          this.state.dataArray1[i].checked = false;
        };
            
    }

    render(){
        return (
                  <ScrollView>
                  <View style={{width:320*width/414,alignSelf:'center',marginTop:40*height/736}}>
                  <Text style={{fontSize:18*width/414}}>{this.state.sex_selection}</Text>
                  <View style={styles.container}>
                  <TouchableHighlight style={styles.button2} underlayColor="#aaa" onPress={this.showModal} >
                  <Text>添加选项</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.button2} underlayColor="#aaa" onPress={()=>this.clearOut() } >
                  <Text>清空选项</Text>
                  </TouchableHighlight>
                  <Modal visible={this.state.visible} >
                  <View style={{backgroundColor:'white',height:125*height/736, width:380*width/414,marginLeft:40*width/414}}>
                  <TouchableHighlight style={[styles.button2, styles.close]} underlayColor="#aaa" onPress={this.hideModal} >
                  <Text>完成</Text>
                  </TouchableHighlight>
                  </View>
                  <View style={styles.modalContainer}>
                  <ScrollView>
                  <View style={styles.container3}>
                  <ScrollView>
                  {this.renderView()}
                  </ScrollView>
                  <Toast ref={e=>{this.toast=e}}/>
                  </View>
                  </ScrollView>
                  </View>
                  </Modal>
                  </View>
                  </View>
                  </ScrollView>
                );
            }
}

