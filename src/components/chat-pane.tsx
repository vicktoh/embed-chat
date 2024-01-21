import { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Appearance, Chat, ThreadMessage } from '../types';
import { ChatBubble } from './chat-bubble';
import { LoadingBubble } from './loading-bubble';
import { sendMessage, startNewChat } from '../api/chat';
type ChatPaneProps = {
    apiKey: string;
    appearance: Appearance;
    show: boolean;
};
export const ChatPane: FC<ChatPaneProps> = ({ appearance, show, apiKey }) => {
    const [chat, setChat] = useState<Chat>();
    const [fetchingChat, setFetchingChat] = useState<boolean>();
    const [chats, setChats] = useState<ThreadMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);

    const sendChatMessage = async () => {
        if (!userInput.trim()) return;
        try {
            setLoading(true);
            setChats((value) => [
                ...value,
                {
                    content: [
                        {
                            type: 'text',
                            text: { value: userInput, annotations: [] },
                        },
                    ],
                    role: 'user',
                },
            ]);
            if (!chat?.id) {
                const chat = (await startNewChat(apiKey)) as Chat;

                console.log(chat, 'Chat retrived true');
                setChat(chat);
                const chats = await sendMessage(chat.id, userInput, apiKey);
                setChats(chats.reverse());
                return;
            }
            const chats = await sendMessage(chat.id, userInput, apiKey);
            setChats(chats.reverse());
        } catch (error) {
            console.log(error, 'error ❌');
        } finally {
            setUserInput('');
            setLoading(false);
        }
    };

    const handleOnKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            console.log("Enter Pressed");
            sendChatMessage();
        }
    }
    useEffect(() => {
        if (containerRef.current?.scrollHeight || 0 > 356) {
            endRef.current &&
                endRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chats]);
    const fetchChat = useCallback(async () => {
        try {
            setChats([])
            setFetchingChat(true);
            const newchat = (await startNewChat(apiKey, [
                { content: appearance.defaultMessage, role: 'assistant' },
            ])) as Chat;
            setChats((value) => [
                ...value,
                {
                    content: [
                        {
                            type: 'text',
                            text: {
                                value: appearance.defaultMessage,
                                annotations: [],
                            },
                        },
                    ],
                    role: 'assistant',
                },
            ]);
            setChat(newchat);
        } catch (error) {
            console.log(error);
        } finally {
            setFetchingChat(false);
        }
    }, [apiKey, appearance.defaultMessage]);
    useEffect(() => {
        if (!chat?.id){
            fetchChat();
        } 

    }, [chat, fetchChat]);
    return (
        <div
            className={` absolute z-auto border  bg-white dark:bg-slate-800 border-slate-400 rounded-lg w-mobile md:w-[400px] bottom-[50px] right-[-20px] md:right-[50px] `}
            style={{ display: show ? 'block' : 'none' }}
        >
            <div
                className={`flex flex-col gap-2 justify-center  rounded-tr-lg rounded-tl-lg content-center py-5 px-8`}
                style={{
                    backgroundColor: appearance.brandColor,
                    color: appearance.textColor,
                }}
            >
                <h3
                    className={`text-3xl text-center font-bold `}
                    style={{ color: appearance.textColor }}
                >
                    {appearance.title}
                </h3>
                <p className="text-base text-center">
                    {appearance.description}
                </p>
                <div className="flex flex-row justify-center">
                    <button
                        className=" py-2 px-4 border transition-opacity border-white rounded-md hover:opacity-55 focus:outline-1 disabled:bg-slate-500 "
                        style={{
                            background: appearance.brandColor,
                            color: appearance.textColor,
                        }}
                        onClick={fetchChat}
                        disabled={fetchingChat}
                    >
                        {fetchingChat ? 'Please wait...' : 'New Chat'}
                    </button>
                </div>
            </div>
            <div className=" flex flex-col  relative   rounded-b-lg pt-5">
                <div
                    className="flex flex-col h-[356px] overflow-y-auto overflow-x-hidden px-4"
                    ref={containerRef}
                >
                    {chats.map((chat, id) => (
                        <ChatBubble
                            key={`dumbledore-chat-${id}`}
                            timestamp={1000}
                            appearance={appearance}
                            role={chat.role}
                            text={chat.content[0].text.value}
                        />
                    ))}
                    {loading && <LoadingBubble appearance={appearance} />}
                    <div ref={endRef}></div>
                </div>

                <div className="flex bg-white dark:bg-slate-800 flex-row items-center relative py-5 px-4 rounded-b-lg">
                    <input
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="py-3 pl-2 pr-20 w-full rounded-md bg-white border text-black dark:bg-slate-800 dark:text-white"
                        placeholder="Ask me a question"
                        onKeyUp={handleOnKeyUp}
                    />
                    <button
                        onClick={sendChatMessage}
                        className={`absolute right-5 py-1 px-4 border-1`}
                        style={{
                            backgroundColor: appearance.brandColor,
                            color: appearance.textColor,
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};
