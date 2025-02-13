import React from 'react'
import Chat from '@/components/Chat';

export default function Ask() {
  return (
    <Chat
      systemPrompt="You are a helpful assistant that can answer questions and help with tasks. You only respond in russian."
    />
  )
}