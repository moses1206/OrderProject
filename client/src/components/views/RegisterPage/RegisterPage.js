import React from 'react';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';

import { Form, Input, Button } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        teamname: '',
        storename: '',
        username: '',
        shippingAddress: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        teamname: Yup.string().required('TeamName is required'),
        storename: Yup.string().required('Store Name is required'),
        username: Yup.string().required('User Name is required'),
        shippingAddress: Yup.string().required('Shipping Address is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            teamname: values.teamname,
            storename: values.storename,
            username: values.username,
            shippingAddress: values.shippingAddress,
            email: values.email,
            password: values.password,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              props.history.push('/login');
            } else {
              alert(response.payload.err.errmsg);
            }
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className='app'>
            <h2>????????????</h2>
            <Form
              style={{ minWidth: '375px' }}
              {...formItemLayout}
              onSubmit={handleSubmit}
            >
              <Form.Item required label='??????'>
                <Input
                  id='teamname'
                  placeholder='????????? ??????????????? !!'
                  type='text'
                  value={values.teamname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.teamname && touched.teamname
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.teamname && touched.teamname && (
                  <div className='input-feedback'>{errors.teamname}</div>
                )}
              </Form.Item>

              <Form.Item required label='?????????'>
                <Input
                  id='storename'
                  placeholder='???????????? ??????????????? !!'
                  type='text'
                  value={values.storename}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.storename && touched.storename
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.storename && touched.storename && (
                  <div className='input-feedback'>{errors.storename}</div>
                )}
              </Form.Item>

              <Form.Item required label='??????'>
                <Input
                  id='username'
                  placeholder='????????? ??????????????? !!'
                  type='text'
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.username && touched.username
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.username && touched.username && (
                  <div className='input-feedback'>{errors.username}</div>
                )}
              </Form.Item>

              <Form.Item required label='????????? ??????'>
                <Input
                  id='shippingAddress'
                  placeholder='??????????????? ??????????????? !!'
                  type='text'
                  value={values.shippingAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.shippingAddress && touched.shippingAddress
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.shippingAddress && touched.shippingAddress && (
                  <div className='input-feedback'>{errors.shippingAddress}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label='?????????'
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? 'error' : 'success'
                }
              >
                <Input
                  id='email'
                  placeholder='???????????? ???????????????'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className='input-feedback'>{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label='????????????'
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? 'error' : 'success'
                }
              >
                <Input
                  id='password'
                  placeholder='??????????????? ???????????????!!'
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className='input-feedback'>{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label='???????????? ??????' hasFeedback>
                <Input
                  id='confirmPassword'
                  placeholder='??????????????? ?????? ???????????????!!'
                  type='password'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className='input-feedback'>{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button
                  onClick={handleSubmit}
                  type='primary'
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
