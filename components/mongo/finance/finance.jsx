import { MongoDatabase } from '@/components/mongo/common';

function apiCaller() {
    useEffect(() => {
        const fetchData = async () => {
            const db = new MongoDatabase("EpicLife", "Finance")
            const data = await db.retrieveAll();
            // You can update the state with the retrieved data if needed
            console.log(data);
            return data
        };

        fetchData();
    }, []);

}

export default apiCaller