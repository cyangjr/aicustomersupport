'use client'
import Image from "next/image";
import { userAgent } from "next/server";
import { useState } from "react";

export default function Home() {
  const[messages, setMessages]( = useState{
    role: 'assistant',
    content: 'Hi I am Headstarter Support Agent, how can I assist you today?'
  })
}
