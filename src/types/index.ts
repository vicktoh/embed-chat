

export type Appearance = {
   brandColor: string,
   textColor?: string,
   title: string,
   description: string;
   defaultMessage: string;
   icon: "circle" | "square" | "circle-dot" | "square-dot" | string,
   avatar?: string,
   theme?: "dark" | "light",
}

export type Chat = {
   id: string;
   createdAt: string;
}

export type ThreadMessage = {
   id?: string;
   created_at?: number,
   role: "user" | "assistant",
   content: [{type: string, text: { value: string, annotations: object[]}}]
}



