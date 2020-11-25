import {Card, Button, ListGroup} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';

function Requirement(props){

    const {id,name,description, finished, estimated_time, deadline, id_project, idAnalyst, priority, createdAt, updatedAt} = useSelector((s) => s.requirementReducer.requirements.find((v) => v.id === props.id));

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{id}</Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item>Nombre {name}</ListGroup.Item>
                <ListGroup.Item>Analista: {idAnalyst}</ListGroup.Item>
                <ListGroup.Item>Prioridad {priority}</ListGroup.Item>
                <ListGroup.Item>Proyecto creado el: {moment(createdAt).format('DD/MM/YYYY')}</ListGroup.Item>
                <ListGroup.Item>Última actualización: {moment(updatedAt).format('DD/MM/YYYY')}</ListGroup.Item>
            </ListGroup>
            {props.flag === "true" &&
                <Button as={Link} to={"/projects/"+id} variant="primary">Editar</Button>
            }
        </Card.Body>
        </Card>
    );
}

export default Requirement;