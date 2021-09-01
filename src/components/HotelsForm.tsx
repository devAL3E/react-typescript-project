import React, { /*useState,*/ useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import axios from 'axios';

type Inputs = {
  formControlRequired: string,
  formDateCheckIn: string,
  formDateCheckOut: string,
};

const HotelsForm = () => {

    //const [places, setPlaces] = useState({});

    useEffect( () => {
        // async function getPlaces() {
        //     const url = 'http://preproduccion.cubatravelsclub.com/webapi/v1/hotels';
        //     const uname = AG23200200;
        //     const pass = S5RT;
        //     const allPlaces = await axios.get(url, {}, {
        //         auth: {
        //         username: uname,
        //         password: pass
        //         }
        //     });
        //     return allPlaces
        // }
        // setPlaces(getPlaces());
    }, [] );

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    console.log(watch("formDateCheckIn")) // watch input value by passing the name of it

    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="row">
            
            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <Form onSubmit={handleSubmit(onSubmit)}>

                <h2 className="pb-3">Hoteles</h2>

                <Form.Group>
                    <Form.Label>Buscar</Form.Label>
                    {/* register your input into the hook by invoking the "register" function */}
                    <Form.Control {...register("formControlRequired", { required: true })} as="select">
                        {/* { 
                            places.areasInfo.map((el, index) => {
                                return (
                                    <option key={ index } value={ el.area_code }>
                                        { el }
                                    </option>
                                );
                            }) 
                        } */}
                    </Form.Control>
                    {/* errors will return when field validation fails  */}
                    {errors.formControlRequired && <span>This field is required</span>}
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Check in</Form.Label>
                    {/* register your input into the hook by invoking the "register" function */}
                    <Form.Control {...register("formDateCheckIn")} type="date">
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Check out</Form.Label>
                    {/* include validation with required or other standard HTML validation rules */}
                    <Form.Control {...register("formDateCheckOut")} type="date">
                    </Form.Control>
                </Form.Group>
                
                {/* <input type="submit" /> */}
                <div className="pt-3">
                    <Button className="btn-block" variant="primary" type="submit">
                        Buscar
                    </Button>
                </div>
            </Form>
            </div>
        </div>
    );
}

export default HotelsForm