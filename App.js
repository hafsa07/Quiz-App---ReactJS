import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import QuestionBank from './components/QuestionBank';

const App = () => {
  const [get_screen, set_screen] = useState(false);
  const [get_current_question, set_current_question] = useState({
    question: '',
    options: '',
    answer: '',
  });
  const [get_first_open, set_first_open] = useState(false);
  const [get_option_selected, set_option_selected] = useState(false);
  const [get_info, set_info] = useState({
    number: 0,
    score: 0,
  });
  const [get_button_text, set_button_text] = useState('NEXT');
  const [get_border_color, set_border_color] = useState({
    color: ['white', 'white', 'white', 'white'],
  });
  const screenChange = quiz_screen => {
    if (quiz_screen === 0) {
      set_info({number: 0, score: 0});
      set_screen(false);
    } else {
      set_first_open(false);
      set_button_text('NEXT');
      load_question();
      set_screen(true);
    }
  };
  const switchingQuestons = index => {
    set_current_question({
      question: QuestionBank[index].question,
      options: QuestionBank[index].options,
      answer: QuestionBank[index].answer,
    });
  };
  const load_question = () => {
    // if no option is selected then do nothing
    if (!get_option_selected && get_first_open) {
      return;
    }
    // Setting that quiz has started and question is asked before
    set_first_open(true);
    // change all option color to white
    set_border_color({color: ['#EFA92E', '#EFA92E', '#EFA92E', '#EFA92E']});
    // If all the questions have been asked
    set_info({
      score: get_info.score,
      number: get_info.number + 1,
    });
    let index = Math.floor(Math.random() * 10);
    switchingQuestons(index);
    set_option_selected(false);
  };
  const on_option_click = answer => {
    // Makes true that option is selected
    set_option_selected(true);
    if (get_info.number === 5) {
      set_button_text('FINISH');
    }
    if (answer === get_current_question.answer) {
      set_info({
        score: get_info.score + 1,
        number: get_info.number,
      });
    }
    borderColorChange(answer);
  };
  
  const borderColorChange = answer => {
    if (answer === get_current_question.answer) {
      let options = get_current_question.options;
      let colors = get_border_color.color;
      for (let i = 0; i < options.length; i++) {
        if (options[i] === answer) {
          colors[i] = '#53B051';
          set_border_color({color: colors});
          break;
        }
      }
    } else {
      let options = get_current_question.options;
      let colors = get_border_color.color;
      for (let i = 0; i < options.length; i++) {
        if (options[i] === answer) {
          colors[i] = '#F34636';
        } else if (options[i] === get_current_question.answer) {
          colors[i] = '#53B051';
        }
      }
      set_border_color({color: colors});
    }
  };
  const quizScreen = (
    <View>
      {/*Header*/}
      <View style={styles.quiz_header}>
        <Text style={styles.quiz_header_text}>
          Question = {get_info.number}
        </Text>
        <Text style={styles.quiz_header_text}>Score = {get_info.score}</Text>
      </View>

      {/*Question*/}
      <Text style={styles.question}>{get_current_question.question}</Text>

      {/*Options*/}
      <TouchableOpacity
        onPress={() => on_option_click(get_current_question.options[0])}
        style={[
          styles.quiz_option,
          {borderColor: get_border_color.color[0].toString()},
        ]}>
        <Text style={styles.quiz_option_text}>
          {get_current_question.options[0]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => on_option_click(get_current_question.options[1])}
        style={[
          styles.quiz_option,
          {borderColor: get_border_color.color[1].toString()},
        ]}>
        <Text style={styles.quiz_option_text}>
          {get_current_question.options[1]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => on_option_click(get_current_question.options[2])}
        style={[
          styles.quiz_option,
          {borderColor: get_border_color.color[2].toString()},
        ]}>
        <Text style={styles.quiz_option_text}>
          {get_current_question.options[2]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => on_option_click(get_current_question.options[3])}
        style={[
          styles.quiz_option,
          {borderColor: get_border_color.color[3].toString()},
        ]}>
        <Text style={styles.quiz_option_text}>
          {get_current_question.options[3]}
        </Text>
      </TouchableOpacity>

      {/*Button*/}
      <TouchableOpacity
        onPress={
          get_button_text === 'NEXT'
            ? () => load_question()
            : () => screenChange(0)
        }
        style={styles.button}>
        <Text style={styles.buttonText}>{get_button_text}</Text>
      </TouchableOpacity>
    </View>
  );
  const mainScreen = (
    <View>
      <TouchableOpacity onPress={() => screenChange(1)} style={styles.button}>
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.body}>{get_screen ? quizScreen : mainScreen}</View>
  );
};

const styles = StyleSheet.create({
  // Main Container Style
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },

  // Button Styling
  button: {
    marginHorizontal: 25,
    marginVertical: 10,
    backgroundColor: '#2C70AE',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  // Quiz screen styling
  quiz_option: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginVertical: 10,
    padding: 20,
    borderWidth: 3,
  },
  quiz_option_text: {
    width: '95%',
    fontWeight: 'bold',
  },
  quiz_header: {
    marginHorizontal: 25,
    backgroundColor: '#2C70AE',
    padding: 20,
  },
  quiz_header_text: {
    fontSize: 18,
    color: 'white',
  },
  question: {
    marginHorizontal: 25,
    fontSize: 18,
    color: '#333',
    marginVertical: 20,
  },
});

export default App;
