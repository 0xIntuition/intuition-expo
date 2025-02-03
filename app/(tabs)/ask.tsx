import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IMessage, Bubble, InputToolbar, Composer } from 'react-native-gifted-chat'
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { useApolloClient } from '@apollo/client';
import { getTools } from '@/lib/openai/tools';
import Markdown from 'react-native-markdown-display';
import { styles } from '@/lib/chat-styles';

export default function Ask() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const client = useApolloClient();
  const openAI = React.useMemo(
    () =>
      new OpenAI({
        apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      }),
    []
  );
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
        },
      },
    ])
  }, [])


  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    const tools = await getTools(client);
    // Immediately append user message
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const giftedMessages = [...messages, ...newMessages];
    const openaiMessages: ChatCompletionMessageParam[] = giftedMessages.map(message => ({
      role: message.user._id === 1 ? 'user' : 'assistant',
      content: message.text,
    }));

    const runner = openAI.beta.chat.completions.runTools({
      model: "gpt-4o-mini",
      messages: openaiMessages,
      tools: tools,
      max_tokens: 2048
    })
      .on("connect", () => console.log("Connecting..."))
      .on("functionCall", (event: any) => {
        console.log("functionCall", event)
        // setProgressMessage(`Calling function ${event.name}...`)
      })
      .on("message", () => console.log("Processing..."))
      .on("finalContent", () => console.log("Finalizing..."))
      .on("error", (error: any) => console.error(error));

    const finalContent = await runner.finalContent();

    // Create AI response message
    const aiResponse: IMessage = {
      _id: Math.random().toString(),
      createdAt: new Date(),
      user: { _id: 2, name: 'React Native', avatar: 'https://placeimg.com/140/140/any' },
      text: finalContent || ''
    };

    // Append AI response
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [aiResponse])
    );
  }, [messages, openAI]);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#0a7ea4'
            },
            left: {
              backgroundColor: '#282c2e',
            }
          }}
          textStyle={{
            left: {
              color: 'white'
            }
          }}
          renderMessageText={props => (
            <Markdown style={styles}>{props.currentMessage.text}</Markdown>
          )}
        />
      )}
      renderInputToolbar={props => (
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: '#151718',
            borderTopColor: '#282c2e'
          }}
        />
      )}
      renderComposer={props => (
        <Composer
          {...props}
          textInputStyle={{
            color: '#ECEDEE',
            backgroundColor: '#282c2e'
          }}
        />
      )}
      timeTextStyle={{
        right: {
          color: '#073b4d'
        },
        left: {
          color: 'gray'
        }
      }}
    />
  )
}