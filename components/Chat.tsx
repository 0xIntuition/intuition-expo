import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IMessage, Bubble, InputToolbar, Composer } from 'react-native-gifted-chat'
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { useApolloClient } from '@apollo/client';
import { getTools } from '@/lib/openai/tools';
import Markdown from 'react-native-markdown-display';
import { styles } from '@/lib/chat-styles';

export default function Chat({ systemPrompt }: { systemPrompt?: string }) {
  const { isConnected, address, provider } = { isConnected: false, address: undefined, provider: undefined };
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
    const initialMessages: IMessage[] = []
    if (systemPrompt) {
      initialMessages.push({
        _id: 0,
        text: systemPrompt,
        createdAt: new Date(),

        system: true,
        user: {
          _id: 0,
          name: 'Intuition',
          avatar: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4'
        },
      })
    }
    initialMessages.push({
      _id: 1,
      text: 'Hello how can I help you?' + (isConnected ? ' You are connected as ' + address : ''),
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Intuition',
        avatar: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4'
      },
    })
    setMessages(initialMessages)
  }, [])


  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    const tools = await getTools(client);
    // Immediately append user message
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const giftedMessages = [...messages, ...newMessages];
    const openaiMessages: ChatCompletionMessageParam[] = giftedMessages.map(message => ({
      role: message.user._id === 1 ? 'user' : (message.user._id === 0 ? 'system' : 'assistant') as 'user' | 'system' | 'assistant',
      content: message.text,
    }));
    console.log(openaiMessages)

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
      user: { _id: 2, name: 'Intuition', avatar: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4' },
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
            backgroundColor: 'transparent'
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
      renderSystemMessage={props => (
        null
      )}
    />
  )
}