import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { z } from "zod";
import { zodFunction } from "openai/helpers/zod";

export default function Ask() {
  const [messages, setMessages] = useState<IMessage[]>([])

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
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const getAccountInfo = async ({ account_id }: { account_id: string }) => {
    try {
      return "Account not found";
    } catch (error) {
      console.error(error);
      return "Account not found";
    }
  }

  const tools = [
    zodFunction({
      function: getAccountInfo,
      name: "getAccountInfo",
      description: "Get account info, such as label, their preferences, their favorites, and their opinions on different subjects.",
      parameters: z.object({
        account_id: z.string().describe("Account ID (ethereum address), example: 0x61d0ef4be9e8a14793001ad33258383dd48618d8"),
      })
    }),
  ];

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
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
    />
  )
}