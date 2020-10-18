import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import NearbyOrphanageBox from '../components/NearbyOrphanageBox';
import Sidebar from '../components/Sidebar'
import api from '../services/api';

import '../styles/pages/nearby-orphanages.css'
import Orphanage from './Orphanage';

interface Orphanage {
    id: number,
    name: string,
    longitude: number,
    latitude: number,
    about: string,
    opening_hours: string,
    open_on_weekends: boolean
}

export default function NearbyOrphanages() {
    const geoLocation = navigator.geolocation
    const [userLocation, setUserLocation] = useState<any>()
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    let orphanagesNearby:Array<Orphanage> = []
    getLocation()
    
    useEffect(() => {
        api.get('orphanages').then(res => {
            setOrphanages(res.data)
        })
    })

    function getLocation() {
        if(geoLocation) {
            geoLocation.getCurrentPosition(position => {
                setUserLocation(L.latLng(position.coords.latitude, position.coords.longitude))
            })
        } else {
            alert('Seu navegador não suporta Geolocalização.')
            return
        }
    }
    if(!orphanages || !userLocation) {
        return <p>Carregando...</p>
    } else {
        orphanages.forEach((orphanage) => {
            const latlng = L.latLng(orphanage.latitude, orphanage.longitude)
            if (latlng.distanceTo(userLocation) < 5000) {
                orphanagesNearby.push(orphanage)
            }
        })
    }

    return (
        <div className="nearby-orphanages">
            <Sidebar />
            <div className="content-wrapper">
                <h1 className="title">
                    Orfanatos pertinho de você
                </h1>
                <div className="container">
                    {orphanagesNearby.map(orphanageNearby => {
                        return (
                            <NearbyOrphanageBox 
                            key={orphanageNearby.id}
                            id={orphanageNearby.id}
                            name={orphanageNearby.name}
                            about={orphanageNearby.about}
                            opening_hours={orphanageNearby.opening_hours}
                            open_on_weekends={orphanageNearby.open_on_weekends} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
