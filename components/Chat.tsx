import React, { useState, useCallback, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { GiftedChat, IMessage, Bubble, InputToolbar, Composer, Send } from 'react-native-gifted-chat'
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { useApolloClient } from '@apollo/client';
import { getTools } from '@/lib/openai/tools';
import Markdown from 'react-native-markdown-display';
import { styles } from '@/lib/chat-styles';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { ThemedView } from './ThemedView';
import { Button } from 'react-native';
import { ThemedText } from './ThemedText';

export default function Chat({ systemPrompt, assistantMessage }: { systemPrompt?: string, assistantMessage?: string }) {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
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
        },
      })
    }
    if (assistantMessage) {
      initialMessages.push({
        _id: 1,
        text: (assistantMessage ? ' ' + assistantMessage : ''),
        createdAt: new Date(),
        user: {
          _id: 2,
        },
      })
    }
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
      .on("connect", () => {
        console.log("Connecting...")
        setIsTyping(true)
      })
      .on("functionCall", (event: any) => {
        console.log("functionCall", event)
        // setProgressMessage(`Calling function ${event.name}...`)
      })
      .on("message", () => console.log("Processing..."))
      .on("finalContent", () => {
        console.log("Finalizing...")
        setIsTyping(false)
      })
      .on("error", (error: any) => console.error(error));

    const finalContent = await runner.finalContent();

    // Create AI response message
    const aiResponse: IMessage = {
      _id: Math.random().toString(),
      createdAt: new Date(),
      user: { _id: 2 },
      text: finalContent || ''
    };

    // Append AI response
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [aiResponse])
    );
  }, [messages, openAI]);

  return (
    <GiftedChat
      isTyping={isTyping}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderDay={() => null}
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#3c4245'
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
            <Markdown
              style={styles}
              rules={{
                link: (node, children, parent, styles) => {
                  return (
                    <Link
                      key={node.key}
                      href={node.attributes.href}
                      style={[styles.link, { color: '#1e90ff' }]}
                    >
                      {children}
                    </Link>
                  );
                }
              }}
            >
              {props.currentMessage?.text}
            </Markdown>
          )}
        />
      )}
      renderSend={props => (
        <Send
          {...props}
          disabled={!props.text}
          containerStyle={{
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 4,
          }}
        >
          <Ionicons name="send" size={24} color="white" />
        </Send>)}
      renderInputToolbar={props => (
        <InputToolbar
          {...props}

          containerStyle={{
            backgroundColor: '#151718',
            borderTopWidth: 0,
            borderRadius: 20,
            margin: 10,
            marginBottom: 16,
          }}
        />
      )}
      renderComposer={props => (
        <Composer
          {...props}
          textInputStyle={{
            color: '#ECEDEE',
            backgroundColor: 'transparent',


          }}
        />
      )}
      timeTextStyle={{
        right: {
          color: 'gray'
        },
        left: {
          color: 'gray'
        }
      }}
      renderAvatar={props => (
        <Image source={require('@/assets/images/logo-small.png')} style={{ width: 32, height: 32, borderRadius: 16 }} />
      )}

      renderTime={props => null}
      renderSystemMessage={props => null}
    />
  )
}
