import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ServiceData } from "../interfaces/OrderData";
import { ServiceUpdate } from "../interfaces/OrderUpdate";
import { retrieveService, updateService } from "../api/orderAPI";

interface ExtendedServiceData extends ServiceData {
  title?: string | null;
  status?: string | null;
  part?: string | null;
}

const UpdateServiceRequest = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [serviceData, setServiceData] = useState<ExtendedServiceData>({
        id: null,
        name: null,
        description: null,
        cost: null,
        part: null,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServiceData = async () => {
            if (!id) return;
            
            try {
                const response = await retrieveService(Number(id));
                setServiceData(response as ExtendedServiceData);
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
        if (!id) return;
        
        try {
            const updateData: ServiceUpdate = {
                title: serviceData.title,
                description: serviceData.description,
                status: serviceData.status,
                name: serviceData.name,
                cost: serviceData.cost
            };
            
            await updateService(id, updateData);
            navigate('/services'); // Redirect to the services list or another page
        } catch (error) {
            setError("Error updating service.");
            console.error("Error updating service:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit} className="request-service-form">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="form-section">
                <h2>Vehicle Info</h2>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title"
                    value={serviceData.title || ''} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea 
                    name="description" 
                    id="description"
                    value={serviceData.description || ''} 
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
                    value={serviceData.status || ''} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <button type="submit">Update Service</button>
        </form>
    );
};

export default UpdateServiceRequest;