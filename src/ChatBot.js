import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { TextInput } from 'react-native-paper'
import { Configuration, OpenAIApi } from 'openai'

const ChatBot = () => {
    
  const [data, setData] = useState([])
  const apiKey = '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'
  // const apiUrl = 'http://api.openai.com/v1/engines/text-davinci-003/completions'
 const apiUrl = 'https://api.openai.com/v1/chat/completions'
  const [textInput, setTextInput] = useState('')

  const handleSend = async () => {
    try {
      const prompt = textInput
      console.log(prompt);
      const response = await axios.post(
        apiUrl,
        {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          
          },
        }
      )
      console.log(response);
      const text = response.data.choices[0].text
      setData([...data, { type: 'user', text: textInput }, { type: 'bot', text }])
      setTextInput('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI ChatBot</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: item.type === 'user' ? 'green' : 'red',
              }}
            >
              {item.type === 'user' ? 'Ninza' : 'Bot'}
            </Text>
            <Text style={styles.bot}>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={(text) => setTextInput(text)}
        placeholder="Ask Me Anything"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChatBot

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8EA7E9',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    fontSize: 30,
  },
  body: {
    backgroundColor: '#fffcc9',
    width: '102%',
    margin: 10,
  },
  bot: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '90%',
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#fff',
    width: '90%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'blue',
  },
});









// import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
// import React, { useState } from 'react';
// import { TextInput } from 'react-native-paper';
// import axios from 'axios';
// import { Configuration, OpenAIApi } from 'openai';

// const TestScreen = () => {
//   const configuration = new Configuration({
//     apiKey: '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', // Replace with your actual API key
//   });
//   const openai = new OpenAIApi(configuration);

//   const Main = () => {
//     const [input, setInput] = useState('');
//     const [output, setOutput] = useState('');
//     const constPrompt = input;

//     const handleInput = async () => {
//       try {
//         const userInput = constPrompt + input;
//         const params = new URLSearchParams({
//           model: 'text-davinci-009',
//           // model: "gpt-3.5-turbo-0301",

//           prompt: `You: ${userInput}\nAI`,
//           temperature: '0',
//           max_tokens: '60',
//           top_p: '1.0',
//           frequency_penalty: '0.0',
//           stop: '["You: "]',
//         });
//         const response = await axios.post(
//           `https://api.openai.com/v1/engines/davinci/completions?${params.toString()}`,
//           {},
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${configuration.apiKey}`,
//             },
//           }
//         );
//         setOutput(response.data.choices[0].text);
//       } catch (error) {
//         console.log(error);
//       }
//       setInput('');
//     };

//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>TestScreen</Text>
//         <View style={styles.ChatContainer}>
//           <View style={styles.InputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Type your message here"
//               onChangeText={(text) => setInput(text)}
//               value={input}
//             />
//             <TouchableOpacity style={styles.sendButton} onPress={handleInput}>
//               <Text style={styles.sendButtonText}>Send</Text>
//             </TouchableOpacity>
//             <View style={styles.outputContainer}>
//               <Text style={styles.output}>{output}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return <Main />;
// };

// export default TestScreen;

// const styles = StyleSheet.create({
//   container: {},
//   title: {},
//   ChatContainer: {},
//   InputContainer: {},
//   input: {},
// });