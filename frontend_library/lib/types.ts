export interface Message {
    id: string;
    text: string;
    role: 'user' | 'assistant';
}
export interface Book {
    id: number;
    title: string;
    author: string;
    cover_image: string;
}