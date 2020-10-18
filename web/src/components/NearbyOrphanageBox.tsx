import React from 'react'
import '../styles/components/nearby-orphanage-box.css'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface OrphanageProps {
    id: number,
    name: string,
    about: string,
    opening_hours: string,
    open_on_weekends: boolean
}

export default function NearbyOrphanageBox(props:OrphanageProps) {
    const open_on_weekends = props.open_on_weekends ? 'Abre fim de semana' : 'Não abre fim de semana'

    return (
        <div className="nearby-orphanage-box">
            <h1>{props.name}</h1>
            <div className="orphanage-about">
                {props.about}
            </div>
            <div>
                {props.opening_hours}
            </div>
            <div>
                {open_on_weekends}
            </div>
            <Link to={`/orphanages/${props.id}`} className="details">
                <FiArrowRight size="20px" color="rgba(0, 0, 0, 0.6)" />
            </Link>
        </div>
    )
}