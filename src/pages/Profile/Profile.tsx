import React, {useEffect, useState} from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import axios from "axios";

export default function ProfilePage() {
    useEffect(() => {
        // Проверяем localStorage на наличие информации
        const storedData = localStorage.getItem('profileData');

        const token = localStorage.getItem('access_token');

        if (!storedData && token) {
            axios.get('http://localhost:8084/auth/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Укажите тип контента, если это необходимо
                    // Другие заголовки, если необходимо
                }
            })
                .then(response => {
                    // Обработка успешного ответа
                    localStorage.setItem('profileData', JSON.stringify(response.data));
                    setFormData(response.data);
                })
                .catch(error => {
                    // Обработка ошибок
                    console.error('Error fetching data:', error);
                });
        }
    }, []);

    const profileData = localStorage.getItem('profileData');
    const profileDataJson = profileData && JSON.parse(profileData);

    // Здесь храните данные, которые будут редактироваться
    const [formData, setFormData] = useState(profileDataJson || {});

    // Обработчик изменений в форме
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            axios.put(`http://localhost:8084/auth/profile`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    // Обработка успешного ответа
                    console.log('Profile updated:', response.data);
                    localStorage.setItem('profileData', JSON.stringify(response.data));
                    // Обновление данных в localStorage, если это необходимо
                    // Можно также обновить состояние страницы, перезагрузив данные после успешного обновления
                })
                .catch(error => {
                    // Обработка ошибок
                    console.error('Error updating profile:', error);
                });
        }
    };

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                <p className="text-muted mb-1 " style={{ fontWeight: 'bold', fontSize: '18px' }}>{formData.username}</p>
                                <div className="d-flex justify-content-center mb-2">
                                    {/*<MDBBtn>Follow</MDBBtn>*/}
                                    {/*<MDBBtn outline className="ms-1">Message</MDBBtn>*/}
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <form>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Имя</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <input
                                            type="text"
                                            name="firstname"
                                            value={formData.firstname || ''}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Фамилия</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <input
                                            type="text"
                                            name="lastname"
                                            value={formData.lastname || ''}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            <input
                                                type="text"
                                                name="email"
                                                value={formData.email || ''}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            />
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Номер телефона</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber || ''}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Адресс доставки</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <input
                                            type="text"
                                            name="shippingAddress"
                                            value={formData.shippingAddress || ''}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </MDBCol>
                                </MDBRow>
                                </form>
                                <MDBRow className="justify-content-end">
                                    <MDBCol sm="auto">
                                        <MDBBtn onClick={handleSave}  style={{ marginTop: '10px' }}>Сохранить</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}