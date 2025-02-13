import React from 'react'
import Chat from '@/components/Chat';
import { systemPrompt } from '@/lib/system-prompt';
export default function Ask() {
  return (
    <Chat
      systemPrompt={systemPrompt}
      assistantMessage="Hello how can I help?"
    />
  )
}