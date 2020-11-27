import React, { useState } from 'react';
import axios from 'axios';
import {Form, Button, Alert} from 'react-bootstrap';
import Auth from './Auth';

function CreateProject(props){

    var accountType = Auth();
	var hasPermission = accountType === 'Manager' || accountType === 'Analyst' ? true : false
	const [deliver, setDeliver] = useState('');
	const [client, setClient] = useState('');
	const [analyst, setAnalyst] = useState('');
    const [manager, setManager] = useState('');
    const [estado, setEstado] = useState('');

	const handleDeliver = (e) => {
		setDeliver(e.target.value);
	}

	const handleClient = (e) => {
		setClient(e.target.value);
	}

	const handleAnalyst = (e) => {
		setAnalyst(e.target.value);
	}

	const handleManager = (e) => {
		setManager(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:8080/project', {
			deliver_date: deliver,
			client_email: client,
			analyst_email: analyst,
            manager_email: manager
		}, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			}
		}).then((data) => {
			setEstado('Proyecto creado');
			console.log(data);
		}).catch((error) => {
			setEstado('Error creando el proyecto');
		});
	}

	return hasPermission ? (
		<Form>
			{estado !== '' && (
				<Alert variant={estado === 'Proyecto creado' ? 'success' : 'danger'}>
					{estado}
				</Alert>	
			)}
		<Form.Group>
			<Form.Label>Deliver date</Form.Label>
			<Form.Control onChange={handleDeliver} type="date"/>
		</Form.Group>

		<Form.Group>
			<Form.Label>Manager Email</Form.Label>
			<Form.Control onChange={handleManager} type="text"/>
		</Form.Group>

        <Form.Group>
			<Form.Label>Analyst Email</Form.Label>
			<Form.Control onChange={handleAnalyst} type="text"/>
		</Form.Group>

        <Form.Group>
			<Form.Label>Client Email</Form.Label>
			<Form.Control onChange={handleClient} type="text"/>
		</Form.Group>

		<Button onClick={handleSubmit} variant="primary" type="submit">
			Enviar
		</Button>
		</Form>
	) : (
		<Alert variant="danger">Acceso Restringido</Alert>
	);
}

export default CreateProject;