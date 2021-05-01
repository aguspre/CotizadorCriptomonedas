import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCripto from '../hooks/useCripto';
import axios from 'axios';
import Error from './Error';
const Boton = styled.input`
    margin-top:20px;
    font-weight: bold;
    font-size:20px;
    padding: 10px;
    background-color: #66a2fe;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {

    // state del listado de criptos

    const [ listacripto, cuardarCripto] = useState([]);
    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'ARS', nombre: 'Peso Argentino'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ];

    // Utilizar useMoneda
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda','', MONEDAS);

    // Utilizar useCripto
    const [ criptoMoneda, SelectCripto] = useCripto('Elige tu Criptomoneda','', listacripto);

    // Ejecutar llamado a la api

    useEffect(()=> {
        const consultarAPI = async () =>{
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const resultado = await axios.get(url);

            cuardarCripto(resultado.data.Data);
        }
        consultarAPI();
    },[]);

    // cuando el usuario hace submit 
    const cotizarMoneda = e =>{
        e.preventDefault();

        if(moneda === "" || criptoMoneda === ""){
            guardarError(true);
            return;
        }

        guardarError(false);

        guardarMoneda(moneda);
        guardarCriptomoneda(criptoMoneda);
    }


    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error 
            mensaje = "Todos los campos son obligatorios"/> : null}
            <SelectMoneda />
            <SelectCripto />
            <Boton
            type="submit"
            value="Calcular" 
            />
        </form>

     );

}
 
export default Formulario;

