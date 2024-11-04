import BookAI from "@/components/main/BookAI";

export default function Home() {
    const books = [{
        id: 2,
        title: "Преступление и наказание",
        cover_image: process.env.BACKEND_IP_ADDRESS+"/media/covers/dostoevsky.jpg" ,
        rating: 5,
    },{
        id: 3,
        title: "Отцы и Дети",
        cover_image: process.env.BACKEND_IP_ADDRESS+"/media/covers/otcy-i-dety.jpg",
        rating: 5,
    }]
    return (
        <>
            <BookAI streakDays={3} recommendationBooks={books}/>
        </>
    )
}