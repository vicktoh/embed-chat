import { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Appearance, Chat, ThreadMessage } from '../types';
import { ChatBubble } from './chat-bubble';
import { LoadingBubble } from './loading-bubble';
import { sendMessage, startNewChat } from '../api/chat';
type ChatPaneProps = {
    apiKey: string;
    appearance: Appearance;
    show: boolean;
    onToggleShow: ()=> void;
};
export const ChatPane: FC<ChatPaneProps> = ({ appearance, show, apiKey, onToggleShow }) => {
    const [chat, setChat] = useState<Chat>();
    const [fetchingChat, setFetchingChat] = useState<boolean>();
    const [chats, setChats] = useState<ThreadMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);

    const sendChatMessage = async () => {
        if (!userInput.trim()) return;
        const input = userInput.trim();
        setUserInput('');
        try {
            setLoading(true);
            setChats((value) => [
                ...value,
                {
                    content: [
                        {
                            type: 'text',
                            text: { value: input, annotations: [] },
                        },
                    ],
                    role: 'user',
                },
            ]);
            if (!chat?.id) {
                const chat = (await startNewChat(apiKey)) as Chat;

                console.log(chat, 'Chat retrived true');
                setChat(chat);
                const chats = await sendMessage(chat.id, input, apiKey);
                setChats(chats.reverse());
                return;
            }
            const chats = await sendMessage(chat.id, input, apiKey);
            setChats(chats.reverse());
        } catch (error) {
            console.log(error, 'error ❌');
        } finally {
            setUserInput('');
            setLoading(false);
        }
    };
    console.log(chats, "🍅")

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
            className={`dmd-fixed dmd-z-auto  dmd-shadow-lg dmd-left-[10px] md:dmd-left-[auto]  dmd-bg-white dark:dmd-bg-slate-800 dmd-border-slate-400 dmd-rounded-lg  md:dmd-w-[400px] dmd-bottom-[10px] md:dmd-bottom-[70px] dmd-right-[10px] md:dmd-right-[120px] dmd-top-2 md:dmd-top-[auto] md:dmd-min-h-[75vh]`}
            style={{ display: show ? 'block' : 'none' }}
        >
            <div className="dmd-h-full md:dmd-min-h-[75vh]  dmd-relative">

            <div
                className={`dmd-flex dmd-flex-col  dmd-gap-2 dmd-justify-center  dmd-rounded-tr-lg dmd-rounded-tl-lg dmd-content-center dmd-py-5 dmd-px-8 dmd-relative`}
                style={{
                    backgroundColor: appearance.brandColor,
                    color: appearance.textColor,
                }}
            >
                <h3
                    className={`dmd-text-3xl dmd-text-center dmd-font-bold `}
                    style={{ color: appearance.textColor }}
                >
                    {appearance.title}
                </h3>
                <p className="dmd-text-base dmd-text-center">
                    {appearance.description}
                </p>
                <div className="dmd-flex dmd-flex-row dmd-justify-center">
                    <button
                        className=" dmd-py-2 dmd-px-4 dmd-border dmd-transition-opacity dmd-border-white dmd-rounded-md hover:dmd-opacity-55 focus:dmd-outline-1 disabled:dmd-bg-slate-500 "
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
                <button className="md:dmd-hidden dmd-text-black dmd-border-black dmd-flex dmd-items-center dmd-justify-center dmd-rounded-full dmd-absolute dmd-right-3 dmd-top-3 dmd-w-5 dmd-h-5 dmd-border" onClick={onToggleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
            <div className=" dmd-flex dmd-flex-col dmd-flex-1  dmd-relative   dmd-rounded-b-lg dmd-pt-5">
                <div
                    className="dmd-flex dmd-flex-col dmd-h-[calc(100vh-90px-158px-18px)] md:dmd-h-[calc(75vh-90px-158px)]  dmd-overflow-y-auto dmd-overflow-x-hidden dmd-px-4 dmd-pb-10"
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
                

            </div>
            <div className="dmd-absolute dmd-bottom-0 dmd-right-0 dmd-left-0  dmd-pt-5 dmd-pb-2">

                <div className="dmd-flex  dmd-bg-white dark:dmd-bg-slate-800 dmd-flex-row dmd-items-center  dmd-relative dmd-px-4 dmd-rounded-b-lg dmd-mt-auto">
                    <input
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="dmd-py-3 dmd-pl-2 dmd-pr-20 dmd-w-full dmd-rounded-md dmd-bg-white dmd-border dmd-text-black dark:dmd-bg-slate-800 dark:dmd-text-white"
                        placeholder="Ask me a question"
                        onKeyUp={handleOnKeyUp}
                    />
                    <button
                        onClick={sendChatMessage}
                        className={`dmd-absolute dmd-right-5 dmd-rounded-md dmd-py-1 dmd-px-4 dmd-border-1`}
                        style={{
                            backgroundColor: appearance.brandColor,
                            color: appearance.textColor,
                        }}
                    >
                        Send
                    </button>
                </div>
            <p className="dmd-text-[10px] dmd-text-center dmd-text-slate-400 dmd-mt-1">Made with ❤️ <a className='dmd-font-bold' href="https:/supportbuddyai.com dmd-text-primary" style={{color: appearance.brandColor}}>SupportBuddyAI</a></p>

                </div>
            </div>

        </div>
    );
};
