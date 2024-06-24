import './Resources.css';
import NavBarComponent from '../../component/navBarComponent/NavBarComponent';
import APIGatewayService from '../../shared/services/api-gateway-service';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, { useEffect, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [favoriteResources, setFavoriteResources] = useState([]);
    const [tabIndex, setTabIndex] = useState(0); // Estado para controlar la pestaña activa
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    useEffect(() => {
        const fetchInitialResources = async () => {
            try {
                const fetchHistoryResponse = await APIGatewayService.getFetchHistory();
                const fetchHistory = fetchHistoryResponse.data;

                if (!fetchHistory.isFetched) {
                    await APIGatewayService.fetchResources();
                    await APIGatewayService.updateFetchHistory({ isFetched: true });
                }

                const resourcesResponse = await APIGatewayService.getAllResources();
                setResources(resourcesResponse.data);
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        };

        fetchInitialResources();
    }, []);

    useEffect(() => {
        const loadFavoriteResources = async () => {
            try {
                const response = await APIGatewayService.getUserResourcesByUserId(userId);
                setFavoriteResources(response.data);
            } catch (error) {
                console.error("Error fetching favorite resources:", error);
            }
        };

        if (tabIndex === 1) { // 1 significa que estás en la pestaña "Favoritos"
            loadFavoriteResources();
        }
    }, [userId, tabIndex]); // Dependencias: userId y tabIndex

    const handleFilter = (category) => {
        APIGatewayService.getResourcesByCategory(category)
            .then(response => {
                setResources(response.data);
            })
            .catch(error => {
                console.error("Error fetching resources by category:", error);
            });
    };

    const handleFavorite = async (resourceId) => {
        try {
            const postData = {
                user_Id: userId,
                resource_Id: resourceId
            };
            await APIGatewayService.postUserResources(postData);

            // Actualizar el estado local para reflejar que el recurso es ahora favorito
            const updatedResources = resources.map(resource => {
                if (resource.id === resourceId) {
                    return { ...resource, isFavorite: true };
                }
                return resource;
            });
            setResources(updatedResources);

            // Recargar los recursos favoritos después de marcar uno como favorito
            if (tabIndex === 1) {
                await loadFavoriteResources();
            }
        } catch (error) {
            console.error("Error al marcar como favorito:", error);
        }
    };

    const getCategoryAndLink = (resourceId) => {
        // Buscar el recurso correspondiente en resources
        const resource = resources.find(resource => resource.id === resourceId);
        if (resource) {
            return {
                category: resource.category,
                link: resource.link
            };
        }
        return {
            category: '',
            link: ''
        };
    };

    return (
        <div>
            <div className='resources-nav'>
                <NavBarComponent />
            </div>
            <div className='resources'>
                <TabView activeIndex={tabIndex} onTabChange={(e) => setTabIndex(e.index)}>
                    <TabPanel header="Todos">
                        <div className='filter'>
                            <h1>Filtrado:</h1>
                            <Button label="Depresión" onClick={() => handleFilter('depression')} />
                            <Button label="Ansiedad" onClick={() => handleFilter('anxiety')} />
                        </div>
                        <div className='content'>
                            {resources.map(resource => (
                                <Card key={resource.id} title={`Recurso ${resource.id}`} subTitle={`Categoría: ${resource.category}`}>
                                    <p className="m-0">
                                        <a href={resource.link}>{resource.link}</a>
                                    </p>
                                    <Button label="Favorito" onClick={() => handleFavorite(resource.id)} />
                                </Card>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel header="Favoritos">
                        <div className='content'>
                            {favoriteResources.map(favorite => {
                                const { category, link } = getCategoryAndLink(favorite.resource_Id);
                                return (
                                    <Card key={favorite.resource_Id} title={`Recurso ${favorite.resource_Id}`} subTitle={`Categoría: ${category}`}>
                                        <p className="m-0">
                                            <a href={link}>{link}</a>
                                        </p>
                                    </Card>
                                );
                            })}
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default Resources;