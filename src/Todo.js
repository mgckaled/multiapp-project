import React from "react";
import { 
  AppRegistry, 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  AsyncStorage,
  Button, 
  TextInput,
  Keyboard, 
  Platform, 
  TouchableOpacity, 
  SafeAreaView 
} from "react-native";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;
export default class TodoList extends React.Component {
  state = {
    tasks: [],
    text: ""
  };
  changeTextHandler = text => {
    this.setState({ text: text });
  };
  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;
    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length, text: text }),
            text: ""
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  };
  deleteTask = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();
        tasks.splice(i, 1);
        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };
  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );

    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }
  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}
      >
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => this.deleteTask(index)}>
                <Text style={styles.text}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.hr} />
            </View>}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Adicionar tarefa"
          returnKeyType="done"
          returnKeyLabel="done"
          placeholderTextColor= "#ccc"
          />
        </View>
    );
  }
}
let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444",
    padding: viewPadding,
    paddingTop: 20
  },
  list: {
    width: "100%",
  },
  listItem: {
    paddingTop: 8,
    paddingBottom: 2,
    fontSize: 20,
    color:"white",
    fontWeight:'bold',
    width:"80%",
  },
  hr: {
    height: 2,
    backgroundColor: "#f50"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    height: 50,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "#f50",
    borderWidth: isAndroid ? 4 : 4,
    width: "100%",
    borderRadius:10,
    fontWeight:'bold',
    color:'white',
  },
  button:{
    backgroundColor: '#f50',
    height:30,
    width:25,
    borderRadius:5,
    alignItems: 'center',

  },
  text:{
    fontSize:20,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems:'center',
  },
});
AppRegistry.registerComponent("TodoList", () => TodoList);