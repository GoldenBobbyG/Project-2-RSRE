import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ServiceData } from "../interfaces/ServiceData";
import { ServiceUpdate } from "../interfaces/ServiceUpdate";
import  serviceAPI  from "../api/serviceAPI";

const UpdateServiceRequest = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [serviceData, setServiceData] = useState<ServiceData>({
        id: '',
        part: '',
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await serviceAPI.getServiceById(id);
                setServiceData(response.data);
            } catch (error) {
                setError("Error fetching service data.");
                console.error("Error fetching service data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceData();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setServiceData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await serviceAPI.updateService(id, serviceData);
            navigate('/services'); // Redirect to the services list or another page
        } catch (error) {
            setError("Error updating service.");
            console.error("Error updating service:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title"
                    value={serviceData.title} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea 
                    name="description" 
                    id="description"
                    value={serviceData.description} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="status">Status:</label>
                <input 
                    type="text" 
                    name="status" 
                    id="status"
                    value={serviceData.status} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <button type="submit">Update Service</button>
        </form>
    );
};

export default UpdateServiceRequest;