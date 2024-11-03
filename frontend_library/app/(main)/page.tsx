import BookAI from "@/components/main/BookAI";

export default function Home() {
    const books = [{
        id: 1,
        title: "Преступление и наказание",
        cover_image: "http://192.168.1.41:8000/media/covers/dostoevsky.jpg",
        rating: 5,
    },{
        id: 2,
        title: "Преступление и наказание",
        cover_image: "http://192.168.1.41:8000/media/covers/dostoevsky.jpg",
        rating: 5,
    }]
    return (
        <>
            <BookAI streakDays={3} recommendationBooks={books}/>
        </>
    )
}