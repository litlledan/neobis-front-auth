import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import boy from '../../assets-images/boy.png'
import arow from '../../assets-images/arow.svg'
import './Registration.scss'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";

function Registration() {
  const navigate = useNavigate();
  const validationsSchema = yup.object().shape({
    email: yup.string().email('должно быть строкой').required('Обязательно'),
    login: yup.string().typeError('должно быть строкой').required('Обязательно'),
    password: yup.string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .max(15, 'Пароль должен содержать максимум 15 символов')
      .matches(/[a-z]/, 'Пароль должен содержать строчные буквы')
      .matches(/[A-Z]/, 'Пароль должен содержать прописные буквы')
      .matches(/\d/, 'Пароль должен содержать минимум 1 цифру')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Пароль должен содержать минимум 1 спецсимвол'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательно')
  })

  const [passwordState, setPasswordState] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    specialChar: false,
  });

  const handleSubmit = async (values) => {
    console.log(values)
    const newValues = {
      email: values.email,
      password: values.password,
      verifyPassword: values.confirmPassword
    }
    try {
      // Отправка данных на сервер
      const response = await axios.post('https://neobis-auth-project.up.railway.app/api/users/signUp', newValues);
      console.log(response)
      // После успешной регистрации получаем токены из ответа
      const { accessToken, refreshToken } = response.data;

      // Сохраняем токены в локальном хранилище
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      if (response.status === 200) {
        navigate('/letter');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      // Обработка ошибок
    }

  };
  const [show, setShow] = useState(false)
  const [showTwo, setShowTwo] = useState(false)
  const handleEye = () => {
    setShow(!show);
    setShowTwo(!showTwo)
  };
  return (

    <div className='register'>
      <Link to={'/'} className='register__link'>
        <div className="register__arow">
          <img src={arow} alt="arow" className='register__arow-img' />
          <p className='register__arow-p' >Назад</p>
        </div>
      </Link>
      <div className="register__container">
        <div className="register__img">
          <img src={boy} alt="" className='imageBoy' />
        </div>
      </div>

      <div className='formik'>
        <Formik
          initialValues={{
            email: '',
            login: '',
            password: '',
            confirmPassword: '',
          }}
          validateOnBlur
          onSubmit={handleSubmit}
          validationSchema={validationsSchema}
        >
          {({ values, errors, touched, handleChange, handelBlur, isValid, handleSubmit, dirty }) => (
            <div className="register__form">
              <p className='register__form-p'>Создать аккаунт <br /> Lorby</p>
              <label htmlFor={`email`} className='register__form-lable'>
                <input
                  type="email"
                  placeholder='Введи адрес почты'
                  name={`email`}
                  className='register__form-input'
                  onChange={handleChange}
                  onBlur={handelBlur}
                  value={values.email}
                />

                {touched.email && errors.email && <p className='register__from-eror'>{errors.email}</p>}
              </label>

              <label htmlFor={`login`} className='register__form-lable'>
                <input
                  type="text"
                  placeholder='Придумай логин'
                  name={`login`}
                  className='register__form-input'
                  onChange={handleChange}
                  onBlur={handelBlur}
                  value={values.login}
                />

                {touched.login && errors.login && <p className='register__from-eror'>{errors.login}</p>}
              </label>

              <label htmlFor={`password`} className='register__form-pass-lable'>
                <input
                  type={show ? 'text' : 'password'}
                  placeholder='Создай пароль'
                  name="password"
                  className={`register__form-input ${touched.password && errors.password ? 'error' : ''
                    }`}
                  onChange={(e) => {
                    handleChange(e);
                    const password = e.target.value;
                    setPasswordState({
                      length: password.length >= 8 && password.length <= 15,
                      lowercase: /[a-z]/.test(password),
                      uppercase: /[A-Z]/.test(password),
                      digit: /\d/.test(password),
                      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
                    });
                  }}
                  onBlur={handelBlur}
                  value={values.password}
                />
                <button onClick={handleEye} className='register__form-eye'>
                  {show ? <BsEye className='register__form-eye' /> : <BsEyeSlash className='register__form-eye' />}
                </button>
                <ErrorMessage name="password" component="div" />


                <div>
                  {!values.password ? <li className='register__form-li'>От 8 до 15 символов</li>
                    : passwordState.length ? '✅ Длина от 8 до 15 символов' : '❌ Длина от 8 до 15 символов'}
                </div>

                <div>
                  {!values.password ? <li className='register__form-li'>Строчные и прописные буквы</li>
                    : passwordState.lowercase ? '✅ Содержит строчные буквы' : '❌ Содержит строчные буквы'}
                </div>

                <div>
                  {!values.password ? <li className='register__form-li'>Минимум 1 цифр</li>
                    : passwordState.uppercase ? '✅ Содержит прописные буквы' : '❌ Содержит прописные буквы'}
                </div>

                <div>
                  {!values.password ? <li className='register__form-li'>Минимум 1 спецсимвол (!, ", #, $...)</li>
                    : passwordState.digit ? '✅ Содержит минимум 1 цифру' : '❌ Содержит минимум 1 цифру'}
                </div>
                {touched.password && errors.password && <p className='register__from-eror'>{errors.password}</p>}

              </label>

              <label htmlFor={`confirmPassword`} className='register__form-pass-lable'>
                <input
                  type={show ? 'text' : 'password'}
                  placeholder='Повтори пароль'
                  name={`confirmPassword`}
                  className='register__form-input'
                  onChange={handleChange}
                  onBlur={handelBlur}
                  value={values.confirmPassword}
                />
                <button onClick={handleEye} className='register__form-eye'>
                  {showTwo ? <BsEye className='register__form-eye' /> : <BsEyeSlash className='register__form-eye' />}
                </button>
                {touched.confirmPassword && errors.confirmPassword && <p className='register__from-eror'>{errors.confirmPassword}</p>}

              </label>

              <button
                onClick={handleSubmit}
                type={`submit`}
                className='register__btn'
                disabled={!isValid && !dirty}
                style={{
                  background: (!isValid || !dirty || Object.keys(touched).length !== Object.keys(validationsSchema.fields).length) ? '#D7D7D7' : 'black',
                  color: (!isValid || !dirty || Object.keys(touched).length !== Object.keys(validationsSchema.fields).length) ? '#767676' : 'white',
                }}
              >

                Далее
              </button>

            </div>
          )}
        </Formik>

      </div>
    </div>
  )
}

export default Registration