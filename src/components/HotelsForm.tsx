import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import moment from 'moment';
import './HotelsForm.css'

type Inputs = {
  formControlRequired: string,
  formDateCheckIn: string,
  formDateCheckOut: string,
};

const HotelsForm = () => {

    const [destinationsList, setDestinationsList] = useState<string[]>([]);
    const [hotelsList, setHotelsList] = useState<string[]>([]);

    const [isPlaceSelected, setIsPlaceSelected] = useState(false);
    const [isCheckInSelected, setIsCheckInSelected] = useState(false);

    const [minCheckInDate, setMinCheckInDate ] = useState('');
    const [maxCheckInDate, setMaxCheckInDate ] = useState('');
    const [minCheckOutDate, setMinCheckOutDate ] = useState('');
    const [maxCheckOutDate, setMaxCheckOutDate ] = useState('');

    const getPlaces = () => {
        const url = 'http://preproduccion.cubatravelsclub.com/webapi/v1/hotels';
        const uname = 'AG23200200';
        const pass = 'S5RT';
        axios.get(url, {
            auth: {
            username: uname,
            password: pass
            }
        }).then(response => {
            const destinations: string[] = []
            const hotels: string[] = []
            response.data.areasInfo.map((area: any) => {
                return(
                    <>
                        {destinations.push(area.areaName)}
                        {area.zones.map((zone: any) => {
                            if (area.areaName === zone.zoneName) {
                                destinations.push(zone.zoneName)
                            } else {
                                destinations.push(zone.zoneName + ', ' + area.areaName)
                            }
                            return(
                                <>
                                    
                                    {destinations}
                                    {zone.hotels.map((hotel: any) => {
                                        if (area.areaName === zone.zoneName) {
                                            hotels.push(hotel.hotelName + ', ' + zone.zoneName)
                                        } else {
                                            hotels.push(hotel.hotelName + ', ' + zone.zoneName + ', ' + area.areaName)
                                        }
                                        return hotels
                                        
                                    })}
                                 
                                </>
                            )
                        })}
                    </>
                )
            })
            destinations.sort()
            setDestinationsList(destinations)
            hotels.sort()
            setHotelsList(hotels)
        }).catch(error => {
            console.log(error.message)
        });
    }

    useEffect( () => {

        getPlaces()
        setMinCheckInDate(moment().format('YYYY-MM-DD'));
        setMaxCheckInDate(moment().add(100, 'days').format('YYYY-MM-DD'));

    }, [] );

    const { 

        register, 
        handleSubmit,  
        setValue,
        getValues,
        formState: { errors } 

    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    const placeHandler = (event: string) => {
        if (event !== ''){
            setIsPlaceSelected(true);
        }
    }

    const checkInHandler = (event: string) => {
        if (event !== ''){
            setMinCheckOutDate(moment(event).add(1, 'days').format('YYYY-MM-DD'));
            setMaxCheckOutDate(moment(event).add(30, 'days').format('YYYY-MM-DD'));
            setIsCheckInSelected(true);
            const data = getValues('formDateCheckOut')
            if (moment(event) > moment(data) || moment(event).add(30, 'days') < moment(data)){
                setValue('formDateCheckOut', '')
            }
        }
    }

    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="row">
            
            <Form onSubmit={handleSubmit(onSubmit)}>

                <h2 className="pb-3">Hoteles</h2>

                <Form.Group>
                    <Form.Label>Buscar</Form.Label>
                    <Form.Control {...register("formControlRequired", { required: true })} 
                        as="select" onChange={(event) => placeHandler(event.target.value)}
                        >
                        <option key="01" value={''}>
                            Selecciona destino u hotel
                        </option>
                        <option disabled key="02">
                            Destinos
                        </option>
                        { 
                            (destinationsList.length > 0) && destinationsList.map((destination: string, index: number) => {
                                return (
                                    <option key={ index }>
                                        { destination }
                                    </option>
                                );
                            }) 
                        }
                        <option disabled key="03">
                            Hoteles
                        </option>
                        { 
                            (hotelsList.length > 0) && hotelsList.map((hotel: string, index: number) => {
                                return (
                                    <option key={ index }>
                                        { hotel }
                                    </option>
                                );
                            }) 
                        }
                        
                    </Form.Control>
                    {errors.formControlRequired && <span>This field is required</span>}
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Check in</Form.Label>
                    <Form.Control {...register("formDateCheckIn")} type="date" 
                        disabled={ !isPlaceSelected } onChange={(event) => checkInHandler(event.target.value)}
                        min={ minCheckInDate } max={ maxCheckInDate }>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Check out</Form.Label>
                    <Form.Control {...register("formDateCheckOut")} type="date" 
                        disabled={ !isCheckInSelected }
                        min={ minCheckOutDate } max={ maxCheckOutDate }>
                    </Form.Control>
                </Form.Group>
                
                <div className="pt-3">
                    <Button className="btn-block" variant="primary" type="submit" disabled={ !isPlaceSelected }>
                        Buscar
                    </Button>
                </div>
            </Form>

            </div> 
        </div>
    );
}

export default HotelsForm