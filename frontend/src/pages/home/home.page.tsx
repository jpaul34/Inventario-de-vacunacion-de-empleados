import { Container, Row } from 'react-bootstrap';
import { MainLayout } from '../../layouts/main/main.layout';
import './home.page.scss';

export const HomePage = () => {

    return (
        <MainLayout>
            <Container>
                <Row>
                    <h1> PERFIL EMPELADO</h1>
                </Row>
            </Container>            
        </MainLayout>
    );
}



