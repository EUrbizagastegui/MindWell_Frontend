import ApiGatewayService from "../../shared/services/api-gateway-service.js";
import NavBarComponent from '../../component/navBarComponent/NavBarComponent'
import './Notifications.css'
import {useEffect, useState} from "react";

const Notifications = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);

    const fetchNotifications = async () => {
        try {
            const response = await ApiGatewayService.getAllNotificationsByUserId(userId);
            console.log("Response",response);
            setNotifications(response.data);
        } catch (error) {
            setError("Error fetching notifications. Please try again later.");
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="notificationsHome">
            <div className='noti-nav'>
                <NavBarComponent/>
            </div>
            <div className='notifications-body'>
                <h2>Notificaciones</h2>
                {error && <p className="error">{error}</p>}
                <ul>
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <li key={notification.id}>
                                <p><b>Categoria:</b> {notification.category}</p>
                                <p><b>Mensaje:</b> {notification.text}</p>
                            </li>
                        ))
                    ) : (
                        <p className="no-notifications">No notifications available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Notifications;